import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  CheckCircle, 
  Search, 
  AlertTriangle, 
  FileText,
  Calendar,
  Clock,
  Users,
  Target,
  TrendingUp,
  Shield,
  Plus,
  Download,
  Eye,
  Filter,
  BarChart3,
  AlertCircle,
  CheckSquare
} from 'lucide-react';

export const InternalAudit: React.FC = () => {
  const [activeTab, setActiveTab] = useState('audits');

  // بيانات تجريبية لعمليات التدقيق
  const audits = [
    {
      id: 1,
      auditNumber: 'AUD-2024-001',
      title: 'تدقيق أنظمة الموارد البشرية',
      department: 'الموارد البشرية',
      type: 'operational',
      status: 'in_progress',
      startDate: '2024-11-01',
      endDate: '2024-12-15',
      auditor: 'أحمد محمد',
      progress: 65,
      findings: 8,
      priority: 'high'
    },
    {
      id: 2,
      auditNumber: 'AUD-2024-002',
      title: 'تدقيق المشتريات والعقود',
      department: 'المشتريات',
      type: 'compliance',
      status: 'scheduled',
      startDate: '2024-12-01',
      endDate: '2024-12-20',
      auditor: 'سارة علي',
      progress: 0,
      findings: 0,
      priority: 'medium'
    },
    {
      id: 3,
      auditNumber: 'AUD-2024-003',
      title: 'تدقيق أمن المعلومات',
      department: 'تقنية المعلومات',
      type: 'it',
      status: 'completed',
      startDate: '2024-10-01',
      endDate: '2024-10-31',
      auditor: 'محمد خالد',
      progress: 100,
      findings: 12,
      priority: 'high'
    }
  ];

  // النتائج والملاحظات
  const findings = [
    {
      id: 1,
      auditId: 1,
      title: 'عدم وجود توثيق كامل لبعض الإجراءات',
      severity: 'medium',
      status: 'open',
      dueDate: '2024-12-20',
      assignedTo: 'إدارة الموارد البشرية'
    },
    {
      id: 2,
      auditId: 1,
      title: 'ضعف في ضوابط الوصول',
      severity: 'high',
      status: 'in_progress',
      dueDate: '2024-12-10',
      assignedTo: 'إدارة تقنية المعلومات'
    },
    {
      id: 3,
      auditId: 3,
      title: 'عدم تحديث سياسات الأمان',
      severity: 'critical',
      status: 'resolved',
      dueDate: '2024-11-15',
      assignedTo: 'إدارة الأمن السيبراني'
    }
  ];

  // إحصائيات
  const stats = {
    totalAudits: 24,
    inProgress: 5,
    scheduled: 8,
    completed: 11,
    totalFindings: 156,
    criticalFindings: 8,
    avgCompliance: 88
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'in_progress': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'scheduled': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'cancelled': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/10 text-red-600 border-red-500/20';
      case 'high': return 'bg-orange-500/10 text-orange-600 border-orange-500/20';
      case 'medium': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'operational': return 'تشغيلي';
      case 'compliance': return 'امتثال';
      case 'financial': return 'مالي';
      case 'it': return 'تقني';
      default: return type;
    }
  };

  return (
    <div className="space-y-6 p-6" dir="rtl">
      {/* العنوان والإحصائيات */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <CheckSquare className="h-8 w-8 text-primary" />
              التدقيق الداخلي
            </h2>
            <p className="text-muted-foreground mt-2">نظام شامل لإدارة عمليات التدقيق الداخلي ومتابعة النتائج</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-2" />
              تصفية
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 ml-2" />
              تدقيق جديد
            </Button>
          </div>
        </div>

        {/* بطاقات الإحصائيات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي التدقيقات</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalAudits}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <CheckSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">قيد التنفيذ</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مجدولة</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.scheduled}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مكتملة</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الملاحظات</p>
                  <p className="text-2xl font-bold text-foreground">{stats.totalFindings}</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">حرجة</p>
                  <p className="text-2xl font-bold text-red-600">{stats.criticalFindings}</p>
                </div>
                <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الامتثال</p>
                  <p className="text-2xl font-bold text-foreground">{stats.avgCompliance}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* التبويبات */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl rounded-xl">
          <TabsTrigger value="audits" className="flex flex-col gap-1 py-3">
            <CheckSquare className="h-4 w-4" />
            <span className="text-xs">التدقيقات</span>
          </TabsTrigger>
          <TabsTrigger value="findings" className="flex flex-col gap-1 py-3">
            <FileText className="h-4 w-4" />
            <span className="text-xs">الملاحظات</span>
          </TabsTrigger>
          <TabsTrigger value="schedule" className="flex flex-col gap-1 py-3">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">الجدولة</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex flex-col gap-1 py-3">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">التقارير</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex flex-col gap-1 py-3">
            <Users className="h-4 w-4" />
            <span className="text-xs">الفريق</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="audits" className="space-y-4">
          {audits.map((audit) => (
            <Card key={audit.id} className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline" className="font-mono">
                          {audit.auditNumber}
                        </Badge>
                        <Badge className={getStatusColor(audit.status)}>
                          {audit.status === 'completed' ? 'مكتمل' :
                           audit.status === 'in_progress' ? 'قيد التنفيذ' :
                           audit.status === 'scheduled' ? 'مجدول' : 'ملغي'}
                        </Badge>
                        <Badge variant="outline">
                          {getTypeLabel(audit.type)}
                        </Badge>
                      </div>
                      <h3 className="text-lg font-bold text-foreground mb-2">{audit.title}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          {audit.department}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {audit.auditor}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {audit.startDate} - {audit.endDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  {audit.status === 'in_progress' && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">التقدم</span>
                        <span className="font-bold text-foreground">{audit.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all"
                          style={{ width: `${audit.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-foreground">{audit.findings}</p>
                      <p className="text-xs text-muted-foreground">الملاحظات</p>
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 ml-2" />
                        عرض التفاصيل
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Download className="h-4 w-4 ml-2" />
                        تحميل التقرير
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="findings" className="space-y-4">
          {findings.map((finding) => (
            <Card key={finding.id} className="border-border/50 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={getSeverityColor(finding.severity)}>
                        {finding.severity === 'critical' ? 'حرج' :
                         finding.severity === 'high' ? 'عالي' :
                         finding.severity === 'medium' ? 'متوسط' : 'منخفض'}
                      </Badge>
                      <Badge variant="outline">
                        {finding.status === 'resolved' ? 'تم الحل' :
                         finding.status === 'in_progress' ? 'قيد المعالجة' : 'مفتوح'}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-foreground mb-2">{finding.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {finding.assignedTo}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        تاريخ الاستحقاق: {finding.dueDate}
                      </span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 ml-2" />
                    التفاصيل
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                خطة التدقيق السنوية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                عرض تقويمي لجميع عمليات التدقيق المجدولة
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50 hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">تقرير الأداء</h3>
                  <p className="text-sm text-muted-foreground">تحليل شامل لأداء التدقيق الداخلي</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-2" />
                  تحميل
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">تقرير الامتثال</h3>
                  <p className="text-sm text-muted-foreground">مستويات الامتثال والالتزام</p>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-2" />
                  تحميل
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                فريق التدقيق الداخلي
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-12">
                إدارة فريق المدققين وتوزيع المهام
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};