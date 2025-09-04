import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { 
  Zap,
  Package,
  FileText,
  Download,
  Share2,
  Calendar,
  Clock,
  Mail,
  Presentation,
  Brain,
  TrendingUp,
  Users,
  Target,
  Award,
  AlertTriangle,
  CheckCircle,
  Building,
  Sparkles,
  Eye,
  Send,
  Settings
} from 'lucide-react';

interface ReportTemplate {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  sections: string[];
  estimatedTime: string;
  format: string[];
}

export const InstantReports = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isBoardPackOpen, setIsBoardPackOpen] = useState(false);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const { toast } = useToast();

  const reportTemplates: ReportTemplate[] = [
    {
      id: 'executive-summary',
      name: 'الملخص التنفيذي',
      description: 'ملخص شامل للمؤشرات الرئيسية وحالة التطوير المؤسسي',
      icon: Presentation,
      sections: ['المؤشرات الرئيسية', 'تقدم المبادرات', 'مؤشر السعادة', 'التوصيات'],
      estimatedTime: '2 دقيقة',
      format: ['PDF', 'PowerPoint']
    },
    {
      id: 'board-pack',
      name: 'حزمة مجلس الإدارة',
      description: 'تقرير تنفيذي شامل مع الملخص البصري وأهم المؤشرات',
      icon: Package,
      sections: ['الملخص البصري', 'قياس الأثر', 'مؤشر السعادة', 'المبادرات', 'المخاطر والفرص', 'التوصيات'],
      estimatedTime: '5 دقائق',
      format: ['PDF', 'PowerPoint']
    },
    {
      id: 'happiness-report',
      name: 'تقرير السعادة الوظيفية',
      description: 'تحليل مفصل لمؤشرات السعادة والرضا الوظيفي',
      icon: Users,
      sections: ['لوحة الشرف', 'اتجاهات السعادة', 'تحليل الأقسام', 'التوصيات'],
      estimatedTime: '3 دقائق',
      format: ['PDF', 'Excel']
    },
    {
      id: 'impact-analysis',
      name: 'تحليل الأثر المؤسسي',
      description: 'مقارنة Before vs After مع مؤشرات التحسن',
      icon: TrendingUp,
      sections: ['مقارنة الأداء', 'التحليل المالي', 'ROI', 'رؤى الذكاء الاصطناعي'],
      estimatedTime: '4 دقائق',
      format: ['PDF', 'Excel', 'PowerBI']
    },
    {
      id: 'initiatives-status',
      name: 'حالة المبادرات',
      description: 'تقرير مفصل عن تقدم جميع مبادرات التطوير المؤسسي',
      icon: Target,
      sections: ['المبادرات النشطة', 'الإنجازات', 'التحديات', 'الخطة القادمة'],
      estimatedTime: '3 دقائق',
      format: ['PDF', 'Excel']
    }
  ];

  const generateReport = async (templateId: string) => {
    setIsGenerating(true);
    setSelectedTemplate(templateId);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const template = reportTemplates.find(t => t.id === templateId);
      toast({
        title: 'تم إنشاء التقرير بنجاح',
        description: `تم إنشاء ${template?.name} وجاري التحميل`,
      });
      
    } catch (error) {
      toast({
        title: 'خطأ في إنشاء التقرير',
        description: 'حدث خطأ أثناء إنشاء التقرير، يرجى المحاولة مرة أخرى',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
      setSelectedTemplate(null);
    }
  };

  const generateBoardPack = async (customizations: any) => {
    setIsGenerating(true);
    
    try {
      // Simulate board pack generation with Visual Executive Summary
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      toast({
        title: 'تم إنشاء حزمة مجلس الإدارة',
        description: 'تم إنشاء التقرير التنفيذي مع الملخص البصري بنجاح',
      });
      
      setIsBoardPackOpen(false);
    } catch (error) {
      toast({
        title: 'خطأ في إنشاء حزمة مجلس الإدارة',
        description: 'حدث خطأ أثناء إنشاء التقرير، يرجى المحاولة مرة أخرى',
        variant: 'destructive'
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const scheduleReport = async (scheduleData: any) => {
    try {
      toast({
        title: 'تم جدولة التقرير',
        description: `سيتم إرسال التقرير تلقائياً ${scheduleData.frequency}`,
      });
      
      setIsScheduleOpen(false);
    } catch (error) {
      toast({
        title: 'خطأ في جدولة التقرير',
        description: 'حدث خطأ أثناء جدولة التقرير',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            التقارير الفورية
          </h2>
          <p className="text-muted-foreground">إنشاء ومشاركة وجدولة التقارير الذكية بنقرة واحدة</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isScheduleOpen} onOpenChange={setIsScheduleOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Clock className="h-4 w-4 mr-2" />
                جدولة التقارير
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>جدولة التقارير التلقائية</DialogTitle>
              </DialogHeader>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const data = {
                  template: formData.get('template'),
                  frequency: formData.get('frequency'),
                  time: formData.get('time'),
                  recipients: formData.get('recipients')
                };
                scheduleReport(data);
              }}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">نوع التقرير</label>
                    <Select name="template">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع التقرير" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTemplates.map(template => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">التكرار</label>
                    <Select name="frequency">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر التكرار" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">يومياً</SelectItem>
                        <SelectItem value="weekly">أسبوعياً</SelectItem>
                        <SelectItem value="monthly">شهرياً</SelectItem>
                        <SelectItem value="before-meetings">قبل الاجتماعات</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الوقت</label>
                    <Input name="time" type="time" defaultValue="09:00" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">المستلمون</label>
                    <Input name="recipients" placeholder="البريد الإلكتروني للمستلمين" />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsScheduleOpen(false)}>
                    إلغاء
                  </Button>
                  <Button type="submit">
                    حفظ الجدولة
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
          
          <Dialog open={isBoardPackOpen} onOpenChange={setIsBoardPackOpen}>
            <DialogTrigger asChild>
              <Button>
                <Package className="h-4 w-4 mr-2" />
                Board Pack
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  إنشاء حزمة مجلس الإدارة
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                  <h4 className="font-medium flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-primary" />
                    الملخص البصري التنفيذي
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    صفحة إنفوغرافيك تعرض أهم المؤشرات في تصميم أنيق ومتدرج بالألوان الرسمية
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      نسبة نجاح المبادرات
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      أعلى 3 إدارات في السعادة
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      نسبة التحسن في الأداء
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      ملخص المخاطر والفرص
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h5 className="font-medium">أقسام التقرير:</h5>
                    <div className="space-y-2">
                      {[
                        'الملخص البصري التنفيذي',
                        'Impact Summary',
                        'Happiness Index Overview',
                        'Development Initiatives',
                        'Risk & Opportunities Matrix',
                        'AI Recommendations'
                      ].map((section, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <Checkbox defaultChecked />
                          <label className="text-sm">{section}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h5 className="font-medium">خيارات التخصيص:</h5>
                    <div className="space-y-2">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="القالب" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="executive">تنفيذي</SelectItem>
                          <SelectItem value="detailed">مفصل</SelectItem>
                          <SelectItem value="summary">ملخص</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="التنسيق" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF</SelectItem>
                          <SelectItem value="pptx">PowerPoint</SelectItem>
                          <SelectItem value="both">كلاهما</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex items-center space-x-2">
                        <Checkbox />
                        <label className="text-sm">تضمين شعار الشركة تلقائياً</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 inline mr-1" />
                    الوقت المقدر للإنشاء: 5 دقائق | سيتم إرسال التقرير عبر البريد الإلكتروني عند الانتهاء
                  </p>
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsBoardPackOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={() => generateBoardPack({})} disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري الإنشاء...
                    </>
                  ) : (
                    <>
                      <Package className="h-4 w-4 mr-2" />
                      إنشاء Board Pack
                    </>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Report Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reportTemplates.map((template) => (
          <Card key={template.id} className="hover:shadow-md transition-all duration-200 hover:scale-[1.02]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <template.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                  </div>
                </div>
                <Badge variant="outline" className="text-xs">
                  <Clock className="h-3 w-3 mr-1" />
                  {template.estimatedTime}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
              
              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium mb-2">أقسام التقرير:</h5>
                  <div className="flex flex-wrap gap-1">
                    {template.sections.map((section, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {section}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium mb-2">التنسيقات المتاحة:</h5>
                  <div className="flex gap-1">
                    {template.format.map((format, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {format}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  className="flex-1" 
                  onClick={() => generateReport(template.id)}
                  disabled={isGenerating && selectedTemplate === template.id}
                >
                  {isGenerating && selectedTemplate === template.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      جاري الإنشاء...
                    </>
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      إنشاء فوري
                    </>
                  )}
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-primary" />
            إجراءات سريعة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Mail className="h-5 w-5 text-blue-500" />
              <span className="text-sm">إرسال عبر البريد</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Share2 className="h-5 w-5 text-green-500" />
              <span className="text-sm">نشر في التواصل الداخلي</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Download className="h-5 w-5 text-purple-500" />
              <span className="text-sm">تحميل مباشر</span>
            </Button>
            <Button variant="outline" className="h-16 flex flex-col gap-2">
              <Calendar className="h-5 w-5 text-orange-500" />
              <span className="text-sm">جدولة تلقائية</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            التقارير الحديثة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: 'الملخص التنفيذي - يونيو 2024', date: '2024-06-01', type: 'PDF', status: 'مكتمل' },
              { name: 'تقرير السعادة الوظيفية - مايو 2024', date: '2024-05-15', type: 'Excel', status: 'مكتمل' },
              { name: 'Board Pack - Q2 2024', date: '2024-06-30', type: 'PowerPoint', status: 'قيد الإنشاء' }
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h5 className="font-medium text-sm">{report.name}</h5>
                    <p className="text-xs text-muted-foreground">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">{report.type}</Badge>
                  <Badge className={report.status === 'مكتمل' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}>
                    {report.status}
                  </Badge>
                  {report.status === 'مكتمل' && (
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};