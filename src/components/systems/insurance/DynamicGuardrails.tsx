import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, Calendar, Tag, Settings, Plus, 
  Sun, Cloud, Snowflake, Leaf, Shield, AlertTriangle
} from 'lucide-react';

const DynamicGuardrails = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [activeTab, setActiveTab] = useState('category');

  // Category-based guardrails
  const categoryGuardrails = [
    {
      id: 'health',
      name: isRTL ? 'التأمين الصحي' : 'Health Insurance',
      icon: '🏥',
      rules: [
        { type: 'premium_increase', limit: 12, current: 8, status: 'compliant' },
        { type: 'coverage_minimum', limit: 85, current: 90, status: 'compliant' },
        { type: 'waiting_period', limit: 30, current: 15, status: 'compliant' }
      ],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'fleet',
      name: isRTL ? 'تأمين الأسطول' : 'Fleet Insurance',
      icon: '🚗',
      rules: [
        { type: 'premium_increase', limit: 15, current: 18, status: 'violation' },
        { type: 'deductible_max', limit: 5000, current: 3000, status: 'compliant' },
        { type: 'coverage_minimum', limit: 80, current: 75, status: 'warning' }
      ],
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'assets',
      name: isRTL ? 'تأمين الأصول' : 'Assets Insurance',
      icon: '🏢',
      rules: [
        { type: 'premium_increase', limit: 10, current: 12, status: 'violation' },
        { type: 'coverage_minimum', limit: 90, current: 95, status: 'compliant' },
        { type: 'claim_limit', limit: 100000, current: 150000, status: 'compliant' }
      ],
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  // Seasonal guardrails
  const seasonalGuardrails = [
    {
      id: 'summer',
      name: isRTL ? 'الصيف' : 'Summer',
      icon: Sun,
      period: isRTL ? 'يونيو - أغسطس' : 'June - August',
      adjustments: [
        { category: 'Health', factor: 1.1, reason: isRTL ? 'زيادة الإصابات الموسمية' : 'Increased seasonal injuries' },
        { category: 'Fleet', factor: 0.95, reason: isRTL ? 'قلة الحوادث المرورية' : 'Reduced traffic accidents' },
        { category: 'Assets', factor: 1.05, reason: isRTL ? 'مخاطر الحريق' : 'Fire risks' }
      ],
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      id: 'winter',
      name: isRTL ? 'الشتاء' : 'Winter',
      icon: Cloud,
      period: isRTL ? 'ديسمبر - فبراير' : 'December - February',
      adjustments: [
        { category: 'Health', factor: 1.2, reason: isRTL ? 'أمراض الشتاء' : 'Winter illnesses' },
        { category: 'Fleet', factor: 1.15, reason: isRTL ? 'زيادة الحوادث بسبب الطقس' : 'Weather-related accidents' },
        { category: 'Assets', factor: 1.1, reason: isRTL ? 'أضرار المياه والرطوبة' : 'Water and humidity damage' }
      ],
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'spring',
      name: isRTL ? 'الربيع' : 'Spring',
      icon: Leaf,
      period: isRTL ? 'مارس - مايو' : 'March - May',
      adjustments: [
        { category: 'Health', factor: 0.9, reason: isRTL ? 'تحسن عام في الصحة' : 'General health improvement' },
        { category: 'Fleet', factor: 1.0, reason: isRTL ? 'مستوى طبيعي' : 'Normal level' },
        { category: 'Assets', factor: 0.95, reason: isRTL ? 'انخفاض المخاطر' : 'Reduced risks' }
      ],
      color: 'bg-green-50 border-green-200'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'violation': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-100 text-green-800">✅ ممتثل</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">⚠️ تحذير</Badge>;
      case 'violation':
        return <Badge className="bg-red-100 text-red-800">🚫 مخالفة</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">➖ غير محدد</Badge>;
    }
  };

  const getRuleLabel = (type) => {
    const labels = {
      premium_increase: isRTL ? 'زيادة القسط (%)' : 'Premium Increase (%)',
      coverage_minimum: isRTL ? 'الحد الأدنى للتغطية (%)' : 'Minimum Coverage (%)',
      waiting_period: isRTL ? 'فترة الانتظار (أيام)' : 'Waiting Period (days)',
      deductible_max: isRTL ? 'الحد الأقصى للخصم (ريال)' : 'Maximum Deductible (SAR)',
      claim_limit: isRTL ? 'حد المطالبة (ريال)' : 'Claim Limit (SAR)'
    };
    return labels[type] || type;
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      {/* Header */}
      <Card className="border-0 shadow-lg bg-white/95">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-[#3CB593] to-[#2da574] rounded-2xl flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-black">
                  {isRTL ? 'الحواجز الديناميكية' : 'Dynamic Guardrails'}
                </h3>
                <p className="text-gray-600">
                  {isRTL ? 'حواجز متكيفة حسب الفئة والموسم' : 'Adaptive guardrails by category and season'}
                </p>
              </div>
            </div>
            
            <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574]">
              <Plus className="h-4 w-4 ml-2" />
              {isRTL ? 'إضافة حاجز' : 'Add Guardrail'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Card className="border-0 shadow-lg bg-white/95">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 m-4">
            <TabsTrigger value="category" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              {isRTL ? 'حواجز الفئة' : 'Category Guardrails'}
            </TabsTrigger>
            <TabsTrigger value="seasonal" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {isRTL ? 'الحواجز الموسمية' : 'Seasonal Guardrails'}
            </TabsTrigger>
          </TabsList>

          {/* Category Guardrails */}
          <TabsContent value="category" className="p-6">
            <div className="space-y-6">
              {categoryGuardrails.map((category) => (
                <Card key={category.id} className={`border-2 ${category.color}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{category.icon}</div>
                        <div>
                          <CardTitle className="text-lg text-black">{category.name}</CardTitle>
                          <p className="text-sm text-gray-600">
                            {category.rules.length} {isRTL ? 'قواعد نشطة' : 'active rules'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(category.rules.some(r => r.status === 'violation') ? 'violation' : 
                                       category.rules.some(r => r.status === 'warning') ? 'warning' : 'compliant')}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {category.rules.map((rule, index) => (
                        <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-sm text-black">
                              {getRuleLabel(rule.type)}
                            </h5>
                            {getStatusBadge(rule.status)}
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">{isRTL ? 'الحد' : 'Limit'}</span>
                              <span className="font-medium">{rule.limit}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">{isRTL ? 'الحالي' : 'Current'}</span>
                              <span className={`font-medium ${getStatusColor(rule.status)}`}>
                                {rule.current}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Seasonal Guardrails */}
          <TabsContent value="seasonal" className="p-6">
            <div className="space-y-6">
              {seasonalGuardrails.map((season) => {
                const SeasonIcon = season.icon;
                return (
                  <Card key={season.id} className={`border-2 ${season.color}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center">
                            <SeasonIcon className="h-6 w-6 text-gray-700" />
                          </div>
                          <div>
                            <CardTitle className="text-lg text-black">{season.name}</CardTitle>
                            <p className="text-sm text-gray-600">{season.period}</p>
                          </div>
                        </div>
                        <Badge variant="outline">
                          {season.adjustments.length} {isRTL ? 'تعديلات' : 'Adjustments'}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {season.adjustments.map((adjustment, index) => (
                          <div key={index} className="p-4 bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-medium text-black">{adjustment.category}</h5>
                              <Badge className={`${
                                adjustment.factor > 1 ? 'bg-red-100 text-red-800' :
                                adjustment.factor < 1 ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {adjustment.factor > 1 ? '+' : ''}{((adjustment.factor - 1) * 100).toFixed(0)}%
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-600 mb-2">
                              {isRTL ? 'السبب:' : 'Reason:'}
                            </p>
                            <p className="text-sm text-gray-700">{adjustment.reason}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Priority Rules */}
      <Card className="border-0 shadow-lg bg-white/95">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'ترتيب أولوية القواعد' : 'Rule Priority Hierarchy'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">
                {isRTL ? 'ترتيب التطبيق (الأكثر تقييداً يفوز):' : 'Application Order (Most Restrictive Wins):'}
              </h4>
              <ol className="space-y-2 text-sm text-blue-700">
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">1</span>
                  {isRTL ? 'السياسات العامة للشركة' : 'General Company Policies'}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">2</span>
                  {isRTL ? 'الحواجز الجغرافية' : 'Geographic Guardrails'}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">3</span>
                  {isRTL ? 'حواجز الفئة' : 'Category Guardrails'}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">4</span>
                  {isRTL ? 'التعديلات الموسمية' : 'Seasonal Adjustments'}
                </li>
              </ol>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <h5 className="font-semibold text-green-800 mb-2">
                  {isRTL ? 'المثال العملي:' : 'Practical Example:'}
                </h5>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• {isRTL ? 'سياسة عامة: حد زيادة 10%' : 'General Policy: 10% increase limit'}</li>
                  <li>• {isRTL ? 'حاجز جغرافي: حد زيادة 12%' : 'Geographic Guardrail: 12% limit'}</li>
                  <li>• {isRTL ? 'حاجز فئة: حد زيادة 15%' : 'Category Guardrail: 15% limit'}</li>
                  <li className="font-semibold">→ {isRTL ? 'النتيجة النهائية: 10%' : 'Final Result: 10%'}</li>
                </ul>
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h5 className="font-semibold text-yellow-800 mb-2">
                  {isRTL ? 'التعامل مع التعارض:' : 'Conflict Resolution:'}
                </h5>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• {isRTL ? 'القيمة الأكثر تقييداً تسود دائماً' : 'Most restrictive value always wins'}</li>
                  <li>• {isRTL ? 'تسجيل جميع التعارضات في السجل' : 'All conflicts logged in audit trail'}</li>
                  <li>• {isRTL ? 'تنبيهات تلقائية للمسؤولين' : 'Automatic alerts to administrators'}</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DynamicGuardrails;