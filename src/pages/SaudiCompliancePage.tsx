import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BoudLogo } from '@/components/BoudLogo';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { DemoRequestModal } from '@/components/DemoRequestModal';
import { SystemTourModal } from '@/components/SystemTourModal';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Shield,
  AlertTriangle,
  FileCheck,
  Building2,
  Zap,
  Users,
  CheckCircle,
  Clock,
  Scale,
  TrendingUp,
  AlertCircle,
  FileText,
  Settings,
  Calendar,
  Eye,
  BookOpen,
  HeadphonesIcon,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Menu,
  X
} from 'lucide-react';

const SaudiCompliancePage = () => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'المنتجات', href: '/products' },
    { name: 'الحلول', href: '/solutions' },
    { name: 'المعرفة', href: '/knowledge' },
    { name: 'الدعم', href: '/support' },
    { name: 'من نحن', href: '/about' }
  ];

  // Timeline data - تطور قدرات الامتثال في بُعد
  const timelineItems = [
    {
      title: 'إدارة الإجازات والتوطين',
      description: 'نظام متكامل لإدارة الإجازات وفقاً لنظام العمل السعودي',
      year: '2020',
      status: 'completed'
    },
    {
      title: 'العمل الإضافي والتعويضات',
      description: 'حسابات دقيقة للعمل الإضافي والمكافآت والتعويضات',
      year: '2021',
      status: 'completed'
    },
    {
      title: 'التكامل مع GOSI و HRSD',
      description: 'ربط مباشر مع أنظمة التأمينات الاجتماعية وهدف',
      year: '2022',
      status: 'completed'
    },
    {
      title: 'متابعة الإقامة وتصاريح العمل',
      description: 'تنبيهات ذكية لانتهاء الإقامات وتصاريح العمل',
      year: '2023',
      status: 'completed'
    },
    {
      title: 'التكامل مع مدد و ZATCA',
      description: 'ربط مع منصة مدد والهيئة العامة للزكاة والضريبة',
      year: '2024',
      status: 'active'
    },
    {
      title: 'معالجة المخالفات واحتساب الغرامات',
      description: 'نظام ذكي لاكتشاف المخالفات وحساب الغرامات تلقائياً',
      year: '2024',
      status: 'active'
    },
    {
      title: 'التقارير الضريبية والفواتير',
      description: 'تقارير ضريبية متكاملة وفواتير إلكترونية معتمدة',
      year: '2025',
      status: 'upcoming'
    }
  ];

  // Features grid data
  const complianceFeatures = [
    {
      icon: AlertTriangle,
      title: 'تنبيهات تشريعية فورية',
      description: 'إشعار فوري عند صدور أي تعديل نظامي يؤثر على منشأتك'
    },
    {
      icon: Scale,
      title: 'امتثال تلقائي لنظام العمل',
      description: 'حسابات الرواتب والإجازات والعقود محدّثة دائماً'
    },
    {
      icon: TrendingUp,
      title: 'مؤشر الامتثال',
      description: 'لوحة تُظهر درجة التوافق الحالية مع جميع المتطلبات'
    },
    {
      icon: Building2,
      title: 'تكامل مع الجهات الحكومية',
      description: 'ربط مباشر مع GOSI و مدد و HRSD و ZATCA'
    },
    {
      icon: Zap,
      title: 'كشف المخالفات والعقوبات',
      description: 'اكتشاف آلي وتنبيه بالإجراءات التصحيحية المطلوبة'
    },
    {
      icon: FileText,
      title: 'توثيق قانوني تلقائي',
      description: 'عقود وفواتير ونماذج امتثال جاهزة ومعتمدة قانونياً'
    }
  ];

  // Customer testimonials
  const testimonials = [
    {
      quote: 'بُعد وفّر علينا مخاطر قانونية كبيرة وحسّن من كفاءة إدارة الموارد البشرية',
      author: 'أحمد المالكي',
      position: 'مدير الموارد البشرية',
      company: 'شركة الرياض للتطوير',
      logo: '/api/placeholder/120/60'
    },
    {
      quote: 'التحديثات التلقائية للقوانين ساعدتنا في البقاء متوافقين دون عناء',
      author: 'فاطمة السعيد',
      position: 'رئيسة قسم الامتثال',
      company: 'مجموعة سامبا المالية',
      logo: '/api/placeholder/120/60'
    },
    {
      quote: 'نظام موثوق وشامل قلّل من وقت المراجعة الحكومية بنسبة 70%',
      author: 'محمد العتيبي',
      position: 'المدير التنفيذي',
      company: 'شركة أرامكو السعودية',
      logo: '/api/placeholder/120/60'
    }
  ];

  // Related products
  const relatedProducts = [
    {
      title: 'الحزمة الأساسية',
      description: 'ملفات الموظفين، الرواتب، الحضور، الإجازات، الامتثال',
      icon: Users,
      href: '/basic-package'
    },
    {
      title: 'باقة المواهب',
      description: 'التوظيف، تقييم الأداء، التدريب، الاستبيانات',
      icon: TrendingUp,
      href: '/talent-package'
    },
    {
      title: 'باقة النفقات',
      description: 'بطاقات الشركات، المصروفات، التحليلات المالية',
      icon: FileCheck,
      href: '/expenses-package'
    }
  ];

  // Knowledge & Support links
  const knowledgeLinks = [
    { title: 'مدونة بُعد', href: '/blog', icon: BookOpen },
    { title: 'أوراق خضراء عن الموارد البشرية', href: '/green-papers', icon: FileText },
    { title: 'حاسبة الرواتب', href: '/hr-tools/salary-calculator', icon: Settings },
    { title: 'حاسبة مكافأة نهاية الخدمة', href: '/hr-tools/end-service-calculator', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground" dir="rtl">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Back Button + Logo */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary"
              >
                <ArrowRight className="w-4 h-4" />
                <span className="hidden sm:inline">العودة</span>
              </Button>
              <BoudLogo showText size="header" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigate(item.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                >
                  {item.name}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <Button
                onClick={() => setShowDemoModal(true)}
                className="btn-primary"
              >
                اطلب عرضاً توضيحياً
              </Button>
              
              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden"
              >
                {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {showMobileMenu && (
            <div className="md:hidden border-t bg-background/95 backdrop-blur">
              <div className="py-4 space-y-2">
                {navigationItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.href);
                      setShowMobileMenu(false);
                    }}
                    className="block w-full text-right px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted/50 rounded-md transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section with Timeline */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 title-gradient">
              إدارة الامتثال السعودي الشاملة
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              منصة بُعد تُبقي منشأتك متوافقة دائماً مع نظام العمل السعودي والتحديثات التشريعية المستمرة
            </p>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary-glow to-muted"></div>
            
            {timelineItems.map((item, index) => (
              <div key={index} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pl-12' : 'pr-12'}`}>
                  <Card className={`${index % 2 === 0 ? 'text-right' : 'text-left'} hover:shadow-lg transition-all duration-300`}>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant={item.status === 'completed' ? 'default' : item.status === 'active' ? 'secondary' : 'outline'}>
                          {item.status === 'completed' ? 'مكتمل' : item.status === 'active' ? 'نشط' : 'قريباً'}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{item.year}</span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="w-6 h-6 rounded-full bg-primary border-4 border-background shadow-lg relative z-10 flex items-center justify-center">
                  {item.status === 'completed' && <CheckCircle className="w-3 h-3 text-white" />}
                  {item.status === 'active' && <Clock className="w-3 h-3 text-white" />}
                  {item.status === 'upcoming' && <Eye className="w-3 h-3 text-white" />}
                </div>
                
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">ميزات الامتثال الشاملة</h2>
            <p className="text-xl text-muted-foreground">حلول متكاملة لضمان توافق منشأتك مع جميع الأنظمة السعودية</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {complianceFeatures.map((feature, index) => (
              <Card key={index} className="service-card group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">قصص نجاح عملائنا</h2>
            <p className="text-xl text-muted-foreground">شهادات حقيقية من مديري موارد بشرية في كبرى الشركات السعودية</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  <blockquote className="text-lg mb-6 text-center">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="text-center">
                    <div className="w-16 h-8 mx-auto mb-4 bg-muted rounded flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <h4 className="font-semibold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    <p className="text-sm text-primary font-medium">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">المنتجات المساندة</h2>
            <p className="text-xl text-muted-foreground">حلول متكاملة من بُعد لتلبية جميع احتياجات الموارد البشرية</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedProducts.map((product, index) => (
              <Card key={index} className="service-card cursor-pointer" onClick={() => navigate(product.href)}>
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <product.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{product.title}</h3>
                  <p className="text-muted-foreground mb-6">{product.description}</p>
                  <Button variant="outline" className="w-full">
                    اعرف المزيد
                    <ArrowRight className="w-4 h-4 mr-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">ابدأ رحلتك نحو الامتثال المثالي</h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            احجز عرضاً توضيحياً مخصصاً لمنشأتك أو جرّب جولة تفاعلية داخل منصة بُعد
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => setShowDemoModal(true)}
              className="btn-hero"
            >
              <Calendar className="w-5 h-5 ml-2" />
              احجز عرضاً توضيحياً
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => setShowTourModal(true)}
              className="bg-white hover:bg-muted"
            >
              <Eye className="w-5 h-5 ml-2" />
              جولة تفاعلية داخل بُعد
            </Button>
          </div>
        </div>
      </section>

      {/* Knowledge & Support */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">المعرفة والدعم</h2>
            <p className="text-xl text-muted-foreground">موارد شاملة لدعمك في رحلة إدارة الموارد البشرية</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {knowledgeLinks.map((link, index) => (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => navigate(link.href)}>
                <CardContent className="p-6 text-center">
                  <link.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{link.title}</h3>
                  <Button variant="ghost" size="sm">
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted border-t py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div>
              <BoudLogo showText size="lg" className="mb-6" />
              <p className="text-muted-foreground mb-4">
                منصة الموارد البشرية الرائدة في المملكة العربية السعودية
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon">
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Facebook className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4">الدعم</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="p-0 h-auto justify-start">الدعم الفني</Button>
                <Button variant="ghost" className="p-0 h-auto justify-start">المبيعات</Button>
                <Button variant="ghost" className="p-0 h-auto justify-start">التوظيف</Button>
              </div>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold mb-4">قانوني</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="p-0 h-auto justify-start">سياسة الخصوصية</Button>
                <Button variant="ghost" className="p-0 h-auto justify-start">سياسة الأمان</Button>
                <Button variant="ghost" className="p-0 h-auto justify-start">شروط الاستخدام</Button>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">تواصل معنا</h3>
              <div className="space-y-2 text-muted-foreground">
                <p>support@boud.com</p>
                <p>+966 11 234 5678</p>
                <p>الرياض، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground mb-4 md:mb-0">
              © 2025 بُعد HR. جميع الحقوق محفوظة
            </p>
            <p className="text-muted-foreground">
              صُنع بـ ❤️ في المملكة العربية السعودية
            </p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <DemoRequestModal 
        isOpen={showDemoModal} 
        onClose={() => setShowDemoModal(false)} 
      />
      
      <SystemTourModal 
        isOpen={showTourModal} 
        onClose={() => setShowTourModal(false)} 
      />
    </div>
  );
};

export default SaudiCompliancePage;