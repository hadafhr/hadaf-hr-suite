import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Globe, MapPin, CheckCircle, AlertTriangle, Clock, 
  Target, Shield, DollarSign, Brain, FileText, 
  Play, Pause, RotateCcw, Download, Mail, Users
} from 'lucide-react';
import { toast } from 'sonner';

const RenewAllRegion = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);

  const steps = [
    {
      id: 1,
      title: isRTL ? 'تحديد النطاق' : 'Define Scope',
      description: isRTL ? 'اختيار المنطقة والفلاتر' : 'Select region and filters',
      icon: Target
    },
    {
      id: 2,
      title: isRTL ? 'فحص الامتثال المسبق' : 'Pre-Compliance Check',
      description: isRTL ? 'تطبيق السياسات والحواجز' : 'Apply policies and guardrails',
      icon: Shield
    },
    {
      id: 3,
      title: isRTL ? 'اختيار العروض' : 'Quote Selection',
      description: isRTL ? 'محسن العروض والذكاء الاصطناعي' : 'Quote optimizer and AI',
      icon: Brain
    },
    {
      id: 4,
      title: isRTL ? 'الموافقات' : 'Approvals',
      description: isRTL ? 'مسار الموافقات المطلوبة' : 'Required approval workflow',
      icon: CheckCircle
    },
    {
      id: 5,
      title: isRTL ? 'التنفيذ' : 'Execution',
      description: isRTL ? 'تنفيذ دفعي متوازي' : 'Parallel bulk execution',
      icon: Play
    },
    {
      id: 6,
      title: isRTL ? 'الملخص' : 'Summary',
      description: isRTL ? 'تقرير النتائج النهائية' : 'Final results report',
      icon: FileText
    }
  ];

  // Mock data for region items
  const regionItems = [
    {
      id: 1,
      location: 'الرياض - الفرع الرئيسي',
      type: 'health',
      provider: 'TAWUNIYA',
      expiry: 7,
      employees: 120,
      currentPremium: 45000,
      proposedPremium: 41000,
      savings: 4000,
      complianceStatus: 'compliant',
      riskLevel: 'low',
      aiConfidence: 95
    },
    {
      id: 2,
      location: 'الرياض - فرع الملز',
      type: 'fleet',
      provider: 'SALAMA',
      expiry: 15,
      employees: 85,
      currentPremium: 32000,
      proposedPremium: 35000,
      savings: -3000,
      complianceStatus: 'soft_violation',
      riskLevel: 'medium',
      aiConfidence: 78
    },
    {
      id: 3,
      location: 'الرياض - فرع العليا',
      type: 'assets',
      provider: 'SOLIDARITY',
      expiry: 22,
      employees: 60,
      currentPremium: 28000,
      proposedPremium: 26000,
      savings: 2000,
      complianceStatus: 'compliant',
      riskLevel: 'low',
      aiConfidence: 92
    },
    {
      id: 4,
      location: 'الرياض - فرع الشمال',
      type: 'health',
      provider: 'BUPA',
      expiry: 30,
      employees: 95,
      currentPremium: 52000,
      proposedPremium: 58000,
      savings: -6000,
      complianceStatus: 'hard_violation',
      riskLevel: 'high',
      aiConfidence: 65
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'compliant':
        return CheckCircle;
      case 'soft_violation':
        return AlertTriangle;
      case 'hard_violation':
        return AlertTriangle;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'compliant':
        return 'text-green-600';
      case 'soft_violation':
        return 'text-yellow-600';
      case 'hard_violation':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-100 text-green-800">✅ ممتثل</Badge>;
      case 'soft_violation':
        return <Badge className="bg-yellow-100 text-yellow-800">🟡 انتهاك ناعم</Badge>;
      case 'hard_violation':
        return <Badge className="bg-red-100 text-red-800">🔴 انتهاك صعب</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">⏳ قيد المراجعة</Badge>;
    }
  };

  const handleItemSelect = (itemId) => {
    const newSelection = new Set(selectedItems);
    if (newSelection.has(itemId)) {
      newSelection.delete(itemId);
    } else {
      newSelection.add(itemId);
    }
    setSelectedItems(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedItems.size === regionItems.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(regionItems.map(item => item.id)));
    }
  };

  const startBulkProcessing = async () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setProcessingProgress(i);
    }
    
    setIsProcessing(false);
    setCurrentStep(6);
    toast.success(isRTL ? 'تم التنفيذ بنجاح' : 'Execution completed successfully');
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#3CB593]" />
              {isRTL ? 'اختيار المنطقة' : 'Region Selection'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {isRTL ? 'المنطقة الجغرافية' : 'Geographic Region'}
              </label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue placeholder={isRTL ? 'اختر المنطقة' : 'Select Region'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="riyadh">منطقة الرياض</SelectItem>
                  <SelectItem value="makkah">منطقة مكة المكرمة</SelectItem>
                  <SelectItem value="eastern">المنطقة الشرقية</SelectItem>
                  <SelectItem value="hail">منطقة حائل</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                {isRTL ? 'المدينة/الفرع' : 'City/Branch'}
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={isRTL ? 'جميع الفروع' : 'All Branches'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الفروع</SelectItem>
                  <SelectItem value="main">الفرع الرئيسي</SelectItem>
                  <SelectItem value="malaz">فرع الملز</SelectItem>
                  <SelectItem value="olaya">فرع العليا</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#3CB593]" />
              {isRTL ? 'فلاتر اختيارية' : 'Optional Filters'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">
                {isRTL ? 'نوع التأمين' : 'Insurance Type'}
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={isRTL ? 'جميع الأنواع' : 'All Types'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="health">صحي</SelectItem>
                  <SelectItem value="fleet">أسطول</SelectItem>
                  <SelectItem value="assets">أصول</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">
                {isRTL ? 'عتبة المخاطر' : 'Risk Threshold'}
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder={isRTL ? 'جميع المستويات' : 'All Levels'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع المستويات</SelectItem>
                  <SelectItem value="low">منخفض</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="high">عالي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={() => setCurrentStep(2)}
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574]"
          disabled={!selectedRegion}
        >
          {isRTL ? 'التالي: فحص الامتثال' : 'Next: Compliance Check'}
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'فحص الامتثال المسبق' : 'Pre-Compliance Check'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">
                {isRTL ? 'ترتيب السياسات المطبقة:' : 'Applied Policy Hierarchy:'}
              </h4>
              <ol className="space-y-2 text-sm text-blue-700">
                <li>1. {isRTL ? 'السياسات العامة' : 'General Policies'}</li>
                <li>2. {isRTL ? 'الحواجز الجغرافية' : 'Geographic Guardrails'}</li>
                <li>3. {isRTL ? 'حواجز الفئة' : 'Category Guardrails'}</li>
                <li>4. {isRTL ? 'الحواجز الموسمية' : 'Seasonal Guardrails'}</li>
              </ol>
              <p className="mt-3 text-sm font-medium text-blue-800">
                {isRTL ? 'قاعدة: الأكثر تقييداً يفوز' : 'Rule: Most Restrictive Wins'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-green-800">15</p>
                <p className="text-sm text-green-600">{isRTL ? 'ممتثلة' : 'Compliant'}</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-yellow-800">5</p>
                <p className="text-sm text-yellow-600">{isRTL ? 'انتهاك ناعم' : 'Soft Violations'}</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-red-800">2</p>
                <p className="text-sm text-red-600">{isRTL ? 'انتهاك صعب' : 'Hard Violations'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(1)}>
          {isRTL ? 'السابق' : 'Previous'}
        </Button>
        <Button 
          onClick={() => setCurrentStep(3)}
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574]"
        >
          {isRTL ? 'التالي: اختيار العروض' : 'Next: Quote Selection'}
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'اختيار العروض بالذكاء الاصطناعي' : 'AI-Powered Quote Selection'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {regionItems.map((item) => {
              const StatusIcon = getStatusIcon(item.complianceStatus);
              return (
                <div key={item.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Checkbox 
                        checked={selectedItems.has(item.id)}
                        onCheckedChange={() => handleItemSelect(item.id)}
                      />
                      <div>
                        <h4 className="font-semibold text-black">{item.location}</h4>
                        <p className="text-sm text-gray-600">{item.provider} • {item.employees} موظف</p>
                      </div>
                    </div>
                    {getStatusBadge(item.complianceStatus)}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">{isRTL ? 'القسط الحالي' : 'Current Premium'}</p>
                      <p className="font-semibold">{(item.currentPremium / 1000).toFixed(0)}K SAR</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isRTL ? 'القسط المقترح' : 'Proposed Premium'}</p>
                      <p className="font-semibold">{(item.proposedPremium / 1000).toFixed(0)}K SAR</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isRTL ? 'الوفر/الزيادة' : 'Savings/Increase'}</p>
                      <p className={`font-semibold ${item.savings >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.savings >= 0 ? '+' : ''}{(item.savings / 1000).toFixed(0)}K SAR
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">{isRTL ? 'ثقة الذكاء الاصطناعي' : 'AI Confidence'}</p>
                      <p className="font-semibold">{item.aiConfidence}%</p>
                    </div>
                    <div>
                      <Button size="sm" variant="outline" className="w-full">
                        {isRTL ? 'مقارنة العروض' : 'Compare Quotes'}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-2">
                <Checkbox 
                  checked={selectedItems.size === regionItems.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="font-medium">
                  {isRTL ? 'تحديد الكل' : 'Select All'} ({selectedItems.size}/{regionItems.length})
                </span>
              </div>
              <Button variant="outline">
                {isRTL ? 'تطبيق جماعي للمزود' : 'Bulk Provider Override'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          {isRTL ? 'السابق' : 'Previous'}
        </Button>
        <Button 
          onClick={() => setCurrentStep(4)}
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574]"
          disabled={selectedItems.size === 0}
        >
          {isRTL ? 'التالي: الموافقات' : 'Next: Approvals'}
        </Button>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'مسار الموافقات' : 'Approval Workflow'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-800">
                  ✅ {isRTL ? 'البنود الممتثلة (تمر تلقائياً)' : 'Compliant Items (Auto-Pass)'}
                </h4>
                <div className="space-y-2">
                  {regionItems.filter(item => item.complianceStatus === 'compliant').map(item => (
                    <div key={item.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="font-medium text-green-800">{item.location}</p>
                      <p className="text-sm text-green-600">
                        {isRTL ? 'جاهز للتنفيذ' : 'Ready for execution'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-yellow-800">
                  🟡 {isRTL ? 'الانتهاكات الناعمة (تحتاج موافقة)' : 'Soft Violations (Need Approval)'}
                </h4>
                <div className="space-y-2">
                  {regionItems.filter(item => item.complianceStatus === 'soft_violation').map(item => (
                    <div key={item.id} className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="font-medium text-yellow-800">{item.location}</p>
                      <p className="text-sm text-yellow-600">
                        {isRTL ? 'تحتاج موافقة مدير الإدارة' : 'Requires manager approval'}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                          {isRTL ? 'موافقة' : 'Approve'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'رفض' : 'Reject'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 bg-red-50 rounded-xl border border-red-200">
              <h4 className="font-semibold text-red-800 mb-3">
                🔴 {isRTL ? 'الانتهاكات الصعبة (توقف صعب)' : 'Hard Violations (Hard Stop)'}
              </h4>
              {regionItems.filter(item => item.complianceStatus === 'hard_violation').map(item => (
                <div key={item.id} className="p-3 bg-red-100 rounded-lg mb-2">
                  <p className="font-medium text-red-800">{item.location}</p>
                  <p className="text-sm text-red-600 mb-2">
                    {isRTL ? 'يتطلب استثناء من المدير المالي أو المقر الرئيسي' : 'Requires CFO or HQ exception'}
                  </p>
                  <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                    {isRTL ? 'طلب استثناء' : 'Request Exception'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(3)}>
          {isRTL ? 'السابق' : 'Previous'}
        </Button>
        <Button 
          onClick={() => setCurrentStep(5)}
          className="bg-gradient-to-r from-[#3CB593] to-[#2da574]"
        >
          {isRTL ? 'التالي: التنفيذ' : 'Next: Execution'}
        </Button>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Play className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'تنفيذ دفعي متوازي' : 'Parallel Bulk Execution'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">
                {isRTL ? 'ملخص التنفيذ:' : 'Execution Summary:'}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-blue-600">{isRTL ? 'إجمالي البنود' : 'Total Items'}</p>
                  <p className="font-bold text-blue-800">{selectedItems.size}</p>
                </div>
                <div>
                  <p className="text-green-600">{isRTL ? 'جاهز للتنفيذ' : 'Ready for Execution'}</p>
                  <p className="font-bold text-green-800">
                    {regionItems.filter(item => item.complianceStatus === 'compliant' && selectedItems.has(item.id)).length}
                  </p>
                </div>
                <div>
                  <p className="text-yellow-600">{isRTL ? 'بانتظار موافقة' : 'Pending Approval'}</p>
                  <p className="font-bold text-yellow-800">
                    {regionItems.filter(item => item.complianceStatus === 'soft_violation' && selectedItems.has(item.id)).length}
                  </p>
                </div>
                <div>
                  <p className="text-red-600">{isRTL ? 'مستبعد' : 'Excluded'}</p>
                  <p className="font-bold text-red-800">
                    {regionItems.filter(item => item.complianceStatus === 'hard_violation' && selectedItems.has(item.id)).length}
                  </p>
                </div>
              </div>
            </div>

            {isProcessing && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{isRTL ? 'تقدم التنفيذ' : 'Execution Progress'}</h4>
                  <span className="text-sm font-medium">{processingProgress}%</span>
                </div>
                <Progress value={processingProgress} className="w-full" />
                <div className="text-sm text-gray-600">
                  {isRTL ? 'جاري تنفيذ التجديدات...' : 'Processing renewals...'}
                </div>
              </div>
            )}

            {!isProcessing && currentStep === 5 && (
              <div className="text-center">
                <Button 
                  onClick={startBulkProcessing}
                  className="bg-gradient-to-r from-[#3CB593] to-[#2da574] text-white px-8 py-3 text-lg"
                  size="lg"
                >
                  <Play className="h-5 w-5 ml-2" />
                  {isRTL ? 'بدء التنفيذ الدفعي' : 'Start Bulk Execution'}
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(4)}>
          {isRTL ? 'السابق' : 'Previous'}
        </Button>
        {isProcessing && (
          <Button variant="outline" className="text-red-600">
            <Pause className="h-4 w-4 ml-2" />
            {isRTL ? 'إيقاف مؤقت' : 'Pause'}
          </Button>
        )}
      </div>
    </div>
  );

  const renderStep6 = () => (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#3CB593]" />
            {isRTL ? 'ملخص النتائج النهائية' : 'Final Results Summary'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-6 bg-green-50 rounded-xl border border-green-200">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-green-800">8</p>
                <p className="text-sm text-green-600">{isRTL ? 'تجديد ناجح' : 'Successful Renewals'}</p>
              </div>
              <div className="text-center p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <Clock className="h-12 w-12 text-yellow-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-yellow-800">2</p>
                <p className="text-sm text-yellow-600">{isRTL ? 'بانتظار موافقة' : 'Pending Approval'}</p>
              </div>
              <div className="text-center p-6 bg-red-50 rounded-xl border border-red-200">
                <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                <p className="text-3xl font-bold text-red-800">1</p>
                <p className="text-sm text-red-600">{isRTL ? 'فشل التجديد' : 'Failed Renewals'}</p>
              </div>
            </div>

            <div className="p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">
                {isRTL ? 'الإحصائيات المالية:' : 'Financial Statistics:'}
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-blue-600">{isRTL ? 'إجمالي الوفورات' : 'Total Savings'}</p>
                  <p className="text-2xl font-bold text-blue-800">127K SAR</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">{isRTL ? 'الأقساط الجديدة' : 'New Premiums'}</p>
                  <p className="text-2xl font-bold text-blue-800">1.2M SAR</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">{isRTL ? 'معدل النجاح' : 'Success Rate'}</p>
                  <p className="text-2xl font-bold text-blue-800">89%</p>
                </div>
                <div>
                  <p className="text-sm text-blue-600">{isRTL ? 'وقت المعالجة' : 'Processing Time'}</p>
                  <p className="text-2xl font-bold text-blue-800">12 دقيقة</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574]">
                <Download className="h-4 w-4 ml-2" />
                {isRTL ? 'تصدير Excel' : 'Export Excel'}
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 ml-2" />
                {isRTL ? 'تصدير PDF' : 'Export PDF'}
              </Button>
              <Button variant="outline">
                <Mail className="h-4 w-4 ml-2" />
                {isRTL ? 'إرسال للفريق' : 'Send to Team'}
              </Button>
              <Button variant="outline">
                <Users className="h-4 w-4 ml-2" />
                {isRTL ? 'نشر في التواصل الداخلي' : 'Post to Internal Comms'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button variant="outline" onClick={() => {
          setCurrentStep(1);
          setSelectedItems(new Set());
          setProcessingProgress(0);
        }}>
          <RotateCcw className="h-4 w-4 ml-2" />
          {isRTL ? 'بدء جديد' : 'Start New'}
        </Button>
        <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574]">
          {isRTL ? 'إنهاء' : 'Finish'}
        </Button>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      case 5: return renderStep5();
      case 6: return renderStep6();
      default: return renderStep1();
    }
  };

  return (
    <div className={`space-y-6 ${isRTL ? 'font-cairo' : 'font-inter'}`}>
      {/* Steps Progress */}
      <Card className="border-0 shadow-lg bg-white/95">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">
              {isRTL ? 'تجديد إقليمي دفعي' : 'Bulk Regional Renewal'}
            </h3>
            <Badge className="bg-[#3CB593]/10 text-[#3CB593]">
              {isRTL ? `الخطوة ${currentStep} من ${steps.length}` : `Step ${currentStep} of ${steps.length}`}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex flex-col items-center text-center min-w-0 flex-1">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300
                    ${isActive ? 'bg-[#3CB593] text-white shadow-lg scale-110' : 
                      isCompleted ? 'bg-green-500 text-white' : 
                      'bg-gray-200 text-gray-500'}
                  `}>
                    <StepIcon className="h-5 w-5" />
                  </div>
                  <div className="text-xs font-medium text-gray-800 mb-1">{step.title}</div>
                  <div className="text-xs text-gray-500 hidden md:block">{step.description}</div>
                  
                  {index < steps.length - 1 && (
                    <div className={`
                      absolute top-6 w-full h-0.5 transform translate-x-1/2
                      ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                    `} style={{ left: '50%', width: 'calc(100% - 48px)' }} />
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Content */}
      {renderCurrentStep()}
    </div>
  );
};

export default RenewAllRegion;