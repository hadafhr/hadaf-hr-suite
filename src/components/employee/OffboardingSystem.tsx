import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { 
  LogOut,
  User,
  FileText,
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Calendar,
  Calculator,
  Award as Certificate,
  Building2,
  Laptop,
  CreditCard,
  MessageSquare,
  Download,
  Eye,
  Plus,
  Edit,
  Settings,
  BarChart3,
  Users,
  TrendingUp,
  ClipboardList,
  Briefcase,
  KeyRound,
  Shield
} from 'lucide-react';

interface OffboardingCase {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  position: string;
  hireDate: string;
  lastWorkingDay: string;
  offboardingType: 'resignation' | 'termination' | 'retirement' | 'contract-end' | 'mutual-agreement';
  reason: string;
  status: 'initiated' | 'clearance' | 'settlement' | 'completed';
  initiatedBy: string;
  initiatedDate: string;
  hrOfficer: string;
  clearanceProgress: number;
  settlementAmount: number;
  finalSettlementPaid: boolean;
  exitInterviewCompleted: boolean;
  documentsCollected: boolean;
  assetsReturned: boolean;
  accessRevoked: boolean;
  replacementStatus: 'not-started' | 'in-progress' | 'completed';
}

interface ClearanceItem {
  id: string;
  offboardingId: string;
  department: string;
  responsible: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'not-applicable';
  comments: string;
  completedDate?: string;
  priority: 'low' | 'medium' | 'high';
}

interface EndOfServiceBenefit {
  id: string;
  employeeId: string;
  employeeName: string;
  servicePeriodYears: number;
  servicePeriodMonths: number;
  totalServiceDays: number;
  lastSalary: number;
  averageSalary: number;
  basicBenefit: number;
  additionalBenefits: number;
  deductions: number;
  totalBenefit: number;
  calculationDate: string;
  approvedBy?: string;
  paidDate?: string;
  status: 'calculated' | 'approved' | 'paid';
}

const OffboardingSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCase, setSelectedCase] = useState<string>('');

  // Mock offboarding cases
  const [offboardingCases] = useState<OffboardingCase[]>([
    {
      id: 'OFF001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      department: 'تقنية المعلومات',
      position: 'مطور برمجيات أول',
      hireDate: '2020-01-15',
      lastWorkingDay: '2024-05-15',
      offboardingType: 'resignation',
      reason: 'فرصة عمل أفضل',
      status: 'clearance',
      initiatedBy: 'الموظف',
      initiatedDate: '2024-04-15',
      hrOfficer: 'سارة أحمد المالي',
      clearanceProgress: 65,
      settlementAmount: 45000,
      finalSettlementPaid: false,
      exitInterviewCompleted: true,
      documentsCollected: false,
      assetsReturned: true,
      accessRevoked: false,
      replacementStatus: 'in-progress'
    },
    {
      id: 'OFF002',
      employeeId: 'EMP045',
      employeeName: 'خالد يوسف النمر',
      department: 'المبيعات',
      position: 'مدير مبيعات',
      hireDate: '2018-06-01',
      lastWorkingDay: '2024-04-30',
      offboardingType: 'retirement',
      reason: 'بلوغ سن التقاعد',
      status: 'completed',
      initiatedBy: 'الموارد البشرية',
      initiatedDate: '2024-03-01',
      hrOfficer: 'محمد علي الحسن',
      clearanceProgress: 100,
      settlementAmount: 75000,
      finalSettlementPaid: true,
      exitInterviewCompleted: true,
      documentsCollected: true,
      assetsReturned: true,
      accessRevoked: true,
      replacementStatus: 'completed'
    }
  ]);

  // Mock clearance items
  const [clearanceItems] = useState<ClearanceItem[]>([
    {
      id: 'CL001',
      offboardingId: 'OFF001',
      department: 'المالية',
      responsible: 'فاطمة سعد الأحمد',
      description: 'تسوية المستحقات المالية والقروض',
      status: 'approved',
      comments: 'تم تسوية جميع المستحقات',
      completedDate: '2024-04-20',
      priority: 'high'
    },
    {
      id: 'CL002', 
      offboardingId: 'OFF001',
      department: 'تقنية المعلومات',
      responsible: 'محمد السالم',
      description: 'إلغاء صلاحيات الأنظمة وتسليم المعدات',
      status: 'pending',
      comments: 'في انتظار تسليم الحاسوب المحمول',
      priority: 'high'
    },
    {
      id: 'CL003',
      offboardingId: 'OFF001', 
      department: 'الأمن',
      responsible: 'علي أحمد الغامدي',
      description: 'إلغاء بطاقة الدخول وتسليم المفاتيح',
      status: 'approved',
      comments: 'تم تسليم جميع المفاتيح والبطاقات',
      completedDate: '2024-04-18',
      priority: 'medium'
    }
  ]);

  // Mock end of service benefits
  const [endOfServiceBenefits] = useState<EndOfServiceBenefit[]>([
    {
      id: 'EOS001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      servicePeriodYears: 4,
      servicePeriodMonths: 4,
      totalServiceDays: 1580,
      lastSalary: 15000,
      averageSalary: 14500,
      basicBenefit: 38600,
      additionalBenefits: 5000,
      deductions: 1400,
      totalBenefit: 42200,
      calculationDate: '2024-04-15',
      status: 'calculated'
    }
  ]);

  const getStatusBadge = (status: string, type: 'offboarding' | 'clearance' | 'benefit' = 'offboarding') => {
    const configs = {
      offboarding: {
        'initiated': { color: 'bg-blue-100 text-blue-800', text: 'بدء الإجراءات' },
        'clearance': { color: 'bg-orange-100 text-orange-800', text: 'تخليص' },
        'settlement': { color: 'bg-purple-100 text-purple-800', text: 'تسوية مالية' },
        'completed': { color: 'bg-green-100 text-green-800', text: 'مكتمل' }
      },
      clearance: {
        'pending': { color: 'bg-yellow-100 text-yellow-800', text: 'في الانتظار' },
        'approved': { color: 'bg-green-100 text-green-800', text: 'موافق' },
        'rejected': { color: 'bg-red-100 text-red-800', text: 'مرفوض' },
        'not-applicable': { color: 'bg-gray-100 text-gray-800', text: 'غير مطبق' }
      },
      benefit: {
        'calculated': { color: 'bg-blue-100 text-blue-800', text: 'محسوب' },
        'approved': { color: 'bg-green-100 text-green-800', text: 'معتمد' },
        'paid': { color: 'bg-emerald-100 text-emerald-800', text: 'مدفوع' }
      }
    } as const;

    const typeConfig = configs[type];
    const config = (typeConfig as any)[status] || { color: 'bg-gray-100 text-gray-800', text: status };
    return <Badge className={config.color}>{config.text}</Badge>;
  };

  const getOffboardingTypeBadge = (type: string) => {
    const colors = {
      'resignation': 'bg-blue-100 text-blue-800',
      'termination': 'bg-red-100 text-red-800',
      'retirement': 'bg-purple-100 text-purple-800',
      'contract-end': 'bg-orange-100 text-orange-800',
      'mutual-agreement': 'bg-green-100 text-green-800'
    };
    const labels = {
      'resignation': 'استقالة',
      'termination': 'إنهاء خدمة',
      'retirement': 'تقاعد',
      'contract-end': 'انتهاء عقد',
      'mutual-agreement': 'اتفاق متبادل'
    };
    
    return <Badge className={colors[type as keyof typeof colors]}>{labels[type as keyof typeof labels]}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      'low': 'bg-gray-100 text-gray-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'high': 'bg-red-100 text-red-800'
    };
    const labels = { 'low': 'منخفض', 'medium': 'متوسط', 'high': 'عالي' };
    
    return <Badge className={colors[priority as keyof typeof colors]}>{labels[priority as keyof typeof labels]}</Badge>;
  };

  const calculateStats = () => {
    return {
      totalCases: offboardingCases.length,
      activeCases: offboardingCases.filter(c => c.status !== 'completed').length,
      completedCases: offboardingCases.filter(c => c.status === 'completed').length,
      pendingClearances: clearanceItems.filter(c => c.status === 'pending').length,
      totalSettlements: offboardingCases.reduce((sum, c) => sum + c.settlementAmount, 0),
      averageSettlement: offboardingCases.reduce((sum, c) => sum + c.settlementAmount, 0) / offboardingCases.length,
      exitInterviewsCompleted: offboardingCases.filter(c => c.exitInterviewCompleted).length
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10 min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#009F87]/5 rounded-full animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#009F87]/10 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#009F87]/5 rounded-full animate-float"></div>
      </div>

      {/* Header */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#009F87]/10 rounded-lg">
            <LogOut className="h-8 w-8 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">نظام إنهاء الخدمة</h1>
            <p className="text-muted-foreground">إدارة شاملة لإجراءات الاستقالة وإنهاء الخدمة</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="hover:bg-[#009F87] hover:text-white">
            <FileText className="h-4 w-4 ml-2" />
            تقرير إنهاء الخدمة
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                <Plus className="h-4 w-4 ml-2" />
                بدء إجراءات إنهاء خدمة
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl bg-white/95 backdrop-blur">
              <DialogHeader>
                <DialogTitle className="text-[#009F87]">بدء إجراءات إنهاء خدمة</DialogTitle>
                <DialogDescription>أدخل تفاصيل إنهاء الخدمة</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>الموظف</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الموظف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EMP001">أحمد محمد العلي</SelectItem>
                        <SelectItem value="EMP002">فاطمة سعد الأحمد</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>نوع إنهاء الخدمة</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر النوع" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="resignation">استقالة</SelectItem>
                        <SelectItem value="termination">إنهاء خدمة</SelectItem>
                        <SelectItem value="retirement">تقاعد</SelectItem>
                        <SelectItem value="contract-end">انتهاء عقد</SelectItem>
                        <SelectItem value="mutual-agreement">اتفاق متبادل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>آخر يوم عمل</Label>
                  <Input type="date" />
                </div>
                <div>
                  <Label>سبب إنهاء الخدمة</Label>
                  <Textarea placeholder="اكتب السبب..." />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">إلغاء</Button>
                  <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                    بدء الإجراءات
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="relative grid grid-cols-2 md:grid-cols-7 gap-4">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <LogOut className="h-6 w-6 text-[#009F87]" />
            </div>
            <div className="text-2xl font-bold text-[#009F87]">{stats.totalCases}</div>
            <div className="text-sm text-muted-foreground">إجمالي الحالات</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-orange-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.1s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div className="text-2xl font-bold text-orange-600">{stats.activeCases}</div>
            <div className="text-sm text-muted-foreground">حالات نشطة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-green-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.2s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600">{stats.completedCases}</div>
            <div className="text-sm text-muted-foreground">حالات مكتملة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-yellow-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.3s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingClearances}</div>
            <div className="text-sm text-muted-foreground">تخليصات معلقة</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-purple-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.4s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600">{(stats.totalSettlements / 1000).toFixed(0)}K</div>
            <div className="text-sm text-muted-foreground">إجمالي التسويات</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-blue-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.5s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calculator className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600">{stats.averageSettlement.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground">متوسط التسوية</div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur border-teal-200 hover:shadow-lg transition-all animate-fade-in" style={{animationDelay: '0.6s'}}>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <MessageSquare className="h-6 w-6 text-teal-600" />
            </div>
            <div className="text-2xl font-bold text-teal-600">{stats.exitInterviewsCompleted}</div>
            <div className="text-sm text-muted-foreground">مقابلات خروج</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <div className="relative">
        <div className="flex space-x-1 bg-white/70 backdrop-blur rounded-lg p-1">
          {[
            { id: 'dashboard', label: 'لوحة التحكم', icon: BarChart3 },
            { id: 'cases', label: 'حالات إنهاء الخدمة', icon: LogOut },
            { id: 'clearance', label: 'التخليص', icon: ClipboardList },
            { id: 'settlements', label: 'مستحقات نهاية الخدمة', icon: DollarSign },
            { id: 'exit-interviews', label: 'مقابلات الخروج', icon: MessageSquare },
            { id: 'assets', label: 'إرجاع الأصول', icon: Laptop }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#009F87] text-white shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'cases' && (
        <div className="relative space-y-4">
          {offboardingCases.map((offboardingCase, index) => (
            <Card 
              key={offboardingCase.id}
              className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#009F87]/10 rounded-full flex items-center justify-center">
                      <span className="font-semibold text-[#009F87]">
                        {offboardingCase.employeeName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{offboardingCase.employeeName}</h3>
                        {getStatusBadge(offboardingCase.status, 'offboarding')}
                        {getOffboardingTypeBadge(offboardingCase.offboardingType)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                        <div>
                          <span className="font-medium">القسم:</span>
                          <p>{offboardingCase.department}</p>
                        </div>
                        <div>
                          <span className="font-medium">المنصب:</span>
                          <p>{offboardingCase.position}</p>
                        </div>
                        <div>
                          <span className="font-medium">تاريخ التوظيف:</span>
                          <p>{offboardingCase.hireDate}</p>
                        </div>
                        <div>
                          <span className="font-medium">آخر يوم عمل:</span>
                          <p>{offboardingCase.lastWorkingDay}</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        <strong>السبب:</strong> {offboardingCase.reason}
                      </p>
                      
                      {/* Clearance Progress */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="font-medium">تقدم التخليص</span>
                          <span>{offboardingCase.clearanceProgress}%</span>
                        </div>
                        <Progress value={offboardingCase.clearanceProgress} className="h-2" />
                      </div>

                      {/* Status Indicators */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MessageSquare className={`h-4 w-4 ${offboardingCase.exitInterviewCompleted ? 'text-green-600' : 'text-gray-400'}`} />
                          <span>مقابلة الخروج</span>
                          {offboardingCase.exitInterviewCompleted && <CheckCircle className="h-4 w-4 text-green-600" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <Laptop className={`h-4 w-4 ${offboardingCase.assetsReturned ? 'text-green-600' : 'text-gray-400'}`} />
                          <span>إرجاع الأصول</span>
                          {offboardingCase.assetsReturned && <CheckCircle className="h-4 w-4 text-green-600" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <KeyRound className={`h-4 w-4 ${offboardingCase.accessRevoked ? 'text-green-600' : 'text-gray-400'}`} />
                          <span>إلغاء الصلاحيات</span>
                          {offboardingCase.accessRevoked && <CheckCircle className="h-4 w-4 text-green-600" />}
                        </div>
                        <div className="flex items-center gap-2">
                          <CreditCard className={`h-4 w-4 ${offboardingCase.finalSettlementPaid ? 'text-green-600' : 'text-gray-400'}`} />
                          <span>التسوية النهائية</span>
                          {offboardingCase.finalSettlementPaid && <CheckCircle className="h-4 w-4 text-green-600" />}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center gap-4">
                        <div className="text-sm">
                          <span className="font-medium text-muted-foreground">مسؤول الموارد البشرية:</span>
                          <span className="ml-1">{offboardingCase.hrOfficer}</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium text-muted-foreground">مبلغ التسوية:</span>
                          <span className="ml-1 font-semibold text-[#009F87]">
                            {offboardingCase.settlementAmount.toLocaleString()} ريال
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Eye className="h-4 w-4 ml-2" />
                      عرض التفاصيل
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Edit className="h-4 w-4 ml-2" />
                      تحديث الحالة
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Calculator className="h-4 w-4 ml-2" />
                      حساب المستحقات
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'clearance' && (
        <div className="relative space-y-4">
          <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#009F87]">
                <ClipboardList className="h-6 w-6" />
                بنود التخليص
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clearanceItems.map((item, index) => (
                  <Card 
                    key={item.id}
                    className="hover:shadow-md transition-all animate-fade-in"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{item.description}</h3>
                            {getStatusBadge(item.status, 'clearance')}
                            {getPriorityBadge(item.priority)}
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                            <div>
                              <span className="font-medium">القسم:</span>
                              <p>{item.department}</p>
                            </div>
                            <div>
                              <span className="font-medium">المسؤول:</span>
                              <p>{item.responsible}</p>
                            </div>
                            <div>
                              <span className="font-medium">تاريخ الإكمال:</span>
                              <p>{item.completedDate || 'لم يكتمل بعد'}</p>
                            </div>
                          </div>
                          {item.comments && (
                            <div className="mt-2 p-2 bg-[#009F87]/5 rounded-lg">
                              <p className="text-sm"><strong>التعليقات:</strong> {item.comments}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 ml-2" />
                            تحديث
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'settlements' && (
        <div className="relative space-y-4">
          {endOfServiceBenefits.map((benefit, index) => (
            <Card 
              key={benefit.id}
              className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all animate-fade-in"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-lg font-semibold text-[#009F87]">مستحقات نهاية الخدمة - {benefit.employeeName}</h3>
                      {getStatusBadge(benefit.status, 'benefit')}
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-medium text-blue-800 mb-2">فترة الخدمة</h4>
                        <div className="space-y-1 text-sm">
                          <div><strong>السنوات:</strong> {benefit.servicePeriodYears}</div>
                          <div><strong>الأشهر:</strong> {benefit.servicePeriodMonths}</div>
                          <div><strong>إجمالي الأيام:</strong> {benefit.totalServiceDays.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="p-4 bg-green-50 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">الراتب</h4>
                        <div className="space-y-1 text-sm">
                          <div><strong>آخر راتب:</strong> {benefit.lastSalary.toLocaleString()}</div>
                          <div><strong>متوسط الراتب:</strong> {benefit.averageSalary.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h4 className="font-medium text-purple-800 mb-2">المستحقات</h4>
                        <div className="space-y-1 text-sm">
                          <div><strong>المستحق الأساسي:</strong> {benefit.basicBenefit.toLocaleString()}</div>
                          <div><strong>مستحقات إضافية:</strong> {benefit.additionalBenefits.toLocaleString()}</div>
                          <div><strong>الخصومات:</strong> {benefit.deductions.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="p-4 bg-[#009F87]/5 rounded-lg">
                        <h4 className="font-medium text-[#009F87] mb-2">الإجمالي</h4>
                        <div className="text-2xl font-bold text-[#009F87]">
                          {benefit.totalBenefit.toLocaleString()} ريال
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          تاريخ الحساب: {benefit.calculationDate}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <Download className="h-4 w-4 ml-2" />
                      تحميل الحساب
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <CheckCircle className="h-4 w-4 ml-2" />
                      اعتماد
                    </Button>
                    <Button variant="outline" size="sm" className="hover:bg-[#009F87] hover:text-white">
                      <CreditCard className="h-4 w-4 ml-2" />
                      دفع
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OffboardingSystem;