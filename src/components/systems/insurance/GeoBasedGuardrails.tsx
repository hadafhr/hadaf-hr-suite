import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  MapPin, Globe, Building, Shield, Plus, Edit,
  AlertTriangle, CheckCircle, TrendingUp, Settings
} from 'lucide-react';

const GeoBasedGuardrails = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [selectedRegion, setSelectedRegion] = useState('riyadh');

  const regions = [
    {
      id: 'riyadh',
      name: isRTL ? 'منطقة الرياض' : 'Riyadh Region',
      branches: 15,
      policies: 245,
      icon: '🏛️',
      riskLevel: 'medium',
      guardrails: [
        { type: 'premium_max', value: 15, unit: '%', status: 'active', violations: 2 },
        { type: 'coverage_min', value: 80, unit: '%', status: 'active', violations: 0 },
        { type: 'deductible_max', value: 5000, unit: 'SAR', status: 'active', violations: 1 }
      ]
    },
    {
      id: 'makkah',
      name: isRTL ? 'منطقة مكة المكرمة' : 'Makkah Region',
      branches: 8,
      policies: 156,
      icon: '🕋',
      riskLevel: 'high',
      guardrails: [
        { type: 'premium_max', value: 12, unit: '%', status: 'active', violations: 0 },
        { type: 'coverage_min', value: 85, unit: '%', status: 'active', violations: 0 },
        { type: 'deductible_max', value: 4000, unit: 'SAR', status: 'active', violations: 3 }
      ]
    },
    {
      id: 'eastern',
      name: isRTL ? 'المنطقة الشرقية' : 'Eastern Region',
      branches: 12,
      policies: 198,
      icon: '🏭',
      riskLevel: 'high',
      guardrails: [
        { type: 'premium_max', value: 10, unit: '%', status: 'active', violations: 4 },
        { type: 'coverage_min', value: 90, unit: '%', status: 'active', violations: 1 },
        { type: 'deductible_max', value: 3500, unit: 'SAR', status: 'active', violations: 2 }
      ]
    },
    {
      id: 'hail',
      name: isRTL ? 'منطقة حائل' : 'Hail Region',
      branches: 4,
      policies: 67,
      icon: '🌾',
      riskLevel: 'low',
      guardrails: [
        { type: 'premium_max', value: 18, unit: '%', status: 'active', violations: 0 },
        { type: 'coverage_min', value: 75, unit: '%', status: 'active', violations: 0 },
        { type: 'deductible_max', value: 6000, unit: 'SAR', status: 'active', violations: 0 }
      ]
    }
  ];

  const branches = [
    {
      id: 'riyadh_main',
      name: isRTL ? 'الرياض - الفرع الرئيسي' : 'Riyadh - Main Branch',
      region: 'riyadh',
      employees: 150,
      policies: 45,
      compliance: 92,
      lastUpdate: '2024-01-15',
      specialRules: [
        { type: 'high_value_limit', value: 2000000, reason: isRTL ? 'موقع استراتيجي' : 'Strategic location' }
      ]
    },
    {
      id: 'riyadh_malaz',
      name: isRTL ? 'الرياض - فرع الملز' : 'Riyadh - Malaz Branch', 
      region: 'riyadh',
      employees: 85,
      policies: 28,
      compliance: 88,
      lastUpdate: '2024-01-12',
      specialRules: []
    },
    {
      id: 'makkah_haram',
      name: isRTL ? 'مكة - فرع الحرم' : 'Makkah - Haram Branch',
      region: 'makkah',
      employees: 95,
      policies: 32,
      compliance: 95,
      lastUpdate: '2024-01-14',
      specialRules: [
        { type: 'seasonal_adjustment', value: 1.2, reason: isRTL ? 'موسم الحج والعمرة' : 'Hajj and Umrah seasons' }
      ]
    }
  ];

  const getGuardrailLabel = (type) => {
    const labels = {
      premium_max: isRTL ? 'الحد الأقصى لزيادة القسط' : 'Maximum Premium Increase',
      coverage_min: isRTL ? 'الحد الأدنى للتغطية' : 'Minimum Coverage',
      deductible_max: isRTL ? 'الحد الأقصى للخصم' : 'Maximum Deductible',
      high_value_limit: isRTL ? 'حد القيمة العالية' : 'High Value Limit',
      seasonal_adjustment: isRTL ? 'التعديل الموسمي' : 'Seasonal Adjustment'
    };
    return labels[type] || type;
  };

  const getRiskBadge = (level) => {
    switch (level) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800">🟢 منخفض</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800">🟡 متوسط</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800">🔴 عالي</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">غير محدد</Badge>;
    }
  };

  const getComplianceBadge = (compliance) => {
    if (compliance >= 95) {
      return <Badge className="bg-green-100 text-green-800">ممتاز</Badge>;
    } else if (compliance >= 85) {
      return <Badge className="bg-yellow-100 text-yellow-800">جيد</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">يحتاج تحسين</Badge>;
    }
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      {/* Header */}
      <Card className="border-0 shadow-lg bg-white/95">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#3CB593] to-[#2da574] rounded-2xl flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">
                  {isRTL ? 'الحواجز الجغرافية' : 'Geographic-Based Guardrails'}
                </h3>
                <p className="text-gray-600">
                  {isRTL ? 'حواجز مخصصة حسب الموقع والمنطقة' : 'Location and region-specific guardrails'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regions.map(region => (
                    <SelectItem key={region.id} value={region.id}>
                      {region.icon} {region.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574]">
                <Plus className="h-4 w-4 ml-2" />
                {isRTL ? 'إضافة حاجز' : 'Add Guardrail'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Regional Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {regions.map((region) => (
          <Card 
            key={region.id} 
            className={`border-2 cursor-pointer transition-all hover:shadow-lg ${
              selectedRegion === region.id ? 'border-[#3CB593] bg-[#3CB593]/5' : 'border-gray-200'
            }`}
            onClick={() => setSelectedRegion(region.id)}
          >
            <CardContent className="p-6 text-center">
              <div className="text-4xl mb-3">{region.icon}</div>
              <h4 className="font-semibold text-black mb-2">{region.name}</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{isRTL ? 'الفروع' : 'Branches'}</span>
                  <span className="font-medium">{region.branches}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{isRTL ? 'الوثائق' : 'Policies'}</span>
                  <span className="font-medium">{region.policies}</span>
                </div>
                <div className="flex justify-center mt-3">
                  {getRiskBadge(region.riskLevel)}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Region Details */}
      {selectedRegion && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Regional Guardrails */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#3CB593]" />
                  {isRTL ? 'حواجز المنطقة' : 'Regional Guardrails'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regions.find(r => r.id === selectedRegion)?.guardrails.map((guardrail, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-black">
                          {getGuardrailLabel(guardrail.type)}
                        </h5>
                        <div className="flex items-center gap-2">
                          {guardrail.violations > 0 ? (
                            <Badge className="bg-red-100 text-red-800">
                              {guardrail.violations} مخالفة
                            </Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-800">
                              ✅ ممتثل
                            </Badge>
                          )}
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">
                            {isRTL ? 'القيمة الحالية' : 'Current Value'}
                          </label>
                          <div className="flex items-center gap-2">
                            <Input 
                              value={guardrail.value} 
                              className="text-sm"
                              readOnly
                            />
                            <span className="text-sm text-gray-600">{guardrail.unit}</span>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">
                            {isRTL ? 'الحالة' : 'Status'}
                          </label>
                          <div className="flex items-center gap-2">
                            {guardrail.status === 'active' ? (
                              <CheckCircle className="h-4 w-4 text-green-600" />
                            ) : (
                              <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            )}
                            <span className="text-sm">{guardrail.status === 'active' ? 'نشط' : 'غير نشط'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Regional Statistics */}
          <div>
            <Card className="border-0 shadow-lg bg-white/95">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#3CB593]" />
                  {isRTL ? 'إحصائيات المنطقة' : 'Regional Statistics'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-3xl font-bold text-blue-800">
                    {regions.find(r => r.id === selectedRegion)?.policies}
                  </p>
                  <p className="text-sm text-blue-600">{isRTL ? 'إجمالي الوثائق' : 'Total Policies'}</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-800">92%</p>
                  <p className="text-sm text-green-600">{isRTL ? 'معدل الامتثال' : 'Compliance Rate'}</p>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-3xl font-bold text-orange-800">
                    {regions.find(r => r.id === selectedRegion)?.guardrails.reduce((sum, g) => sum + g.violations, 0)}
                  </p>
                  <p className="text-sm text-orange-600">{isRTL ? 'المخالفات النشطة' : 'Active Violations'}</p>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-3xl font-bold text-purple-800">
                    {regions.find(r => r.id === selectedRegion)?.branches}
                  </p>
                  <p className="text-sm text-purple-600">{isRTL ? 'الفروع النشطة' : 'Active Branches'}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Branch-Level Details */}
      <Card className="border-0 shadow-lg bg-white/95">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'تفاصيل الفروع' : 'Branch Details'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {branches.filter(branch => branch.region === selectedRegion).map((branch) => (
              <div key={branch.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-black">{branch.name}</h4>
                    <p className="text-sm text-gray-600">
                      {branch.employees} {isRTL ? 'موظف' : 'employees'} • {branch.policies} {isRTL ? 'وثيقة' : 'policies'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getComplianceBadge(branch.compliance)}
                    <span className="text-sm font-medium">{branch.compliance}%</span>
                  </div>
                </div>
                
                {branch.specialRules.length > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <h5 className="font-medium text-yellow-800 mb-2">
                      {isRTL ? 'قواعد خاصة:' : 'Special Rules:'}
                    </h5>
                    {branch.specialRules.map((rule, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-yellow-700">{getGuardrailLabel(rule.type)}</span>
                        <span className="font-medium text-yellow-800">{rule.value}</span>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                  <span>{isRTL ? 'آخر تحديث:' : 'Last updated:'} {branch.lastUpdate}</span>
                  <Button size="sm" variant="outline">
                    <Settings className="h-3 w-3 ml-1" />
                    {isRTL ? 'إدارة' : 'Manage'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GeoBasedGuardrails;