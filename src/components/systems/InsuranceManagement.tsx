import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, Shield, Users, DollarSign, Calendar, Heart, Search, Plus } from 'lucide-react';

interface InsurancePolicy {
  id: string;
  type: 'طبي' | 'حياة' | 'حوادث' | 'سفر';
  provider: string;
  policyNumber: string;
  premium: number;
  coverage: number;
  startDate: string;
  endDate: string;
  enrolledEmployees: number;
  status: 'نشط' | 'منتهي' | 'معلق';
}

interface InsuranceClaim {
  id: string;
  employeeId: string;
  employeeName: string;
  policyType: string;
  claimAmount: number;
  approvedAmount: number;
  status: 'جديد' | 'قيد المراجعة' | 'مقبول' | 'مرفوض';
  submissionDate: string;
  description: string;
}

interface InsuranceManagementProps {
  onBack: () => void;
}

export const InsuranceManagement: React.FC<InsuranceManagementProps> = ({ onBack }) => {
  const [activeView, setActiveView] = useState<'policies' | 'claims' | 'employees'>('policies');
  const [searchTerm, setSearchTerm] = useState('');

  const insurancePolicies: InsurancePolicy[] = [
    {
      id: 'POL001',
      type: 'طبي',
      provider: 'شركة التأمين الطبي المتقدم',
      policyNumber: 'MED-2024-001',
      premium: 450000,
      coverage: 100000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      enrolledEmployees: 245,
      status: 'نشط'
    },
    {
      id: 'POL002',
      type: 'حياة',
      provider: 'شركة الأمان للتأمين',
      policyNumber: 'LIFE-2024-002',
      premium: 125000,
      coverage: 500000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      enrolledEmployees: 238,
      status: 'نشط'
    },
    {
      id: 'POL003',
      type: 'حوادث',
      provider: 'شركة الحماية الشاملة',
      policyNumber: 'ACC-2024-003',
      premium: 85000,
      coverage: 200000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      enrolledEmployees: 245,
      status: 'نشط'
    }
  ];

  const insuranceClaims: InsuranceClaim[] = [
    {
      id: 'CLM001',
      employeeId: 'EMP001',
      employeeName: 'أحمد محمد العلي',
      policyType: 'طبي',
      claimAmount: 15000,
      approvedAmount: 12000,
      status: 'مقبول',
      submissionDate: '2024-03-15',
      description: 'علاج طبي - عملية جراحية'
    },
    {
      id: 'CLM002',
      employeeId: 'EMP002',
      employeeName: 'فاطمة أحمد السالم',
      policyType: 'طبي',
      claimAmount: 8500,
      approvedAmount: 0,
      status: 'قيد المراجعة',
      submissionDate: '2024-03-20',
      description: 'فحوصات طبية دورية'
    },
    {
      id: 'CLM003',
      employeeId: 'EMP003',
      employeeName: 'محمد سعد الخالد',
      policyType: 'حوادث',
      claimAmount: 25000,
      approvedAmount: 25000,
      status: 'مقبول',
      submissionDate: '2024-03-10',
      description: 'حادث سيارة أثناء العمل'
    }
  ];

  const getStatusBadge = (status: string) => {
    const config = {
      'نشط': 'bg-green-100 text-green-800 border-green-200',
      'منتهي': 'bg-red-100 text-red-800 border-red-200',
      'معلق': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'جديد': 'bg-blue-100 text-blue-800 border-blue-200',
      'قيد المراجعة': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'مقبول': 'bg-green-100 text-green-800 border-green-200',
      'مرفوض': 'bg-red-100 text-red-800 border-red-200'
    };
    return config[status as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'طبي':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'حياة':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'حوادث':
        return <Shield className="h-5 w-5 text-orange-500" />;
      case 'سفر':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const activePolicies = insurancePolicies.filter(p => p.status === 'نشط');
  const totalPremium = insurancePolicies.reduce((sum, policy) => sum + policy.premium, 0);
  const totalCoverage = insurancePolicies.reduce((sum, policy) => sum + policy.coverage, 0);
  const pendingClaims = insuranceClaims.filter(c => c.status === 'قيد المراجعة' || c.status === 'جديد');

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
            <Shield className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">إدارة التأمين</h1>
            <p className="text-muted-foreground">إدارة بوالص التأمين ومطالبات الموظفين</p>
          </div>
        </div>
        <div className="mr-auto">
          <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
            <Plus className="h-4 w-4 ml-2" />
            إضافة بوليصة جديدة
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 text-[#009F87]" />
            </div>
            <div className="text-2xl font-bold text-[#009F87] mb-1">{activePolicies.length}</div>
            <div className="text-sm text-muted-foreground">بوالص نشطة</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {(totalPremium / 1000).toFixed(0)}K
            </div>
            <div className="text-sm text-muted-foreground">إجمالي الأقساط</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Heart className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">
              {(totalCoverage / 1000000).toFixed(1)}M
            </div>
            <div className="text-sm text-muted-foreground">إجمالي التغطية</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-2xl font-bold text-yellow-600 mb-1">{pendingClaims.length}</div>
            <div className="text-sm text-muted-foreground">مطالبات معلقة</div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardContent className="p-4">
          <div className="flex gap-2">
            <Button
              variant={activeView === 'policies' ? 'default' : 'outline'}
              onClick={() => setActiveView('policies')}
              className={activeView === 'policies' ? 'bg-[#009F87] hover:bg-[#008072]' : ''}
            >
              <Shield className="h-4 w-4 ml-2" />
              البوالص
            </Button>
            <Button
              variant={activeView === 'claims' ? 'default' : 'outline'}
              onClick={() => setActiveView('claims')}
              className={activeView === 'claims' ? 'bg-[#009F87] hover:bg-[#008072]' : ''}
            >
              <DollarSign className="h-4 w-4 ml-2" />
              المطالبات
            </Button>
            <Button
              variant={activeView === 'employees' ? 'default' : 'outline'}
              onClick={() => setActiveView('employees')}
              className={activeView === 'employees' ? 'bg-[#009F87] hover:bg-[#008072]' : ''}
            >
              <Users className="h-4 w-4 ml-2" />
              تأمين الموظفين
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
              placeholder={`البحث في ${activeView === 'policies' ? 'البوالص' : activeView === 'claims' ? 'المطالبات' : 'الموظفين'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Insurance Policies View */}
      {activeView === 'policies' && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insurancePolicies.map((policy) => (
            <Card key={policy.id} className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {getTypeIcon(policy.type)}
                    </div>
                    <div>
                      <CardTitle className="text-lg">تأمين {policy.type}</CardTitle>
                      <p className="text-sm text-muted-foreground">{policy.provider}</p>
                    </div>
                  </div>
                  <Badge className={getStatusBadge(policy.status)}>
                    {policy.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm">
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">رقم البوليصة:</span>
                    <span className="font-medium">{policy.policyNumber}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-muted-foreground">فترة التغطية:</span>
                    <span className="font-medium">{policy.startDate} - {policy.endDate}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-[#009F87]/5 p-3 rounded-lg text-center">
                    <div className="font-semibold text-[#009F87]">
                      {policy.premium.toLocaleString()} ر.س
                    </div>
                    <div className="text-xs text-muted-foreground">القسط السنوي</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-blue-600">
                      {policy.coverage.toLocaleString()} ر.س
                    </div>
                    <div className="text-xs text-muted-foreground">حد التغطية</div>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="font-semibold text-green-600 flex items-center justify-center">
                    <Users className="h-4 w-4 ml-1" />
                    {policy.enrolledEmployees} موظف
                  </div>
                  <div className="text-xs text-muted-foreground">مشترك في البوليصة</div>
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

      {/* Claims View */}
      {activeView === 'claims' && (
        <div className="space-y-4">
          {insuranceClaims.map((claim) => (
            <Card key={claim.id} className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#009F87]/10 rounded-lg">
                      {getTypeIcon(claim.policyType)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{claim.employeeName}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{claim.description}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>رقم الموظف: {claim.employeeId}</span>
                        <span>•</span>
                        <span>تاريخ التقديم: {claim.submissionDate}</span>
                      </div>
                    </div>
                  </div>
                  <Badge className={getStatusBadge(claim.status)}>
                    {claim.status}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-blue-600">
                      {claim.claimAmount.toLocaleString()} ر.س
                    </div>
                    <div className="text-xs text-muted-foreground">المبلغ المطالب به</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-green-600">
                      {claim.approvedAmount.toLocaleString()} ر.س
                    </div>
                    <div className="text-xs text-muted-foreground">المبلغ المعتمد</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-gray-600">تأمين {claim.policyType}</div>
                    <div className="text-xs text-muted-foreground">نوع البوليصة</div>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm">
                    عرض التفاصيل
                  </Button>
                  {claim.status === 'قيد المراجعة' && (
                    <>
                      <Button variant="outline" size="sm" className="text-green-600 hover:bg-green-50">
                        قبول
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                        رفض
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Employee Insurance View */}
      {activeView === 'employees' && (
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#009F87]">
              <Users className="h-6 w-6" />
              تأمين الموظفين
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Shield className="h-16 w-16 text-[#009F87] mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">إدارة تأمين الموظفين</h3>
              <p className="text-muted-foreground mb-6">
                عرض وإدارة تفاصيل تأمين كل موظف والاشتراكات النشطة
              </p>
              <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                عرض تفاصيل التأمين للموظفين
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};