import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { 
  Gavel, AlertTriangle, FileText, Calendar as CalendarIcon, Search, Filter, Download,
  BookOpen, Scale, Clock, User, AlertCircle, Plus, Eye, CheckCircle, XCircle, 
  TrendingUp, ShieldAlert, Brain, Bell, MessageSquare, History, BarChart3,
  Shield, Users, Building, Target, Zap, Settings, ChevronRight, Star,
  Lightbulb, Flag, UserCheck, FileCheck, ClipboardCheck, Timer
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

// Saudi Labor Law Violations Database - Complete Table
const saudiLaborViolationsData = [
  // Article 1: Attendance and Punctuality
  {
    code: '1/1',
    category: 'الحضور والانصراف',
    violation: 'التأخير عن موعد العمل 15 دقيقة أو أقل',
    article: 'المادة 80 - الفقرة 1/1',
    firstAction: 'إنذار شفهي',
    secondAction: 'إنذار كتابي',
    thirdAction: 'خصم نصف يوم',
    fourthAction: 'خصم يوم كامل',
    severity: 'low',
    autoTrigger: true,
    description: 'التأخير عن موعد بداية العمل المحدد لمدة 15 دقيقة أو أقل'
  },
  {
    code: '1/2',
    category: 'الحضور والانصراف', 
    violation: 'التأخير عن موعد العمل أكثر من 15 دقيقة وأقل من 30 دقيقة',
    article: 'المادة 80 - الفقرة 1/2',
    firstAction: 'إنذار كتابي',
    secondAction: 'خصم نصف يوم',
    thirdAction: 'خصم يوم كامل',
    fourthAction: 'خصم يومين',
    severity: 'medium',
    autoTrigger: true,
    description: 'التأخير عن موعد بداية العمل لمدة تزيد عن 15 دقيقة وتقل عن 30 دقيقة'
  },
  {
    code: '1/3',
    category: 'الحضور والانصراف',
    violation: 'التأخير عن موعد العمل أكثر من 30 دقيقة وأقل من ساعة',
    article: 'المادة 80 - الفقرة 1/3',
    firstAction: 'خصم نصف يوم',
    secondAction: 'خصم يوم كامل',
    thirdAction: 'خصم يومين',
    fourthAction: 'فصل من الخدمة',
    severity: 'high',
    autoTrigger: true,
    description: 'التأخير عن موعد بداية العمل لمدة تزيد عن 30 دقيقة وتقل عن ساعة'
  },
  {
    code: '1/4',
    category: 'الحضور والانصراف',
    violation: 'التأخير عن موعد العمل أكثر من ساعة',
    article: 'المادة 80 - الفقرة 1/4',
    firstAction: 'خصم يوم كامل',
    secondAction: 'خصم يومين',
    thirdAction: 'فصل من الخدمة',
    fourthAction: 'فصل من الخدمة',
    severity: 'critical',
    autoTrigger: true,
    description: 'التأخير عن موعد بداية العمل لمدة تزيد عن ساعة كاملة'
  },
  {
    code: '1/5',
    category: 'الحضور والانصراف',
    violation: 'مغادرة مكان العمل أثناء ساعات الدوام دون إذن',
    article: 'المادة 80 - الفقرة 1/5',
    firstAction: 'إنذار كتابي',
    secondAction: 'خصم نصف يوم',
    thirdAction: 'خصم يوم كامل',
    fourthAction: 'فصل من الخدمة',
    severity: 'medium',
    autoTrigger: true,
    description: 'ترك مكان العمل دون الحصول على إذن مسبق من الرئيس المباشر'
  },
  {
    code: '1/6',
    category: 'الحضور والانصراف',
    violation: 'الغياب عن العمل دون عذر مشروع يوم واحد',
    article: 'المادة 80 - الفقرة 1/6',
    firstAction: 'إنذار كتابي',
    secondAction: 'خصم راتب يوم واحد',
    thirdAction: 'خصم راتب ثلاثة أيام',
    fourthAction: 'فصل من الخدمة',
    severity: 'high',
    autoTrigger: true,
    description: 'الغياب الكامل عن العمل ليوم واحد دون مبرر مقبول أو إذن مسبق'
  },
  {
    code: '1/7',
    category: 'الحضور والانصراف',
    violation: 'الغياب عن العمل دون عذر مشروع أكثر من يوم متتالي',
    article: 'المادة 80 - الفقرة 1/7',
    firstAction: 'خصم راتب ثلاثة أيام',
    secondAction: 'فصل من الخدمة',
    thirdAction: 'فصل من الخدمة',
    fourthAction: 'فصل من الخدمة',
    severity: 'critical',
    autoTrigger: true,
    description: 'الغياب المتواصل عن العمل لأكثر من يوم واحد دون مبرر'
  },

  // Article 2: Work Organization and Discipline
  {
    code: '2/1',
    category: 'تنظيم العمل',
    violation: 'مخالفة تعليمات الأمن والسلامة',
    article: 'المادة 80 - الفقرة 2/1',
    firstAction: 'إنذار كتابي',
    secondAction: 'خصم راتب يوم واحد',
    thirdAction: 'خصم راتب ثلاثة أيام',
    fourthAction: 'فصل من الخدمة',
    severity: 'high',
    autoTrigger: false,
    description: 'عدم الالتزام بقواعد وتعليمات الأمن والسلامة المهنية'
  },
  {
    code: '2/2',
    category: 'تنظيم العمل',
    violation: 'عدم المحافظة على أدوات العمل وممتلكات المنشأة',
    article: 'المادة 80 - الفقرة 2/2',
    firstAction: 'إنذار شفهي',
    secondAction: 'إنذار كتابي',
    thirdAction: 'خصم نصف يوم',
    fourthAction: 'خصم يوم كامل',
    severity: 'medium',
    autoTrigger: false,
    description: 'الإهمال في المحافظة على أدوات ومعدات العمل أو ممتلكات الشركة'
  },
  {
    code: '2/3',
    category: 'تنظيم العمل',
    violation: 'إهمال في أداء الواجبات مما يعرض سلامة المنشأة أو العاملين للخطر',
    article: 'المادة 80 - الفقرة 2/3',
    firstAction: 'خصم راتب ثلاثة أيام',
    secondAction: 'فصل من الخدمة',
    thirdAction: 'فصل من الخدمة',
    fourthAction: 'فصل من الخدمة',
    severity: 'critical',
    autoTrigger: false,
    description: 'الإهمال الجسيم الذي قد يعرض سلامة المنشأة أو الموظفين للخطر'
  },
  {
    code: '2/4',
    category: 'تنظيم العمل',
    violation: 'عدم طاعة الأوامر أو عدم احترام الرؤساء',
    article: 'المادة 80 - الفقرة 2/4',
    firstAction: 'إنذار كتابي',
    secondAction: 'خصم راتب يوم واحد',
    thirdAction: 'خصم راتب ثلاثة أيام',
    fourthAction: 'فصل من الخدمة',
    severity: 'high',
    autoTrigger: false,
    description: 'عدم تنفيذ الأوامر المشروعة أو عدم احترام الرؤساء في العمل'
  },

  // Article 3: Conduct and Behavior
  {
    code: '3/1',
    category: 'السلوك العام',
    violation: 'الاعتداء على أحد الرؤساء أو الزملاء أو الجمهور',
    article: 'المادة 80 - الفقرة 3/1',
    firstAction: 'فصل من الخدمة',
    secondAction: 'فصل من الخدمة',
    thirdAction: 'فصل من الخدمة',
    fourthAction: 'فصل من الخدمة',
    severity: 'critical',
    autoTrigger: false,
    description: 'أي نوع من الاعتداء الجسدي أو اللفظي على الرؤساء أو الزملاء أو العملاء'
  },
  {
    code: '3/2',
    category: 'السلوك العام',
    violation: 'إفشاء أسرار العمل',
    article: 'المادة 80 - الفقرة 3/2',
    firstAction: 'خصم راتب ثلاثة أيام',
    secondAction: 'فصل من الخدمة',
    thirdAction: 'فصل من الخدمة',
    fourthAction: 'فصل من الخدمة',
    severity: 'critical',
    autoTrigger: false,
    description: 'كشف أو نشر أسرار العمل أو المعلومات السرية للشركة'
  },
  {
    code: '3/3',
    category: 'السلوك العام',
    violation: 'ممارسة أنشطة سياسية داخل المنشأة',
    article: 'المادة 80 - الفقرة 3/3',
    firstAction: 'إنذار كتابي',
    secondAction: 'خصم راتب يوم واحد',
    thirdAction: 'خصم راتب ثلاثة أيام',
    fourthAction: 'فصل من الخدمة',
    severity: 'high',
    autoTrigger: false,
    description: 'القيام بأنشطة سياسية أو حزبية داخل مكان العمل'
  },
  {
    code: '3/4',
    category: 'السلوك العام',
    violation: 'تعاطي المسكرات أو المواد المخدرة',
    article: 'المادة 80 - الفقرة 3/4',
    firstAction: 'فصل من الخدمة',
    secondAction: 'فصل من الخدمة',
    thirdAction: 'فصل من الخدمة',
    fourthAction: 'فصل من الخدمة',
    severity: 'critical',
    autoTrigger: false,
    description: 'تعاطي أو حيازة أو تداول المسكرات أو المواد المخدرة في مكان العمل'
  },
  {
    code: '3/5',
    category: 'السلوك العام',
    violation: 'التدخين في أماكن محظورة',
    article: 'المادة 80 - الفقرة 3/5',
    firstAction: 'إنذار شفهي',
    secondAction: 'إنذار كتابي',
    thirdAction: 'خصم نصف يوم',
    fourthAction: 'خصم يوم كامل',
    severity: 'low',
    autoTrigger: false,
    description: 'التدخين في الأماكن المحظورة أو غير المخصصة للتدخين'
  }
];

interface DisciplinaryAction {
  id: string;
  case_number: string;
  employee_id: string;
  employee_name?: string;
  violation_code: string;
  violation_date: string;
  description: string;
  action_type: string;
  status: string;
  severity: string;
  penalty_amount?: number;
  suspension_days?: number;
  created_at: string;
  auto_generated: boolean;
  appeal_deadline?: string;
  can_appeal?: boolean;
}

interface AIInsight {
  type: 'risk' | 'pattern' | 'recommendation' | 'prediction';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  action_required: boolean;
  employee_id?: string;
  department?: string;
}

const ComprehensiveDisciplinarySystem = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [disciplinaryActions, setDisciplinaryActions] = useState<DisciplinaryAction[]>([]);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [autoDetectionEnabled, setAutoDetectionEnabled] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Mock data - would come from Supabase in real implementation
  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setDisciplinaryActions([
        {
          id: '1',
          case_number: 'DC-2024-0001',
          employee_id: 'EMP001',
          employee_name: 'أحمد محمد العلي',
          violation_code: '1/1',
          violation_date: '2024-01-15',
          description: 'تأخير متكرر عن موعد العمل - تم رصده تلقائياً',
          action_type: 'إنذار شفهي',
          status: 'active',
          severity: 'low',
          created_at: '2024-01-15T08:30:00',
          auto_generated: true,
          can_appeal: true,
          appeal_deadline: '2024-01-30'
        },
        {
          id: '2',
          case_number: 'DC-2024-0002', 
          employee_id: 'EMP045',
          employee_name: 'سارا أحمد الزهراني',
          violation_code: '1/6',
          violation_date: '2024-01-12',
          description: 'غياب بدون عذر مشروع - يوم واحد',
          action_type: 'إنذار كتابي',
          status: 'resolved',
          severity: 'high',
          created_at: '2024-01-12T16:00:00',
          auto_generated: true,
          can_appeal: false
        }
      ]);

      setAiInsights([
        {
          type: 'risk',
          title: 'تحذير: موظف عرضة للفصل',
          description: 'الموظف أحمد محمد العلي تجاوز حد الإنذارات المسموح. يُنصح بتدخل فوري.',
          priority: 'high',
          action_required: true,
          employee_id: 'EMP001'
        },
        {
          type: 'pattern',
          title: 'نمط مخالفات في قسم المبيعات',
          description: 'ارتفاع مخالفات التأخير في قسم المبيعات بنسبة 40% هذا الشهر',
          priority: 'medium',
          action_required: true,
          department: 'المبيعات'
        },
        {
          type: 'recommendation',
          title: 'توصية بدورة تدريبية',
          description: 'يُنصح بتنظيم دورة تدريبية حول أهمية الانضباط في العمل',
          priority: 'medium',
          action_required: false
        }
      ]);

      setIsLoading(false);
    }, 1000);
  }, []);

  const handleExportReport = async () => {
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text('Disciplinary Actions Report', 20, 30);
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString('ar-SA')}`, 20, 45);
      
      let yPos = 65;
      disciplinaryActions.forEach((action, index) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 30;
        }
        
        doc.text(`${index + 1}. Case: ${action.case_number}`, 20, yPos);
        doc.text(`Employee: ${action.employee_name}`, 30, yPos + 10);
        doc.text(`Violation: ${action.violation_code}`, 30, yPos + 20);
        doc.text(`Status: ${action.status}`, 30, yPos + 30);
        
        yPos += 50;
      });
      
      doc.save('disciplinary-actions-report.pdf');
      toast.success('تم تصدير التقرير بنجاح');
    } catch (error) {
      toast.error('حدث خطأ أثناء تصدير التقرير');
    }
  };

  const handleViolationAction = (action: string) => {
    switch (action) {
      case 'add-violation':
        toast.success('فتح نموذج إضافة مخالفة جديدة');
        break;
      case 'review-appeals':
        toast.success('مراجعة الاستئنافات المعلقة');
        break;
      case 'generate-warning':
        toast.success('إنتاج إنذار رسمي');
        break;
      default:
        toast.success(`تنفيذ إجراء: ${action}`);
    }
  };

  const handleAlertAction = (alertType: string) => {
    toast.success(`معالجة تنبيه: ${alertType}`);
  };

  const stats = {
    totalViolations: saudiLaborViolationsData.length,
    activeActions: disciplinaryActions.filter(a => a.status === 'active').length,
    resolvedActions: disciplinaryActions.filter(a => a.status === 'resolved').length,
    autoGenerated: disciplinaryActions.filter(a => a.auto_generated).length,
    employeesAtRisk: 3,
    pendingAppeals: 1
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800', 
      high: 'bg-red-100 text-red-800',
      critical: 'bg-red-600 text-white'
    };
    return colors[severity as keyof typeof colors] || colors.medium;
  };

  const getSeverityLabel = (severity: string) => {
    const labels = {
      low: 'منخفض',
      medium: 'متوسط',
      high: 'عالي', 
      critical: 'حرج'
    };
    return labels[severity as keyof typeof labels] || 'متوسط';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'border-l-green-500',
      medium: 'border-l-yellow-500',
      high: 'border-l-red-500',
      critical: 'border-l-red-700'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getInsightIcon = (type: string) => {
    const icons = {
      risk: <ShieldAlert className="h-5 w-5 text-red-600" />,
      pattern: <TrendingUp className="h-5 w-5 text-blue-600" />,
      recommendation: <Lightbulb className="h-5 w-5 text-yellow-600" />,
      prediction: <Brain className="h-5 w-5 text-purple-600" />
    };
    return icons[type as keyof typeof icons] || icons.recommendation;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mb-4"></div>
          <p className="text-lg font-medium">جاري تحميل نظام الجزاءات والعقوبات...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100"
         style={{
           backgroundImage: `url('/src/assets/boud-pattern-bg.jpg')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundBlendMode: 'overlay'
         }}
         dir="rtl">
      
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-glow p-8 mb-8 shadow-2xl mx-6">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={autoDetectionEnabled}
                  onCheckedChange={setAutoDetectionEnabled}
                  id="auto-detection"
                  className="bg-white/20"
                />
                <Label htmlFor="auto-detection" className="text-white">الرصد التلقائي</Label>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                <Search className="h-4 w-4 ml-2" />
                البحث المتقدم
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleExportReport()}
                className="bg-primary/80 border-primary/30 text-white hover:bg-primary/90 backdrop-blur-sm"
              >
                <Download className="h-4 w-4 ml-2" />
                تصدير التقرير
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                    <Plus className="h-4 w-4 ml-2" />
                    إجراء تأديبي جديد
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>إنشاء إجراء تأديبي جديد</DialogTitle>
                    <DialogDescription>
                      اختر المخالفة والموظف المعني وفقاً لنظام العمل السعودي
                    </DialogDescription>
                  </DialogHeader>
                  {/* Dialog content will be here */}
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <Gavel className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">
              نظام الجزاءات والإجراءات التأديبية المتطور
            </h1>
            <p className="text-white/90 text-lg max-w-2xl mx-auto">
              نظام شامل ومؤتمت وفقاً لنظام العمل السعودي مع ذكاء اصطناعي متقدم
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* AI Insights Alert */}
        {aiInsights.filter(i => i.action_required).length > 0 && (
          <Alert className="border-l-4 border-l-red-500 bg-red-50 mb-6">
            <Brain className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>يوجد {aiInsights.filter(i => i.action_required).length} تنبيهات ذكية تتطلب انتباهكم</span>
              <Button size="sm" variant="outline">عرض التنبيهات</Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Analytics Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">الإجراءات التأديبية</h3>
                    <Gavel className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">الإجراءات النشطة</span>
                      <span className="font-bold text-primary">{stats.activeActions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">الإجراءات المحلولة</span>
                      <span className="font-bold text-green-600">{stats.resolvedActions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">الرصد التلقائي</span>
                      <span className="font-bold text-blue-600">{stats.autoGenerated}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">التحليلات المتقدمة</h3>
                    <Brain className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">أنواع المخالفات</span>
                      <span className="font-bold text-green-600">{stats.totalViolations}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">موظفين معرضين للخطر</span>
                      <span className="font-bold text-red-600">{stats.employeesAtRisk}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">طعون معلقة</span>
                      <span className="font-bold text-orange-600">{stats.pendingAppeals}</span>
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
                <h3 className="font-semibold text-gray-800 mb-4">إحصائيات النظام</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{stats.totalViolations}</div>
                    <div className="text-sm text-gray-600">أنواع المخالفات</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{stats.resolvedActions}</div>
                    <div className="text-sm text-gray-600">إجراءات محلولة</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{stats.autoGenerated}</div>
                    <div className="text-sm text-gray-600">رصد تلقائي</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">منظومة الجزاءات والإجراءات التأديبية المتكاملة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { icon: Scale, label: "قاعدة المخالفات", color: "text-blue-600", count: stats.totalViolations },
                { icon: AlertTriangle, label: "الإجراءات النشطة", color: "text-orange-600", count: stats.activeActions },
                { icon: CheckCircle, label: "إجراءات محلولة", color: "text-green-600", count: stats.resolvedActions },
                { icon: Zap, label: "الرصد التلقائي", color: "text-purple-600", count: stats.autoGenerated },
                { icon: MessageSquare, label: "الطعون", color: "text-red-600", count: stats.pendingAppeals },
                { icon: Settings, label: "الإعدادات", color: "text-gray-600", count: 0 }
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
                <div className="text-2xl font-bold text-blue-600">{Math.round((stats.resolvedActions / (stats.activeActions + stats.resolvedActions)) * 100) || 0}%</div>
                <div className="text-sm text-gray-600">معدل حل الإجراءات</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{Math.round((stats.autoGenerated / (stats.activeActions + stats.resolvedActions)) * 100) || 0}%</div>
                <div className="text-sm text-gray-600">معدل الرصد التلقائي</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{stats.employeesAtRisk}</div>
                <div className="text-sm text-gray-600">موظفين معرضين للخطر</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={activeTab === 'dashboard' ? 'default' : 'outline'}
                onClick={() => setActiveTab('dashboard')}
                className={activeTab === 'dashboard' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <BarChart3 className="h-4 w-4 ml-2" />
                لوحة التحكم
              </Button>
              <Button
                variant={activeTab === 'violations' ? 'default' : 'outline'}
                onClick={() => setActiveTab('violations')}
                className={activeTab === 'violations' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <Scale className="h-4 w-4 ml-2" />
                قاعدة المخالفات
              </Button>
              <Button
                variant={activeTab === 'actions' ? 'default' : 'outline'}
                onClick={() => setActiveTab('actions')}
                className={activeTab === 'actions' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <AlertCircle className="h-4 w-4 ml-2" />
                الإجراءات النشطة
              </Button>
              <Button
                variant={activeTab === 'appeals' ? 'default' : 'outline'}
                onClick={() => setActiveTab('appeals')}
                className={activeTab === 'appeals' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <MessageSquare className="h-4 w-4 ml-2" />
                الطعون
              </Button>
              <Button
                variant={activeTab === 'reports' ? 'default' : 'outline'}
                onClick={() => setActiveTab('reports')}
                className={activeTab === 'reports' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <FileText className="h-4 w-4 ml-2" />
                التقارير
              </Button>
              <Button
                variant={activeTab === 'settings' ? 'default' : 'outline'}
                onClick={() => setActiveTab('settings')}
                className={activeTab === 'settings' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <Settings className="h-4 w-4 ml-2" />
                الإعدادات
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="container mx-auto px-6 py-8">
          {/* Main Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Insights Panel */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-6 w-6 text-purple-600" />
                      الذكاء الاصطناعي والتنبيهات الذكية
                    </CardTitle>
                    <CardDescription>
                      تحليلات ذكية وتوصيات لتحسين الانضباط في العمل
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {aiInsights.map((insight, index) => (
                      <div key={index} className={`p-4 border-l-4 ${getPriorityColor(insight.priority)} bg-gray-50 rounded-lg`}>
                        <div className="flex items-start gap-3">
                          {getInsightIcon(insight.type)}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold">{insight.title}</h4>
                              <Badge className={getSeverityColor(insight.priority)}>
                                {getSeverityLabel(insight.priority)}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                            {insight.action_required && (
                              <Button size="sm" variant="outline">اتخاذ إجراء</Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      الإجراءات الأخيرة
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {disciplinaryActions.slice(0, 5).map((action) => (
                      <div key={action.id} className="flex items-center gap-3 p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{action.employee_name}</p>
                          <p className="text-xs text-gray-500">{action.case_number}</p>
                        </div>
                        <Badge className={getSeverityColor(action.severity)}>
                          {getSeverityLabel(action.severity)}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

        {/* Violations Database Tab */}
        <TabsContent value="violations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-6 w-6" />
                قاعدة بيانات المخالفات - نظام العمل السعودي
                <Badge className="bg-green-100 text-green-800">المادة 80</Badge>
              </CardTitle>
              <CardDescription>
                جدول المخالفات والجزاءات الرسمي وفقاً للائحة تنفيذ نظام العمل السعودي
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Search and Filter */}
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="البحث في المخالفات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الفئات</SelectItem>
                    <SelectItem value="الحضور والانصراف">الحضور والانصراف</SelectItem>
                    <SelectItem value="تنظيم العمل">تنظيم العمل</SelectItem>
                    <SelectItem value="السلوك العام">السلوك العام</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Violations List */}
              <div className="space-y-4">
                {saudiLaborViolationsData
                  .filter(v => selectedCategory === 'all' || v.category === selectedCategory)
                  .filter(v => v.violation.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((violation) => (
                    <Card key={violation.code} className="hover:shadow-md transition-all">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Badge variant="outline" className="font-mono">{violation.code}</Badge>
                            <Badge className={getSeverityColor(violation.severity)}>
                              {getSeverityLabel(violation.severity)}
                            </Badge>
                            <Badge variant="secondary">{violation.category}</Badge>
                            {violation.autoTrigger && (
                              <Badge className="bg-purple-100 text-purple-800">
                                <Zap className="h-3 w-3 ml-1" />
                                رصد تلقائي
                              </Badge>
                            )}
                          </div>
                          <Button variant="outline" size="sm">
                            <Plus className="h-4 w-4 ml-2" />
                            استخدام
                          </Button>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-2">{violation.violation}</h3>
                        <p className="text-sm text-gray-600 mb-3">{violation.description}</p>
                        <p className="text-xs text-blue-600 mb-4">{violation.article}</p>
                        
                        {/* Escalation Steps */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                          <div className="p-2 bg-green-50 rounded border-r-2 border-green-500">
                            <span className="font-medium text-green-700">الإجراء الأول:</span>
                            <p className="text-green-600">{violation.firstAction}</p>
                          </div>
                          <div className="p-2 bg-yellow-50 rounded border-r-2 border-yellow-500">
                            <span className="font-medium text-yellow-700">الإجراء الثاني:</span>
                            <p className="text-yellow-600">{violation.secondAction}</p>
                          </div>
                          <div className="p-2 bg-orange-50 rounded border-r-2 border-orange-500">
                            <span className="font-medium text-orange-700">الإجراء الثالث:</span>
                            <p className="text-orange-600">{violation.thirdAction}</p>
                          </div>
                          <div className="p-2 bg-red-50 rounded border-r-2 border-red-500">
                            <span className="font-medium text-red-700">الإجراء النهائي:</span>
                            <p className="text-red-600">{violation.fourthAction}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Active Actions Tab */}
        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-6 w-6" />
                الإجراءات التأديبية النشطة
              </CardTitle>
              <CardDescription>
                متابعة وإدارة جميع الإجراءات التأديبية الجارية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {disciplinaryActions.map((action) => (
                  <Card key={action.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            action.auto_generated ? 'bg-purple-100' : 'bg-red-100'
                          }`}>
                            {action.auto_generated ? 
                              <Zap className="h-6 w-6 text-purple-600" /> :
                              <Gavel className="h-6 w-6 text-red-600" />
                            }
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{action.employee_name}</h3>
                            <p className="text-sm text-gray-600">
                              {action.case_number} • كود المخالفة: {action.violation_code}
                            </p>
                            <p className="text-sm text-gray-500">
                              {format(new Date(action.violation_date), 'dd MMMM yyyy', { locale: ar })}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <Badge className={getSeverityColor(action.severity)}>
                            {getSeverityLabel(action.severity)}
                          </Badge>
                          {action.auto_generated && (
                            <Badge className="bg-purple-100 text-purple-800">
                              <Zap className="h-3 w-3 ml-1" />
                              تلقائي
                            </Badge>
                          )}
                          <Badge variant={action.status === 'active' ? 'destructive' : 'secondary'}>
                            {action.status === 'active' ? 'نشط' : 'محلول'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-600 mb-1">نوع الإجراء</h4>
                          <p className="text-sm font-medium">{action.action_type}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-sm text-gray-600 mb-1">الوصف</h4>
                          <p className="text-sm">{action.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 ml-2" />
                          عرض التفاصيل
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 ml-2" />
                          طباعة الإجراء
                        </Button>
                        {action.can_appeal && (
                          <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
                            <MessageSquare className="h-4 w-4 ml-2" />
                            إدارة الطعن
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Bell className="h-4 w-4 ml-2" />
                          إرسال إشعار
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appeals Tab */}
        <TabsContent value="appeals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                إدارة الطعون والاعتراضات
              </CardTitle>
              <CardDescription>
                معالجة طعون الموظفين على الإجراءات التأديبية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileCheck className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">لا توجد طعون معلقة حالياً</h3>
                <p>سيتم عرض الطعون والاعتراضات المقدمة من الموظفين هنا</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-6 w-6" />
                التقارير والإحصائيات
              </CardTitle>
              <CardDescription>
                تقارير شاملة عن الإجراءات التأديبية والاتجاهات
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <FileText className="h-8 w-8" />
                  <span className="font-medium">تقرير شهري</span>
                  <span className="text-xs text-gray-500">إحصائيات الشهر الحالي</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <BarChart3 className="h-8 w-8" />
                  <span className="font-medium">تحليل الاتجاهات</span>
                  <span className="text-xs text-gray-500">أنماط المخالفات</span>
                </Button>
                <Button variant="outline" className="h-24 flex-col gap-2">
                  <Users className="h-8 w-8" />
                  <span className="font-medium">تقرير الموظفين</span>
                  <span className="text-xs text-gray-500">السجل الشخصي</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-6 w-6" />
                إعدادات النظام
              </CardTitle>
              <CardDescription>
                تخصيص إعدادات النظام والتنبيهات
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-detection-settings">تفعيل الرصد التلقائي للمخالفات</Label>
                    <p className="text-sm text-gray-500">رصد تلقائي لمخالفات الحضور والانصراف</p>
                  </div>
                  <Switch id="auto-detection-settings" checked={autoDetectionEnabled} />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="ai-insights">تفعيل التنبيهات الذكية</Label>
                    <p className="text-sm text-gray-500">تحليل ذكي وتوصيات لتحسين الانضباط</p>
                  </div>
                  <Switch id="ai-insights" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">إشعارات البريد الإلكتروني</Label>
                    <p className="text-sm text-gray-500">إرسال إشعارات للموظفين والمدراء</p>
                  </div>
                  <Switch id="email-notifications" defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveDisciplinarySystem;