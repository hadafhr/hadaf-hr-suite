import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Target, Users, TrendingUp, Lightbulb, Plus, Calendar, Award, 
  CheckCircle, Clock, ArrowRight, AlertCircle, FileText, 
  Search, Settings, BookOpen, Workflow, ChevronDown, ChevronUp,
  User, UserCheck, Building2, ClipboardCheck
} from 'lucide-react';

// البيانات الأساسية للنظام
const organizationalPhases = [
  {
    id: 1,
    title: "التشخيص والتحليل الأولي",
    description: "تقرير تشخيص أولي لحالة المؤسسة",
    status: "مكتمل",
    progress: 100,
    icon: Search,
    steps: [
      { id: 1, title: "تعبئة نموذج التقييم الذاتي", completed: true },
      { id: 2, title: "مقابلات تشخيصية مع الإدارة العليا والموظفين", completed: true },
      { id: 3, title: "تحليل SWOT للمؤسسة", completed: true },
      { id: 4, title: "رفع تقرير تشخيصي للمشاكل والفرص", completed: true }
    ],
    approvals: [
      { role: "مدير الإدارة", status: "موافق", date: "2024-01-15" },
      { role: "مدير عام الموارد البشرية", status: "موافق", date: "2024-01-16" },
      { role: "الرئيس التنفيذي", status: "موافق", date: "2024-01-17" }
    ]
  },
  {
    id: 2,
    title: "تصميم الهيكل والعمليات",
    description: "هيكل تنظيمي محدث + خريطة العمليات",
    status: "جاري",
    progress: 75,
    icon: Building2,
    steps: [
      { id: 1, title: "اقتراح هيكل تنظيمي مناسب", completed: true },
      { id: 2, title: "تحديد الوحدات الإدارية ومسؤولياتها", completed: true },
      { id: 3, title: "تصميم خريطة العمليات الرئيسية", completed: true },
      { id: 4, title: "مراجعة الأدوار الوظيفية الحالية", completed: false }
    ],
    approvals: [
      { role: "مدير تطوير تنظيمي", status: "موافق", date: "2024-01-20" },
      { role: "مدير الموارد البشرية", status: "موافق", date: "2024-01-21" },
      { role: "الإدارة القانونية", status: "قيد المراجعة", date: null },
      { role: "الرئيس التنفيذي", status: "انتظار", date: null }
    ]
  },
  {
    id: 3,
    title: "بناء السياسات والإجراءات",
    description: "دليل سياسات وإجراءات رسمي",
    status: "قيد الانتظار",
    progress: 0,
    icon: FileText,
    steps: [
      { id: 1, title: "إعداد سياسات الموارد البشرية والتشغيل والمالية", completed: false },
      { id: 2, title: "تصميم إجراءات العمل", completed: false },
      { id: 3, title: "اعتماد السياسات", completed: false },
      { id: 4, title: "رفع الملفات للمنصة", completed: false }
    ],
    approvals: [
      { role: "مدير الجودة", status: "انتظار", date: null },
      { role: "مدير تطوير تنظيمي", status: "انتظار", date: null },
      { role: "الإدارة القانونية", status: "انتظار", date: null },
      { role: "الرئيس التنفيذي", status: "انتظار", date: null },
      { role: "مجلس الإدارة", status: "انتظار", date: null }
    ]
  },
  {
    id: 4,
    title: "إدارة التغيير وتدريب الموظفين",
    description: "خطة إدارة التغيير + خطة تدريبية",
    status: "قيد الانتظار",
    progress: 0,
    icon: BookOpen,
    steps: [
      { id: 1, title: "إعداد خطة إدارة التغيير", completed: false },
      { id: 2, title: "تصميم برامج التوعية", completed: false },
      { id: 3, title: "تنفيذ الورش", completed: false },
      { id: 4, title: "قياس الجاهزية", completed: false }
    ],
    approvals: [
      { role: "مدير التدريب", status: "انتظار", date: null },
      { role: "مدير تطوير تنظيمي", status: "انتظار", date: null },
      { role: "الموارد البشرية", status: "انتظار", date: null },
      { role: "الرئيس التنفيذي", status: "انتظار", date: null }
    ]
  },
  {
    id: 5,
    title: "التفعيل والمتابعة والتحسين",
    description: "تشغيل النظام الجديد + تقارير أداء",
    status: "قيد الانتظار",
    progress: 0,
    icon: TrendingUp,
    steps: [
      { id: 1, title: "إطلاق الهيكل الجديد", completed: false },
      { id: 2, title: "مراقبة الأداء لمدة 90 يوم", completed: false },
      { id: 3, title: "إعداد تقارير الأداء", completed: false },
      { id: 4, title: "رفع التوصيات", completed: false }
    ],
    approvals: [
      { role: "مدير الأداء المؤسسي", status: "انتظار", date: null },
      { role: "مدير الموارد البشرية", status: "انتظار", date: null },
      { role: "الرئيس التنفيذي", status: "انتظار", date: null }
    ]
  }
];

const organizationalStats = [
  { title: "المراحل المكتملة", value: "1", icon: CheckCircle, color: "text-success" },
  { title: "المرحلة الحالية", value: "2", icon: Clock, color: "text-warning" },
  { title: "نسبة الإنجاز الإجمالية", value: "35%", icon: TrendingUp, color: "text-primary" },
  { title: "الموافقات المعلقة", value: "2", icon: AlertCircle, color: "text-destructive" }
];

export const OrganizationalDevelopment: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<number | null>(null);
  const [expandedSteps, setExpandedSteps] = useState<number[]>([]);

  const toggleSteps = (phaseId: number) => {
    setExpandedSteps(prev => 
      prev.includes(phaseId) 
        ? prev.filter(id => id !== phaseId)
        : [...prev, phaseId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "مكتمل": return "bg-success/20 text-success border-success";
      case "جاري": return "bg-warning/20 text-warning border-warning";
      case "قيد المراجعة": return "bg-info/20 text-info border-info";
      case "قيد الانتظار": return "bg-muted/20 text-muted-foreground border-muted";
      default: return "bg-muted/20 text-muted-foreground border-muted";
    }
  };

  const getApprovalStatusColor = (status: string) => {
    switch (status) {
      case "موافق": return "text-success";
      case "قيد المراجعة": return "text-warning";
      case "انتظار": return "text-muted-foreground";
      case "مرفوض": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">نظام التطوير والتنظيم المؤسسي</h1>
          <p className="text-muted-foreground mt-2">منصة أصحاب العمل - إدارة مراحل التطوير المؤسسي</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          مشروع تطوير جديد
        </Button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {organizationalStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* مراحل التطوير */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">مراحل التطوير المؤسسي</h2>
        
        <div className="space-y-4">
          {organizationalPhases.map((phase, index) => (
            <Card key={phase.id} className="overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                      <phase.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        <span>{phase.id}: {phase.title}</span>
                        <Badge className={getStatusColor(phase.status)}>
                          {phase.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription className="mt-1">{phase.description}</CardDescription>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{phase.progress}%</div>
                    <div className="text-sm text-muted-foreground">مكتمل</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <Progress value={phase.progress} className="h-2" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* الخطوات */}
                <div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSteps(phase.id)}
                    className="flex items-center gap-2 p-0 h-auto text-sm font-medium"
                  >
                    {expandedSteps.includes(phase.id) ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                    عرض الخطوات ({phase.steps.length})
                  </Button>
                  
                  {expandedSteps.includes(phase.id) && (
                    <div className="mt-3 space-y-2">
                      {phase.steps.map((step) => (
                        <div key={step.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                          {step.completed ? (
                            <CheckCircle className="h-4 w-4 text-success" />
                          ) : (
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          )}
                          <span className={`text-sm ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {step.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* سلسلة الموافقات */}
                <div className="border-t pt-4">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <UserCheck className="h-4 w-4" />
                    سلسلة الموافقات
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {phase.approvals.map((approval, approvalIndex) => (
                      <div key={approvalIndex} className="flex items-center justify-between p-3 bg-card border rounded-lg">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">{approval.role}</span>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm font-medium ${getApprovalStatusColor(approval.status)}`}>
                            {approval.status}
                          </div>
                          {approval.date && (
                            <div className="text-xs text-muted-foreground">
                              {approval.date}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* أزرار الإجراءات */}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline">
                    <FileText className="h-4 w-4 mr-2" />
                    عرض التفاصيل
                  </Button>
                  <Button size="sm" variant="outline">
                    <ClipboardCheck className="h-4 w-4 mr-2" />
                    تقرير المرحلة
                  </Button>
                  {phase.status === "جاري" && (
                    <Button size="sm">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      تحديث الحالة
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ملخص سير العمل */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Workflow className="h-5 w-5" />
            ملخص سير العمل
          </CardTitle>
          <CardDescription>
            تتبع تقدم مراحل التطوير المؤسسي والانتقالات التلقائية
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">خطوط الانتقال</h4>
                <ul className="text-sm space-y-1">
                  <li>• المرحلة 1 ← 2: انتقال تلقائي بعد موافقة الرئيس التنفيذي</li>
                  <li>• المرحلة 2 ← 3: انتقال بعد اكتمال جميع الموافقات</li>
                  <li>• المرحلة 3 ← 4: نشر تلقائي بعد اعتماد مجلس الإدارة</li>
                  <li>• المرحلة 4 ← 5: انتقال بعد تقييم الجاهزية</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">النظام الحالي</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>المرحلة النشطة:</span>
                    <span className="font-medium">المرحلة 2 - تصميم الهيكل والعمليات</span>
                  </div>
                  <div className="flex justify-between">
                    <span>نسبة الإنجاز الإجمالية:</span>
                    <span className="font-medium">35%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الموافقات المعلقة:</span>
                    <span className="font-medium text-warning">2 موافقة</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};