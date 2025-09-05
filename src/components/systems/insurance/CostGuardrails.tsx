import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  DollarSign, Shield, AlertTriangle, CheckCircle, 
  TrendingUp, TrendingDown, Settings, Save
} from 'lucide-react';

const CostGuardrails = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [guardrails, setGuardrails] = useState({
    maxPremiumIncrease: 15,
    maxDeductibleChange: 25,
    minCoverageThreshold: 80,
    maxBudgetDeviation: 10,
    costPerEmployeeLimit: 5000,
    totalBudgetCap: 2000000
  });
  
  const [isEnabled, setIsEnabled] = useState(true);

  const guardrailRules = [
    {
      id: 'premium_increase',
      title: isRTL ? 'حد زيادة القسط' : 'Premium Increase Limit',
      description: isRTL ? 'الحد الأقصى المسموح لزيادة القسط السنوي' : 'Maximum allowed annual premium increase',
      value: guardrails.maxPremiumIncrease,
      unit: '%',
      icon: TrendingUp,
      status: 'compliant',
      violations: 2
    },
    {
      id: 'deductible_change',
      title: isRTL ? 'حد تغيير الخصم' : 'Deductible Change Limit',
      description: isRTL ? 'الحد الأقصى المسموح لتغيير مبلغ الخصم' : 'Maximum allowed deductible change',
      value: guardrails.maxDeductibleChange,
      unit: '%',
      icon: Shield,
      status: 'warning',
      violations: 1
    },
    {
      id: 'coverage_threshold',
      title: isRTL ? 'عتبة التغطية الدنيا' : 'Minimum Coverage Threshold',
      description: isRTL ? 'الحد الأدنى المطلوب للتغطية التأمينية' : 'Minimum required insurance coverage',
      value: guardrails.minCoverageThreshold,
      unit: '%',
      icon: CheckCircle,
      status: 'compliant',
      violations: 0
    },
    {
      id: 'budget_deviation',
      title: isRTL ? 'انحراف الميزانية' : 'Budget Deviation',
      description: isRTL ? 'الانحراف المسموح عن الميزانية المقررة' : 'Allowed deviation from approved budget',
      value: guardrails.maxBudgetDeviation,
      unit: '%',
      icon: TrendingDown,
      status: 'critical',
      violations: 5
    },
    {
      id: 'cost_per_employee',
      title: isRTL ? 'التكلفة لكل موظف' : 'Cost Per Employee',
      description: isRTL ? 'الحد الأقصى للتكلفة لكل موظف سنوياً' : 'Maximum annual cost per employee',
      value: guardrails.costPerEmployeeLimit,
      unit: 'SAR',
      icon: DollarSign,
      status: 'warning',
      violations: 3
    },
    {
      id: 'total_budget',
      title: isRTL ? 'سقف الميزانية الإجمالية' : 'Total Budget Cap',
      description: isRTL ? 'الحد الأقصى للميزانية الإجمالية للتأمين' : 'Maximum total insurance budget',
      value: guardrails.totalBudgetCap,
      unit: 'SAR',
      icon: DollarSign,
      status: 'compliant',
      violations: 0
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'critical': return AlertTriangle;
      default: return Shield;
    }
  };

  const getStatusBadge = (status, violations) => {
    if (violations === 0) {
      return <Badge className="bg-green-100 text-green-800">✅ ممتثل</Badge>;
    } else if (violations <= 2) {
      return <Badge className="bg-yellow-100 text-yellow-800">⚠️ تحذير</Badge>;
    } else {
      return <Badge className="bg-red-100 text-red-800">🚫 حرج</Badge>;
    }
  };

  const updateGuardrail = (key, value) => {
    setGuardrails(prev => ({
      ...prev,
      [key]: parseFloat(value) || 0
    }));
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      {/* Header Controls */}
      <Card className="border-0 shadow-lg bg-white/95">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#3CB593] to-[#2da574] rounded-2xl flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">
                  {isRTL ? 'حواجز التكلفة والميزانية' : 'Cost & Budget Guardrails'}
                </h3>
                <p className="text-gray-600">
                  {isRTL ? 'ضوابط التحكم في التكاليف والميزانيات' : 'Cost and budget control mechanisms'}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch 
                  checked={isEnabled} 
                  onCheckedChange={setIsEnabled}
                />
                <span className="text-sm font-medium">
                  {isRTL ? 'مفعل' : 'Enabled'}
                </span>
              </div>
              <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574]">
                <Save className="h-4 w-4 ml-2" />
                {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-green-100">
          <CardContent className="p-6 text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-green-800">67%</p>
            <p className="text-sm text-green-600">{isRTL ? 'ممتثل' : 'Compliant'}</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-yellow-50 to-yellow-100">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-yellow-800">22%</p>
            <p className="text-sm text-yellow-600">{isRTL ? 'تحذير' : 'Warning'}</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-red-100">
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-red-800">11%</p>
            <p className="text-sm text-red-600">{isRTL ? 'حرج' : 'Critical'}</p>
          </CardContent>
        </Card>
        
        <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-blue-100">
          <CardContent className="p-6 text-center">
            <DollarSign className="h-12 w-12 text-blue-600 mx-auto mb-3" />
            <p className="text-3xl font-bold text-blue-800">1.8M</p>
            <p className="text-sm text-blue-600">{isRTL ? 'إجمالي الميزانية' : 'Total Budget'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Guardrail Rules */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {guardrailRules.map((rule) => {
          const StatusIcon = getStatusIcon(rule.status);
          
          return (
            <Card key={rule.id} className="border-0 shadow-lg bg-white/95 hover:shadow-xl transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      rule.status === 'compliant' ? 'bg-green-100' :
                      rule.status === 'warning' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <rule.icon className={`h-5 w-5 ${getStatusColor(rule.status)}`} />
                    </div>
                    <div>
                      <CardTitle className="text-base text-black">{rule.title}</CardTitle>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    </div>
                  </div>
                  {getStatusBadge(rule.status, rule.violations)}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-1 block">
                      {isRTL ? 'القيمة الحالية' : 'Current Value'}
                    </label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        value={rule.value}
                        onChange={(e) => updateGuardrail(rule.id, e.target.value)}
                        className="text-center"
                      />
                      <span className="text-sm font-medium text-gray-600">{rule.unit}</span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-600 mb-1">
                      {isRTL ? 'المخالفات' : 'Violations'}
                    </p>
                    <div className={`text-2xl font-bold ${
                      rule.violations === 0 ? 'text-green-600' :
                      rule.violations <= 2 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {rule.violations}
                    </div>
                  </div>
                </div>
                
                {rule.violations > 0 && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {isRTL ? 'آخر مخالفة:' : 'Latest violation:'} 
                      <span className="font-medium ml-1">
                        {isRTL ? 'تجاوز الحد بنسبة 8%' : 'Exceeded limit by 8%'}
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-lg bg-white/95">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'إجراءات سريعة' : 'Quick Actions'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <span className="font-medium">{isRTL ? 'تطبيق على الكل' : 'Apply to All'}</span>
              <span className="text-xs text-gray-500">{isRTL ? 'تطبيق الحواجز على جميع الوثائق' : 'Apply guardrails to all policies'}</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
              <span className="font-medium">{isRTL ? 'مراجعة المخالفات' : 'Review Violations'}</span>
              <span className="text-xs text-gray-500">{isRTL ? 'مراجعة جميع المخالفات الحالية' : 'Review all current violations'}</span>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2">
              <Settings className="h-6 w-6 text-blue-600" />
              <span className="font-medium">{isRTL ? 'إعدادات متقدمة' : 'Advanced Settings'}</span>
              <span className="text-xs text-gray-500">{isRTL ? 'إعدادات تفصيلية للحواجز' : 'Detailed guardrail settings'}</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CostGuardrails;