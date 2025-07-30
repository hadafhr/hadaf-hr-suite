import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Users, 
  Gift, 
  CheckCircle, 
  Star,
  Phone,
  Mail,
  Building,
  Award,
  TrendingUp,
  Target,
  Handshake
} from 'lucide-react';

export const EarnWithBoad: React.FC = () => {
  const [formData, setFormData] = useState({
    referrerName: '',
    referrerPhone: '',
    referrerEmail: '',
    companyName: '',
    companyPhone: '',
    companyEmail: '',
    expectedEmployees: '',
    notes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // هنا سيتم إرسال البيانات لاحقاً
    setIsSubmitted(true);
  };

  const benefits = [
    {
      icon: DollarSign,
      title: 'مكافآت مالية ضخمة',
      description: 'احصل على مكافآت تصل إلى 15,000 ريال سعودي لكل ترشيح مقبول'
    },
    {
      icon: Users,
      title: 'شبكة واسعة من العملاء',
      description: 'انضم إلى شبكة أكثر من 1000 شركة تثق في نظام بُعد'
    },
    {
      icon: Award,
      title: 'مكافآت متدرجة',
      description: 'كلما زاد عدد ترشيحاتك المقبولة، زادت قيمة المكافآت'
    },
    {
      icon: Handshake,
      title: 'دعم كامل',
      description: 'فريق متخصص لمساعدتك في عملية الترشيح والمتابعة'
    }
  ];

  const rewardTiers = [
    {
      employees: '1-50',
      reward: '5,000',
      color: 'bg-green-500'
    },
    {
      employees: '51-100',
      reward: '8,000',
      color: 'bg-blue-500'
    },
    {
      employees: '101-200',
      reward: '12,000',
      color: 'bg-purple-500'
    },
    {
      employees: '200+',
      reward: '15,000',
      color: 'bg-gold-500'
    }
  ];

  const steps = [
    {
      number: 1,
      title: 'املأ بيانات الترشيح',
      description: 'أدخل بياناتك وبيانات الشركة المرشحة'
    },
    {
      number: 2,
      title: 'تواصل فريقنا مع الشركة',
      description: 'سيقوم فريق المبيعات بالتواصل مع الشركة المرشحة'
    },
    {
      number: 3,
      title: 'اشتراك الشركة',
      description: 'عند اشتراك الشركة في النظام واستخدامه'
    },
    {
      number: 4,
      title: 'احصل على مكافأتك',
      description: 'ستحصل على مكافأتك المالية خلال 30 يوم'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto border-green-200 dark:border-green-800">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-green-500 rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                
                <h2 className="text-3xl font-bold text-green-800 dark:text-green-200">
                  تم استلام بيانات الترشيح بنجاح!
                </h2>
                
                <p className="text-lg text-green-700 dark:text-green-300 leading-relaxed">
                  شكراً لك على ثقتك في برنامج "اربح مع بُعد". سيتواصل معك فريقنا خلال 24 ساعة لمتابعة ترشيحك.
                </p>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                    الخطوات التالية:
                  </h3>
                  <ul className="text-green-700 dark:text-green-300 text-sm space-y-1 text-right">
                    <li>• سيتم مراجعة بيانات الترشيح</li>
                    <li>• التواصل مع الشركة المرشحة</li>
                    <li>• متابعة عملية الاشتراك</li>
                    <li>• إخبارك بحالة الترشيح</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-green-500 text-green-700 hover:bg-green-50"
                >
                  إرسال ترشيح آخر
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 flex items-center justify-center gap-4">
            <Gift className="h-12 w-12 text-primary" />
            اربح مع بُعد
          </h1>
          <div className="max-w-4xl mx-auto space-y-4">
            <p className="text-2xl text-primary font-bold">
              شارك بيانات الترشيح الآن
            </p>
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              اربح حتى <span className="text-3xl font-bold text-green-600">15,000 ريال سعودي</span> مقابل كل ترشيح مقبول لمنشأة تشترك بنظام بُعد
            </p>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <benefit.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reward Tiers */}
        <Card className="mb-12 border-gold-200 dark:border-gold-800">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <TrendingUp className="h-6 w-6 text-gold-600" />
              جدول المكافآت حسب حجم الشركة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              {rewardTiers.map((tier, index) => (
                <div key={index} className="text-center">
                  <div className={`w-20 h-20 ${tier.color} rounded-full mx-auto mb-3 flex items-center justify-center`}>
                    <span className="text-white font-bold text-lg">{tier.employees}</span>
                  </div>
                  <p className="font-semibold text-sm text-muted-foreground mb-1">
                    عدد الموظفين
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {tier.reward} ر.س
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Steps Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-center flex items-center justify-center gap-2">
              <Target className="h-6 w-6" />
              كيف يعمل البرنامج؟
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{step.number}</span>
                  </div>
                  <h3 className="font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Referral Form */}
        <Card className="max-w-4xl mx-auto border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              <Star className="h-6 w-6 text-gold-500 inline mr-2" />
              نموذج بيانات الترشيح
            </CardTitle>
            <p className="text-center text-muted-foreground">
              املأ البيانات التالية لترشيح شركة جديدة للاشتراك في نظام بُعد
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* بيانات المرشح */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  بياناتك الشخصية
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الاسم الكامل *</label>
                    <Input
                      name="referrerName"
                      value={formData.referrerName}
                      onChange={handleInputChange}
                      placeholder="أدخل اسمك الكامل"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">رقم الجوال *</label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="referrerPhone"
                        value={formData.referrerPhone}
                        onChange={handleInputChange}
                        placeholder="05xxxxxxxx"
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">البريد الإلكتروني *</label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="referrerEmail"
                        type="email"
                        value={formData.referrerEmail}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* بيانات الشركة المرشحة */}
              <div className="space-y-4 border-t pt-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Building className="h-5 w-5 text-primary" />
                  بيانات الشركة المرشحة
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">اسم الشركة/المؤسسة *</label>
                    <Input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="اسم الشركة"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">رقم جوال الشركة *</label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="companyPhone"
                        value={formData.companyPhone}
                        onChange={handleInputChange}
                        placeholder="رقم جوال الشركة"
                        className="pr-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">البريد الإلكتروني للشركة</label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="companyEmail"
                        type="email"
                        value={formData.companyEmail}
                        onChange={handleInputChange}
                        placeholder="company@email.com"
                        className="pr-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">العدد المتوقع للموظفين *</label>
                    <Input
                      name="expectedEmployees"
                      type="number"
                      value={formData.expectedEmployees}
                      onChange={handleInputChange}
                      placeholder="عدد الموظفين"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium">ملاحظات إضافية</label>
                    <Textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="أي معلومات إضافية عن الشركة أو الترشيح..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6 border-t">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 px-12 py-3 text-lg"
                >
                  <Gift className="h-5 w-5 ml-2" />
                  إرسال بيانات الترشيح
                </Button>
                <p className="text-sm text-muted-foreground mt-3">
                  سيتم التواصل معك خلال 24 ساعة لمتابعة عملية الترشيح
                </p>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Terms Section */}
        <Card className="mt-8 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20">
          <CardContent className="p-6">
            <h3 className="font-bold text-yellow-800 dark:text-yellow-200 mb-3">
              شروط وأحكام البرنامج:
            </h3>
            <ul className="text-yellow-700 dark:text-yellow-300 text-sm space-y-2 text-right">
              <li>• يتم صرف المكافأة فقط عند اشتراك الشركة المرشحة واستخدامها الفعلي للنظام لمدة 30 يوم على الأقل</li>
              <li>• المكافأة تُحدد حسب عدد الموظفين المسجلين فعلياً في النظام</li>
              <li>• يجب أن تكون الشركة المرشحة جديدة ولم تتواصل مع بُعد من قبل</li>
              <li>• يتم صرف المكافأة خلال 30 يوم من تأكيد اشتراك الشركة</li>
              <li>• بُعد تحتفظ بالحق في تعديل شروط البرنامج في أي وقت</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};