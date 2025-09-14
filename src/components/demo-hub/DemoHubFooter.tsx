import React from 'react';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Smartphone,
  Download
} from 'lucide-react';

const footerLinks = {
  products: [
    { name: 'إدارة الموظفين', href: '/products/employees' },
    { name: 'نظام الرواتب', href: '/products/payroll' },
    { name: 'الحضور والانصراف', href: '/products/attendance' },
    { name: 'التقارير والتحليلات', href: '/products/reports' }
  ],
  solutions: [
    { name: 'الشركات الصغيرة', href: '/solutions/small-business' },
    { name: 'الشركات المتوسطة', href: '/solutions/medium-business' },
    { name: 'المؤسسات الكبرى', href: '/solutions/enterprise' },
    { name: 'القطاعات المتخصصة', href: '/solutions/industries' }
  ],
  knowledge: [
    { name: 'مركز المساعدة', href: '/help-center' },
    { name: 'المدونة', href: '/blog' },
    { name: 'الكتب الإلكترونية', href: '/ebooks' },
    { name: 'الندوات الإلكترونية', href: '/webinars' }
  ],
  legal: [
    { name: 'سياسة الخصوصية', href: '/privacy' },
    { name: 'شروط الاستخدام', href: '/terms' },
    { name: 'سياسة الأمان', href: '/security' },
    { name: 'اتفاقية مستوى الخدمة', href: '/sla' }
  ]
};

const socialLinks = [
  { name: 'فيسبوك', icon: Facebook, href: '#' },
  { name: 'تويتر', icon: Twitter, href: '#' },
  { name: 'لينكد إن', icon: Linkedin, href: '#' },
  { name: 'إنستجرام', icon: Instagram, href: '#' }
];

export const DemoHubFooter = () => {
  return (
    <footer className="bg-muted/50 border-t border-border/50">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <BoudLogo showText size="lg" />
              <p className="text-muted-foreground mt-4 leading-relaxed">
                منصة بُعد HR هي الحل الشامل لإدارة الموارد البشرية في المنطقة العربية. 
                نقدم أدوات متطورة وسهلة الاستخدام لجميع احتياجاتك في إدارة الموظفين والرواتب.
              </p>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-primary" />
                <span>+966 11 123 4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-primary" />
                <span>hello@boud-hr.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="ghost"
                  size="sm"
                  className="w-10 h-10 p-0 hover:bg-primary hover:text-white transition-colors"
                >
                  <social.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">المنتجات</h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">الحلول</h3>
            <ul className="space-y-2">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">المعرفة</h3>
            <ul className="space-y-2">
              {footerLinks.knowledge.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">قانوني</h3>
            <ul className="space-y-2 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* App Downloads */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm">حمّل التطبيق</h4>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start gap-2 text-xs"
                >
                  <Smartphone className="w-4 h-4" />
                  App Store
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start gap-2 text-xs"
                >
                  <Download className="w-4 h-4" />
                  Google Play
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            © {new Date().getFullYear()} بُعد HR. جميع الحقوق محفوظة.
          </div>
          <div className="flex items-center gap-6">
            <span>صُنع بـ ❤️ في المملكة العربية السعودية</span>
          </div>
        </div>
      </div>
    </footer>
  );
};