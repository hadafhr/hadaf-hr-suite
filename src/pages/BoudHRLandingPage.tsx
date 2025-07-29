import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building2, 
  Shield, 
  Brain,
  Target,
  BarChart3,
  CheckCircle,
  Star,
  ArrowLeft,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Globe,
  Linkedin,
  Twitter,
  MessageCircle,
  Play,
  Award,
  Zap,
  Lock,
  Cloud,
  Settings,
  FileText,
  Clock,
  ChevronDown
} from 'lucide-react';

const BoudHRLandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "إدارة الموظفين",
      description: "نظام شامل لإدارة بيانات الموظفين وتتبع مسيرتهم المهنية",
      icon: Users,
      color: "text-primary"
    },
    {
      title: "الخدمة الذاتية",
      description: "منصة تمكن الموظفين من إدارة طلباتهم وبياناتهم بأنفسهم",
      icon: Settings,
      color: "text-blue-600"
    },
    {
      title: "التقييمات الذكية",
      description: "نظام تقييم أداء متطور مدعوم بالذكاء الاصطناعي",
      icon: BarChart3,
      color: "text-orange-600"
    },
    {
      title: "حماية الأجور",
      description: "ضمان الامتثال الكامل لأنظمة حماية الأجور السعودية",
      icon: Shield,
      color: "text-green-600"
    },
    {
      title: "التكامل الحكومي",
      description: "ربط مباشر مع منصات مدد وقوى والتأمينات الاجتماعية",
      icon: Building2,
      color: "text-purple-600"
    },
    {
      title: "الذكاء الاصطناعي",
      description: "تحليل ذكي للأداء والتوصيات المدعومة بالذكاء الاصطناعي",
      icon: Brain,
      color: "text-primary"
    }
  ];

  const benefits = [
    {
      title: "أتمتة العمليات",
      description: "توفير 70% من الوقت المستغرق في العمليات اليدوية",
      icon: Zap,
      stat: "70%"
    },
    {
      title: "أمان البيانات",
      description: "حماية متقدمة تتوافق مع معايير الأمان السعودية",
      icon: Lock,
      stat: "100%"
    },
    {
      title: "الحوسبة السحابية",
      description: "وصول آمن من أي مكان وفي أي وقت",
      icon: Cloud,
      stat: "24/7"
    },
    {
      title: "الامتثال التنظيمي",
      description: "ضمان الامتثال لجميع اللوائح والقوانين السعودية",
      icon: CheckCircle,
      stat: "100%"
    }
  ];

  const testimonials = [
    {
      name: "أحمد المحمد",
      position: "مدير الموارد البشرية",
      company: "شركة الرياض للتقنية",
      text: "نظام بُعد HR غيّر طريقة عملنا بالكامل. الواجهة سهلة والمميزات متقدمة جداً.",
      rating: 5,
      image: "photo-1519389950473-47ba0277781c"
    },
    {
      name: "فاطمة السعيد",
      position: "مديرة العمليات",
      company: "مجموعة الخليج التجارية",
      text: "التكامل مع الأنظمة الحكومية وفر علينا وقتاً كبيراً وقلل من الأخطاء.",
      rating: 5,
      image: "photo-1488972685288-c3fd157d7c7a"
    },
    {
      name: "محمد الشمري",
      position: "الرئيس التنفيذي",
      company: "شركة الابتكار الرقمي",
      text: "الذكاء الاصطناعي في النظام يساعدنا في اتخاذ قرارات أفضل حول الموظفين.",
      rating: 5,
      image: "photo-1498050108023-c5249f4df085"
    }
  ];

  const stats = [
    { number: "1000+", label: "شركة تثق بنا" },
    { number: "100,000+", label: "موظف نديرهم" },
    { number: "99.9%", label: "وقت التشغيل" },
    { number: "24/7", label: "دعم متواصل" }
  ];

  const navigationItems = [
    { name: "الرئيسية", href: "#home" },
    { name: "الحلول", href: "#solutions" },
    { name: "الأسعار", href: "#pricing" },
    { name: "من نحن", href: "#about" },
    { name: "تواصل معنا", href: "#contact" }
  ];

  return (
    <div className="min-h-screen bg-background font-arabic">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">بُعد HR</h1>
                <p className="text-xs text-muted-foreground">إدارة الموارد البشرية</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              {navigationItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="navigation-item text-sm font-medium"
                >
                  {item.name}
                </a>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                تسجيل الدخول
              </Button>
              <Button className="btn-primary">
                طلب تجربة مجانية
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="navigation-item text-sm font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost" onClick={() => navigate('/login')}>
                    تسجيل الدخول
                  </Button>
                  <Button className="btn-primary">
                    طلب تجربة مجانية
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10"></div>
        <div className="container mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-right space-y-8 animate-fade-in">
              <div className="space-y-6">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium">
                  🚀 منصة سعودية 100% متوافقة مع رؤية 2030
                </Badge>
                
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  منصة <span className="text-gradient">بُعد HR</span>
                  <br />
                  أتمتة الموارد البشرية والامتثال الذكي
                </h1>
                
                <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
                  نظام سحابي متكامل لإدارة الموارد البشرية، يربط المنشآت والموظفين والأنظمة الحكومية، 
                  مدعوم بالذكاء الاصطناعي ومصمم خصيصاً للمنشآت السعودية.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button size="lg" className="btn-hero group">
                  ابدأ الآن
                  <ArrowLeft className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  شاهد العرض التوضيحي
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative animate-slide-up">
              <div className="relative bg-gradient-to-br from-primary/10 to-accent/20 rounded-3xl p-8 border border-border/50">
                <img 
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
                  alt="فريق عمل سعودي يستخدم نظام بُعد HR"
                  className="w-full h-96 object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
                
                {/* Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">98% معدل الرضا</div>
                      <div className="text-xs text-muted-foreground">من عملائنا</div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-medium">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Award className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">متوافق مع مدد</div>
                      <div className="text-xs text-muted-foreground">100% امتثال</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="solutions" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">مميزات النظام</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              حلول شاملة ومتطورة لتلبية جميع احتياجات إدارة الموارد البشرية
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="service-card group cursor-pointer"
                onMouseEnter={() => setActiveFeature(index)}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-8 h-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">لماذا بُعد HR؟</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              فوائد حقيقية وقابلة للقياس لعملك وموظفيك
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="metric-card group">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{benefit.title}</h3>
                        <span className="text-2xl font-bold text-primary">{benefit.stat}</span>
                      </div>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gradient">تعريف عن بُعد HR</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                <strong>بُعد</strong> هو نظام سعودي ذكي لإدارة الموارد البشرية يعتمد على الحوسبة السحابية 
                والتكامل الذكي مع الأنظمة الحكومية. يساعد أصحاب الأعمال على إدارة المنشآت والموظفين، 
                وتتبع الامتثال، وتحسين الإنتاجية، من مكان واحد وبأعلى معايير الأمان والكفاءة.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>مطور وفقاً للمعايير السعودية</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>متوافق مع رؤية المملكة 2030</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>مدعوم بأحدث تقنيات الذكاء الاصطناعي</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span>آمن ومحمي بأعلى معايير الأمان</span>
                </div>
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button className="btn-primary">
                  تعرف على المزيد
                </Button>
                <Button variant="outline">
                  تواصل معنا
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=800&q=80"
                alt="مكتب حديث"
                className="w-full h-96 object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gradient mb-4">ماذا يقول عملاؤنا</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              تجارب حقيقية من شركات ومؤسسات تثق في بُعد HR
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="service-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="flex items-center gap-3">
                    <img 
                      src={`https://images.unsplash.com/${testimonial.image}?auto=format&fit=crop&w=100&q=80`}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.company}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary via-primary-glow to-accent">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              ابدأ رحلتك مع بُعد HR اليوم
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              انضم إلى أكثر من 1000 شركة تثق في بُعد HR لإدارة مواردها البشرية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold px-8">
                ابدأ التجربة المجانية
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                تحدث مع خبير
              </Button>
            </div>
            
            {/* Chat Bot Button */}
            <div className="pt-8">
              <Button 
                size="lg" 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                تحدث مع المساعد الذكي
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-foreground text-background py-16">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">بُعد HR</h1>
                  <p className="text-sm text-background/70">إدارة الموارد البشرية</p>
                </div>
              </div>
              <p className="text-background/80 leading-relaxed">
                نظام سعودي ذكي لإدارة الموارد البشرية مدعوم بالذكاء الاصطناعي
              </p>
              <div className="flex items-center gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  🇸🇦 صنع في السعودية
                </Badge>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-background/80 hover:text-background transition-colors">الرئيسية</a></li>
                <li><a href="#solutions" className="text-background/80 hover:text-background transition-colors">الحلول</a></li>
                <li><a href="#pricing" className="text-background/80 hover:text-background transition-colors">الأسعار</a></li>
                <li><a href="#about" className="text-background/80 hover:text-background transition-colors">من نحن</a></li>
              </ul>
            </div>
            
            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">خدماتنا</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">إدارة الموظفين</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">حماية الأجور</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">التقييمات الذكية</a></li>
                <li><a href="#" className="text-background/80 hover:text-background transition-colors">التكامل الحكومي</a></li>
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary" />
                  <span className="text-background/80">+966 11 123 4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-background/80">info@boud-hr.sa</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-background/80">الرياض، المملكة العربية السعودية</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex items-center gap-4 mt-6">
                <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-background/10 rounded-full flex items-center justify-center hover:bg-background/20 transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
          {/* Bottom */}
          <div className="border-t border-background/20 mt-12 pt-8 text-center">
            <p className="text-background/60 text-sm">
              © 2024 بُعد HR. جميع الحقوق محفوظة. مطور بواسطة فريق بُعد للتقنية
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BoudHRLandingPage;