import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Calculator, Download, Mail, Eye, EyeOff } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

export const EndOfServiceCalculator: React.FC = () => {
  const [employeeType, setEmployeeType] = useState<'saudi' | 'non-saudi'>('saudi');
  const [terminationType, setTerminationType] = useState<'resignation' | 'termination'>('resignation');
  const [joinDate, setJoinDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [basicSalary, setBasicSalary] = useState('');
  const [housingAllowance, setHousingAllowance] = useState('');
  const [otherAllowances, setOtherAllowances] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [email, setEmail] = useState('');

  const calculateEndOfService = () => {
    const basic = parseFloat(basicSalary) || 0;
    const housing = parseFloat(housingAllowance) || 0;
    const other = parseFloat(otherAllowances) || 0;
    
    if (!joinDate || !endDate || basic <= 0) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى التأكد من إدخال جميع البيانات المطلوبة بشكل صحيح",
        variant: "destructive"
      });
      return null;
    }

    const join = new Date(joinDate);
    const end = new Date(endDate);
    
    if (end <= join) {
      toast({
        title: "خطأ في التواريخ",
        description: "تاريخ انتهاء الخدمة يجب أن يكون بعد تاريخ بداية العمل",
        variant: "destructive"
      });
      return null;
    }

    // Calculate service period in years
    const timeDiff = end.getTime() - join.getTime();
    const years = timeDiff / (1000 * 3600 * 24 * 365.25);
    const monthlyWage = basic + housing; // Only basic + housing for ESB calculation
    const totalMonthlyWage = basic + housing + other;

    let endOfServiceBenefit = 0;

    if (employeeType === 'saudi') {
      if (terminationType === 'resignation') {
        // Resignation calculation
        if (years >= 2 && years < 5) {
          endOfServiceBenefit = (monthlyWage / 2) * years;
        } else if (years >= 5) {
          endOfServiceBenefit = monthlyWage * years;
        }
      } else {
        // Termination calculation (full benefit)
        endOfServiceBenefit = monthlyWage * years;
      }
    } else {
      // Non-Saudi calculation (same as Saudi termination)
      endOfServiceBenefit = monthlyWage * years;
    }

    return {
      years: years.toFixed(2),
      monthlyWage,
      totalMonthlyWage,
      endOfServiceBenefit: Math.round(endOfServiceBenefit * 100) / 100,
      servicePeriod: `${Math.floor(years)} سنة و ${Math.floor((years % 1) * 12)} شهر`
    };
  };

  const result = calculateEndOfService();

  const handleExportPDF = () => {
    toast({
      title: "جاري التصدير",
      description: "سيتم تحميل ملف PDF قريباً"
    });
  };

  const handleSubscribe = () => {
    if (!email) {
      toast({
        title: "البريد الإلكتروني مطلوب",
        description: "يرجى إدخال بريدك الإلكتروني للاشتراك",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "تم الاشتراك بنجاح",
      description: "سيصلك جديد أدوات الموارد البشرية على بريدك الإلكتروني"
    });
    setEmail('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground">حاسبة نهاية الخدمة</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            احسب مكافأة نهاية الخدمة بسهولة وفقاً لنظام العمل السعودي والتأمينات الاجتماعية
          </p>
        </div>

        {/* Input Form */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              بيانات الموظف
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Employee Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">جنسية الموظف</Label>
                <RadioGroup
                  value={employeeType}
                  onValueChange={(value: 'saudi' | 'non-saudi') => setEmployeeType(value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="saudi" id="saudi" />
                    <Label htmlFor="saudi">سعودي</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="non-saudi" id="non-saudi" />
                    <Label htmlFor="non-saudi">غير سعودي</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Termination Type */}
              <div className="space-y-3">
                <Label className="text-base font-medium">نوع انتهاء الخدمة</Label>
                <RadioGroup
                  value={terminationType}
                  onValueChange={(value: 'resignation' | 'termination') => setTerminationType(value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="resignation" id="resignation" />
                    <Label htmlFor="resignation">استقالة</Label>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value="termination" id="termination" />
                    <Label htmlFor="termination">إنهاء خدمة</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Join Date */}
              <div className="space-y-2">
                <Label htmlFor="join-date" className="text-base font-medium">
                  تاريخ بداية العمل
                </Label>
                <Input
                  id="join-date"
                  type="date"
                  value={joinDate}
                  onChange={(e) => setJoinDate(e.target.value)}
                  className="text-right"
                />
              </div>

              {/* End Date */}
              <div className="space-y-2">
                <Label htmlFor="end-date" className="text-base font-medium">
                  تاريخ انتهاء الخدمة
                </Label>
                <Input
                  id="end-date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="text-right"
                />
              </div>

              {/* Basic Salary */}
              <div className="space-y-2">
                <Label htmlFor="basic-salary" className="text-base font-medium">
                  الراتب الأساسي (ريال سعودي)
                </Label>
                <Input
                  id="basic-salary"
                  type="number"
                  placeholder="0.00"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(e.target.value)}
                  className="text-right"
                />
              </div>

              {/* Housing Allowance */}
              <div className="space-y-2">
                <Label htmlFor="housing-allowance" className="text-base font-medium">
                  بدل السكن (اختياري)
                </Label>
                <Input
                  id="housing-allowance"
                  type="number"
                  placeholder="0.00"
                  value={housingAllowance}
                  onChange={(e) => setHousingAllowance(e.target.value)}
                  className="text-right"
                />
              </div>

              {/* Other Allowances */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="other-allowances" className="text-base font-medium">
                  البدلات الإضافية (اختياري)
                </Label>
                <Input
                  id="other-allowances"
                  type="number"
                  placeholder="0.00"
                  value={otherAllowances}
                  onChange={(e) => setOtherAllowances(e.target.value)}
                  className="text-right"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {result && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Main Result */}
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-center text-xl">
                  مكافأة نهاية الخدمة المستحقة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {result.endOfServiceBenefit.toLocaleString('ar-SA')}
                  </div>
                  <div className="text-lg text-muted-foreground">ريال سعودي</div>
                </div>
              </CardContent>
            </Card>

            {/* Details */}
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>تفاصيل الحساب</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDetails(!showDetails)}
                    className="flex items-center gap-2"
                  >
                    {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    {showDetails ? 'إخفاء التفاصيل' : 'عرض تفاصيل الحساب'}
                  </Button>
                </div>
              </CardHeader>
              {showDetails && (
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">فترة الخدمة:</span>
                        <span className="font-medium">{result.servicePeriod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">سنوات الخدمة:</span>
                        <span className="font-medium">{result.years} سنة</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">الأجر الخاضع للمكافأة:</span>
                        <span className="font-medium">{result.monthlyWage.toLocaleString('ar-SA')} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">إجمالي الراتب الشهري:</span>
                        <span className="font-medium">{result.totalMonthlyWage.toLocaleString('ar-SA')} ريال</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">نوع الانتهاء:</span>
                        <Badge variant={terminationType === 'resignation' ? 'secondary' : 'default'}>
                          {terminationType === 'resignation' ? 'استقالة' : 'إنهاء خدمة'}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">جنسية الموظف:</span>
                        <Badge variant="outline">
                          {employeeType === 'saudi' ? 'سعودي' : 'غير سعودي'}
                        </Badge>
                      </div>
                    </div>
                    <div className="pt-4 border-t">
                      <Button onClick={handleExportPDF} className="w-full flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        تصدير تقرير نهاية الخدمة PDF
                      </Button>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        )}

        {/* Newsletter Subscription */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-2">اشترك ليصلك جديد أدوات الموارد البشرية</h3>
              <p className="text-muted-foreground text-sm">احصل على آخر التحديثات والأدوات المفيدة لإدارة الموارد البشرية</p>
            </div>
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="text-right"
              />
              <Button onClick={handleSubscribe} className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                إرسال
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <Card>
          <CardHeader>
            <CardTitle>الأسئلة الشائعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">كيف تُحسب مكافأة نهاية الخدمة؟</h4>
                <p className="text-sm text-muted-foreground">
                  تُحسب بناءً على الراتب الأساسي وبدل السكن مضروباً في سنوات الخدمة، مع اختلاف النسبة حسب نوع انتهاء الخدمة وجنسية الموظف.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">ما الفرق بين الاستقالة وإنهاء الخدمة؟</h4>
                <p className="text-sm text-muted-foreground">
                  في حالة الاستقالة، يستحق السعودي نصف المكافأة للسنوات الأولى (2-5 سنوات) والمكافأة الكاملة بعد 5 سنوات. في حالة إنهاء الخدمة، يستحق المكافأة الكاملة.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">هل البدلات الإضافية تدخل في حساب المكافأة؟</h4>
                <p className="text-sm text-muted-foreground">
                  لا، تُحسب المكافأة على الراتب الأساسي وبدل السكن فقط وفقاً لنظام العمل السعودي.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
