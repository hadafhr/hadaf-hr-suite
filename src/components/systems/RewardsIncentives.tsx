import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Gift, Star, Award, TrendingUp, Users, DollarSign, Search, Plus } from 'lucide-react';

interface Reward {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'أداء متميز' | 'انجاز مشروع' | 'حضور منتظم' | 'ابتكار' | 'خدمة عملاء';
  amount: number;
  description: string;
  awardDate: string;
  status: 'معتمد' | 'معلق' | 'مدفوع';
  approvedBy: string;
}

interface IncentiveProgram {
  id: string;
  title: string;
  description: string;
  type: 'شهري' | 'ربع سنوي' | 'سنوي' | 'حسب الهدف';
  targetMetric: string;
  rewardAmount: number;
  eligibleEmployees: number;
  startDate: string;
  endDate: string;
  status: 'نشط' | 'منتهي' | 'قادم';
}

interface RewardsIncentivesProps {
  onBack: () => void;
}

export const RewardsIncentives: React.FC<RewardsIncentivesProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState<'rewards' | 'programs' | 'leaderboard'>('rewards');
  const [searchTerm, setSearchTerm] = useState('');

  const rewards: Reward[] = [
    {
      id: 'RWD001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      type: 'أداء متميز',
      amount: 5000,
      description: 'تحقيق أهداف المشروع قبل الموعد المحدد',
      awardDate: '2024-03-15',
      status: 'مدفوع',
      approvedBy: 'مدير الموارد البشرية'
    },
    {
      id: 'RWD002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة أحمد السالم',
      type: 'ابتكار',
      amount: 7500,
      description: 'اقتراح حل تقني جديد وفر 30% من الوقت',
      awardDate: '2024-03-20',
      status: 'معتمد',
      approvedBy: 'المدير التنفيذي'
    },
    {
      id: 'RWD003',
      employeeId: 'EMP003',
      employeeName: 'محمد سعد الخالد',
      type: 'حضور منتظم',
      amount: 2000,
      description: 'حضور منتظم لمدة 6 أشهر متتالية',
      awardDate: '2024-03-25',
      status: 'معلق',
      approvedBy: 'مدير الموارد البشرية'
    }
  ];

  const incentivePrograms: IncentiveProgram[] = [
    {
      id: 'PROG001',
      title: 'برنامج الموظف المثالي',
      description: 'مكافأة شهرية للموظف الأكثر تميزاً في الأداء',
      type: 'شهري',
      targetMetric: 'تقييم الأداء + رضا العملاء',
      rewardAmount: 10000,
      eligibleEmployees: 245,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'نشط'
    },
    {
      id: 'PROG002',
      title: 'برنامج الابتكار والإبداع',
      description: 'مكافآت للأفكار والحلول الإبداعية',
      type: 'حسب الهدف',
      targetMetric: 'قيمة الفكرة المقترحة',
      rewardAmount: 15000,
      eligibleEmployees: 245,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'نشط'
    },
    {
      id: 'PROG003',
      title: 'مكافأة إنجاز المشاريع',
      description: 'مكافآت لإنجاز المشاريع في المواعيد المحددة',
      type: 'ربع سنوي',
      targetMetric: 'نسبة إنجاز المشاريع في الوقت المحدد',
      rewardAmount: 8000,
      eligibleEmployees: 180,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'نشط'
    }
  ];

  const topPerformers = [
    { name: 'أحمد محمد العلي', department: 'تقنية المعلومات', points: 95, rewards: 3 },
    { name: 'فاطمة أحمد السالم', department: 'المالية', points: 92, rewards: 4 },
    { name: 'محمد سعد الخالد', department: 'التسويق', points: 88, rewards: 2 },
    { name: 'سارة عبدالله النصر', department: 'الموارد البشرية', points: 85, rewards: 3 },
    { name: 'عبدالرحمن يوسف', department: 'المبيعات', points: 82, rewards: 2 }
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      'معتمد': 'bg-green-100 text-green-800 border-green-200',
      'معلق': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'مدفوع': 'bg-blue-100 text-blue-800 border-blue-200',
      'نشط': 'bg-green-100 text-green-800 border-green-200',
      'منتهي': 'bg-gray-100 text-gray-800 border-gray-200',
      'قادم': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return config[status as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'أداء متميز':
        return <Star className="h-5 w-5 text-yellow-500" />;
      case 'ابتكار':
        return <Award className="h-5 w-5 text-purple-500" />;
      case 'حضور منتظم':
        return <TrendingUp className="h-5 w-5 text-blue-500" />;
      default:
        return <Gift className="h-5 w-5 text-green-500" />;
    }
  };

  const totalRewards = rewards.reduce((sum, reward) => sum + reward.amount, 0);
  const paidRewards = rewards.filter(r => r.status === 'مدفوع').reduce((sum, reward) => sum + reward.amount, 0);
  const activePrograms = incentivePrograms.filter(p => p.status === 'نشط').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="hover:bg-[#009F87]/10"
        >
          <ArrowLeft className="h-4 w-4 ml-2" />
          العودة
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#009F87]/10 rounded-lg">
            <Gift className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">المكافآت والحوافز</h1>
            <p className="text-muted-foreground">إدارة برامج التحفيز ومكافآت الموظفين</p>
          </div>
        </div>
        <div className="mr-auto">
          <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
            <Plus className="h-4 w-4 ml-2" />
            إضافة مكافأة جديدة
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Gift className="h-6 w-6 text-[#009F87]" />
            </div>
            <div className="text-2xl font-bold text-[#009F87] mb-1">{rewards.length}</div>
            <div className="text-sm text-muted-foreground">إجمالي المكافآت</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {(totalRewards / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">إجمالي المبالغ</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">{activePrograms}</div>
            <div className="text-sm text-muted-foreground">برامج نشطة</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-purple-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-1">
              {((paidRewards / totalRewards) * 100).toFixed(0)}%
            </div>
            <div className="text-sm text-muted-foreground">معدل الدفع</div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button
              variant={activeView === 'rewards' ? 'default' : 'outline'}
              onClick={() => setActiveView('rewards')}
              className={activeView === 'rewards' ? 'bg-[#009F87] hover:bg-[#008072]' : ''}
            >
              <Gift className="h-4 w-4 ml-2" />
              المكافآت
            </Button>
            <Button
              variant={activeView === 'programs' ? 'default' : 'outline'}
              onClick={() => setActiveView('programs')}
              className={activeView === 'programs' ? 'bg-[#009F87] hover:bg-[#008072]' : ''}
            >
              <Star className="h-4 w-4 ml-2" />
              البرامج
            </Button>
            <Button
              variant={activeView === 'leaderboard' ? 'default' : 'outline'}
              onClick={() => setActiveView('leaderboard')}
              className={activeView === 'leaderboard' ? 'bg-[#009F87] hover:bg-[#008072]' : ''}
            >
              <Award className="h-4 w-4 ml-2" />
              لوحة التميز
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={`البحث في ${activeView === 'rewards' ? 'المكافآت' : activeView === 'programs' ? 'البرامج' : 'لوحة التميز'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Rewards View */}
      {activeView === 'rewards' && (
        <div className="space-y-4">
          {rewards.map((reward) => (
            <Card key={reward.id} className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#009F87]/10 rounded-lg">
                      {getTypeIcon(reward.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{reward.employeeName}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>رقم الموظف: {reward.employeeId}</span>
                        <span>•</span>
                        <span>معتمد من: {reward.approvedBy}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <Badge className={getStatusBadge(reward.status)}>
                      {reward.status}
                    </Badge>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 text-sm">
                  <div className="bg-[#009F87]/5 p-3 rounded-lg text-center">
                    <div className="font-semibold text-[#009F87]">
                      {reward.amount.toLocaleString()} ر.س
                    </div>
                    <div className="text-xs text-muted-foreground">قيمة المكافأة</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-blue-600">{reward.type}</div>
                    <div className="text-xs text-muted-foreground">نوع المكافأة</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-green-600">{reward.awardDate}</div>
                    <div className="text-xs text-muted-foreground">تاريخ الاستحقاق</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-purple-600">{reward.status}</div>
                    <div className="text-xs text-muted-foreground">حالة المكافأة</div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    عرض التفاصيل
                  </Button>
                  {reward.status === 'معلق' && (
                    <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50">
                      اعتماد المكافأة
                    </Button>
                  )}
                  {reward.status === 'معتمد' && (
                    <Button variant="outline" size="sm" className="text-blue-600 hover:bg-blue-50">
                      تسجيل الدفع
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Programs View */}
      {activeView === 'programs' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incentivePrograms.map((program) => (
            <Card key={program.id} className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#009F87]/10 rounded-lg">
                      <Star className="h-5 w-5 text-[#009F87]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{program.type}</p>
                    </div>
                  </div>
                  <Badge className={getStatusBadge(program.status)}>
                    {program.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {program.description}
                </div>
                
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  <div className="font-medium text-gray-900 mb-1">مؤشر التقييم</div>
                  <div className="text-gray-700">{program.targetMetric}</div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-[#009F87]/5 p-3 rounded-lg text-center">
                    <div className="font-semibold text-[#009F87]">
                      {program.rewardAmount.toLocaleString()} ر.س
                    </div>
                    <div className="text-xs text-muted-foreground">قيمة المكافأة</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-blue-600 flex items-center justify-center">
                      <Users className="h-4 w-4 ml-1" />
                      {program.eligibleEmployees}
                    </div>
                    <div className="text-xs text-muted-foreground">موظف مؤهل</div>
                  </div>
                </div>

                <div className="text-sm">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">فترة البرنامج:</span>
                  </div>
                  <div className="font-medium">{program.startDate} - {program.endDate}</div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    عرض التفاصيل
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    تحديث
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Leaderboard View */}
      {activeView === 'leaderboard' && (
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#009F87]">
              <Award className="h-6 w-6" />
              لوحة المتميزين - أفضل الموظفين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={performer.name} className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  index === 0 ? 'bg-yellow-50 border-yellow-200' :
                  index === 1 ? 'bg-gray-50 border-gray-200' :
                  index === 2 ? 'bg-orange-50 border-orange-200' :
                  'bg-white border-gray-100'
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' :
                      index === 1 ? 'bg-gray-500' :
                      index === 2 ? 'bg-orange-500' :
                      'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{performer.name}</h3>
                      <p className="text-sm text-muted-foreground">{performer.department}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-[#009F87]">{performer.points}</div>
                      <div className="text-xs text-muted-foreground">نقاط الأداء</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-yellow-600 flex items-center">
                        <Award className="h-4 w-4 ml-1" />
                        {performer.rewards}
                      </div>
                      <div className="text-xs text-muted-foreground">مكافآت</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};