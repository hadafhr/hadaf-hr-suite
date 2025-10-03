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
          <div className="space-y-4">
            {/* نظرة عامة على الجدول */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-border/50 bg-gradient-to-br from-blue-500/10 to-transparent">
                <CardContent className="p-6 text-center space-y-3">
                  <Calendar className="h-12 w-12 text-blue-600 mx-auto" />
                  <div>
                    <p className="text-3xl font-bold text-foreground">Q1 2025</p>
                    <p className="text-sm text-muted-foreground">الربع الحالي</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-background/50 p-2 rounded-lg">
                      <p className="font-bold text-foreground">6</p>
                      <p className="text-xs text-muted-foreground">مجدولة</p>
                    </div>
                    <div className="bg-background/50 p-2 rounded-lg">
                      <p className="font-bold text-green-600">4</p>
                      <p className="text-xs text-muted-foreground">مكتملة</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-gradient-to-br from-green-500/10 to-transparent">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">التدقيق القادم</h3>
                    <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">قريباً</Badge>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-foreground">تدقيق نظام الرواتب</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>01 يناير 2025</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-3 w-3" />
                      <span>أحمد محمد - المدقق الرئيسي</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="w-full">عرض التفاصيل</Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 bg-gradient-to-br from-purple-500/10 to-transparent">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-foreground">خطة السنة</h3>
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">التقدم السنوي</span>
                      <span className="font-bold text-foreground">42%</span>
                    </div>
                    <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-purple-600" style={{ width: '42%' }} />
                    </div>
                    <p className="text-sm text-muted-foreground">10 من 24 تدقيق مكتمل</p>
                  </div>
                  <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">عرض الخطة</Button>
                </CardContent>
              </Card>
            </div>

            {/* التقويم الربع سنوي */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    التدقيقات المجدولة - Q1 2025
                  </CardTitle>
                  <Button size="sm" variant="outline">
                    <Plus className="h-4 w-4 ml-2" />
                    جدولة تدقيق
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { month: 'يناير', audits: [
                      { title: 'تدقيق نظام الرواتب', date: '01-15 يناير', auditor: 'أحمد محمد', status: 'scheduled' },
                      { title: 'تدقيق المشتريات', date: '20-28 يناير', auditor: 'سارة علي', status: 'scheduled' }
                    ]},
                    { month: 'فبراير', audits: [
                      { title: 'تدقيق أمن المعلومات', date: '05-15 فبراير', auditor: 'محمد خالد', status: 'scheduled' },
                      { title: 'تدقيق الجودة', date: '18-25 فبراير', auditor: 'فاطمة حسن', status: 'scheduled' }
                    ]},
                    { month: 'مارس', audits: [
                      { title: 'تدقيق العقود', date: '01-10 مارس', auditor: 'علي أحمد', status: 'scheduled' },
                      { title: 'تدقيق الامتثال', date: '15-25 مارس', auditor: 'نورة سعيد', status: 'scheduled' }
                    ]}
                  ].map((monthData, index) => (
                    <div key={index} className="border border-border/50 rounded-lg p-4">
                      <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {monthData.month}
                      </h4>
                      <div className="space-y-2">
                        {monthData.audits.map((audit, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-all">
                            <div className="flex-1">
                              <p className="font-medium text-foreground text-sm">{audit.title}</p>
                              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                <span>{audit.date}</span>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {audit.auditor}
                                </span>
                              </div>
                            </div>
                            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">مجدول</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports">
          <div className="space-y-4">
            {/* أنواع التقارير */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-blue-500/20 transition-all">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">تقرير الأداء</h3>
                    <p className="text-sm text-muted-foreground">تحليل شامل لأداء التدقيق الداخلي</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">آخر تحديث</span>
                      <span className="text-foreground font-medium">2024-12-01</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل التقرير
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-green-500/20 transition-all">
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">تقرير الامتثال</h3>
                    <p className="text-sm text-muted-foreground">مستويات الامتثال والالتزام</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">نسبة الامتثال</span>
                      <span className="text-green-600 font-bold">88%</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل التقرير
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/50 transition-all cursor-pointer group">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-orange-500/20 transition-all">
                    <AlertTriangle className="h-8 w-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">تقرير المخاطر</h3>
                    <p className="text-sm text-muted-foreground">تحليل المخاطر المكتشفة</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">مخاطر نشطة</span>
                      <span className="text-orange-600 font-bold">12</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <Download className="h-4 w-4 ml-2" />
                    تحميل التقرير
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* التقارير الأخيرة */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">التقارير المنشورة مؤخراً</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'تقرير التدقيق الربع سنوي Q4-2024', date: '2024-12-01', type: 'quarterly', status: 'published', downloads: 45 },
                    { title: 'تقرير الملاحظات الحرجة - نوفمبر 2024', date: '2024-11-30', type: 'findings', status: 'published', downloads: 32 },
                    { title: 'تقرير الامتثال الشهري', date: '2024-11-28', type: 'compliance', status: 'published', downloads: 67 },
                    { title: 'تقييم المخاطر - Q4 2024', date: '2024-11-25', type: 'risk', status: 'draft', downloads: 0 }
                  ].map((report, index) => (
                    <div key={index} className="p-4 bg-card border border-border/50 rounded-lg flex items-center justify-between hover:border-primary/50 transition-all">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground">{report.title}</h4>
                            <Badge className={report.status === 'published' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'}>
                              {report.status === 'published' ? 'منشور' : 'مسودة'}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {report.date}
                            </span>
                            {report.downloads > 0 && (
                              <>
                                <span>•</span>
                                <span className="flex items-center gap-1">
                                  <Download className="h-3 w-3" />
                                  {report.downloads} تحميل
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 ml-2" />
                          عرض
                        </Button>
                        {report.status === 'published' && (
                          <Button size="sm">
                            <Download className="h-4 w-4 ml-2" />
                            تحميل
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* إحصائيات التقارير */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <FileText className="h-8 w-8 text-primary mx-auto" />
                  <p className="text-3xl font-bold text-foreground">48</p>
                  <p className="text-sm text-muted-foreground">إجمالي التقارير</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                  <p className="text-3xl font-bold text-green-600">42</p>
                  <p className="text-sm text-muted-foreground">منشورة</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <Clock className="h-8 w-8 text-yellow-600 mx-auto" />
                  <p className="text-3xl font-bold text-yellow-600">6</p>
                  <p className="text-sm text-muted-foreground">قيد الإعداد</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <Download className="h-8 w-8 text-blue-600 mx-auto" />
                  <p className="text-3xl font-bold text-blue-600">1,248</p>
                  <p className="text-sm text-muted-foreground">إجمالي التحميلات</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="team">
          <div className="space-y-4">
            {/* إحصائيات الفريق */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <Users className="h-8 w-8 text-primary mx-auto" />
                  <p className="text-3xl font-bold text-foreground">12</p>
                  <p className="text-sm text-muted-foreground">إجمالي المدققين</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto" />
                  <p className="text-3xl font-bold text-green-600">8</p>
                  <p className="text-sm text-muted-foreground">مدققين نشطين</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <Target className="h-8 w-8 text-blue-600 mx-auto" />
                  <p className="text-3xl font-bold text-blue-600">28</p>
                  <p className="text-sm text-muted-foreground">تدقيقات نشطة</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-4 text-center space-y-2">
                  <TrendingUp className="h-8 w-8 text-purple-600 mx-auto" />
                  <p className="text-3xl font-bold text-purple-600">94%</p>
                  <p className="text-sm text-muted-foreground">معدل الإنجاز</p>
                </CardContent>
              </Card>
            </div>

            {/* قائمة المدققين */}
            <Card className="border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    فريق التدقيق الداخلي
                  </CardTitle>
                  <Button size="sm" className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة مدقق
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { 
                      name: 'أحمد محمد السعيد', 
                      role: 'مدير التدقيق الداخلي', 
                      specialization: 'التدقيق المالي والتشغيلي',
                      status: 'active',
                      activeAudits: 3,
                      completedAudits: 28,
                      certifications: ['CIA', 'CISA'],
                      avatar: 'AM'
                    },
                    { 
                      name: 'سارة علي الأحمد', 
                      role: 'مدقق أول', 
                      specialization: 'تدقيق الامتثال والحوكمة',
                      status: 'active',
                      activeAudits: 2,
                      completedAudits: 21,
                      certifications: ['CIA', 'CFE'],
                      avatar: 'SA'
                    },
                    { 
                      name: 'محمد خالد العتيبي', 
                      role: 'مدقق أول', 
                      specialization: 'تدقيق تقنية المعلومات',
                      status: 'active',
                      activeAudits: 2,
                      completedAudits: 18,
                      certifications: ['CISA', 'CISSP'],
                      avatar: 'MK'
                    },
                    { 
                      name: 'فاطمة حسن القحطاني', 
                      role: 'مدقق', 
                      specialization: 'تدقيق الجودة والعمليات',
                      status: 'active',
                      activeAudits: 1,
                      completedAudits: 15,
                      certifications: ['CIA'],
                      avatar: 'FH'
                    },
                    { 
                      name: 'علي أحمد المالكي', 
                      role: 'مدقق', 
                      specialization: 'التدقيق التشغيلي',
                      status: 'on_leave',
                      activeAudits: 0,
                      completedAudits: 12,
                      certifications: ['CIA'],
                      avatar: 'AA'
                    }
                  ].map((auditor, index) => (
                    <Card key={index} className="border-border/50 hover:border-primary/50 transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-lg font-bold text-primary">{auditor.avatar}</span>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-foreground">{auditor.name}</h3>
                                  <Badge className={auditor.status === 'active' ? 'bg-green-500/10 text-green-600 border-green-500/20' : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'}>
                                    {auditor.status === 'active' ? 'نشط' : 'في إجازة'}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{auditor.role}</p>
                                <p className="text-sm text-muted-foreground">{auditor.specialization}</p>
                              </div>
                              <Button size="sm" variant="outline">
                                <Eye className="h-4 w-4 ml-2" />
                                الملف الشخصي
                              </Button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 pt-3 border-t border-border/50">
                              <div>
                                <p className="text-xs text-muted-foreground">تدقيقات نشطة</p>
                                <p className="text-lg font-bold text-foreground">{auditor.activeAudits}</p>
                              </div>
                              <div>
                                <p className="text-xs text-muted-foreground">تدقيقات مكتملة</p>
                                <p className="text-lg font-bold text-foreground">{auditor.completedAudits}</p>
                              </div>
                              <div className="col-span-2">
                                <p className="text-xs text-muted-foreground mb-1">الشهادات المهنية</p>
                                <div className="flex gap-1 flex-wrap">
                                  {auditor.certifications.map((cert, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">
                                      {cert}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* توزيع عبء العمل */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">توزيع عبء العمل</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'أحمد محمد', workload: 85, audits: 3, color: 'bg-orange-600' },
                    { name: 'سارة علي', workload: 75, audits: 2, color: 'bg-blue-600' },
                    { name: 'محمد خالد', workload: 70, audits: 2, color: 'bg-green-600' },
                    { name: 'فاطمة حسن', workload: 45, audits: 1, color: 'bg-purple-600' },
                    { name: 'علي أحمد', workload: 0, audits: 0, color: 'bg-gray-400' }
                  ].map((member, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{member.name}</span>
                          <Badge variant="outline" className="text-xs">{member.audits} تدقيقات</Badge>
                        </div>
                        <span className="text-muted-foreground">{member.workload}%</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${member.color} transition-all`} 
                          style={{ width: `${member.workload}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};