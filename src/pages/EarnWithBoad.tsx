import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/Breadcrumb';
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
  Handshake,
  AlertCircle
} from 'lucide-react';
import buodLogo from '@/assets/buod-logo-white.png';

export const EarnWithBoad: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';
  
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
      color: 'bg-accent'
    },
    {
      employees: '51-100',
      reward: '8,000',
      color: 'bg-accent/90'
    },
    {
      employees: '101-200',
      reward: '12,000',
      color: 'bg-accent/80'
    },
    {
      employees: '200+',
      reward: '15,000',
      color: 'bg-accent/70'
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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto bg-card/60 backdrop-blur-xl shadow-2xl border border-border">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-accent rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-background" />
                </div>
                
                <h2 className="text-3xl font-bold text-foreground">
                  تم استلام بيانات الترشيح بنجاح!
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  شكراً لك على ثقتك في برنامج "اربح مع بُعد". سيتواصل معك فريقنا خلال 24 ساعة لمتابعة ترشيحك.
                </p>
                
                <div className="bg-accent/20 p-4 rounded-lg border border-accent/30">
                  <h3 className="font-semibold text-foreground mb-2">
                    الخطوات التالية:
                  </h3>
                  <ul className="text-muted-foreground text-sm space-y-1 text-right">
                    <li>• سيتم مراجعة بيانات الترشيح</li>
                    <li>• التواصل مع الشركة المرشحة</li>
                    <li>• متابعة عملية الاشتراك</li>
                    <li>• إخبارك بحالة الترشيح</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-accent hover:bg-accent/90 text-background font-bold transition-all duration-300 hover:scale-105"
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
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#b1a086" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-card/50 backdrop-blur-xl border-b border-border shadow-2xl">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent/70 to-accent/50 opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="hover:scale-105 transition-all duration-300">
                <img 
                  src={buodLogo} 
                  alt="Buod HR" 
                  className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" 
                />
              </Link>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Gift className="h-8 w-8 text-accent animate-pulse" />
                <div className="absolute -inset-1 bg-accent/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
                  {isArabic ? 'اربح مع بُعد' : 'Earn with Buod'}
                </h1>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  {isArabic ? 'برنامج الترشيحات والمكافآت' : 'Referral & Rewards Program'}
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-card/40 backdrop-blur-xl rounded-2xl border border-border shadow-xl p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {isArabic ? 'حالة البرنامج' : 'Program Status'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <span className="text-xs text-green-300 font-semibold">
                      {isArabic ? 'متاح' : 'Active'}
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3"></div>
                
                {/* Language & Settings Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  {/* Language Toggle Button */}
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    tabIndex={0}
                    aria-label={isArabic ? 'تغيير اللغة إلى الإنجليزية' : 'Change language to Arabic'}
                    className="group relative flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-accent/40 hover:border-accent/70 hover:bg-accent/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent/50 shadow-lg hover:shadow-accent/20"
                  >
                    {/* Language Text */}
                    <span className="text-sm text-foreground font-bold tracking-wider group-hover:text-accent transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                    
                    {/* Animated Indicator */}
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-accent shadow-lg shadow-accent/40 group-hover:shadow-accent/60 transition-all duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent opacity-0 group-hover:opacity-30 animate-ping"></div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                { label: isArabic ? 'اربح مع بُعد' : 'Earn with Buod', path: '/earn-with-boad' }
              ]}
            />
          </div>
        </div>
        
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-accent/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <img 
              src={buodLogo} 
              alt="Buod HR Logo" 
              className="h-64 w-64 z-10 relative drop-shadow-2xl transition-all duration-300 group-hover:scale-110 object-contain filter brightness-200 contrast-125"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-foreground bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent leading-tight">
            {isArabic ? 'اربح مع بُعد - برنامج الترشيحات' : 'Earn with Buod - Referral Program'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-muted-foreground text-lg leading-relaxed bg-card/20 backdrop-blur-sm p-6 rounded-2xl border border-border shadow-xl">
              {isArabic 
                ? 'اربح حتى 15,000 ريال سعودي مقابل كل ترشيح مقبول لمنشأة تشترك بنظام بُعد - معتمد وفقاً لأنظمة المملكة العربية السعودية'
                : 'Earn up to 15,000 SAR for each accepted referral of an organization that subscribes to Buod system - Certified according to Saudi Arabia regulations'
              }
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="group bg-card/60 backdrop-blur-xl shadow-2xl border border-border hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-accent/20">
                <CardContent className="p-6 text-center bg-card/40">
                  <div className="w-16 h-16 bg-accent/20 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:bg-accent/30 transition-all duration-300">
                    <benefit.icon className="h-8 w-8 text-accent group-hover:text-foreground transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Reward Tiers */}
        <Card className="max-w-6xl mx-auto mb-12 bg-card/60 backdrop-blur-xl shadow-2xl border border-border hover:border-accent/50 transition-all duration-300">
          <CardHeader className="bg-accent text-foreground rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-background/10"></div>
            <CardTitle className="text-center flex items-center justify-center gap-2 relative z-10">
              <TrendingUp className="h-6 w-6 text-foreground" />
              جدول المكافآت حسب حجم الشركة
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-card/40">
            <div className="grid md:grid-cols-4 gap-4">
              {rewardTiers.map((tier, index) => (
                <div key={index} className="text-center">
                  <div className={`w-20 h-20 ${tier.color} rounded-full mx-auto mb-3 flex items-center justify-center shadow-lg`}>
                    <span className="text-white font-bold text-lg">{tier.employees}</span>
                  </div>
                  <p className="font-semibold text-sm text-muted-foreground mb-1">
                    عدد الموظفين
                  </p>
                  <p className="text-2xl font-bold text-accent">
                    {tier.reward} ر.س
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Steps Section */}
        <Card className="max-w-6xl mx-auto mb-12 bg-card/60 backdrop-blur-xl shadow-2xl border border-border hover:border-accent/50 transition-all duration-300">
          <CardHeader className="bg-accent text-foreground rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-background/10"></div>
            <CardTitle className="text-center flex items-center justify-center gap-2 relative z-10">
              <Target className="h-6 w-6 text-foreground" />
              كيف يعمل البرنامج؟
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 bg-card/40">
            <div className="grid md:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-accent rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg">
                    <span className="text-background font-bold text-lg">{step.number}</span>
                  </div>
                  <h3 className="font-bold mb-2 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Referral Form */}
        <Card className="max-w-4xl mx-auto mb-12 bg-card/60 backdrop-blur-xl shadow-2xl border border-border hover:border-accent/50 transition-all duration-300">
          <CardHeader className="bg-accent text-foreground rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-background/10"></div>
            <CardTitle className="text-center text-2xl relative z-10">
              <Star className="h-6 w-6 text-foreground inline mr-2" />
              نموذج بيانات الترشيح
            </CardTitle>
            <p className="text-center text-foreground/90 relative z-10">
              املأ البيانات التالية لترشيح شركة جديدة للاشتراك في نظام بُعد
            </p>
          </CardHeader>
          
          <CardContent className="p-6 bg-card/40">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* بيانات المرشح */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <Users className="h-5 w-5 text-accent" />
                  بياناتك الشخصية
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">الاسم الكامل *</label>
                    <Input
                      name="referrerName"
                      value={formData.referrerName}
                      onChange={handleInputChange}
                      placeholder="أدخل اسمك الكامل"
                      className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/50 hover:border-accent/70 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">رقم الجوال *</label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="referrerPhone"
                        value={formData.referrerPhone}
                        onChange={handleInputChange}
                        placeholder="05xxxxxxxx"
                        className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/50 hover:border-accent/70 transition-all duration-200 pr-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">البريد الإلكتروني *</label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="referrerEmail"
                        type="email"
                        value={formData.referrerEmail}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/50 hover:border-accent/70 transition-all duration-200 pr-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* بيانات الشركة المرشحة */}
              <div className="space-y-4 border-t border-border pt-6">
                <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
                  <Building className="h-5 w-5 text-accent" />
                  بيانات الشركة المرشحة
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">اسم الشركة/المؤسسة *</label>
                    <Input
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="اسم الشركة"
                      className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/50 hover:border-accent/70 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">رقم جوال الشركة *</label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="companyPhone"
                        value={formData.companyPhone}
                        onChange={handleInputChange}
                        placeholder="رقم جوال الشركة"
                        className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/50 hover:border-accent/70 transition-all duration-200 pr-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">البريد الإلكتروني للشركة</label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        name="companyEmail"
                        type="email"
                        value={formData.companyEmail}
                        onChange={handleInputChange}
                        placeholder="company@email.com"
                        className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/50 hover:border-accent/70 transition-all duration-200 pr-10"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">العدد المتوقع للموظفين *</label>
                    <Input
                      name="expectedEmployees"
                      type="number"
                      value={formData.expectedEmployees}
                      onChange={handleInputChange}
                      placeholder="عدد الموظفين"
                      className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/50 hover:border-accent/70 transition-all duration-200"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-medium text-muted-foreground">ملاحظات إضافية</label>
                    <Textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="أي معلومات إضافية عن الشركة أو الترشيح..."
                      rows={3}
                      className="bg-card/50 border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent/50 hover:border-accent/70 transition-all duration-200 resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center pt-6 border-t border-border">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="bg-accent hover:bg-accent/90 text-background font-bold px-12 py-3 text-lg transition-all duration-300 hover:scale-105 shadow-xl shadow-accent/30"
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
        <div className="mt-8 p-6 bg-muted/20 border border-border rounded-lg backdrop-blur-sm max-w-6xl mx-auto">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-accent mt-0.5 ml-3 animate-pulse" />
            <div>
              <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                <span className="text-2xl">⚖️</span>
                {isArabic ? 'شروط وأحكام البرنامج' : 'Program Terms & Conditions'}
              </h4>
              <ul className="text-muted-foreground text-sm space-y-2 text-right leading-relaxed">
                <li>• يتم صرف المكافأة فقط عند اشتراك الشركة المرشحة واستخدامها الفعلي للنظام لمدة 30 يوم على الأقل</li>
                <li>• المكافأة تُحدد حسب عدد الموظفين المسجلين فعلياً في النظام</li>
                <li>• لا يحق الحصول على مكافأة إضافية لنفس الشركة إذا كانت مشتركة مسبقاً</li>
                <li>• يحتفظ فريق بُعد بالحق في رفض أي ترشيح لا يتوافق مع معايير الجودة والمصداقية</li>
                <li>• جميع المكافآت تخضع للضرائب والرسوم المطبقة في المملكة العربية السعودية</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};