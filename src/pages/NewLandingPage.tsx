import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { UnifiedHeader } from '@/components/shared/UnifiedHeader';
import { UnifiedFooter } from '@/components/shared/UnifiedFooter';
import { useAnalytics, useTrackEvent } from '@/components/shared/AnalyticsProvider';
import { 
  Users, 
  Building2, 
  Shield, 
  Brain, 
  Target, 
  BarChart3, 
  CheckCircle, 
  Star, 
  Play,
  Zap,
  Lock,
  Cloud,
  Settings,
  GraduationCap,
  Calculator,
  Heart,
  Briefcase,
  FileText,
  Clock,
  ChevronRight,
  Rocket,
  Lightbulb,
  Crown,
  Award,
  Globe,
  Calendar
} from 'lucide-react';

export const NewLandingPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const { track } = useAnalytics();
  const trackEvent = useTrackEvent();
  
  const isArabic = i18n.language === 'ar';

  useEffect(() => {
    track('view_home');
  }, [track]);

  // Hero Content
  const heroContent = {
    title: isArabic ? 'كل ما تحتاجه لإدارة رأس المال البشري في مكان واحد' : 'Everything you need for human capital management in one place',
    subtitle: isArabic ? 'ودّع فوضى الأنظمة المتعددة وابدأ من بُعد.' : 'Say goodbye to multiple system chaos and start with BOUD.',
    cta: {
      primary: isArabic ? 'ابدأ الآن' : 'Start Now',
      secondary: isArabic ? 'اطلب عرض مباشر' : 'Request Live Demo',
      tour: isArabic ? 'شاهد جولة سريعة' : 'Watch Quick Tour'
    }
  };

  // 30 HR Modules in 6x5 grid
  const hrModules = [
    { icon: Users, title: isArabic ? 'إدارة الموظفين' : 'Employee Management', desc: isArabic ? 'نظام شامل لإدارة بيانات الموظفين' : 'Complete employee data management' },
    { icon: FileText, title: isArabic ? 'التوظيف الذكي' : 'Smart Recruitment', desc: isArabic ? 'استقطاب وتوظيف المواهب بذكاء' : 'Intelligent talent acquisition' },
    { icon: Clock, title: isArabic ? 'الحضور والانصراف' : 'Attendance Management', desc: isArabic ? 'تتبع دقيق لساعات العمل' : 'Precise work hours tracking' },
    { icon: Briefcase, title: isArabic ? 'إدارة الرواتب' : 'Payroll Management', desc: isArabic ? 'حساب وصرف الرواتب تلقائياً' : 'Automated salary calculation' },
    { icon: Award, title: isArabic ? 'تقييم الأداء' : 'Performance Evaluation', desc: isArabic ? 'قياس وتطوير أداء الموظفين' : 'Measure and improve performance' },
    { icon: GraduationCap, title: isArabic ? 'التدريب والتطوير' : 'Training & Development', desc: isArabic ? 'برامج تطوير المهارات' : 'Skills development programs' },
    
    { icon: Shield, title: isArabic ? 'حماية الأجور' : 'Wage Protection', desc: isArabic ? 'امتثال نظام WPS السعودي' : 'Saudi WPS compliance' },
    { icon: Settings, title: isArabic ? 'الخدمة الذاتية' : 'Self Service', desc: isArabic ? 'تمكين الموظفين رقمياً' : 'Employee digital empowerment' },
    { icon: BarChart3, title: isArabic ? 'التقارير والتحليلات' : 'Reports & Analytics', desc: isArabic ? 'رؤى ذكية مدعومة بالبيانات' : 'Smart data-driven insights' },
    { icon: Heart, title: isArabic ? 'التأمينات والمزايا' : 'Benefits Management', desc: isArabic ? 'إدارة شاملة للمزايا' : 'Comprehensive benefits management' },
    { icon: Target, title: isArabic ? 'الأهداف والمؤشرات' : 'Goals & KPIs', desc: isArabic ? 'متابعة الأهداف والمؤشرات' : 'Track goals and KPIs' },
    { icon: Building2, title: isArabic ? 'الهيكل التنظيمي' : 'Org Structure', desc: isArabic ? 'تصميم وإدارة الهيكل التنظيمي' : 'Design and manage org structure' },
    
    { icon: FileText, title: isArabic ? 'إدارة المستندات' : 'Document Management', desc: isArabic ? 'حفظ وإدارة المستندات' : 'Store and manage documents' },
    { icon: Calendar, title: isArabic ? 'إدارة الإجازات' : 'Leave Management', desc: isArabic ? 'نظام شامل لإدارة الإجازات' : 'Complete leave management' },
    { icon: Users, title: isArabic ? 'إدارة الفرق' : 'Team Management', desc: isArabic ? 'تنظيم وإدارة فرق العمل' : 'Organize and manage teams' },
    { icon: Zap, title: isArabic ? 'سير العمل' : 'Workflow Automation', desc: isArabic ? 'أتمتة العمليات والموافقات' : 'Automate processes and approvals' },
    { icon: Crown, title: isArabic ? 'إدارة المواهب' : 'Talent Management', desc: isArabic ? 'اكتشاف وتطوير المواهب' : 'Discover and develop talent' },
    { icon: Calculator, title: isArabic ? 'الميزانية والتخطيط' : 'Budget & Planning', desc: isArabic ? 'تخطيط الميزانيات المالية' : 'Financial budget planning' },
    
    { icon: Shield, title: isArabic ? 'الأمن والامتثال' : 'Security & Compliance', desc: isArabic ? 'ضمان الأمان والامتثال' : 'Ensure security and compliance' },
    { icon: Brain, title: isArabic ? 'الذكاء الاصطناعي' : 'AI Insights', desc: isArabic ? 'رؤى ذكية مدعومة بالذكاء الاصطناعي' : 'AI-powered smart insights' },
    { icon: Globe, title: isArabic ? 'التكاملات الحكومية' : 'Gov Integrations', desc: isArabic ? 'ربط مع الأنظمة الحكومية' : 'Connect with gov systems' },
    { icon: Rocket, title: isArabic ? 'إدارة الأداء المؤسسي' : 'Corporate Performance', desc: isArabic ? 'قياس الأداء المؤسسي' : 'Measure corporate performance' },
    { icon: Lightbulb, title: isArabic ? 'الابتكار والتطوير' : 'Innovation Hub', desc: isArabic ? 'مركز الابتكار والأفكار' : 'Innovation and ideas center' },
    { icon: Users, title: isArabic ? 'إدارة المشاريع' : 'Project Management', desc: isArabic ? 'تنظيم وإدارة المشاريع' : 'Organize and manage projects' },
    
    { icon: FileText, title: isArabic ? 'التدقيق الداخلي' : 'Internal Audit', desc: isArabic ? 'أدوات التدقيق والمراجعة' : 'Audit and review tools' },
    { icon: Settings, title: isArabic ? 'إدارة النظام' : 'System Administration', desc: isArabic ? 'إدارة وتخصيص النظام' : 'System management and customization' },
    { icon: BarChart3, title: isArabic ? 'لوحات المعلومات' : 'Dashboards', desc: isArabic ? 'لوحات معلومات تفاعلية' : 'Interactive dashboards' },
    { icon: Cloud, title: isArabic ? 'النسخ الاحتياطي' : 'Backup & Recovery', desc: isArabic ? 'حماية البيانات والاسترداد' : 'Data protection and recovery' },
    { icon: Lock, title: isArabic ? 'إدارة الصلاحيات' : 'Access Control', desc: isArabic ? 'التحكم في صلاحيات الوصول' : 'Access permissions control' },
    { icon: CheckCircle, title: isArabic ? 'ضمان الجودة' : 'Quality Assurance', desc: isArabic ? 'ضمان جودة العمليات' : 'Process quality assurance' }
  ];

  // Local Integrations
  const localIntegrations = [
    { name: isArabic ? 'منصة قِوى' : 'Qiwa Platform', desc: isArabic ? 'التكامل مع منصة قِوى لوزارة الموارد البشرية' : 'Integration with MoHR Qiwa platform' },
    { name: isArabic ? 'منصة مدد' : 'Mudad Platform', desc: isArabic ? 'ربط مع منصة مدد للعقود' : 'Connect with Mudad contracts platform' },
    { name: isArabic ? 'التأمينات الاجتماعية' : 'GOSI', desc: isArabic ? 'تكامل مع نظام التأمينات الاجتماعية' : 'Social Insurance integration' },
    { name: isArabic ? 'نظام حماية الأجور' : 'WPS', desc: isArabic ? 'امتثال كامل لنظام حماية الأجور' : 'Full WPS compliance' },
    { name: isArabic ? 'البنوك السعودية' : 'Saudi Banks', desc: isArabic ? 'ربط مع جميع البنوك السعودية' : 'Connect with all Saudi banks' }
  ];

  // Sectors
  const sectors = [
    {
      title: isArabic ? 'القطاع الخاص' : 'Private Sector',
      problems: isArabic ? 'تعقيدات إدارة الموارد البشرية وضمان الامتثال' : 'HR management complexities and compliance assurance',
      solutions: isArabic ? 'حلول متكاملة للإدارة الذكية والامتثال التلقائي' : 'Integrated solutions for smart management and automatic compliance'
    },
    {
      title: isArabic ? 'القطاع الحكومي' : 'Government Sector', 
      problems: isArabic ? 'الحاجة للشفافية والكفاءة في إدارة الموظفين' : 'Need for transparency and efficiency in employee management',
      solutions: isArabic ? 'أنظمة شفافة وآمنة تضمن الكفاءة والحوكمة' : 'Transparent and secure systems ensuring efficiency and governance'
    },
    {
      title: isArabic ? 'القطاع غير الربحي' : 'Non-Profit Sector',
      problems: isArabic ? 'إدارة المتطوعين والمانحين بكفاءة' : 'Efficient management of volunteers and donors', 
      solutions: isArabic ? 'أدوات مخصصة لإدارة المتطوعين والبرامج الخيرية' : 'Specialized tools for volunteer and charity program management'
    }
  ];

  // Client Testimonials (sample)
  const testimonials = [
    {
      name: isArabic ? 'أحمد المحمد' : 'Ahmed Al-Mohammed',
      position: isArabic ? 'مدير الموارد البشرية' : 'HR Manager',
      company: isArabic ? 'شركة الرياض للتقنية' : 'Riyadh Tech Company',
      text: isArabic ? 'نظام بُعد غيّر طريقة عملنا بالكامل. الواجهة سهلة والمميزات متقدمة جداً.' : 'BOUD system completely changed our way of work. Easy interface and very advanced features.',
      rating: 5
    },
    {
      name: isArabic ? 'فاطمة السعيد' : 'Fatima Al-Saeed',
      position: isArabic ? 'مديرة العمليات' : 'Operations Manager', 
      company: isArabic ? 'مجموعة الخليج التجارية' : 'Gulf Commercial Group',
      text: isArabic ? 'التكامل مع الأنظمة الحكومية وفر علينا وقتاً كبيراً وقلل من الأخطاء.' : 'Integration with government systems saved us significant time and reduced errors.',
      rating: 5
    }
  ];

  const handleDemoRequest = () => {
    trackEvent.trackDemoRequest('hero_cta');
    navigate('/demo-request');
  };

  const handleStartNow = () => {
    track('cta_start_now_clicked', { location: 'hero' });
    navigate('/subscription-packages');
  };

  const handleWatchTour = () => {
    track('watch_tour_clicked', { location: 'hero' });
    navigate('/interactive-tour');
  };

  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {heroContent.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {heroContent.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="px-8 py-4 text-lg"
              onClick={handleStartNow}
            >
              {heroContent.cta.primary}
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg"
              onClick={handleDemoRequest}
            >
              {heroContent.cta.secondary}
            </Button>
            <Button 
              size="lg" 
              variant="ghost" 
              className="px-8 py-4 text-lg flex items-center gap-2"
              onClick={handleWatchTour}
            >
              <Play className="w-5 h-5" />
              {heroContent.cta.tour}
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '1000+', label: isArabic ? 'شركة تثق بنا' : 'Companies trust us' },
              { number: '100,000+', label: isArabic ? 'موظف نديرهم' : 'Employees managed' },
              { number: '99.9%', label: isArabic ? 'وقت التشغيل' : 'Uptime' },
              { number: '24/7', label: isArabic ? 'دعم متواصل' : 'Continuous support' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HR Modules Section - 30 modules in 6x5 grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isArabic ? 'الإدارات الـ 30 في منصة واحدة' : '30 Departments in One Platform'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {isArabic ? 'حل شامل ومتكامل لجميع احتياجات إدارة الموارد البشرية' : 'Comprehensive integrated solution for all HR management needs'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {hrModules.map((module, index) => (
              <Card 
                key={index} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => track('module_explored', { module: module.title })}
              >
                <CardContent className="p-4 text-center">
                  <module.icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-semibold text-sm mb-2">{module.title}</h3>
                  <p className="text-xs text-muted-foreground">{module.desc}</p>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-3 w-full text-xs"
                  >
                    {isArabic ? 'استكشف' : 'Explore'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Local Integrations */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isArabic ? 'التكاملات المحلية' : 'Local Integrations'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {isArabic ? 'تكامل كامل مع جميع الأنظمة الحكومية السعودية' : 'Full integration with all Saudi government systems'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            {localIntegrations.map((integration, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{integration.name}</h3>
                  <p className="text-sm text-muted-foreground">{integration.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isArabic ? 'القطاعات التي نخدمها' : 'Sectors We Serve'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    {sector.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm text-red-600 mb-2">
                        {isArabic ? 'التحديات:' : 'Challenges:'}
                      </h4>
                      <p className="text-sm text-muted-foreground">{sector.problems}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-green-600 mb-2">
                        {isArabic ? 'الحلول:' : 'Solutions:'}
                      </h4>
                      <p className="text-sm text-muted-foreground">{sector.solutions}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isArabic ? 'لوحات التحليلات المتقدمة' : 'Advanced Analytics Dashboards'}
            </h2>
            <p className="text-xl text-muted-foreground">
              {isArabic ? 'رؤى ذكية مدعومة بالذكاء الاصطناعي لاتخاذ قرارات أفضل' : 'AI-powered smart insights for better decision making'}
            </p>
          </div>
          
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 text-center">
            <BarChart3 className="h-16 w-16 mx-auto text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">
              {isArabic ? 'معاينة التحليلات' : 'Analytics Preview'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {isArabic ? 'قريباً - لوحات تحليلات تفاعلية' : 'Coming Soon - Interactive Analytics Dashboards'}
            </p>
            <Button onClick={() => navigate('/admin-analytics')}>
              {isArabic ? 'معاينة التحليلات' : 'Preview Analytics'}
            </Button>
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {isArabic ? 'شهادات عملائنا' : 'Client Testimonials'}
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.position}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            {isArabic ? 'ابدأ رحلتك الرقمية اليوم' : 'Start Your Digital Journey Today'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {isArabic ? 'انضم إلى آلاف الشركات التي تثق في بُعد لإدارة مواردها البشرية' : 'Join thousands of companies that trust BOUD for their HR management'}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="px-8 py-4 text-lg"
              onClick={handleDemoRequest}
            >
              {isArabic ? 'احجز عرضاً مجانياً' : 'Book Free Demo'}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="px-8 py-4 text-lg bg-transparent border-white text-white hover:bg-white hover:text-primary"
              onClick={() => navigate('/contact')}
            >
              {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </Button>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
};