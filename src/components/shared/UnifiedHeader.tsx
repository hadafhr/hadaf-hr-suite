import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { BoudLogo } from '@/components/BoudLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';
import { 
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Bell,
  ChevronDown
} from 'lucide-react';

interface UnifiedHeaderProps {
  showAuthActions?: boolean;
  userRole?: 'admin' | 'company' | 'employee' | null;
}

export const UnifiedHeader: React.FC<UnifiedHeaderProps> = ({ 
  showAuthActions = true, 
  userRole = null 
}) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isArabic = i18n.language === 'ar';

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const navigationItems = [
    { 
      key: 'home', 
      label: isArabic ? 'الرئيسية' : 'Home', 
      href: '/' 
    },
    { 
      key: 'services', 
      label: isArabic ? 'الحلول' : 'Solutions', 
      href: '#services',
      dropdown: [
        { label: isArabic ? 'إدارة الموظفين' : 'Employee Management', href: '/employee-management' },
        { label: isArabic ? 'الخدمة الذاتية' : 'Self Service', href: '/employee-self-service' },
        { label: isArabic ? 'حماية الأجور' : 'Wage Protection', href: '/wage-protection' },
        { label: isArabic ? 'التقييمات الذكية' : 'Smart Evaluations', href: '/performance-evaluation' }
      ]
    },
    { 
      key: 'sectors', 
      label: isArabic ? 'القطاعات' : 'Sectors', 
      href: '#sectors',
      dropdown: [
        { label: isArabic ? 'القطاع الخاص' : 'Private Sector', href: '/private-sector' },
        { label: isArabic ? 'القطاع الحكومي' : 'Government Sector', href: '/government-sector' },
        { label: isArabic ? 'القطاع غير الربحي' : 'Non-Profit Sector', href: '/non-profit-sector' }
      ]
    },
    { 
      key: 'pricing', 
      label: isArabic ? 'التسعير' : 'Pricing', 
      href: '/subscription-packages' 
    },
    { 
      key: 'compliance', 
      label: isArabic ? 'الامتثال' : 'Compliance', 
      href: '#compliance' 
    },
    { 
      key: 'resources', 
      label: isArabic ? 'الموارد' : 'Resources', 
      href: '#resources',
      dropdown: [
        { label: isArabic ? 'مركز المعرفة' : 'Knowledge Hub', href: '/tutorials' },
        { label: isArabic ? 'مدونة بُعد' : 'BOUD Blog', href: '/blog' },
        { label: isArabic ? 'الأوراق الخضراء' : 'Green Papers', href: '/green-papers' },
        { label: isArabic ? 'أدوات الموارد البشرية' : 'HR Tools', href: '/hr-tools' }
      ]
    },
    { 
      key: 'contact', 
      label: isArabic ? 'اتصل بنا' : 'Contact Us', 
      href: '/contact' 
    }
  ];

  const renderNavigation = () => (
    <nav className="hidden lg:flex items-center space-x-6 space-x-reverse">
      {navigationItems.map((item) => (
        item.dropdown ? (
          <DropdownMenu key={item.key}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="text-sm font-medium text-foreground hover:text-primary flex items-center gap-1"
              >
                {item.label}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-background border border-border">
              {item.dropdown.map((subItem, index) => (
                <DropdownMenuItem key={index} onClick={() => navigate(subItem.href)}>
                  {subItem.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button 
            key={item.key}
            variant="ghost" 
            className="text-sm font-medium text-foreground hover:text-primary"
            onClick={() => navigate(item.href)}
          >
            {item.label}
          </Button>
        )
      ))}
    </nav>
  );

  const getUserRoleBadge = () => {
    if (!userRole) return null;
    
    const badges = {
      admin: { label: isArabic ? 'مدير النظام' : 'Admin', variant: 'destructive' as const },
      company: { label: isArabic ? 'مدير الشركة' : 'Company', variant: 'secondary' as const },
      employee: { label: isArabic ? 'موظف' : 'Employee', variant: 'default' as const }
    };

    const badge = badges[userRole];
    return <Badge variant={badge.variant} className="text-xs">{badge.label}</Badge>;
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="cursor-pointer" onClick={() => navigate('/')}>
              <BoudLogo 
                variant="full" 
                size="header" 
                className="h-8 w-auto" 
              />
            </div>
            {getUserRoleBadge()}
          </div>

          {/* Desktop Navigation */}
          {renderNavigation()}

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />

            {showAuthActions && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    {/* Notifications */}
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="h-4 w-4" />
                      <Badge className="absolute -top-1 -right-1 w-4 h-4 text-xs bg-red-500 text-white p-0 flex items-center justify-center">
                        3
                      </Badge>
                    </Button>

                    {/* User Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="flex items-center gap-2 px-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <span className="hidden md:inline text-sm font-medium">
                            {user.email?.split('@')[0] || 'المستخدم'}
                          </span>
                          <ChevronDown className="h-3 w-3" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={() => navigate('/profile')}>
                          <User className="h-4 w-4 mr-2" />
                          {isArabic ? 'الملف الشخصي' : 'Profile'}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/settings')}>
                          <Settings className="h-4 w-4 mr-2" />
                          {isArabic ? 'الإعدادات' : 'Settings'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="h-4 w-4 mr-2" />
                          {isArabic ? 'تسجيل الخروج' : 'Logout'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => navigate('/unified-login')}
                    >
                      {isArabic ? 'تسجيل الدخول' : 'Login'}
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => navigate('/demo-request')}
                    >
                      {isArabic ? 'طلب عرض' : 'Request Demo'}
                    </Button>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-4">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <div key={item.key}>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => {
                      navigate(item.href);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Button>
                  {item.dropdown && (
                    <div className="ml-4 space-y-1">
                      {item.dropdown.map((subItem, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="w-full justify-start text-left text-muted-foreground"
                          onClick={() => {
                            navigate(subItem.href);
                            setMobileMenuOpen(false);
                          }}
                        >
                          {subItem.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};