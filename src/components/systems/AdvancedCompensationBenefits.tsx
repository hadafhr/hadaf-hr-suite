import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Gift,
  Award,
  Star,
  TrendingUp,
  DollarSign,
  Calendar,
  Target,
  Users,
  Zap,
  Trophy,
  Crown,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Plus,
  Edit,
  Eye,
  Download,
  Upload,
  Filter,
  Search,
  BarChart3,
  PieChart,
  Activity,
  Settings,
  Clock,
  RefreshCw
} from 'lucide-react';

interface Reward {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'monetary' | 'non_monetary' | 'recognition' | 'promotion';
  category: string;
  title: string;
  description: string;
  amount?: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  criteria: string[];
  eligibilityScore: number;
  awardedDate?: string;
  expiryDate?: string;
  manager: string;
  department: string;
  quarter: string;
  performanceRating: number;
}

interface IncentiveProgram {
  id: string;
  name: string;
  type: 'individual' | 'team' | 'department' | 'company';
  description: string;
  criteria: string[];
  rewardType: 'bonus' | 'promotion' | 'recognition' | 'benefits';
  budget: number;
  usedBudget: number;
  startDate: string;
  endDate: string;
  status: 'active' | 'inactive' | 'completed';
  participants: number;
  winners: number;
  successRate: number;
}

interface AdvancedCompensationBenefitsProps {
  onBack: () => void;
}

export const AdvancedCompensationBenefits: React.FC<AdvancedCompensationBenefitsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('rewards');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedEmployee, setSelectedEmployee] = useState<Reward | null>(null);
  const [showRewardDialog, setShowRewardDialog] = useState(false);
  const [showProgramDialog, setShowProgramDialog] = useState(false);

  // Mock rewards data
  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: 'RWD001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      type: 'monetary',
      category: 'أداء متميز',
      title: 'مكافأة الإنجاز الاستثنائي',
      description: 'تم تحقيق أهداف المشروع قبل الموعد المحدد بـ 15 يوم',
      amount: 5000,
      status: 'approved',
      criteria: ['إكمال المشروع مبكراً', 'جودة عالية', 'رضا العميل 95%+'],
      eligibilityScore: 95,
      awardedDate: '2024-12-20',
      expiryDate: '2025-12-20',
      manager: 'سارة أحمد',
      department: 'تقنية المعلومات',
      quarter: 'Q4 2024',
      performanceRating: 4.8
    },
    {
      id: 'RWD002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة خالد',
      type: 'recognition',
      category: 'موظف الشهر',
      title: 'جائزة موظف الشهر',
      description: 'تميز في خدمة العملاء وحل المشاكل',
      status: 'completed',
      criteria: ['تقييم العملاء الممتاز', 'معدل حل المشاكل 98%', 'تعاون فريق ممتاز'],
      eligibilityScore: 92,
      awardedDate: '2024-12-15',
      manager: 'محمد عبدالله',
      department: 'خدمة العملاء',
      quarter: 'Q4 2024',
      performanceRating: 4.7
    },
    {
      id: 'RWD003',
      employeeId: 'EMP003',
      employeeName: 'عبدالرحمن صالح',
      type: 'promotion',
      category: 'ترقية',
      title: 'ترقية إلى منصب قائد فريق',
      description: 'ترقية لقيادة فريق التطوير الجديد',
      status: 'pending',
      criteria: ['خبرة 5+ سنوات', 'مهارات قيادية', 'نتائج ممتازة'],
      eligibilityScore: 88,
      manager: 'علي محمود',
      department: 'التطوير',
      quarter: 'Q1 2025',
      performanceRating: 4.6
    }
  ]);

  // Mock incentive programs data
  const [incentivePrograms, setIncentivePrograms] = useState<IncentiveProgram[]>([
    {
      id: 'PROG001',
      name: 'برنامج التميز السنوي',
      type: 'company',
      description: 'برنامج مكافآت شامل لتقدير الموظفين المتميزين على مستوى الشركة',
      criteria: ['تقييم أداء 4.5+', 'عدم غيابات غير مبررة', 'مشاركة في التدريب'],
      rewardType: 'bonus',
      budget: 500000,
      usedBudget: 320000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      participants: 150,
      winners: 45,
      successRate: 92
    },
    {
      id: 'PROG002',
      name: 'مكافآت الابتكار',
      type: 'individual',
      description: 'مكافآت للموظفين الذين يقدمون أفكار إبداعية تحسن العمل',
      criteria: ['فكرة قابلة للتطبيق', 'تأثير إيجابي', 'موافقة الإدارة'],
      rewardType: 'recognition',
      budget: 100000,
      usedBudget: 45000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      participants: 80,
      winners: 12,
      successRate: 85
    },
    {
      id: 'PROG003',
      name: 'برنامج رضا العملاء',
      type: 'team',
      description: 'مكافآت للفرق التي تحقق أعلى معدلات رضا العملاء',
      criteria: ['رضا العملاء 90%+', 'حل المشاكل بسرعة', 'تقييم العملاء الإيجابي'],
      rewardType: 'benefits',
      budget: 200000,
      usedBudget: 150000,
      startDate: '2024-07-01',
      endDate: '2024-12-31',
      status: 'active',
      participants: 45,
      winners: 15,
      successRate: 94
    }
  ]);

  const filteredRewards = rewards.filter(reward => {
    const matchesSearch = reward.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || reward.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: 'قيد المراجعة', class: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
      approved: { label: 'معتمد', class: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle2 },
      rejected: { label: 'مرفوض', class: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
      completed: { label: 'مكتمل', class: 'bg-blue-100 text-blue-800 border-blue-200', icon: CheckCircle2 }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.class}>
        <IconComponent className="h-3 w-3 ml-1" />
        {config.label}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      monetary: DollarSign,
      non_monetary: Gift,
      recognition: Award,
      promotion: TrendingUp
    };
    return icons[type as keyof typeof icons] || Gift;
  };

  const handleApproveReward = (rewardId: string) => {
    setRewards(prev => prev.map(reward => 
      reward.id === rewardId ? { ...reward, status: 'approved' as const } : reward
    ));
    toast({
      title: "تم اعتماد المكافأة",
      description: "سيتم إشعار الموظف والمدير المباشر"
    });
  };

  const handleRejectReward = (rewardId: string) => {
    setRewards(prev => prev.map(reward => 
      reward.id === rewardId ? { ...reward, status: 'rejected' as const } : reward
    ));
    toast({
      title: "تم رفض المكافأة",
      description: "سيتم إشعار المدير المباشر بأسباب الرفض",
      variant: "destructive"
    });
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-[#009F87]/5 to-background">
      {/* Professional Header */}
      <div className="bg-white/90 backdrop-blur rounded-xl border border-[#009F87]/20 shadow-lg">
        <div className="flex items-center justify-between p-6 border-b border-[#009F87]/10">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="hover:bg-[#009F87]/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[#009F87]/10 rounded-lg">
                <Gift className="h-6 w-6 text-[#009F87]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#009F87]">إدارة المكافآت والحوافز المتقدمة</h1>
                <p className="text-muted-foreground">نظام شامل لإدارة وتتبع المكافآت والحوافز والتقدير</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 ml-2" />
              الإحصائيات
            </Button>
            <Button size="sm" className="bg-[#009F87] hover:bg-[#008072]">
              <Plus className="h-4 w-4 ml-2" />
              مكافأة جديدة
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6">
          <Card className="border-[#009F87]/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#009F87]">
                {rewards.length}
              </div>
              <div className="text-sm text-muted-foreground">إجمالي المكافآت</div>
            </CardContent>
          </Card>
          <Card className="border-yellow-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {rewards.filter(r => r.status === 'pending').length}
              </div>
              <div className="text-sm text-muted-foreground">قيد المراجعة</div>
            </CardContent>
          </Card>
          <Card className="border-green-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {rewards.filter(r => r.status === 'approved').length}
              </div>
              <div className="text-sm text-muted-foreground">معتمدة</div>
            </CardContent>
          </Card>
          <Card className="border-blue-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {rewards.filter(r => r.status === 'completed').length}
              </div>
              <div className="text-sm text-muted-foreground">مكتملة</div>
            </CardContent>
          </Card>
          <Card className="border-purple-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {rewards.filter(r => r.amount).reduce((sum, r) => sum + (r.amount || 0), 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">إجمالي المبالغ (ريال)</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4 bg-white/90 backdrop-blur">
          <TabsTrigger value="rewards" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Gift className="h-4 w-4 ml-2" />
            المكافآت
          </TabsTrigger>
          <TabsTrigger value="programs" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Target className="h-4 w-4 ml-2" />
            برامج الحوافز
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <BarChart3 className="h-4 w-4 ml-2" />
            التحليلات
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white">
            <Settings className="h-4 w-4 ml-2" />
            الإعدادات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="rewards" className="space-y-6">
          {/* Filters and Search */}
          <Card className="bg-white/90 backdrop-blur">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="البحث في المكافآت..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-[200px]">
                    <Filter className="h-4 w-4 ml-2" />
                    <SelectValue placeholder="حالة المكافأة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="pending">قيد المراجعة</SelectItem>
                    <SelectItem value="approved">معتمدة</SelectItem>
                    <SelectItem value="rejected">مرفوضة</SelectItem>
                    <SelectItem value="completed">مكتملة</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Upload className="h-4 w-4 ml-2" />
                  استيراد
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => {
              const TypeIcon = getTypeIcon(reward.type);
              return (
                <Card key={reward.id} className="bg-white/90 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#009F87]/10 rounded-lg">
                          <TypeIcon className="h-5 w-5 text-[#009F87]" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{reward.title}</CardTitle>
                          <p className="text-sm text-muted-foreground">{reward.employeeName}</p>
                        </div>
                      </div>
                      {getStatusBadge(reward.status)}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{reward.description}</p>
                    
                    {/* Amount */}
                    {reward.amount && (
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="text-lg font-bold text-green-600">
                          {reward.amount.toLocaleString()} ريال
                        </div>
                        <div className="text-sm text-muted-foreground">قيمة المكافأة</div>
                      </div>
                    )}

                    {/* Performance Score */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>نقاط الأهلية</span>
                        <span>{reward.eligibilityScore}/100</span>
                      </div>
                      <Progress value={reward.eligibilityScore} className="h-2" />
                    </div>

                    {/* Department and Manager */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-medium text-[#009F87]">{reward.department}</div>
                        <div className="text-muted-foreground">القسم</div>
                      </div>
                      <div className="bg-gray-50 p-2 rounded">
                        <div className="font-medium text-purple-600">{reward.performanceRating}/5</div>
                        <div className="text-muted-foreground">تقييم الأداء</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                      {reward.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleApproveReward(reward.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle2 className="h-4 w-4 ml-2" />
                            اعتماد
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleRejectReward(reward.id)}
                            className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 ml-2" />
                            رفض
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedEmployee(reward);
                          setShowRewardDialog(true);
                        }}
                      >
                        <Eye className="h-4 w-4 ml-2" />
                        التفاصيل
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          {/* Incentive Programs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {incentivePrograms.map((program) => (
              <Card key={program.id} className="bg-white/90 backdrop-blur border-[#009F87]/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-[#009F87]" />
                      {program.name}
                    </CardTitle>
                    <Badge className={`${program.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {program.status === 'active' ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                  
                  {/* Budget Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>الميزانية المستخدمة</span>
                      <span>{program.usedBudget.toLocaleString()} / {program.budget.toLocaleString()} ريال</span>
                    </div>
                    <Progress value={(program.usedBudget / program.budget) * 100} className="h-2" />
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-blue-600">{program.participants}</div>
                      <div className="text-xs text-muted-foreground">المشاركين</div>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-green-600">{program.winners}</div>
                      <div className="text-xs text-muted-foreground">الفائزين</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <div className="text-lg font-bold text-purple-600">{program.successRate}%</div>
                      <div className="text-xs text-muted-foreground">معدل النجاح</div>
                    </div>
                  </div>

                  {/* Criteria */}
                  <div>
                    <h4 className="font-medium text-sm mb-2">معايير الأهلية:</h4>
                    <div className="space-y-1">
                      {program.criteria.map((criterion, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-3 w-3 text-green-500" />
                          {criterion}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <Edit className="h-4 w-4 ml-2" />
                      تعديل
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="h-4 w-4 ml-2" />
                      التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-[#009F87]" />
                  توزيع المكافآت حسب النوع
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { type: 'المالية', count: 8, color: 'bg-green-500' },
                    { type: 'التقدير', count: 5, color: 'bg-blue-500' },
                    { type: 'الترقية', count: 3, color: 'bg-purple-500' },
                    { type: 'غير المالية', count: 2, color: 'bg-orange-500' }
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${item.color}`}></div>
                        <span className="text-sm">{item.type}</span>
                      </div>
                      <span className="font-medium">{item.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#009F87]" />
                  المكافآت حسب القسم
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { dept: 'تقنية المعلومات', count: 6, budget: 45000 },
                    { dept: 'خدمة العملاء', count: 4, budget: 22000 },
                    { dept: 'التطوير', count: 3, budget: 28000 },
                    { dept: 'المبيعات', count: 2, budget: 15000 },
                    { dept: 'الموارد البشرية', count: 3, budget: 18000 }
                  ].map((item) => (
                    <div key={item.dept} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{item.dept}</span>
                        <span>{item.count} مكافآت - {item.budget.toLocaleString()} ريال</span>
                      </div>
                      <Progress value={(item.count / 6) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Performance Metrics */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-[#009F87]" />
                مؤشرات الأداء الرئيسية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-[#009F87]">92%</div>
                  <div className="text-sm text-muted-foreground">معدل رضا الموظفين</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +5% من الشهر الماضي
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-blue-600">4.7</div>
                  <div className="text-sm text-muted-foreground">متوسط تقييم الأداء</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +0.3 من الربع الماضي
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-purple-600">18</div>
                  <div className="text-sm text-muted-foreground">أيام متوسط الإنجاز</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    -3 أيام تحسن
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-orange-600">128K</div>
                  <div className="text-sm text-muted-foreground">إجمالي المكافآت (ريال)</div>
                  <div className="text-xs text-green-600 flex items-center justify-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    +15% من الربع الماضي
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          {/* Settings */}
          <Card className="bg-white/90 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#009F87]" />
                إعدادات نظام المكافآت والحوافز
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">إعدادات عامة</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>موافقة تلقائية للمكافآت أقل من 1000 ريال</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>إشعار الموظفين عند الاعتماد</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>إشعار المدير عند التقديم</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">حدود المكافآت</h3>
                  <div className="space-y-3">
                    <div>
                      <Label>الحد الأقصى للمكافأة الفردية</Label>
                      <Input defaultValue="10000" type="number" />
                    </div>
                    <div>
                      <Label>الحد الأقصى الشهري لكل موظف</Label>
                      <Input defaultValue="15000" type="number" />
                    </div>
                    <div>
                      <Label>الحد الأقصى السنوي لكل قسم</Label>
                      <Input defaultValue="500000" type="number" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Reward Details Dialog */}
      <Dialog open={showRewardDialog} onOpenChange={setShowRewardDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-[#009F87]">
              <Gift className="h-6 w-6" />
              تفاصيل المكافأة
            </DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-[#009F87]/10 rounded-lg">
                  <Award className="h-8 w-8 text-[#009F87]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedEmployee.title}</h3>
                  <p className="text-muted-foreground">{selectedEmployee.employeeName} - {selectedEmployee.department}</p>
                  {getStatusBadge(selectedEmployee.status)}
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات المكافأة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">نوع المكافأة:</span>
                        <span className="font-medium">{selectedEmployee.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المبلغ:</span>
                        <span className="font-medium">{selectedEmployee.amount?.toLocaleString()} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">تاريخ الاستحقاق:</span>
                        <span className="font-medium">{selectedEmployee.awardedDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المدير المباشر:</span>
                        <span className="font-medium">{selectedEmployee.manager}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>تقييم الأداء والأهلية</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>نقاط الأهلية</span>
                        <span>{selectedEmployee.eligibilityScore}/100</span>
                      </div>
                      <Progress value={selectedEmployee.eligibilityScore} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>تقييم الأداء</span>
                        <span>{selectedEmployee.performanceRating}/5</span>
                      </div>
                      <Progress value={(selectedEmployee.performanceRating / 5) * 100} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>معايير الاستحقاق</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedEmployee.criteria.map((criterion, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{criterion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};