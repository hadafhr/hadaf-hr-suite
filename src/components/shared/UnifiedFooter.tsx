import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BoudLogo } from '@/components/BoudLogo';
import { 
  Twitter, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Facebook,
  Instagram,
  Youtube
} from 'lucide-react';

export const UnifiedFooter: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  
  const isArabic = i18n.language === 'ar';

  const footerSections = {
    about: {
      title: isArabic ? 'حول بُعد' : 'About BOUD',
      links: [
        { label: isArabic ? 'رؤيتنا' : 'Our Vision', href: '#vision' },
        { label: isArabic ? 'رسالتنا' : 'Our Mission', href: '#mission' },
        { label: isArabic ? 'فريق العمل' : 'Our Team', href: '#team' },
        { label: isArabic ? 'شركاؤنا' : 'Partners', href: '#partners' },
        { label: isArabic ? 'الوظائف' : 'Careers', href: '/careers' }
      ]
    },
    solutions: {
      title: isArabic ? 'الحلول' : 'Solutions',
      links: [
        { label: isArabic ? 'إدارة الموظفين' : 'Employee Management', href: '/employee-management' },
        { label: isArabic ? 'الخدمة الذاتية' : 'Self Service', href: '/employee-self-service' },
        { label: isArabic ? 'حماية الأجور' : 'Wage Protection', href: '/wage-protection' },
        { label: isArabic ? 'التقييمات الذكية' : 'Smart Evaluations', href: '/performance-evaluation' },
        { label: isArabic ? 'التدريب والتطوير' : 'Training & Development', href: '/training' }
      ]
    },
    sectors: {
      title: isArabic ? 'القطاعات' : 'Sectors',
      links: [
        { label: isArabic ? 'القطاع الخاص' : 'Private Sector', href: '/private-sector' },
        { label: isArabic ? 'القطاع الحكومي' : 'Government Sector', href: '/government-sector' },
        { label: isArabic ? 'القطاع غير الربحي' : 'Non-Profit Sector', href: '/non-profit-sector' },
        { label: isArabic ? 'الشركات الناشئة' : 'Startups', href: '/startups' },
        { label: isArabic ? 'المؤسسات الكبيرة' : 'Enterprises', href: '/enterprises' }
      ]
    },
    pricing: {
      title: isArabic ? 'التسعير' : 'Pricing',
      links: [
        { label: isArabic ? 'باقات الاشتراك' : 'Subscription Plans', href: '/subscription-packages' },
        { label: isArabic ? 'حاسبة التكلفة' : 'Cost Calculator', href: '/service-calculator' },
        { label: isArabic ? 'العروض الخاصة' : 'Special Offers', href: '/special-offers' },
        { label: isArabic ? 'طلب عرض سعر' : 'Request Quote', href: '/demo-request' }
      ]
    },
    compliance: {
      title: isArabic ? 'الامتثال' : 'Compliance',
      links: [
        { label: isArabic ? 'قانون العمل السعودي' : 'Saudi Labor Law', href: '/labor-law' },
        { label: isArabic ? 'نظام حماية الأجور' : 'WPS System', href: '/wps' },
        { label: isArabic ? 'التأمينات الاجتماعية' : 'GOSI Integration', href: '/gosi' },
        { label: isArabic ? 'الامتثال الضريبي' : 'Tax Compliance', href: '/tax-compliance' }
      ]
    },
    resources: {
      title: isArabic ? 'الموارد' : 'Resources',
      links: [
        { label: isArabic ? 'مركز المعرفة' : 'Knowledge Hub', href: '/tutorials' },
        { label: isArabic ? 'مدونة بُعد' : 'BOUD Blog', href: '/blog' },
        { label: isArabic ? 'الأوراق الخضراء' : 'Green Papers', href: '/green-papers' },
        { label: isArabic ? 'أدوات الموارد البشرية' : 'HR Tools', href: '/hr-tools' },
        { label: isArabic ? 'الدعم الفني' : 'Technical Support', href: '/support' }
      ]
    },
    legal: {
      title: isArabic ? 'قانوني' : 'Legal',
      links: [
        { label: isArabic ? 'سياسة الخصوصية' : 'Privacy Policy', href: '/privacy-policy' },
        { label: isArabic ? 'شروط الاستخدام' : 'Terms of Service', href: '/terms-of-service' },
        { label: isArabic ? 'اتفاقية الترخيص' : 'License Agreement', href: '/license' },
        { label: isArabic ? 'ملفات الارتباط' : 'Cookie Policy', href: '/cookie-policy' }
      ]
    }
  };

  const contactInfo = {
    email: 'info@boudhr.com',
    phone: '+966 11 123 4567',
    address: isArabic ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'
  };

  const socialLinks = [
    { icon: Twitter, href: 'https://twitter.com/boudhr', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/boudhr', label: 'LinkedIn' },
    { icon: Facebook, href: 'https://facebook.com/boudhr', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com/boudhr', label: 'Instagram' },
    { icon: Youtube, href: 'https://youtube.com/@boudhr', label: 'YouTube' }
  ];

  return (
    <footer className="bg-muted/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <BoudLogo variant="full" size="md" />
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              {isArabic 
                ? 'كل ما تحتاجه لإدارة رأس المال البشري في مكان واحد. حل متكامل وشامل للموارد البشرية.' 
                : 'Everything you need for human capital management in one place. Comprehensive HR solution.'}
            </p>
            
            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-primary">
                  {contactInfo.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <a href={`tel:${contactInfo.phone}`} className="hover:text-primary">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{contactInfo.address}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Button
                    key={social.label}
                    variant="ghost"
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => window.open(social.href, '_blank')}
                  >
                    <Icon className="h-4 w-4" />
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-sm mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 font-normal text-sm text-muted-foreground hover:text-primary justify-start"
                      onClick={() => navigate(link.href)}
                    >
                      {link.label}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* App Download Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-right">
              <h3 className="font-semibold mb-2">
                {isArabic ? 'حمّل التطبيق الآن' : 'Download the App Now'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isArabic 
                  ? 'متوفر على أجهزة الآيفون والأندرويد' 
                  : 'Available on iPhone and Android'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="h-10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {isArabic ? 'متوفر على' : 'Available on'}
                    </div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </div>
              </Button>
              <Button variant="outline" size="sm" className="h-10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">G</span>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">
                      {isArabic ? 'احصل عليه من' : 'Get it on'}
                    </div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>
              © 2024 BOUD HR. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>
              {isArabic ? 'صُنع بـ' : 'Made with'} ❤️ {isArabic ? 'في المملكة العربية السعودية' : 'in Saudi Arabia'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};