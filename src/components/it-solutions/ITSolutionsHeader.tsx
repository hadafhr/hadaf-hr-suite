import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Phone, X } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DemoRequestModal } from '@/components/DemoRequestModal';

export const ITSolutionsHeader: React.FC = () => {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigationItems = [
    { title: 'الرئيسية', path: '/' },
    { title: 'كيف تستفيد', path: '/how-to-benefit' },
    { title: 'المميزات', path: '/features' },
    { title: 'عملاؤنا', path: '/clients' },
    { title: 'الأسعار', path: '/pricing' },
    { title: 'اتصل بنا / الدعم', path: '/contact' }
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* الشعار */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/lovable-uploads/1341af57-5888-4f9d-88b7-160bc83d04c7.png" 
                  alt="شعار بُعد BOUD HR" 
                  className="h-12 w-auto ml-4"
                />
              </Link>
            </div>

            {/* التنقل الأساسي - سطح المكتب */}
            <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
              {navigationItems.map((item) => (
                <Link 
                  key={item.title}
                  to={item.path} 
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200 hover:scale-105"
                >
                  {item.title}
                </Link>
              ))}
            </nav>

            {/* رقم الهاتف والأزرار */}
            <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
              {/* رقم الهاتف البارز */}
              <div className="flex items-center bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
                <Phone className="h-4 w-4 text-primary ml-2" />
                <span className="text-sm font-bold text-primary">920033333</span>
              </div>
              
              {/* أزرار الحث على اتخاذ إجراء */}
              <Button 
                variant="outline" 
                onClick={() => setShowDemoModal(true)}
                className="hover:bg-primary hover:text-primary-foreground transition-all duration-200"
              >
                شاهد العرض التوضيحي
              </Button>
              <Button 
                className="btn-primary animate-pulse-slow"
                onClick={() => navigate('/subscription-packages')}
              >
                اطلب نسختك الآن
              </Button>
            </div>

            {/* قائمة الجوال */}
            <Button 
              variant="ghost" 
              className="lg:hidden"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* القائمة المنسدلة للجوال */}
          {showMobileMenu && (
            <div className="lg:hidden border-t border-border/20 py-4 animate-fade-in">
              <nav className="flex flex-col space-y-4">
                {navigationItems.map((item) => (
                  <Link 
                    key={item.title}
                    to={item.path}
                    className="text-sm font-medium text-foreground/80 hover:text-primary py-2 transition-colors"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    {item.title}
                  </Link>
                ))}
                
                {/* رقم الهاتف والأزرار للجوال */}
                <div className="flex flex-col space-y-3 pt-4 border-t border-border/20">
                  <div className="flex items-center justify-center bg-primary/10 px-4 py-2 rounded-lg border border-primary/20">
                    <Phone className="h-4 w-4 text-primary ml-2" />
                    <span className="text-sm font-bold text-primary">920033333</span>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowDemoModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full"
                  >
                    شاهد العرض التوضيحي
                  </Button>
                  <Button 
                    className="btn-primary w-full"
                    onClick={() => {
                      navigate('/subscription-packages');
                      setShowMobileMenu(false);
                    }}
                  >
                    اطلب نسختك الآن
                  </Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      <DemoRequestModal 
        isOpen={showDemoModal} 
        onClose={() => setShowDemoModal(false)} 
      />
    </>
  );
};