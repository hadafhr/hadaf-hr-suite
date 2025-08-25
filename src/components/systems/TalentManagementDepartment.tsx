import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import {
  Star, Users, TrendingUp, Award, Target, Heart, UserPlus, Download, FileText, Search, 
  Filter, Plus, Edit, Trash2, BookOpen, Crown, AlertTriangle, BarChart3, ArrowLeft, 
  Brain, Globe, Settings, Share, Eye, Save, Zap, Activity, PieChart, Calendar, Clock, 
  GraduationCap, Lightbulb, TrendingDown, UserCheck, PlayCircle, Building2, UserCog,
  MapPin, Medal, Briefcase, Presentation, UserSearch, Building, Gift
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface TalentProgram {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  goals: string[];
  eligibilityCriteria: string[];
  budget: number;
  duration: string;
  status: 'active' | 'upcoming' | 'completed' | 'paused';
  participants: number;
  maxParticipants: number;
  startDate: string;
  endDate: string;
  icon: React.ReactNode;
  color: string;
  benefits: string[];
  kpis: { name: string; target: number; current: number }[];
  activities: Activity[];
  reports: ProgramReport[];
}

interface Activity {
  id: string;
  title: string;
  type: 'workshop' | 'training' | 'assessment' | 'project';
  date: string;
  duration: string;
  status: 'completed' | 'ongoing' | 'upcoming';
  participants: number;
}

interface ProgramReport {
  id: string;
  title: string;
  type: 'monthly' | 'quarterly' | 'annual';
  date: string;
  metrics: { name: string; value: number }[];
}

interface Participant {
  id: string;
  employeeId: string;
  name: string;
  department: string;
  position: string;
  avatar: string;
  enrollmentDate: string;
  progress: number;
  performance: number;
  status: 'active' | 'completed' | 'dropped';
}

const TalentManagementDepartment: React.FC<{ onBack?: () => void }> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('programs');
  const [selectedProgram, setSelectedProgram] = useState<string>('');
  const [showProgramDetails, setShowProgramDetails] = useState(false);
  const [showAddProgram, setShowAddProgram] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // الثمانية برامج المطلوبة
  const [talentPrograms, setTalentPrograms] = useState<TalentProgram[]>([
    {
      id: '1',
      title: 'برنامج القادة المستقبليين',
      titleEn: 'Future Leaders Program',
      description: 'إعداد كوادر قيادية مستقبلية من خلال تطوير مهارات القيادة والإدارة الاستراتيجية',
      goals: [
        'تطوير مهارات القيادة الاستراتيجية',
        'بناء خطط التطوير القيادي',
        'تتبع أهلية الترقيات',
        'إعداد قادة المستقبل'
      ],
      eligibilityCriteria: [
        'خبرة لا تقل عن 3 سنوات',
        'تقييم أداء ممتاز',
        'توصية من المدير المباشر',
        'اجتياز اختبار القدرات القيادية'
      ],
      budget: 150000,
      duration: '12 شهر',
      status: 'active',
      participants: 15,
      maxParticipants: 20,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      icon: <Crown className="h-6 w-6" />,
      color: 'from-blue-500 to-blue-700',
      benefits: [
        'مصفوفة كفاءات قيادية',
        'خطط تدريب قيادي مخصصة',
        'تتبع الأهلية والترقيات',
        'تقارير أداء قيادية'
      ],
      kpis: [
        { name: 'معدل الإكمال', target: 90, current: 85 },
        { name: 'رضا المشاركين', target: 95, current: 92 },
        { name: 'معدل الترقية', target: 70, current: 65 }
      ],
      activities: [
        { id: '1', title: 'ورشة القيادة الاستراتيجية', type: 'workshop', date: '2024-02-15', duration: '8 ساعات', status: 'completed', participants: 15 },
        { id: '2', title: 'مشروع تطبيقي: إدارة فريق', type: 'project', date: '2024-03-01', duration: '4 أسابيع', status: 'ongoing', participants: 12 }
      ],
      reports: [
        { id: '1', title: 'تقرير الأداء الشهري', type: 'monthly', date: '2024-01-31', metrics: [{ name: 'المشاركة', value: 95 }, { name: 'الإنجاز', value: 88 }] }
      ]
    },
    {
      id: '2',
      title: 'برامج الولاء والتحفيز',
      titleEn: 'Loyalty & Retention Programs',
      description: 'خفض معدل دوران الموظفين من خلال برامج ولاء فعالة ونظام حوافز متطور',
      goals: [
        'خفض معدل دوران الموظفين',
        'زيادة مستوى الولاء المؤسسي',
        'تحسين رضا الموظفين',
        'بناء ثقافة الاحتفاظ بالمواهب'
      ],
      eligibilityCriteria: [
        'جميع الموظفين الدائمين',
        'مدة خدمة 6 أشهر كحد أدنى',
        'تقييم أداء مقبول أو أعلى'
      ],
      budget: 200000,
      duration: '12 شهر',
      status: 'active',
      participants: 85,
      maxParticipants: 100,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      icon: <Heart className="h-6 w-6" />,
      color: 'from-red-500 to-pink-700',
      benefits: [
        'نظام نقاط ومكافآت',
        'خطط حوافز مالية وغير مالية',
        'مؤشرات مخاطر مغادرة الموظفين',
        'برامج الاعتراف والتقدير'
      ],
      kpis: [
        { name: 'معدل الاحتفاظ', target: 95, current: 92 },
        { name: 'رضا الموظفين', target: 90, current: 88 },
        { name: 'مؤشر الولاء', target: 85, current: 82 }
      ],
      activities: [
        { id: '3', title: 'استبيان رضا الموظفين', type: 'assessment', date: '2024-01-15', duration: '1 ساعة', status: 'completed', participants: 85 },
        { id: '4', title: 'فعالية التقدير الشهرية', type: 'workshop', date: '2024-02-28', duration: '2 ساعة', status: 'upcoming', participants: 50 }
      ],
      reports: [
        { id: '2', title: 'تقرير معدلات الاحتفاظ', type: 'quarterly', date: '2024-03-31', metrics: [{ name: 'الاحتفاظ', value: 92 }, { name: 'الرضا', value: 88 }] }
      ]
    },
    {
      id: '3',
      title: 'برامج التطوير الوظيفي',
      titleEn: 'Career Development Programs',
      description: 'بناء مسارات وظيفية واضحة وخطط تطوير مهني شاملة للموظفين',
      goals: [
        'بناء مسارات وظيفية واضحة',
        'تحليل فجوات المهارات',
        'تسهيل الانتقال الوظيفي الداخلي',
        'تطوير خطط التطوير المهني'
      ],
      eligibilityCriteria: [
        'جميع الموظفين الدائمين',
        'إكمال فترة التجربة',
        'رغبة في التطوير المهني'
      ],
      budget: 120000,
      duration: '6 أشهر',
      status: 'active',
      participants: 45,
      maxParticipants: 60,
      startDate: '2024-02-01',
      endDate: '2024-07-31',
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'from-green-500 to-emerald-700',
      benefits: [
        'مصفوفة Career Path',
        'تحليل فجوات المهارات',
        'طلبات انتقال وظيفي بموافقات',
        'خطط تطوير مخصصة'
      ],
      kpis: [
        { name: 'معدل الترقية الداخلية', target: 60, current: 55 },
        { name: 'رضا التطوير المهني', target: 90, current: 87 },
        { name: 'إغلاق فجوات المهارات', target: 80, current: 75 }
      ],
      activities: [
        { id: '5', title: 'تقييم المهارات الحالية', type: 'assessment', date: '2024-02-15', duration: '2 ساعة', status: 'completed', participants: 45 },
        { id: '6', title: 'ورشة التخطيط المهني', type: 'workshop', date: '2024-03-10', duration: '4 ساعات', status: 'ongoing', participants: 35 }
      ],
      reports: [
        { id: '3', title: 'تقرير التطوير المهني', type: 'monthly', date: '2024-02-29', metrics: [{ name: 'التقدم', value: 78 }, { name: 'الأهداف المحققة', value: 65 }] }
      ]
    },
    {
      id: '4',
      title: 'برامج التدريب المتخصص',
      titleEn: 'Technical & Soft Skills Training',
      description: 'رفع كفاءة الموظفين فنياً وسلوكياً من خلال برامج تدريب متطورة',
      goals: [
        'تطوير المهارات التقنية المتقدمة',
        'تعزيز المهارات الناعمة',
        'ربط مباشر مع نظام التدريب',
        'قياس أثر التدريب'
      ],
      eligibilityCriteria: [
        'تحديد الاحتياج التدريبي',
        'موافقة المدير المباشر',
        'توفر المقاعد التدريبية'
      ],
      budget: 180000,
      duration: '9 أشهر',
      status: 'active',
      participants: 65,
      maxParticipants: 80,
      startDate: '2024-01-15',
      endDate: '2024-10-15',
      icon: <GraduationCap className="h-6 w-6" />,
      color: 'from-purple-500 to-violet-700',
      benefits: [
        'ربط مباشر مع قسم التدريب',
        'خطط تطوير شخصية (IDP)',
        'حضور الجلسات التفاعلية',
        'تقييم الأثر والفعالية'
      ],
      kpis: [
        { name: 'معدل إكمال التدريب', target: 95, current: 91 },
        { name: 'رضا المتدربين', target: 90, current: 89 },
        { name: 'تطبيق المهارات', target: 85, current: 80 }
      ],
      activities: [
        { id: '7', title: 'دورة المهارات التقنية المتقدمة', type: 'training', date: '2024-02-01', duration: '40 ساعة', status: 'ongoing', participants: 25 },
        { id: '8', title: 'ورشة المهارات الناعمة', type: 'workshop', date: '2024-03-15', duration: '16 ساعة', status: 'upcoming', participants: 40 }
      ],
      reports: [
        { id: '4', title: 'تقرير فعالية التدريب', type: 'monthly', date: '2024-02-29', metrics: [{ name: 'الحضور', value: 95 }, { name: 'التفاعل', value: 88 }] }
      ]
    },
    {
      id: '5',
      title: 'برامج الإحلال الوظيفي',
      titleEn: 'Succession Planning Programs',
      description: 'تجهيز بدائل للمناصب الحرجة وضمان استمرارية العمل',
      goals: [
        'تحديد المناصب الحرجة',
        'إعداد بدائل مؤهلة',
        'تطوير خطط الإحلال',
        'ضمان استمرارية الأعمال'
      ],
      eligibilityCriteria: [
        'أداء متميز',
        'إمكانات قيادية عالية',
        'استعداد لتحمل مسؤوليات أكبر',
        'مهارات متخصصة'
      ],
      budget: 100000,
      duration: '18 شهر',
      status: 'active',
      participants: 25,
      maxParticipants: 30,
      startDate: '2024-01-01',
      endDate: '2025-06-30',
      icon: <UserCog className="h-6 w-6" />,
      color: 'from-orange-500 to-amber-700',
      benefits: [
        '9-Box Grid للأداء والإمكانات',
        'خطط تطوير بدلاء',
        'تنبيهات شغور المناصب',
        'تقييم الجاهزية للإحلال'
      ],
      kpis: [
        { name: 'جاهزية البدائل', target: 80, current: 75 },
        { name: 'تغطية المناصب الحرجة', target: 100, current: 95 },
        { name: 'سرعة الإحلال', target: 15, current: 18 }
      ],
      activities: [
        { id: '9', title: 'تقييم 9-Box للمواهب', type: 'assessment', date: '2024-01-30', duration: '4 ساعات', status: 'completed', participants: 25 },
        { id: '10', title: 'برنامج إعداد البدائل', type: 'training', date: '2024-03-01', duration: '6 أشهر', status: 'ongoing', participants: 15 }
      ],
      reports: [
        { id: '5', title: 'تقرير خطط الإحلال', type: 'quarterly', date: '2024-03-31', metrics: [{ name: 'التغطية', value: 95 }, { name: 'الجاهزية', value: 75 }] }
      ]
    },
    {
      id: '6',
      title: 'مراكز التقييم والتطوير',
      titleEn: 'Assessment & Development Centers',
      description: 'تقييم شامل للموظفين من خلال مراكز تقييم متطورة وأدوات تطوير مبتكرة',
      goals: [
        'تقييم شامل للكفاءات',
        'تحديد نقاط القوة والتطوير',
        'وضع خطط تطوير مخصصة',
        'قياس التقدم والنمو'
      ],
      eligibilityCriteria: [
        'ترشيح للمناصب القيادية',
        'طلب تقييم شامل',
        'خطة تطوير مهني'
      ],
      budget: 250000,
      duration: '12 شهر',
      status: 'active',
      participants: 35,
      maxParticipants: 40,
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      icon: <Target className="h-6 w-6" />,
      color: 'from-teal-500 to-cyan-700',
      benefits: [
        'مراكز تقييم (محاكاة/مقابلات/اختبارات)',
        'تقارير فردية وجماعية',
        'توصيات تطوير مخصصة',
        'متابعة التقدم المستمر'
      ],
      kpis: [
        { name: 'دقة التقييم', target: 95, current: 93 },
        { name: 'رضا المقيمين', target: 90, current: 88 },
        { name: 'تطبيق التوصيات', target: 85, current: 82 }
      ],
      activities: [
        { id: '11', title: 'مركز تقييم القيادات', type: 'assessment', date: '2024-02-20', duration: '2 يوم', status: 'completed', participants: 15 },
        { id: '12', title: 'ورشة تطوير الكفاءات', type: 'workshop', date: '2024-03-25', duration: '8 ساعات', status: 'upcoming', participants: 20 }
      ],
      reports: [
        { id: '6', title: 'تقرير مراكز التقييم', type: 'quarterly', date: '2024-03-31', metrics: [{ name: 'المشاركة', value: 92 }, { name: 'الجودة', value: 95 }] }
      ]
    },
    {
      id: '7',
      title: 'برامج المشاركة والرضا الوظيفي',
      titleEn: 'Engagement Programs',
      description: 'رفع رضا الموظفين وتحسين الثقافة المؤسسية والمشاركة الفعالة',
      goals: [
        'قياس رضا الموظفين بانتظام',
        'تحسين بيئة العمل',
        'زيادة المشاركة والانتماء',
        'بناء ثقافة إيجابية'
      ],
      eligibilityCriteria: [
        'جميع الموظفين',
        'مشاركة اختيارية في الأنشطة',
        'الالتزام بقيم الشركة'
      ],
      budget: 80000,
      duration: '12 شهر',
      status: 'active',
      participants: 95,
      maxParticipants: 120,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      icon: <Users className="h-6 w-6" />,
      color: 'from-indigo-500 to-blue-700',
      benefits: [
        'استبيانات رضا دورية',
        'مبادرات مشاركة فعالة',
        'مؤشرات رضا محدثة',
        'برامج بناء الفريق'
      ],
      kpis: [
        { name: 'مؤشر المشاركة', target: 85, current: 82 },
        { name: 'رضا الموظفين', target: 90, current: 87 },
        { name: 'معدل المشاركة في الأنشطة', target: 75, current: 72 }
      ],
      activities: [
        { id: '13', title: 'استبيان الرضا الربعي', type: 'assessment', date: '2024-03-01', duration: '30 دقيقة', status: 'ongoing', participants: 95 },
        { id: '14', title: 'فعالية بناء الفريق', type: 'workshop', date: '2024-03-20', duration: '4 ساعات', status: 'upcoming', participants: 60 }
      ],
      reports: [
        { id: '7', title: 'تقرير المشاركة والرضا', type: 'quarterly', date: '2024-03-31', metrics: [{ name: 'الرضا', value: 87 }, { name: 'المشاركة', value: 82 }] }
      ]
    },
    {
      id: '8',
      title: 'برنامج العلامة الوظيفية',
      titleEn: 'Employer Branding Program',
      description: 'تعزيز صورة الشركة كمكان جاذب للعمل وبناء سمعة وظيفية قوية',
      goals: [
        'بناء سمعة وظيفية قوية',
        'جذب المواهب المتميزة',
        'تحسين تجربة المرشحين',
        'تعزيز فخر الانتماء'
      ],
      eligibilityCriteria: [
        'الموظفين المتميزين',
        'السفراء الداخليين',
        'قادة الرأي في الشركة'
      ],
      budget: 130000,
      duration: '12 شهر',
      status: 'active',
      participants: 30,
      maxParticipants: 40,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      icon: <Award className="h-6 w-6" />,
      color: 'from-pink-500 to-rose-700',
      benefits: [
        'حملات وظيفية متميزة',
        'مكتبة قصص الموظفين',
        'تقارير جودة المتقدمين',
        'منصات التواصل المهنية'
      ],
      kpis: [
        { name: 'جودة المتقدمين', target: 85, current: 80 },
        { name: 'الوعي بالعلامة', target: 75, current: 70 },
        { name: 'معدل القبول', target: 60, current: 55 }
      ],
      activities: [
        { id: '15', title: 'حملة السفراء الداخليين', type: 'project', date: '2024-02-01', duration: '3 أشهر', status: 'ongoing', participants: 20 },
        { id: '16', title: 'ورشة بناء المحتوى المهني', type: 'workshop', date: '2024-03-30', duration: '6 ساعات', status: 'upcoming', participants: 15 }
      ],
      reports: [
        { id: '8', title: 'تقرير العلامة الوظيفية', type: 'quarterly', date: '2024-03-31', metrics: [{ name: 'الوصول', value: 75 }, { name: 'الانطباع', value: 82 }] }
      ]
    }
  ]);

  const [participants] = useState<Participant[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      name: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      position: 'مدير المشاريع',
      avatar: '/placeholder.svg',
      enrollmentDate: '2024-01-15',
      progress: 85,
      performance: 92,
      status: 'active'
    },
    {
      id: '2',
      employeeId: 'EMP002',
      name: 'فاطمة سعد النور',
      department: 'الموارد البشرية',
      position: 'أخصائية تطوير',
      avatar: '/placeholder.svg',
      enrollmentDate: '2024-01-20',
      progress: 78,
      performance: 88,
      status: 'active'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      name: 'محمد خالد الأحمد',
      department: 'المالية',
      position: 'محلل مالي أول',
      avatar: '/placeholder.svg',
      enrollmentDate: '2024-02-01',
      progress: 92,
      performance: 95,
      status: 'active'
    }
  ]);

  const dashboardStats = {
    totalPrograms: talentPrograms.length,
    activePrograms: talentPrograms.filter(p => p.status === 'active').length,
    totalParticipants: talentPrograms.reduce((acc, p) => acc + p.participants, 0),
    averageCompletion: 87,
    totalBudget: talentPrograms.reduce((acc, p) => acc + p.budget, 0),
    highPerformers: participants.filter(p => p.performance >= 90).length
  };

  const analyticsData = [
    { month: 'يناير', participants: 145, completion: 85, satisfaction: 92 },
    { month: 'فبراير', participants: 162, completion: 88, satisfaction: 94 },
    { month: 'مارس', participants: 178, completion: 92, satisfaction: 96 }
  ];

  const programTypeData = [
    { name: 'القيادة', value: 25, color: '#3B82F6' },
    { name: 'التقني', value: 30, color: '#10B981' },
    { name: 'التطوير', value: 20, color: '#8B5CF6' },
    { name: 'التقييم', value: 15, color: '#F59E0B' },
    { name: 'أخرى', value: 10, color: '#EF4444' }
  ];

  const handleExport = (format: 'pdf' | 'excel') => {
    toast({
      title: `تصدير ${format.toUpperCase()}`,
      description: `جاري تصدير البيانات بصيغة ${format.toUpperCase()}...`,
    });
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "طباعة",
      description: "جاري إعداد التقرير للطباعة...",
    });
  };

  const handleSync = () => {
    toast({
      title: "مزامنة البيانات",
      description: "جاري مزامنة البيانات مع الأقسام الأخرى...",
      variant: "default"
    });
  };

  const renderProfessionalHeader = () => (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/80 to-success p-8 mb-8 shadow-2xl">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBack}
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
              >
                <ArrowLeft className="h-4 w-4" />
                رجوع
              </Button>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button 
              className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
              onClick={handleSync}
            >
              <Activity className="h-4 w-4 ml-2" />
              مزامنة
            </Button>
            <Button 
              className="bg-success/80 border-success/30 text-white hover:bg-success/90 backdrop-blur-sm" 
              onClick={() => handleExport('excel')}
            >
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
            <Button 
              className="bg-warning/80 border-warning/30 text-white hover:bg-warning/90 backdrop-blur-sm" 
              onClick={() => handleExport('pdf')}
            >
              <FileText className="h-4 w-4 ml-2" />
              تصدير PDF
            </Button>
            <Button 
              className="bg-secondary/80 border-secondary/30 text-white hover:bg-secondary/90 backdrop-blur-sm" 
              onClick={handlePrint}
            >
              <Eye className="h-4 w-4 ml-2" />
              طباعة
            </Button>
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Star className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            إدارة المواهب (Talent Management Department)
          </h1>
          <p className="text-white/90 text-lg max-w-3xl mx-auto">
            نظام شامل لإدارة وتطوير المواهب البشرية يضم 8 برامج متخصصة مع إمكانيات كاملة للإدارة والتطوير والتقييم
          </p>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/5"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <Badge className="bg-blue-100 text-blue-800">نشط</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalPrograms}</p>
              <p className="text-sm text-gray-600">إجمالي البرامج</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span>+2 برامج جديدة</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-green-600/5"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <Badge className="bg-green-100 text-green-800">متفاعل</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalParticipants}</p>
              <p className="text-sm text-gray-600">إجمالي المشاركين</p>
              <div className="flex items-center gap-1 text-sm text-green-600">
                <UserPlus className="h-4 w-4" />
                <span>+15 مشارك جديد</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-purple-600/5"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
              <Badge className="bg-purple-100 text-purple-800">ممتاز</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.averageCompletion}%</p>
              <p className="text-sm text-gray-600">معدل الإكمال</p>
              <div className="flex items-center gap-1 text-sm text-purple-600">
                <Activity className="h-4 w-4" />
                <span>+5% تحسن</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-orange-600/5"></div>
          <CardContent className="p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
              <Badge className="bg-orange-100 text-orange-800">متفوق</Badge>
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-gray-900">{dashboardStats.highPerformers}</p>
              <p className="text-sm text-gray-600">الأداء المتميز</p>
              <div className="flex items-center gap-1 text-sm text-orange-600">
                <Crown className="h-4 w-4" />
                <span>90%+ أداء</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              تحليل الأداء الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="participants" fill="hsl(var(--primary))" />
                <Bar dataKey="completion" fill="hsl(var(--success))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="p-6">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-success" />
              توزيع البرامج حسب النوع
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={programTypeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                >
                  {programTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderPrograms = () => (
    <div className="space-y-6">
      {/* Programs Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في البرامج..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline">
            <Filter className="h-4 w-4 ml-2" />
            تصفية
          </Button>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 text-white"
          onClick={() => setShowAddProgram(true)}
        >
          <Plus className="h-4 w-4 ml-2" />
          برنامج جديد
        </Button>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {talentPrograms.map((program) => (
          <Card 
            key={program.id} 
            className="relative overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-105"
            onClick={() => {
              setSelectedProgram(program.id);
              setShowProgramDetails(true);
            }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${program.color} opacity-10`}></div>
            <CardContent className="p-6 relative">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${program.color} rounded-xl text-white`}>
                  {program.icon}
                </div>
                <Badge 
                  className={
                    program.status === 'active' ? 'bg-green-100 text-green-800' :
                    program.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                    program.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                    'bg-yellow-100 text-yellow-800'
                  }
                >
                  {program.status === 'active' ? 'نشط' :
                   program.status === 'upcoming' ? 'قريباً' :
                   program.status === 'completed' ? 'مكتمل' : 'متوقف'}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-gray-900 line-clamp-2">{program.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{program.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">المشاركين</span>
                  <span className="font-semibold">{program.participants}/{program.maxParticipants}</span>
                </div>
                
                <Progress 
                  value={(program.participants / program.maxParticipants) * 100} 
                  className="w-full h-2"
                />
                
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(program.startDate).toLocaleDateString('ar-SA')}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm font-semibold text-primary">
                    {program.budget.toLocaleString()} ريال
                  </span>
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); }}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); }}>
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderParticipants = () => (
    <div className="space-y-6">
      {/* Participants Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">المشاركون في البرامج</h2>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="البحث في المشاركين..."
              className="pl-10 w-80"
            />
          </div>
          <Button variant="outline">
            <UserPlus className="h-4 w-4 ml-2" />
            إضافة مشارك
          </Button>
        </div>
      </div>

      {/* Participants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {participants.map((participant) => (
          <Card key={participant.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={participant.avatar} />
                  <AvatarFallback>
                    {participant.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{participant.name}</h3>
                  <p className="text-sm text-gray-600">{participant.position}</p>
                  <p className="text-xs text-gray-500">{participant.department}</p>
                </div>
                <Badge 
                  className={
                    participant.status === 'active' ? 'bg-green-100 text-green-800' :
                    participant.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-red-100 text-red-800'
                  }
                >
                  {participant.status === 'active' ? 'نشط' :
                   participant.status === 'completed' ? 'مكتمل' : 'منسحب'}
                </Badge>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">التقدم</span>
                  <span className="font-semibold">{participant.progress}%</span>
                </div>
                <Progress value={participant.progress} className="w-full h-2" />
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">الأداء</span>
                  <span className="font-semibold text-green-600">{participant.performance}%</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t">
                  <span>تاريخ الانضمام</span>
                  <span>{new Date(participant.enrollmentDate).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {renderProfessionalHeader()}

      <div className="px-6 pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="programs">البرامج</TabsTrigger>
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="participants">المشاركون</TabsTrigger>
          </TabsList>

          <TabsContent value="programs">
            {renderPrograms()}
          </TabsContent>

          <TabsContent value="dashboard">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="participants">
            {renderParticipants()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Program Details Dialog */}
      <Dialog open={showProgramDetails} onOpenChange={setShowProgramDetails}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Star className="h-6 w-6 text-primary" />
              تفاصيل البرنامج
            </DialogTitle>
          </DialogHeader>
          {selectedProgram && (
            <div className="space-y-6">
              {(() => {
                const program = talentPrograms.find(p => p.id === selectedProgram);
                return program ? (
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`p-3 bg-gradient-to-br ${program.color} rounded-xl text-white`}>
                              {program.icon}
                            </div>
                            <div>
                              <CardTitle>{program.title}</CardTitle>
                              <CardDescription className="text-lg">{program.titleEn}</CardDescription>
                            </div>
                          </div>
                          <Badge className="text-lg px-4 py-2">
                            {program.status === 'active' ? 'نشط' : 'غير نشط'}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-700">{program.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Users className="h-4 w-4 text-blue-600" />
                              <span className="text-sm font-medium text-blue-600">المشاركون</span>
                            </div>
                            <p className="text-2xl font-bold text-blue-900">{program.participants}/{program.maxParticipants}</p>
                          </div>
                          
                          <div className="p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Clock className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-medium text-green-600">المدة</span>
                            </div>
                            <p className="text-lg font-bold text-green-900">{program.duration}</p>
                          </div>
                          
                          <div className="p-4 bg-purple-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Award className="h-4 w-4 text-purple-600" />
                              <span className="text-sm font-medium text-purple-600">الميزانية</span>
                            </div>
                            <p className="text-lg font-bold text-purple-900">{program.budget.toLocaleString()} ريال</p>
                          </div>
                          
                          <div className="p-4 bg-orange-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <Target className="h-4 w-4 text-orange-600" />
                              <span className="text-sm font-medium text-orange-600">مؤشرات الأداء</span>
                            </div>
                            <p className="text-lg font-bold text-orange-900">{program.kpis.length} KPI</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Target className="h-5 w-5" />
                            أهداف البرنامج
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {program.goals.map((goal, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <UserCheck className="h-5 w-5" />
                            معايير الأهلية
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {program.eligibilityCriteria.map((criteria, index) => (
                              <li key={index} className="flex items-start gap-2">
                                <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-gray-700">{criteria}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Gift className="h-5 w-5" />
                          المزايا والفوائد
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {program.benefits.map((benefit, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                              <Award className="h-5 w-5 text-success" />
                              <span className="text-gray-700">{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BarChart3 className="h-5 w-5" />
                          مؤشرات الأداء الرئيسية
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {program.kpis.map((kpi, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-700">{kpi.name}</span>
                                <span className="text-sm text-gray-500">{kpi.current}% / {kpi.target}%</span>
                              </div>
                              <Progress value={(kpi.current / kpi.target) * 100} className="w-full h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                ) : null;
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Program Dialog */}
      <Dialog open={showAddProgram} onOpenChange={setShowAddProgram}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <Plus className="h-6 w-6 text-primary" />
              إضافة برنامج جديد
            </DialogTitle>
            <DialogDescription>
              قم بإنشاء برنامج موهبة جديد مع تحديد جميع التفاصيل والمتطلبات
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان البرنامج</Label>
                <Input 
                  id="title" 
                  placeholder="أدخل عنوان البرنامج..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="titleEn">العنوان بالإنجليزية</Label>
                <Input 
                  id="titleEn" 
                  placeholder="Enter program title..."
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">وصف البرنامج</Label>
              <Textarea 
                id="description"
                placeholder="وصف تفصيلي للبرنامج وأهدافه..."
                className="min-h-[100px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">مدة البرنامج</Label>
                <Input 
                  id="duration" 
                  placeholder="6 أشهر"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="budget">الميزانية</Label>
                <Input 
                  id="budget" 
                  type="number"
                  placeholder="100000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxParticipants">أقصى عدد مشاركين</Label>
                <Input 
                  id="maxParticipants" 
                  type="number"
                  placeholder="30"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowAddProgram(false)}>
                إلغاء
              </Button>
              <Button onClick={() => {
                toast({
                  title: "تم إنشاء البرنامج",
                  description: "تم إضافة البرنامج الجديد بنجاح",
                });
                setShowAddProgram(false);
              }}>
                <Save className="h-4 w-4 ml-2" />
                حفظ البرنامج
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TalentManagementDepartment;