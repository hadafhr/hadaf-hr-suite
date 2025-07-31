import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Gavel,
  AlertTriangle,
  FileText,
  Calendar,
  ArrowLeft,
  Search,
  Filter,
  Download,
  BookOpen,
  Scale,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

const DisciplinarySystem = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('violations');
  const [selectedViolation, setSelectedViolation] = useState<any>(null);

  // قاعدة بيانات المخالفات حسب نظام العمل السعودي
  const saudiLaborViolations = [
    {
      id: 'V001',
      category: 'الحضور والانصراف',
      violation: 'التأخير عن العمل',
      article: 'المادة 80',
      firstWarning: 'إنذار شفهي',
      secondWarning: 'إنذار كتابي',
      finalAction: 'خصم يوم من الراتب',
      severity: 'متوسط',
      description: 'التأخير عن موعد بداية العمل المحدد دون عذر مقبول'
    },
    {
      id: 'V002',
      category: 'الحضور والانصراف',
      violation: 'الغياب بدون إذن',
      article: 'المادة 80',
      firstWarning: 'إنذار كتابي',
      secondWarning: 'خصم راتب يوم واحد',
      finalAction: 'خصم راتب ثلاثة أيام أو إنهاء الخدمة',
      severity: 'عالي',
      description: 'الغياب عن العمل دون إذن مسبق من الرئيس المباشر'
    },
    {
      id: 'V003',
      category: 'السلوك المهني',
      violation: 'عدم احترام الرؤساء أو الزملاء',
      article: 'المادة 80',
      firstWarning: 'إنذار كتابي',
      secondWarning: 'خصم راتب يومين',
      finalAction: 'إنهاء الخدمة',
      severity: 'عالي',
      description: 'التعامل بعدم احترام مع الرؤساء أو الزملاء في العمل'
    },
    {
      id: 'V004',
      category: 'الأمن والسلامة',
      violation: 'عدم اتباع إجراءات السلامة',
      article: 'المادة 80',
      firstWarning: 'إنذار كتابي',
      secondWarning: 'خصم راتب يوم واحد',
      finalAction: 'إنهاء الخدمة',
      severity: 'عالي',
      description: 'عدم الالتزام بإجراءات الأمن والسلامة المهنية'
    },
    {
      id: 'V005',
      category: 'الأداء الوظيفي',
      violation: 'إهمال في أداء الواجبات',
      article: 'المادة 80',
      firstWarning: 'إنذار شفهي',
      secondWarning: 'إنذار كتابي',
      finalAction: 'خصم راتب أو تدريب إضافي',
      severity: 'متوسط',
      description: 'عدم أداء الواجبات الوظيفية بالجودة المطلوبة'
    }
  ];

  // الحالات التأديبية النشطة
  const activeCases = [
    {
      id: 'DC001',
      employeeName: 'أحمد محمد العلي',
      employeeId: 'EMP001',
      violation: 'التأخير عن العمل',
      date: '2024-01-15',
      status: 'قيد المراجعة',
      severity: 'متوسط',
      step: 'إنذار أول'
    },
    {
      id: 'DC002',
      employeeName: 'سارة أحمد الزهراني',
      employeeId: 'EMP045',
      violation: 'الغياب بدون إذن',
      date: '2024-01-12',
      status: 'تم اتخاذ الإجراء',
      severity: 'عالي',
      step: 'إنذار نهائي'
    }
  ];

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'منخفض':
        return <Badge className="bg-green-100 text-green-800">منخفض</Badge>;
      case 'متوسط':
        return <Badge className="bg-yellow-100 text-yellow-800">متوسط</Badge>;
      case 'عالي':
        return <Badge className="bg-red-100 text-red-800">عالي</Badge>;
      default:
        return <Badge>{severity}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'قيد المراجعة':
        return <Badge className="bg-blue-100 text-blue-800">قيد المراجعة</Badge>;
      case 'تم اتخاذ الإجراء':
        return <Badge className="bg-green-100 text-green-800">تم اتخاذ الإجراء</Badge>;
      case 'معلق':
        return <Badge className="bg-yellow-100 text-yellow-800">معلق</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(-1)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 ml-2" />
            العودة
          </Button>
          <div className="flex items-center gap-2">
            <Gavel className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold">نظام الإجراءات التأديبية</h1>
            <Badge className="bg-green-100 text-green-800">نظام العمل السعودي</Badge>
          </div>
          <div className="mr-auto flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">
                  <AlertTriangle className="h-4 w-4 ml-2" />
                  إجراء تأديبي جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إنشاء إجراء تأديبي جديد</DialogTitle>
                  <DialogDescription>
                    اختر نوع المخالفة والموظف المعني
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="employee">الموظف</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMP001">أحمد محمد العلي</SelectItem>
                        <SelectItem value="EMP002">فاطمة سعد الأحمد</SelectItem>
                        <SelectItem value="EMP003">خالد يوسف النمر</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="violation">نوع المخالفة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع المخالفة" />
                      </SelectTrigger>
                      <SelectContent>
                        {saudiLaborViolations.map((violation) => (
                          <SelectItem key={violation.id} value={violation.id}>
                            {violation.violation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">تفاصيل المخالفة</Label>
                    <Textarea placeholder="اكتب تفاصيل المخالفة..." />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">إلغاء</Button>
                    <Button>إنشاء الإجراء</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="violations">قاعدة المخالفات</TabsTrigger>
            <TabsTrigger value="cases">الحالات النشطة</TabsTrigger>
            <TabsTrigger value="history">السجل التاريخي</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
          </TabsList>

          {/* Violations Database Tab */}
          <TabsContent value="violations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="h-6 w-6" />
                  قاعدة بيانات المخالفات - نظام العمل السعودي
                </CardTitle>
                <CardDescription>
                  المخالفات والإجراءات التأديبية وفقاً للمادة 80 من نظام العمل السعودي
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {saudiLaborViolations.map((violation) => (
                    <Card key={violation.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{violation.violation}</h3>
                              {getSeverityBadge(violation.severity)}
                              <Badge variant="outline">{violation.article}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{violation.description}</p>
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-green-600">الإجراء الأول:</span>
                                <p>{violation.firstWarning}</p>
                              </div>
                              <div>
                                <span className="font-medium text-yellow-600">الإجراء الثاني:</span>
                                <p>{violation.secondWarning}</p>
                              </div>
                              <div>
                                <span className="font-medium text-red-600">الإجراء النهائي:</span>
                                <p>{violation.finalAction}</p>
                              </div>
                            </div>
                          </div>
                          <div className="text-center">
                            <Badge variant="outline" className="mb-2">{violation.category}</Badge>
                            <br />
                            <Button variant="outline" size="sm" className="mt-2">
                              استخدام
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

          {/* Active Cases Tab */}
          <TabsContent value="cases" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-6 w-6" />
                  الحالات التأديبية النشطة
                </CardTitle>
                <CardDescription>
                  متابعة الحالات التأديبية الجارية
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeCases.map((case_) => (
                    <Card key={case_.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                              <Gavel className="h-6 w-6 text-red-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{case_.employeeName}</h3>
                              <p className="text-sm text-muted-foreground">رقم الموظف: {case_.employeeId}</p>
                              <p className="text-sm text-muted-foreground">{case_.violation}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-center">
                              <div className="text-sm font-medium">التاريخ</div>
                              <div className="text-sm text-muted-foreground">{case_.date}</div>
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium">الخطورة</div>
                              {getSeverityBadge(case_.severity)}
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium">الحالة</div>
                              {getStatusBadge(case_.status)}
                            </div>
                            <div className="text-center">
                              <div className="text-sm font-medium">المرحلة</div>
                              <Badge variant="outline">{case_.step}</Badge>
                            </div>
                            <Button variant="outline" size="sm">
                              عرض التفاصيل
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

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-6 w-6" />
                  السجل التاريخي للإجراءات التأديبية
                </CardTitle>
                <CardDescription>
                  جميع الإجراءات التأديبية السابقة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>سيتم عرض السجل التاريخي للإجراءات التأديبية هنا</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  تقارير الإجراءات التأديبية
                </CardTitle>
                <CardDescription>
                  تقارير وإحصائيات شاملة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    تقرير شهري
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    تقرير سنوي
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <FileText className="h-6 w-6" />
                    تقرير مخصص
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DisciplinarySystem;