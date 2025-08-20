import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { 
  Network, 
  Users, 
  Target, 
  TrendingUp, 
  Bot, 
  BarChart3, 
  Eye, 
  Edit, 
  Trash2, 
  Plus, 
  Save, 
  Download, 
  Upload, 
  RefreshCw,
  Building2,
  Workflow,
  GitBranch,
  Zap,
  CalendarIcon,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  FileText,
  Settings,
  ArrowRight,
  ArrowDown,
  Expand,
  Shrink,
  Move,
  Copy,
  History,
  Search,
  Filter,
  PieChart,
  BarChart,
  LineChart,
  Activity,
  Award,
  Star,
  Link,
  MessageSquare,
  X,
  PlayCircle,
  PauseCircle,
  UserCheck,
  ShieldCheck,
  DollarSign
} from 'lucide-react';
import { toast } from 'sonner';

interface OrganizationalDevelopmentProps {
  onBack: () => void;
}

interface OrganizationalUnit {
  id: string;
  name: string;
  level: number;
  parentId: string | null;
  managerId: string | null;
  managerName: string;
  employeeCount: number;
  type: 'department' | 'section' | 'unit' | 'team';
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
  kpis: string[];
  children: OrganizationalUnit[];
  position: { x: number; y: number };
  status: 'active' | 'proposed' | 'inactive';
  createdAt: string;
  lastModified: string;
  budget?: number;
  efficiency?: number;
}

interface GapAnalysis {
  id: string;
  unitId: string;
  gapType: 'skill' | 'resource' | 'position' | 'process';
  description: string;
  currentState: string;
  idealState: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  recommendations: string[];
  estimatedCost: number;
  timeToResolve: string;
  status: 'identified' | 'in_progress' | 'resolved';
  identifiedBy: string;
  createdAt: string;
}

interface AIRecommendation {
  id: string;
  type: 'restructure' | 'optimize' | 'merge' | 'split' | 'eliminate';
  title: string;
  description: string;
  targetUnits: string[];
  expectedBenefit: string;
  implementationComplexity: 'low' | 'medium' | 'high';
  costSavings: number;
  timeline: string;
  risks: string[];
  confidence: number;
  createdAt: string;
  status: 'pending' | 'accepted' | 'rejected';
}

interface ProcessFlow {
  id: string;
  name: string;
  description: string;
  steps: ProcessStep[];
  involvedUnits: string[];
  duration: string;
  frequency: string;
  status: 'active' | 'draft' | 'inactive';
}

interface ProcessStep {
  id: string;
  name: string;
  description: string;
  responsibleUnit: string;
  estimatedTime: string;
  requiredApprovals: string[];
}

export const OrganizationalDevelopment: React.FC<OrganizationalDevelopmentProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [dragMode, setDragMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);
  const [isEditUnitOpen, setIsEditUnitOpen] = useState(false);
  const [isAddGapOpen, setIsAddGapOpen] = useState(false);
  const [selectedGap, setSelectedGap] = useState<GapAnalysis | null>(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState<AIRecommendation | null>(null);
  const [isProcessFlowOpen, setIsProcessFlowOpen] = useState(false);
  const [reviewDate, setReviewDate] = useState<Date>();

  // Form states
  const [newUnit, setNewUnit] = useState({
    name: '',
    type: 'unit' as const,
    parentId: '',
    managerId: '',
    managerName: '',
    description: '',
    responsibilities: '',
    requiredSkills: '',
    kpis: ''
  });

  const [newGap, setNewGap] = useState({
    unitId: '',
    gapType: 'skill' as const,
    description: '',
    currentState: '',
    idealState: '',
    priority: 'medium' as const,
    impact: '',
    recommendations: '',
    estimatedCost: 0,
    timeToResolve: ''
  });

  // Enhanced organizational structure data
  const [organizationalUnits, setOrganizationalUnits] = useState<OrganizationalUnit[]>([
    {
      id: 'CEO',
      name: 'الرئيس التنفيذي',
      level: 1,
      parentId: null,
      managerId: 'user1',
      managerName: 'محمد السالم',
      employeeCount: 1,
      type: 'department',
      description: 'القيادة العليا والإشراف الاستراتيجي على جميع العمليات',
      responsibilities: ['وضع الاستراتيجية العامة', 'اتخاذ القرارات الاستراتيجية', 'قيادة الشركة', 'إدارة المخاطر'],
      requiredSkills: ['القيادة الاستراتيجية', 'التخطيط طويل المدى', 'اتخاذ القرارات', 'إدارة الأزمات'],
      kpis: ['العائد على الاستثمار', 'نمو الإيرادات', 'رضا الموظفين', 'الحصة السوقية'],
      children: [],
      position: { x: 400, y: 50 },
      status: 'active',
      createdAt: '2023-01-01',
      lastModified: '2024-03-15',
      budget: 5000000,
      efficiency: 95
    },
    {
      id: 'IT_DEPT',
      name: 'إدارة تقنية المعلومات',
      level: 2,
      parentId: 'CEO',
      managerId: 'user2',
      managerName: 'أحمد التقني',
      employeeCount: 15,
      type: 'department',
      description: 'تطوير وصيانة الأنظمة التقنية والبنية التحتية',
      responsibilities: ['تطوير الأنظمة', 'الدعم التقني', 'أمن المعلومات', 'إدارة قواعد البيانات'],
      requiredSkills: ['البرمجة', 'إدارة الأنظمة', 'أمن المعلومات', 'إدارة المشاريع التقنية'],
      kpis: ['وقت التشغيل 99.9%', 'رضا المستخدمين', 'سرعة الاستجابة', 'أمان النظام'],
      children: [],
      position: { x: 150, y: 180 },
      status: 'active',
      createdAt: '2023-01-01',
      lastModified: '2024-03-10',
      budget: 1200000,
      efficiency: 88
    },
    {
      id: 'DEV_TEAM',
      name: 'فريق التطوير',
      level: 3,
      parentId: 'IT_DEPT',
      managerId: 'user5',
      managerName: 'سارة المطورة',
      employeeCount: 8,
      type: 'team',
      description: 'تطوير التطبيقات والمواقع الإلكترونية',
      responsibilities: ['برمجة التطبيقات', 'تطوير المواقع', 'اختبار البرمجيات', 'صيانة الكود'],
      requiredSkills: ['React', 'Node.js', 'Python', 'SQL', 'Git'],
      kpis: ['سرعة التطوير', 'جودة الكود', 'عدد الأخطاء', 'رضا العملاء'],
      children: [],
      position: { x: 50, y: 320 },
      status: 'active',
      createdAt: '2023-02-01',
      lastModified: '2024-03-05',
      budget: 480000,
      efficiency: 92
    },
    {
      id: 'SUPPORT_TEAM',
      name: 'فريق الدعم التقني',
      level: 3,
      parentId: 'IT_DEPT',
      managerId: 'user6',
      managerName: 'خالد المساعد',
      employeeCount: 7,
      type: 'team',
      description: 'تقديم الدعم التقني للمستخدمين وحل المشاكل',
      responsibilities: ['دعم المستخدمين', 'حل المشاكل التقنية', 'صيانة الأجهزة', 'التدريب التقني'],
      requiredSkills: ['حل المشاكل', 'التواصل', 'المعرفة التقنية', 'الصبر'],
      kpis: ['وقت الاستجابة', 'معدل حل المشاكل', 'رضا المستخدمين', 'عدد التذاكر المغلقة'],
      children: [],
      position: { x: 250, y: 320 },
      status: 'active',
      createdAt: '2023-02-01',
      lastModified: '2024-03-08',
      budget: 350000,
      efficiency: 85
    },
    {
      id: 'HR_DEPT',
      name: 'إدارة الموارد البشرية',
      level: 2,
      parentId: 'CEO',
      managerId: 'user3',
      managerName: 'فاطمة الإنسان',
      employeeCount: 8,
      type: 'department',
      description: 'إدارة شؤون الموظفين والتطوير المؤسسي',
      responsibilities: ['التوظيف', 'التدريب', 'تقييم الأداء', 'الرواتب', 'التطوير المؤسسي'],
      requiredSkills: ['إدارة الموارد البشرية', 'التواصل', 'التحليل', 'علم النفس التنظيمي'],
      kpis: ['معدل الاحتفاظ بالموظفين', 'وقت التوظيف', 'رضا الموظفين', 'كفاءة التدريب'],
      children: [],
      position: { x: 550, y: 180 },
      status: 'active',
      createdAt: '2023-01-01',
      lastModified: '2024-03-12',
      budget: 800000,
      efficiency: 91
    },
    {
      id: 'RECRUITMENT_UNIT',
      name: 'وحدة التوظيف',
      level: 3,
      parentId: 'HR_DEPT',
      managerId: 'user7',
      managerName: 'نورا الموظفة',
      employeeCount: 3,
      type: 'unit',
      description: 'البحث عن المواهب وإجراء المقابلات',
      responsibilities: ['نشر الوظائف', 'فحص السير الذاتية', 'إجراء المقابلات', 'التحقق من المراجع'],
      requiredSkills: ['التقييم', 'المقابلات', 'تحليل المهارات', 'التسويق للوظائف'],
      kpis: ['وقت التوظيف', 'جودة التوظيف', 'تكلفة التوظيف', 'معدل نجاح المرشحين'],
      children: [],
      position: { x: 450, y: 320 },
      status: 'active',
      createdAt: '2023-02-15',
      lastModified: '2024-03-01',
      budget: 180000,
      efficiency: 89
    },
    {
      id: 'TRAINING_UNIT',
      name: 'وحدة التدريب والتطوير',
      level: 3,
      parentId: 'HR_DEPT',
      managerId: 'user8',
      managerName: 'محمد المدرب',
      employeeCount: 5,
      type: 'unit',
      description: 'تصميم وتنفيذ البرامج التدريبية',
      responsibilities: ['تحديد الاحتياجات التدريبية', 'تصميم البرامج', 'تنفيذ التدريب', 'تقييم الأثر'],
      requiredSkills: ['التدريب', 'تصميم المناهج', 'العرض والتقديم', 'تقييم الأداء'],
      kpis: ['فعالية التدريب', 'رضا المتدربين', 'تطبيق المهارات', 'عائد الاستثمار التدريبي'],
      children: [],
      position: { x: 650, y: 320 },
      status: 'active',
      createdAt: '2023-02-15',
      lastModified: '2024-02-28',
      budget: 320000,
      efficiency: 93
    },
    {
      id: 'FINANCE_DEPT',
      name: 'الإدارة المالية',
      level: 2,
      parentId: 'CEO',
      managerId: 'user4',
      managerName: 'عبدالله المالي',
      employeeCount: 12,
      type: 'department',
      description: 'إدارة الشؤون المالية والمحاسبية للشركة',
      responsibilities: ['المحاسبة', 'التدقيق', 'التخطيط المالي', 'التقارير المالية', 'إدارة الميزانية'],
      requiredSkills: ['المحاسبة', 'التحليل المالي', 'التدقيق', 'إعداد التقارير', 'إدارة المخاطر المالية'],
      kpis: ['دقة التقارير المالية', 'وقت إغلاق الحسابات', 'التدفق النقدي', 'الامتثال للمعايير'],
      children: [],
      position: { x: 750, y: 180 },
      status: 'active',
      createdAt: '2023-01-01',
      lastModified: '2024-03-08',
      budget: 960000,
      efficiency: 87
    },
    {
      id: 'SALES_DEPT',
      name: 'إدارة المبيعات',
      level: 2,
      parentId: 'CEO',
      managerId: 'user9',
      managerName: 'عائشة البائعة',
      employeeCount: 10,
      type: 'department',
      description: 'تطوير المبيعات وإدارة علاقات العملاء',
      responsibilities: ['تطوير المبيعات', 'إدارة العملاء', 'تحليل السوق', 'وضع استراتيجيات البيع'],
      requiredSkills: ['البيع', 'التفاوض', 'إدارة العلاقات', 'تحليل السوق', 'التواصل'],
      kpis: ['حجم المبيعات', 'معدل التحويل', 'رضا العملاء', 'نمو قاعدة العملاء'],
      children: [],
      position: { x: 950, y: 180 },
      status: 'active',
      createdAt: '2023-01-01',
      lastModified: '2024-03-20',
      budget: 1400000,
      efficiency: 94
    }
  ]);

  // Enhanced gap analysis data
  const [gapAnalysis, setGapAnalysis] = useState<GapAnalysis[]>([
    {
      id: 'GAP001',
      unitId: 'IT_DEPT',
      gapType: 'skill',
      description: 'نقص في مهارات الذكاء الاصطناعي والتعلم الآلي',
      currentState: '15% من فريق تقنية المعلومات لديه خبرة أساسية في الذكاء الاصطناعي',
      idealState: '60% من الفريق يجب أن يكون لديه خبرة متقدمة في الذكاء الاصطناعي والتعلم الآلي',
      priority: 'high',
      impact: 'تأخير في تطوير المنتجات الذكية وفقدان الميزة التنافسية',
      recommendations: ['تدريب الفريق الحالي على تقنيات الذكاء الاصطناعي', 'توظيف مطورين متخصصين في الذكاء الاصطناعي', 'الشراكة مع مؤسسات تعليمية متخصصة'],
      estimatedCost: 150000,
      timeToResolve: '6 أشهر',
      status: 'identified',
      identifiedBy: 'أحمد التقني',
      createdAt: '2024-03-01'
    },
    {
      id: 'GAP002',
      unitId: 'HR_DEPT',
      gapType: 'resource',
      description: 'نقص في أدوات إدارة المواهب والموارد البشرية',
      currentState: 'استخدام أدوات تقليدية وعمليات يدوية في 70% من المهام',
      idealState: 'نظام متكامل لإدارة المواهب والأداء مع أتمتة 90% من العمليات',
      priority: 'medium',
      impact: 'انخفاض كفاءة العمليات بنسبة 35% وتأخير في اتخاذ القرارات',
      recommendations: ['شراء نظام إدارة المواهب المتكامل', 'تدريب الفريق على الأدوات الجديدة', 'تطوير العمليات والإجراءات'],
      estimatedCost: 80000,
      timeToResolve: '4 أشهر',
      status: 'in_progress',
      identifiedBy: 'فاطمة الإنسان',
      createdAt: '2024-02-15'
    },
    {
      id: 'GAP003',
      unitId: 'SALES_DEPT',
      gapType: 'position',
      description: 'الحاجة لمتخصص في التسويق الرقمي',
      currentState: 'لا يوجد متخصص في التسويق الرقمي في فريق المبيعات',
      idealState: 'وجود متخصص أو فريق للتسويق الرقمي لدعم المبيعات',
      priority: 'high',
      impact: 'فقدان فرص مبيعات كثيرة عبر القنوات الرقمية',
      recommendations: ['توظيف متخصص تسويق رقمي', 'تدريب أحد أعضاء الفريق الحالي', 'الاستعانة بشركة تسويق خارجية'],
      estimatedCost: 120000,
      timeToResolve: '3 أشهر',
      status: 'identified',
      identifiedBy: 'عائشة البائعة',
      createdAt: '2024-03-10'
    },
    {
      id: 'GAP004',
      unitId: 'FINANCE_DEPT',
      gapType: 'process',
      description: 'عمليات الموافقة المالية بطيئة ومعقدة',
      currentState: 'تستغرق عملية الموافقة على المصروفات 5-7 أيام عمل',
      idealState: 'تقليل وقت الموافقة إلى 24-48 ساعة من خلال الأتمتة',
      priority: 'medium',
      impact: 'تأخير في العمليات التشغيلية وانخفاض في الكفاءة',
      recommendations: ['تطوير نظام موافقات رقمي', 'تبسيط الإجراءات', 'تفويض صلاحيات أكبر للمديرين'],
      estimatedCost: 45000,
      timeToResolve: '2 أشهر',
      status: 'identified',
      identifiedBy: 'عبدالله المالي',
      createdAt: '2024-03-05'
    }
  ]);

  // Enhanced AI recommendations
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([
    {
      id: 'AI001',
      type: 'optimize',
      title: 'دمج فريق الدعم التقني مع فريق التطوير لتحسين الكفاءة',
      description: 'تحليل البيانات يظهر أن 40% من مشاكل الدعم التقني مرتبطة مباشرة بأخطاء التطوير، ودمج الفريقين سيحسن التواصل ويقلل وقت الحل',
      targetUnits: ['DEV_TEAM', 'SUPPORT_TEAM'],
      expectedBenefit: 'تحسين وقت الاستجابة بنسبة 35% وتقليل التكاليف التشغيلية بنسبة 20%',
      implementationComplexity: 'medium',
      costSavings: 200000,
      timeline: '3 أشهر',
      risks: ['مقاومة التغيير من الموظفين', 'الحاجة لإعادة تدريب شاملة', 'تعقيد مؤقت في العمليات'],
      confidence: 85,
      createdAt: '2024-03-15',
      status: 'pending'
    },
    {
      id: 'AI002',
      type: 'restructure',
      title: 'إنشاء مركز خدمات مشتركة للعمليات الإدارية والمالية',
      description: 'تحليل النشاطات يظهر تكرار في المهام الإدارية والمالية بين الأقسام، وإنشاء مركز مشترك سيحسن الكفاءة',
      targetUnits: ['FINANCE_DEPT', 'HR_DEPT'],
      expectedBenefit: 'توحيد العمليات وتحسين الكفاءة بنسبة 40% مع ضمان الامتثال للمعايير',
      implementationComplexity: 'high',
      costSavings: 300000,
      timeline: '6 أشهر',
      risks: ['تعقيد عالي في التنفيذ', 'تأثير مؤقت على العمليات الحالية', 'الحاجة لإعادة تصميم العمليات'],
      confidence: 72,
      createdAt: '2024-03-12',
      status: 'pending'
    },
    {
      id: 'AI003',
      type: 'split',
      title: 'تقسيم فريق المبيعات حسب القطاعات',
      description: 'البيانات تظهر أن تخصص الفرق حسب القطاعات يحسن الأداء بنسبة 45%',
      targetUnits: ['SALES_DEPT'],
      expectedBenefit: 'زيادة المبيعات بنسبة 25% وتحسين رضا العملاء',
      implementationComplexity: 'low',
      costSavings: 150000,
      timeline: '2 أشهر',
      risks: ['تحدي في توزيع العملاء الحاليين', 'الحاجة لتدريب إضافي'],
      confidence: 91,
      createdAt: '2024-03-18',
      status: 'pending'
    }
  ]);

  // Process flows data
  const [processFlows, setProcessFlows] = useState<ProcessFlow[]>([
    {
      id: 'PROCESS001',
      name: 'عملية التوظيف الشاملة',
      description: 'العملية الكاملة لتوظيف موظف جديد من البداية حتى النهاية',
      steps: [
        {
          id: 'STEP001',
          name: 'تحديد الاحتياج',
          description: 'تحديد الوظيفة المطلوبة والمواصفات',
          responsibleUnit: 'HR_DEPT',
          estimatedTime: '2 أيام',
          requiredApprovals: ['مدير القسم المطلوب']
        },
        {
          id: 'STEP002',
          name: 'نشر الوظيفة',
          description: 'نشر الوظيفة على المنصات المختلفة',
          responsibleUnit: 'RECRUITMENT_UNIT',
          estimatedTime: '1 يوم',
          requiredApprovals: ['مدير الموارد البشرية']
        },
        {
          id: 'STEP003',
          name: 'فحص السير الذاتية',
          description: 'مراجعة وفحص السير الذاتية المقدمة',
          responsibleUnit: 'RECRUITMENT_UNIT',
          estimatedTime: '3 أيام',
          requiredApprovals: []
        }
      ],
      involvedUnits: ['HR_DEPT', 'RECRUITMENT_UNIT'],
      duration: '3 أسابيع',
      frequency: 'حسب الحاجة',
      status: 'active'
    }
  ]);

  // Statistics calculation
  const stats = {
    totalUnits: organizationalUnits.length,
    totalEmployees: organizationalUnits.reduce((sum, unit) => sum + unit.employeeCount, 0),
    identifiedGaps: gapAnalysis.length,
    aiRecommendations: aiRecommendations.length,
    avgEmployeesPerUnit: Math.round(organizationalUnits.reduce((sum, unit) => sum + unit.employeeCount, 0) / organizationalUnits.length),
    structureEfficiency: Math.round(organizationalUnits.reduce((sum, unit) => sum + (unit.efficiency || 90), 0) / organizationalUnits.length),
    lastReviewDate: '2024-01-15',
    nextReviewDate: '2024-12-31',
    totalBudget: organizationalUnits.reduce((sum, unit) => sum + (unit.budget || 0), 0),
    activeUnits: organizationalUnits.filter(unit => unit.status === 'active').length,
    pendingRecommendations: aiRecommendations.filter(rec => rec.status === 'pending').length
  };

  // Handler functions
  const handleAddUnit = () => {
    const unit: OrganizationalUnit = {
      id: `UNIT_${Date.now()}`,
      name: newUnit.name,
      level: newUnit.parentId ? (organizationalUnits.find(u => u.id === newUnit.parentId)?.level || 1) + 1 : 1,
      parentId: newUnit.parentId || null,
      managerId: newUnit.managerId,
      managerName: newUnit.managerName,
      employeeCount: 0,
      type: newUnit.type,
      description: newUnit.description,
      responsibilities: newUnit.responsibilities.split(',').map(r => r.trim()),
      requiredSkills: newUnit.requiredSkills.split(',').map(s => s.trim()),
      kpis: newUnit.kpis.split(',').map(k => k.trim()),
      children: [],
      position: { x: 400, y: 300 },
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      budget: 0,
      efficiency: 85
    };

    setOrganizationalUnits([...organizationalUnits, unit]);
    setIsAddUnitOpen(false);
    setNewUnit({
      name: '',
      type: 'unit',
      parentId: '',
      managerId: '',
      managerName: '',
      description: '',
      responsibilities: '',
      requiredSkills: '',
      kpis: ''
    });
    toast.success('تم إضافة الوحدة التنظيمية بنجاح');
  };

  const handleAddGap = () => {
    const gap: GapAnalysis = {
      id: `GAP_${Date.now()}`,
      unitId: newGap.unitId,
      gapType: newGap.gapType,
      description: newGap.description,
      currentState: newGap.currentState,
      idealState: newGap.idealState,
      priority: newGap.priority,
      impact: newGap.impact,
      recommendations: newGap.recommendations.split(',').map(r => r.trim()),
      estimatedCost: newGap.estimatedCost,
      timeToResolve: newGap.timeToResolve,
      status: 'identified',
      identifiedBy: 'المستخدم الحالي',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setGapAnalysis([...gapAnalysis, gap]);
    setIsAddGapOpen(false);
    setNewGap({
      unitId: '',
      gapType: 'skill',
      description: '',
      currentState: '',
      idealState: '',
      priority: 'medium',
      impact: '',
      recommendations: '',
      estimatedCost: 0,
      timeToResolve: ''
    });
    toast.success('تم إضافة تحليل الفجوة بنجاح');
  };

  const handleDeleteUnit = (unitId: string) => {
    setOrganizationalUnits(organizationalUnits.filter(unit => unit.id !== unitId));
    toast.success('تم حذف الوحدة التنظيمية بنجاح');
  };

  const handleAcceptRecommendation = (recommendationId: string) => {
    setAiRecommendations(recommendations => 
      recommendations.map(rec => 
        rec.id === recommendationId 
          ? { ...rec, status: 'accepted' as const }
          : rec
      )
    );
    toast.success('تم قبول التوصية بنجاح');
  };

  const handleRejectRecommendation = (recommendationId: string) => {
    setAiRecommendations(recommendations => 
      recommendations.map(rec => 
        rec.id === recommendationId 
          ? { ...rec, status: 'rejected' as const }
          : rec
      )
    );
    toast.success('تم رفض التوصية');
  };

  const exportToPDF = () => {
    toast.success('سيتم تصدير التقرير إلى PDF قريباً');
  };

  const scheduleReview = () => {
    if (reviewDate) {
      toast.success(`تم جدولة المراجعة لتاريخ ${format(reviewDate, 'yyyy-MM-dd')}`);
    } else {
      toast.error('يرجى اختيار تاريخ المراجعة');
    }
  };

  const renderOrganizationalChart = () => {
    const unitLevels = organizationalUnits.reduce((acc, unit) => {
      if (!acc[unit.level]) acc[unit.level] = [];
      acc[unit.level].push(unit);
      return acc;
    }, {} as Record<number, OrganizationalUnit[]>);

    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-[#009F87]/20 shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-[#009F87]">الهيكل التنظيمي التفاعلي</h3>
            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDragMode(!dragMode)}
                className={`transition-all ${dragMode ? 'bg-[#009F87] text-white border-[#009F87]' : 'hover:bg-[#009F87] hover:text-white'}`}
              >
                <Move className="h-4 w-4 ml-2" />
                {dragMode ? 'إيقاف التحرير' : 'تفعيل التحرير'}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={exportToPDF}
                className="hover:bg-[#009F87] hover:text-white"
              >
                <Download className="h-4 w-4 ml-2" />
                تصدير PDF
              </Button>
              <Dialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-[#009F87] hover:bg-[#008072]">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة وحدة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>إضافة وحدة تنظيمية جديدة</DialogTitle>
                    <DialogDescription>
                      قم بتعبئة المعلومات المطلوبة لإنشاء وحدة تنظيمية جديدة
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="unit-name">اسم الوحدة</Label>
                        <Input
                          id="unit-name"
                          value={newUnit.name}
                          onChange={(e) => setNewUnit({...newUnit, name: e.target.value})}
                          placeholder="مثال: إدارة التسويق"
                        />
                      </div>
                      <div>
                        <Label htmlFor="unit-type">نوع الوحدة</Label>
                        <Select value={newUnit.type} onValueChange={(value: any) => setNewUnit({...newUnit, type: value})}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="department">إدارة</SelectItem>
                            <SelectItem value="section">قسم</SelectItem>
                            <SelectItem value="unit">وحدة</SelectItem>
                            <SelectItem value="team">فريق</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="parent-unit">الوحدة الرئيسية</Label>
                        <Select value={newUnit.parentId} onValueChange={(value) => setNewUnit({...newUnit, parentId: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الوحدة الرئيسية" />
                          </SelectTrigger>
                          <SelectContent>
                            {organizationalUnits.map(unit => (
                              <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="manager-name">اسم المدير</Label>
                        <Input
                          id="manager-name"
                          value={newUnit.managerName}
                          onChange={(e) => setNewUnit({...newUnit, managerName: e.target.value})}
                          placeholder="اسم مدير الوحدة"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">الوصف</Label>
                      <Textarea
                        id="description"
                        value={newUnit.description}
                        onChange={(e) => setNewUnit({...newUnit, description: e.target.value})}
                        placeholder="وصف مختصر لدور ومسؤوليات الوحدة"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="responsibilities">المسؤوليات (مفصولة بفاصلة)</Label>
                      <Textarea
                        id="responsibilities"
                        value={newUnit.responsibilities}
                        onChange={(e) => setNewUnit({...newUnit, responsibilities: e.target.value})}
                        placeholder="مسؤولية 1, مسؤولية 2, مسؤولية 3"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="skills">المهارات المطلوبة</Label>
                        <Textarea
                          id="skills"
                          value={newUnit.requiredSkills}
                          onChange={(e) => setNewUnit({...newUnit, requiredSkills: e.target.value})}
                          placeholder="مهارة 1, مهارة 2, مهارة 3"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label htmlFor="kpis">مؤشرات الأداء</Label>
                        <Textarea
                          id="kpis"
                          value={newUnit.kpis}
                          onChange={(e) => setNewUnit({...newUnit, kpis: e.target.value})}
                          placeholder="مؤشر 1, مؤشر 2, مؤشر 3"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={() => setIsAddUnitOpen(false)}>
                      إلغاء
                    </Button>
                    <Button onClick={handleAddUnit} className="bg-[#009F87]">
                      <Save className="h-4 w-4 ml-2" />
                      حفظ الوحدة
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="min-h-[600px] relative overflow-auto bg-gradient-to-br from-gray-50 to-white rounded-lg border p-4">
            <div className="space-y-12">
              {Object.keys(unitLevels).sort((a, b) => parseInt(a) - parseInt(b)).map(level => (
                <div key={level} className="flex flex-wrap gap-6 justify-center">
                  {unitLevels[parseInt(level)].map(unit => (
                    <Card 
                      key={unit.id}
                      className={`w-80 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                        selectedUnit === unit.id ? 'ring-2 ring-[#009F87] shadow-lg scale-105' : 'hover:scale-102'
                      } ${
                        dragMode ? 'cursor-move border-dashed' : 'cursor-pointer'
                      } bg-white/90 backdrop-blur border-l-4 ${
                        unit.type === 'department' ? 'border-l-[#009F87]' :
                        unit.type === 'section' ? 'border-l-blue-500' :
                        unit.type === 'unit' ? 'border-l-orange-500' : 'border-l-purple-500'
                      }`}
                      onClick={() => setSelectedUnit(selectedUnit === unit.id ? null : unit.id)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg font-bold text-gray-800 mb-1">
                              {unit.name}
                            </CardTitle>
                            <CardDescription className="text-sm text-gray-600 flex items-center gap-2">
                              <UserCheck className="h-4 w-4" />
                              {unit.managerName}
                            </CardDescription>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <Badge 
                              variant={unit.status === 'active' ? 'default' : 'secondary'}
                              className={`text-xs ${
                                unit.status === 'active' ? 'bg-green-100 text-green-800' : 
                                unit.status === 'proposed' ? 'bg-yellow-100 text-yellow-800' : 
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              {unit.status === 'active' ? 'نشط' : 
                               unit.status === 'proposed' ? 'مقترح' : 'غير نشط'}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {unit.type === 'department' ? 'إدارة' :
                               unit.type === 'section' ? 'قسم' :
                               unit.type === 'unit' ? 'وحدة' : 'فريق'}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-[#009F87]" />
                            <div>
                              <p className="text-xs text-gray-500">الموظفين</p>
                              <p className="font-semibold text-lg">{unit.employeeCount}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Activity className="h-4 w-4 text-green-600" />
                            <div>
                              <p className="text-xs text-gray-500">الكفاءة</p>
                              <p className="font-semibold text-lg text-green-600">{unit.efficiency || 90}%</p>
                            </div>
                          </div>
                        </div>

                        {unit.budget && (
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-blue-600" />
                            <div>
                              <p className="text-xs text-gray-500">الميزانية السنوية</p>
                              <p className="font-semibold text-sm text-blue-600">
                                {unit.budget.toLocaleString()} ريال
                              </p>
                            </div>
                          </div>
                        )}

                        <div className="border-t pt-3">
                          <p className="text-xs text-gray-600 mb-2">الوصف:</p>
                          <p className="text-sm text-gray-700 line-clamp-2">{unit.description}</p>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t">
                          <div className="text-xs text-gray-500">
                            آخر تحديث: {unit.lastModified}
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="p-2 h-8 w-8 hover:bg-blue-50">
                              <Eye className="h-3 w-3 text-blue-600" />
                            </Button>
                            <Button variant="ghost" size="sm" className="p-2 h-8 w-8 hover:bg-green-50">
                              <Edit className="h-3 w-3 text-green-600" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="p-2 h-8 w-8 hover:bg-red-50"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteUnit(unit.id);
                              }}
                            >
                              <Trash2 className="h-3 w-3 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ))}
            </div>

            {/* Unit Details Panel */}
            {selectedUnit && (
              <div className="fixed bottom-6 right-6 max-w-md z-50">
                <Card className="bg-white shadow-2xl border-[#009F87] border-2 animate-fade-in">
                  <CardHeader className="pb-3 bg-gradient-to-r from-[#009F87] to-[#008072] text-white rounded-t-lg">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">تفاصيل الوحدة</CardTitle>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedUnit(null)}
                        className="text-white hover:bg-white/20 p-1 h-6 w-6"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm max-h-96 overflow-y-auto">
                    {(() => {
                      const unit = organizationalUnits.find(u => u.id === selectedUnit);
                      if (!unit) return null;
                      return (
                        <div className="space-y-3">
                          <div>
                            <p className="font-semibold text-[#009F87]">الاسم:</p>
                            <p className="text-gray-700">{unit.name}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#009F87]">المدير:</p>
                            <p className="text-gray-700">{unit.managerName}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#009F87]">عدد الموظفين:</p>
                            <p className="text-gray-700 text-xs">{unit.employeeCount} موظف</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#009F87]">الوصف:</p>
                            <p className="text-gray-700 text-xs">{unit.description}</p>
                          </div>
                          <div>
                            <p className="font-semibold text-[#009F87]">المسؤوليات الرئيسية:</p>
                            <ul className="text-xs text-gray-700 list-disc list-inside space-y-1">
                              {unit.responsibilities.slice(0, 3).map((resp, index) => (
                                <li key={index}>{resp}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-semibold text-[#009F87]">مؤشرات الأداء:</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {unit.kpis.slice(0, 3).map((kpi, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {kpi}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderGapAnalysis = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl font-semibold text-[#009F87]">تحليل الفجوات التنظيمية</h3>
            <p className="text-sm text-muted-foreground mt-1">تحليل شامل للفجوات والتحديات في الهيكل التنظيمي</p>
          </div>
          <Dialog open={isAddGapOpen} onOpenChange={setIsAddGapOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-[#009F87] hover:bg-[#008072]">
                <Plus className="h-4 w-4 ml-2" />
                إضافة فجوة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>إضافة تحليل فجوة جديد</DialogTitle>
                <DialogDescription>
                  قم بتعبئة المعلومات المطلوبة لتحليل الفجوة التنظيمية
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="gap-unit">الوحدة المتأثرة</Label>
                    <Select value={newGap.unitId} onValueChange={(value) => setNewGap({...newGap, unitId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الوحدة" />
                      </SelectTrigger>
                      <SelectContent>
                        {organizationalUnits.map(unit => (
                          <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="gap-type">نوع الفجوة</Label>
                    <Select value={newGap.gapType} onValueChange={(value: any) => setNewGap({...newGap, gapType: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="skill">مهارات</SelectItem>
                        <SelectItem value="resource">موارد</SelectItem>
                        <SelectItem value="position">منصب</SelectItem>
                        <SelectItem value="process">عملية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="gap-description">وصف الفجوة</Label>
                  <Textarea
                    id="gap-description"
                    value={newGap.description}
                    onChange={(e) => setNewGap({...newGap, description: e.target.value})}
                    placeholder="وصف مفصل للفجوة التنظيمية"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="current-state">الوضع الحالي</Label>
                    <Textarea
                      id="current-state"
                      value={newGap.currentState}
                      onChange={(e) => setNewGap({...newGap, currentState: e.target.value})}
                      placeholder="وصف الوضع الحالي"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ideal-state">الوضع المثالي</Label>
                    <Textarea
                      id="ideal-state"
                      value={newGap.idealState}
                      onChange={(e) => setNewGap({...newGap, idealState: e.target.value})}
                      placeholder="وصف الوضع المطلوب الوصول إليه"
                      rows={3}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="gap-priority">الأولوية</Label>
                    <Select value={newGap.priority} onValueChange={(value: any) => setNewGap({...newGap, priority: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">عالية</SelectItem>
                        <SelectItem value="medium">متوسطة</SelectItem>
                        <SelectItem value="low">منخفضة</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="estimated-cost">التكلفة المقدرة (ريال)</Label>
                    <Input
                      id="estimated-cost"
                      type="number"
                      value={newGap.estimatedCost}
                      onChange={(e) => setNewGap({...newGap, estimatedCost: parseInt(e.target.value) || 0})}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time-resolve">المدة الزمنية للحل</Label>
                    <Input
                      id="time-resolve"
                      value={newGap.timeToResolve}
                      onChange={(e) => setNewGap({...newGap, timeToResolve: e.target.value})}
                      placeholder="مثال: 6 أشهر"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="gap-impact">التأثير</Label>
                  <Textarea
                    id="gap-impact"
                    value={newGap.impact}
                    onChange={(e) => setNewGap({...newGap, impact: e.target.value})}
                    placeholder="وصف تأثير هذه الفجوة على العمليات والأداء"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="gap-recommendations">التوصيات (مفصولة بفاصلة)</Label>
                  <Textarea
                    id="gap-recommendations"
                    value={newGap.recommendations}
                    onChange={(e) => setNewGap({...newGap, recommendations: e.target.value})}
                    placeholder="توصية 1, توصية 2, توصية 3"
                    rows={2}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddGapOpen(false)}>
                  إلغاء
                </Button>
                <Button onClick={handleAddGap} className="bg-[#009F87]">
                  <Save className="h-4 w-4 ml-2" />
                  حفظ التحليل
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid gap-6">
          {gapAnalysis.map(gap => (
            <Card key={gap.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-orange-500">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-gray-800 mb-2">{gap.description}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[#009F87]" />
                      الوحدة: {organizationalUnits.find(u => u.id === gap.unitId)?.name}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <Badge 
                      variant={gap.priority === 'high' ? 'destructive' : 
                              gap.priority === 'medium' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {gap.priority === 'high' ? 'أولوية عالية' : 
                       gap.priority === 'medium' ? 'أولوية متوسطة' : 'أولوية منخفضة'}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {gap.gapType === 'skill' ? 'مهارات' :
                       gap.gapType === 'resource' ? 'موارد' :
                       gap.gapType === 'position' ? 'منصب' : 'عملية'}
                    </Badge>
                    <Badge 
                      variant={gap.status === 'resolved' ? 'default' : 'secondary'}
                      className={`text-xs ${
                        gap.status === 'resolved' ? 'bg-green-100 text-green-800' :
                        gap.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {gap.status === 'resolved' ? 'تم الحل' :
                       gap.status === 'in_progress' ? 'قيد المعالجة' : 'تم التحديد'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-semibold text-[#009F87]">الوضع الحالي</Label>
                      <p className="text-sm text-gray-700 mt-1 p-3 bg-red-50 rounded-lg border-l-4 border-l-red-500">
                        {gap.currentState}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm font-semibold text-[#009F87]">الوضع المثالي</Label>
                      <p className="text-sm text-gray-700 mt-1 p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                        {gap.idealState}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-semibold text-[#009F87]">التأثير</Label>
                  <p className="text-sm text-gray-700 mt-1 p-3 bg-yellow-50 rounded-lg">
                    {gap.impact}
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-semibold text-[#009F87]">التوصيات</Label>
                  <ul className="text-sm text-gray-700 mt-1 space-y-2">
                    {gap.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-3 p-2 bg-blue-50 rounded-lg">
                        <ArrowRight className="h-4 w-4 mt-0.5 flex-shrink-0 text-[#009F87]" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="grid grid-cols-3 gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-gray-500">التكلفة المقدرة</p>
                        <p className="font-semibold text-green-600">{gap.estimatedCost.toLocaleString()} ريال</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-gray-500">المدة الزمنية</p>
                        <p className="font-semibold text-blue-600">{gap.timeToResolve}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-gray-500">تم التحديد بواسطة</p>
                        <p className="font-semibold text-purple-600">{gap.identifiedBy}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="hover:bg-blue-50">
                      <Eye className="h-4 w-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-green-50">
                      <Edit className="h-4 w-4 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="sm" className="hover:bg-[#009F87]/10">
                      <PlayCircle className="h-4 w-4 text-[#009F87]" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderAIRecommendations = () => {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Bot className="h-6 w-6 text-[#009F87]" />
            <div>
              <h3 className="text-xl font-semibold text-[#009F87]">توصيات الذكاء الاصطناعي</h3>
              <p className="text-sm text-muted-foreground">توصيات ذكية لتحسين الهيكل التنظيمي والعمليات</p>
            </div>
          </div>
          <Button size="sm" variant="outline" className="hover:bg-[#009F87] hover:text-white">
            <RefreshCw className="h-4 w-4 ml-2" />
            تحديث التوصيات
          </Button>
        </div>

        <div className="grid gap-6">
          {aiRecommendations.map(recommendation => (
            <Card key={recommendation.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg flex items-center gap-3 text-gray-800 mb-2">
                      <Zap className="h-5 w-5 text-[#009F87]" />
                      {recommendation.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600 leading-relaxed">
                      {recommendation.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <Badge 
                      variant={recommendation.type === 'optimize' ? 'default' : 'secondary'}
                      className={`text-xs ${
                        recommendation.type === 'optimize' ? 'bg-green-100 text-green-800' :
                        recommendation.type === 'restructure' ? 'bg-blue-100 text-blue-800' :
                        recommendation.type === 'merge' ? 'bg-purple-100 text-purple-800' :
                        recommendation.type === 'split' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}
                    >
                      {recommendation.type === 'restructure' ? 'إعادة هيكلة' :
                       recommendation.type === 'optimize' ? 'تحسين' :
                       recommendation.type === 'merge' ? 'دمج' :
                       recommendation.type === 'split' ? 'تقسيم' : 'حذف'}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-semibold">{recommendation.confidence}%</span>
                    </div>
                    <Badge 
                      variant={recommendation.status === 'accepted' ? 'default' : 
                              recommendation.status === 'rejected' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {recommendation.status === 'accepted' ? 'مقبول' :
                       recommendation.status === 'rejected' ? 'مرفوض' : 'في الانتظار'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-semibold text-[#009F87]">الفائدة المتوقعة</Label>
                  <p className="text-sm text-gray-700 mt-1 p-3 bg-green-50 rounded-lg border-l-4 border-l-green-500">
                    {recommendation.expectedBenefit}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <Label className="text-sm font-semibold text-gray-700">تعقيد التنفيذ</Label>
                    <Badge 
                      variant={recommendation.implementationComplexity === 'high' ? 'destructive' :
                              recommendation.implementationComplexity === 'medium' ? 'default' : 'secondary'}
                      className="mt-2 w-full justify-center"
                    >
                      {recommendation.implementationComplexity === 'high' ? 'عالي' :
                       recommendation.implementationComplexity === 'medium' ? 'متوسط' : 'منخفض'}
                    </Badge>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <Label className="text-sm font-semibold text-green-700">توفير التكاليف</Label>
                    <p className="text-lg font-bold text-green-600 mt-1">
                      {recommendation.costSavings.toLocaleString()} ريال
                    </p>
                  </div>
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <Label className="text-sm font-semibold text-blue-700">المدة الزمنية</Label>
                    <p className="text-lg font-semibold text-blue-600 mt-1">{recommendation.timeline}</p>
                  </div>
                </div>

                {recommendation.risks.length > 0 && (
                  <div>
                    <Label className="text-sm font-semibold text-[#009F87]">المخاطر المحتملة</Label>
                    <ul className="text-sm text-gray-700 mt-2 space-y-2">
                      {recommendation.risks.map((risk, index) => (
                        <li key={index} className="flex items-start gap-3 p-2 bg-yellow-50 rounded-lg">
                          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0 text-yellow-600" />
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t">
                  <div className="text-sm text-gray-500">
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="h-4 w-4" />
                      <span>الوحدات المتأثرة:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {recommendation.targetUnits.map(unitId => {
                        const unit = organizationalUnits.find(u => u.id === unitId);
                        return unit ? (
                          <Badge key={unitId} variant="outline" className="text-xs">
                            {unit.name}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="hover:bg-blue-50"
                      onClick={() => setSelectedRecommendation(recommendation)}
                    >
                      <MessageSquare className="h-4 w-4 ml-2" />
                      مناقشة
                    </Button>
                    {recommendation.status === 'pending' && (
                      <>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="hover:bg-red-50 text-red-600 border-red-200"
                          onClick={() => handleRejectRecommendation(recommendation.id)}
                        >
                          <X className="h-4 w-4 ml-2" />
                          رفض
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-[#009F87] hover:bg-[#008072]"
                          onClick={() => handleAcceptRecommendation(recommendation.id)}
                        >
                          <CheckCircle2 className="h-4 w-4 ml-2" />
                          قبول التوصية
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderDashboard = () => {
    return (
      <div className="space-y-8">
        {/* Enhanced Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-[#009F87] to-[#008072] text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">إجمالي الوحدات</p>
                  <p className="text-3xl font-bold">{stats.totalUnits}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {stats.activeUnits} وحدة نشطة
                  </p>
                </div>
                <Building2 className="h-12 w-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">إجمالي الموظفين</p>
                  <p className="text-3xl font-bold">{stats.totalEmployees}</p>
                  <p className="text-xs opacity-75 mt-1">
                    متوسط {stats.avgEmployeesPerUnit} موظف/وحدة
                  </p>
                </div>
                <Users className="h-12 w-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">الفجوات المحددة</p>
                  <p className="text-3xl font-bold">{stats.identifiedGaps}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {gapAnalysis.filter(gap => gap.status === 'in_progress').length} قيد المعالجة
                  </p>
                </div>
                <Target className="h-12 w-12 opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90 mb-1">توصيات الذكاء الاصطناعي</p>
                  <p className="text-3xl font-bold">{stats.aiRecommendations}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {stats.pendingRecommendations} في الانتظار
                  </p>
                </div>
                <Bot className="h-12 w-12 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress and Efficiency Metrics */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Activity className="h-6 w-6 text-[#009F87]" />
                مؤشرات الكفاءة والأداء
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">الكفاءة الإجمالية</span>
                  <span className="text-2xl font-bold text-[#009F87]">{stats.structureEfficiency}%</span>
                </div>
                <Progress value={stats.structureEfficiency} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">
                  متوسط كفاءة جميع الوحدات التنظيمية
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                    <p className="text-sm font-medium text-green-700">توفير التكاليف</p>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {aiRecommendations.reduce((sum, rec) => sum + rec.costSavings, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-green-600 mt-1">ريال سنوياً</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <BarChart3 className="h-5 w-5 text-blue-600" />
                    <p className="text-sm font-medium text-blue-700">الميزانية الإجمالية</p>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {(stats.totalBudget / 1000000).toFixed(1)}م
                  </p>
                  <p className="text-xs text-blue-600 mt-1">ريال سنوياً</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">كفاءة الأقسام الرئيسية</h4>
                {organizationalUnits.filter(unit => unit.level === 2).map(unit => (
                  <div key={unit.id} className="flex justify-between items-center">
                    <span className="text-sm">{unit.name}</span>
                    <div className="flex items-center gap-2">
                      <Progress value={unit.efficiency || 90} className="w-20 h-2" />
                      <span className="text-sm font-medium w-10 text-right">{unit.efficiency || 90}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <CalendarIcon className="h-6 w-6 text-[#009F87]" />
                مراجعة الهيكل التنظيمي
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-muted-foreground">آخر مراجعة</span>
                  <span className="text-sm font-semibold">{stats.lastReviewDate}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-[#009F87]/5 rounded-lg border border-[#009F87]/20">
                  <span className="text-sm text-muted-foreground">المراجعة القادمة</span>
                  <span className="text-sm font-semibold text-[#009F87]">{stats.nextReviewDate}</span>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm">حالة المراجعات</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                    <span>تم الانتهاء من تحليل الفجوات</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <span>في انتظار موافقة الإدارة العليا</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Bell className="h-5 w-5 text-blue-500" />
                    <span>تذكير المراجعة السنوية: 30 يوم</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">جدولة مراجعة جديدة</h4>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !reviewDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="ml-2 h-4 w-4" />
                      {reviewDate ? format(reviewDate, "PPP") : <span>اختر تاريخ المراجعة</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={reviewDate}
                      onSelect={setReviewDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
                <Button 
                  onClick={scheduleReview} 
                  className="w-full bg-[#009F87] hover:bg-[#008072]"
                  size="sm"
                >
                  <CalendarIcon className="h-4 w-4 ml-2" />
                  جدولة المراجعة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities and Process Flows */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <History className="h-6 w-6 text-[#009F87]" />
                آخر الأنشطة والتطورات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Edit className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-blue-900">تحديث إدارة تقنية المعلومات</p>
                    <p className="text-xs text-blue-700 mt-1">تم إضافة 3 موظفين جدد وتحديث الهيكل</p>
                    <p className="text-xs text-blue-600 mt-2">منذ يومين</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <Plus className="h-5 w-5 text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-900">إنشاء وحدة جديدة</p>
                    <p className="text-xs text-green-700 mt-1">تم إنشاء فريق الذكاء الاصطناعي</p>
                    <p className="text-xs text-green-600 mt-2">منذ أسبوع</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <Target className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-orange-900">تحديد فجوة جديدة</p>
                    <p className="text-xs text-orange-700 mt-1">نقص في مهارات الذكاء الاصطناعي</p>
                    <p className="text-xs text-orange-600 mt-2">منذ أسبوعين</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Bot className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-purple-900">توصية ذكية جديدة</p>
                    <p className="text-xs text-purple-700 mt-1">اقتراح دمج فريق الدعم مع التطوير</p>
                    <p className="text-xs text-purple-600 mt-2">منذ 3 أيام</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Workflow className="h-6 w-6 text-[#009F87]" />
                خارطة العمليات المؤسسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processFlows.map(process => (
                  <div key={process.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-sm">{process.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{process.description}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {process.status === 'active' ? 'نشط' : 
                         process.status === 'draft' ? 'مسودة' : 'غير نشط'}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="text-muted-foreground">المدة:</span>
                        <span className="mr-2 font-medium">{process.duration}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">التكرار:</span>
                        <span className="mr-2 font-medium">{process.frequency}</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-2">الوحدات المشاركة:</p>
                      <div className="flex flex-wrap gap-1">
                        {process.involvedUnits.slice(0, 3).map(unitId => {
                          const unit = organizationalUnits.find(u => u.id === unitId);
                          return unit ? (
                            <Badge key={unitId} variant="secondary" className="text-xs">
                              {unit.name}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                ))}
                
                <Button 
                  variant="outline" 
                  className="w-full mt-4 hover:bg-[#009F87] hover:text-white"
                  onClick={() => setIsProcessFlowOpen(true)}
                >
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة عملية جديدة
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#009F87]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#009F87]/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#009F87]/5 rounded-full animate-float"></div>
      </div>

      <div className="relative p-6 space-y-6">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="hover:bg-[#009F87]/10 transition-colors"
          >
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة
          </Button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-br from-[#009F87] to-[#008072] rounded-xl shadow-lg">
              <Network className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#009F87] to-[#008072] bg-clip-text text-transparent">
                التطوير والتنظيم المؤسسي
              </h1>
              <p className="text-muted-foreground">تصميم وتطوير الهيكل التنظيمي الأمثل بتقنيات متقدمة</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={exportToPDF} className="hover:bg-[#009F87] hover:text-white">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير الشامل
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
              <Upload className="h-4 w-4 ml-2" />
              استيراد هيكل
            </Button>
            <Button size="sm" className="bg-gradient-to-r from-[#009F87] to-[#008072] hover:from-[#008072] hover:to-[#007066] text-white shadow-lg">
              <Plus className="h-4 w-4 ml-2" />
              مشروع تطوير جديد
            </Button>
          </div>
        </div>

        {/* Enhanced Navigation Tabs */}
        <Tabs value={activeView} onValueChange={setActiveView} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/90 backdrop-blur border border-[#009F87]/20 shadow-lg rounded-xl p-2">
            <TabsTrigger 
              value="dashboard" 
              className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#009F87] data-[state=active]:to-[#008072] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-lg"
            >
              <BarChart3 className="h-5 w-5" />
              <span className="font-medium">لوحة التحكم</span>
            </TabsTrigger>
            <TabsTrigger 
              value="structure" 
              className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#009F87] data-[state=active]:to-[#008072] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-lg"
            >
              <Network className="h-5 w-5" />
              <span className="font-medium">الهيكل التنظيمي</span>
            </TabsTrigger>
            <TabsTrigger 
              value="gaps" 
              className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#009F87] data-[state=active]:to-[#008072] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-lg"
            >
              <Target className="h-5 w-5" />
              <span className="fontmedium">تحليل الفجوات</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ai" 
              className="flex items-center gap-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#009F87] data-[state=active]:to-[#008072] data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 rounded-lg"
            >
              <Bot className="h-5 w-5" />
              <span className="font-medium">التوصيات الذكية</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="structure" className="space-y-6">
            {renderOrganizationalChart()}
          </TabsContent>

          <TabsContent value="gaps" className="space-y-6">
            {renderGapAnalysis()}
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            {renderAIRecommendations()}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
