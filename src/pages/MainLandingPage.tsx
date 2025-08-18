import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Users, 
  Building2, 
  Heart,
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowLeft,
  Star,
  CheckCircle,
  BarChart3,
  Shield,
  Brain,
  Clock,
  Calendar,
  UserCheck,
  FileText,
  Award,
  Zap,
  Globe,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Twitter,
  MessageCircle,
  Video
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { LoginPortalsDialog } from '@/components/LoginPortalsDialog';
import budLogo from '@/assets/bud-logo.png';

const MainLandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isYearlyPricing, setIsYearlyPricing] = useState(false);
  
  // Set document direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.body.classList.toggle('rtl', i18n.language === 'ar');
  }, [i18n.language]);

  // Demo data
  const stats = [
    { number: '1000+', label: t('hero.stats.clients') },
    { number: '99.9%', label: t('hero.stats.uptime') },
    { number: '50M+', label: t('hero.stats.transactions') }
  ];

  const features = [
    {
      icon: Users,
      title: t('features.employee_management'),
      description: t('features.employee_management_desc'),
      href: '/features/employee-management'
    },
    {
      icon: BarChart3,
      title: t('features.payroll'),
      description: t('features.payroll_desc'),
      href: '/features/payroll'
    },
    {
      icon: UserCheck,
      title: t('features.attendance'),
      description: t('features.attendance_desc'),
      href: '/features/attendance'
    },
    {
      icon: Award,
      title: t('features.performance'),
      description: t('features.performance_desc'),
      href: '/features/performance'
    },
    {
      icon: Brain,
      title: t('features.recruitment'),
      description: t('features.recruitment_desc'),
      href: '/features/recruitment'
    },
    {
      icon: Shield,
      title: t('features.compliance'),
      description: t('features.compliance_desc'),
      href: '/features/compliance'
    },
    {
      icon: Clock,
      title: t('features.self_service'),
      description: t('features.self_service_desc'),
      href: '/features/self-service'
    },
    {
      icon: Zap,
      title: t('features.analytics'),
      description: t('features.analytics_desc'),
      href: '/features/analytics'
    },
    {
      icon: Globe,
      title: t('features.integration'),
      description: t('features.integration_desc'),
      href: '/integrations'
    }
  ];

  const servicesSummary = [
    {
      icon: Users,
      title: t('services.employee.title'),
      description: t('services.employee.desc'),
      href: '/features/employee-services',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: Building2,
      title: t('services.employer.title'),
      description: t('services.employer.desc'),
      href: '/features/employer-services',
      gradient: 'from-green-500 to-green-600'
    },
    {
      icon: Heart,
      title: t('services.nonprofit.title'),
      description: t('services.nonprofit.desc'),
      href: '/features/nonprofit-services',
      gradient: 'from-purple-500 to-purple-600'
    }
  ];

  const integrations = [
    { name: t('integrations.gosi'), logo: '🏛️' },
    { name: t('integrations.banks'), logo: '🏦' },
    { name: t('integrations.govt'), logo: '🏢' },
    { name: t('integrations.sso'), logo: '🔐' }
  ];

  const testimonials = [
    {
      name: 'أحمد المحمد',
      position: 'مدير الموارد البشرية',
      company: 'شركة النخبة للتقنية',
      text: 'منصة بُعد غيرت طريقة عملنا بالكامل. أصبحت العمليات أسرع وأكثر دقة، ووفرنا ٤٠٪ من الوقت في معالجة طلبات الموظفين.',
      rating: 5
    },
    {
      name: 'سارة الأحمد',
      position: 'الرئيس التنفيذي',
      company: 'مؤسسة الرياض الخيرية',
      text: 'الحلول المخصصة للقطاع غير الربحي ساعدتنا في إدارة المتطوعين والمشاريع بكفاءة عالية. النتائج فاقت توقعاتنا.',
      rating: 5
    },
    {
      name: 'محمد العتيبي',
      position: 'مدير العمليات',
      company: 'شركة الخليج للاستشارات',
      text: 'الذكاء الاصطناعي المدمج في المنصة يوفر رؤى قيمة تساعدنا في اتخاذ قرارات استراتيجية مدروسة.',
      rating: 5
    }
  ];

  const pricingPlans = [
    {
      name: t('pricing.basic'),
      monthlyPrice: 299,
      yearlyPrice: 2390,
      features: ['إدارة الموظفين', 'كشوف الرواتب', 'تتبع الحضور', 'الدعم الأساسي'],
      popular: false
    },
    {
      name: t('pricing.professional'),
      monthlyPrice: 599,
      yearlyPrice: 4790,
      features: ['جميع مميزات الأساسية', 'تقييم الأداء', 'التوظيف الذكي', 'التحليلات المتقدمة', 'الدعم المميز'],
      popular: true
    },
    {
      name: t('pricing.enterprise'),
      monthlyPrice: 999,
      yearlyPrice: 7990,
      features: ['جميع المميزات', 'حلول مخصصة', 'تكاملات متقدمة', 'مدير حساب مخصص', 'دعم ٢٤/٧'],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <img src={budLogo} alt="بُعد HR" className="h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            <button 
              onClick={() => navigate('/features')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('nav.features')}
            </button>
            <button 
              onClick={() => navigate('/knowledge')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('nav.knowledge')}
            </button>
            <button 
              onClick={() => navigate('/guides')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('nav.guides')}
            </button>
            <button 
              onClick={() => navigate('/pricing')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('nav.pricing')}
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="text-foreground hover:text-primary transition-colors"
            >
              {t('nav.contact')}
            </button>
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            <LanguageSwitcher />
            <Button 
              variant="outline" 
              onClick={() => setShowLoginDialog(true)}
            >
              {t('nav.login')}
            </Button>
            <Button 
              onClick={() => navigate('/schedule')}
              className="bg-primary hover:bg-primary/90"
            >
              {t('nav.schedule')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background p-4">
            <nav className="space-y-4">
              <button 
                onClick={() => navigate('/features')}
                className="block w-full text-right rtl:text-left text-foreground hover:text-primary"
              >
                {t('nav.features')}
              </button>
              <button 
                onClick={() => navigate('/knowledge')}
                className="block w-full text-right rtl:text-left text-foreground hover:text-primary"
              >
                {t('nav.knowledge')}
              </button>
              <button 
                onClick={() => navigate('/guides')}
                className="block w-full text-right rtl:text-left text-foreground hover:text-primary"
              >
                {t('nav.guides')}
              </button>
              <button 
                onClick={() => navigate('/pricing')}
                className="block w-full text-right rtl:text-left text-foreground hover:text-primary"
              >
                {t('nav.pricing')}
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="block w-full text-right rtl:text-left text-foreground hover:text-primary"
              >
                {t('nav.contact')}
              </button>
              <div className="pt-4 border-t border-border space-y-2">
                <LanguageSwitcher />
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowLoginDialog(true)}
                >
                  {t('nav.login')}
                </Button>
                <Button 
                  className="w-full bg-primary hover:bg-primary/90"
                  onClick={() => navigate('/schedule')}
                >
                  {t('nav.schedule')}
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
            {t('hero.title')}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            {t('hero.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 px-8 py-3 text-lg"
              onClick={() => setShowLoginDialog(true)}
            >
              {t('hero.cta.demo')}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-3 text-lg"
              onClick={() => navigate('/schedule')}
            >
              {t('hero.cta.meeting')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Summary */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('services.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesSummary.map((service, index) => (
              <Card 
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border"
                onClick={() => navigate(service.href)}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-4`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border"
                onClick={() => navigate(feature.href)}
              >
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              {t('integrations.title')}
            </h2>
            <p className="text-muted-foreground">
              {t('integrations.desc')}
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8">
            {integrations.map((integration, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-card p-4 rounded-lg border border-border hover:shadow-md transition-shadow"
              >
                <span className="text-2xl">{integration.logo}</span>
                <span className="font-medium">{integration.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('testimonials.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="border-t pt-4">
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    <p className="text-sm text-primary">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge & Learning */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('knowledge.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('knowledge.desc')}
            </p>
            
            <div className="max-w-md mx-auto mb-12">
              <div className="relative">
                <Input 
                  placeholder={t('knowledge.search')}
                  className="pl-10 rtl:pr-10 rtl:pl-4"
                />
                <Search className="absolute right-3 rtl:left-3 rtl:right-auto top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border"
              onClick={() => navigate('/knowledge')}
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{t('knowledge.center')}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  مقالات شاملة حول قانون العمل السعودي وأدلة المنتج والأسئلة الشائعة
                </p>
              </CardContent>
            </Card>

            <Card 
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border"
              onClick={() => navigate('/guides')}
            >
              <CardHeader>
                <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center mb-4">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold">{t('knowledge.tutorials')}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  شروحات مصورة خطوة بخطوة مع بحث داخلي لسهولة الوصول للمحتوى
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('pricing.title')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('pricing.subtitle')}
            </p>

            {/* Pricing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={`${!isYearlyPricing ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {t('pricing.monthly')}
              </span>
              <button
                onClick={() => setIsYearlyPricing(!isYearlyPricing)}
                className={`relative w-16 h-8 rounded-full transition-colors ${
                  isYearlyPricing ? 'bg-primary' : 'bg-muted'
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    isYearlyPricing ? 'translate-x-8 rtl:-translate-x-8' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
              <span className={`${isYearlyPricing ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
                {t('pricing.yearly')}
              </span>
              {isYearlyPricing && (
                <Badge className="bg-green-500 text-white">
                  {t('pricing.save')} 20%
                </Badge>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card 
                key={index}
                className={`relative border-border ${plan.popular ? 'ring-2 ring-primary shadow-lg' : ''}`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                    الأكثر شيوعاً
                  </Badge>
                )}
                <CardHeader className="text-center pb-8">
                  <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">
                      {isYearlyPricing ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-muted-foreground mr-2 rtl:ml-2">
                      ر.س / {isYearlyPricing ? 'سنة' : 'شهر'}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full"
                    variant={plan.popular ? 'default' : 'outline'}
                    onClick={() => setShowLoginDialog(true)}
                  >
                    {t('pricing.cta')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('contact.desc')}
          </h2>
          <p className="text-xl opacity-90 mb-8">
            ابدأ رحلتك نحو إدارة موارد بشرية أكثر ذكاءً وفعالية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-3 text-lg"
              onClick={() => navigate('/schedule')}
            >
              {t('hero.cta.meeting')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-3 text-lg border-white text-white hover:bg-white hover:text-primary"
              onClick={() => setShowLoginDialog(true)}
            >
              {t('hero.cta.demo')}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <img src={budLogo} alt="بُعد HR" className="h-10 w-auto" />
              </div>
              <p className="text-muted-foreground mb-4">
                منصة ذكية لإدارة الموارد البشرية مدعومة بالذكاء الاصطناعي
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm">
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold mb-4">{t('footer.product')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => navigate('/features')}>المميزات</button></li>
                <li><button onClick={() => navigate('/pricing')}>الباقات</button></li>
                <li><button onClick={() => navigate('/integrations')}>التكاملات</button></li>
                <li><button onClick={() => navigate('/status')}>حالة النظام</button></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold mb-4">{t('footer.resources')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => navigate('/knowledge')}>مركز المعرفة</button></li>
                <li><button onClick={() => navigate('/guides')}>الشروحات</button></li>
                <li><button onClick={() => navigate('/contact')}>الدعم الفني</button></li>
                <li><button onClick={() => navigate('/schedule')}>حجز اجتماع</button></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">{t('footer.policies')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><button onClick={() => navigate('/privacy')}>سياسة الخصوصية</button></li>
                <li><button onClick={() => navigate('/terms')}>شروط الاستخدام</button></li>
                <li><button onClick={() => navigate('/contact')}>تواصل معنا</button></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 بُعد HR. {t('footer.rights')}
            </p>
            <div className="mt-4 sm:mt-0">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </footer>

      {/* Login Portals Dialog */}
      <LoginPortalsDialog 
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
      />
    </div>
  );
};

export default MainLandingPage;