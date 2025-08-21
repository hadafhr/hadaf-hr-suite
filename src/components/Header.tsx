
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BoudLogo } from './BoudLogo';
import { Button } from '@/components/ui/button';
import { Menu, User, Settings, LogOut } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LoginPortalsDialog } from '@/components/LoginPortalsDialog';
import { PromoBanner } from '@/components/PromoBanner';
import budLogo from '@/assets/bud-logo.png';

interface HeaderProps {
  isAuthenticated?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  isAuthenticated = false, 
  onLogin,
  onLogout 
}) => {
  const navigate = useNavigate();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginDialogOpen(true);
    onLogin?.();
  };

  return (
    <>
      <PromoBanner />
      <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* الشعار الرسمي */}
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/90b6b6a6-b16b-4647-9707-638a28c03c49.png" 
            alt="BOUD HR System" 
            className="h-12 w-auto"
          />
        </Link>

        {/* التنقل الأساسي */}
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
          <Link to="/" className="navigation-item">
            الرئيسية
          </Link>
          <Link to="/services" className="navigation-item">
            خدماتنا
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="navigation-item">
                مركز المعرفة
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 bg-background border border-border">
              <DropdownMenuItem onClick={() => navigate('/tutorials')}>
                الدروس التعليمية
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/blog')}>
                مدونة بُعد
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/earn-with-boad" className="navigation-item">
            اربح مع بُعد
          </Link>
          <Link to="/schedule-meeting" className="navigation-item">
            احجز اجتماع
          </Link>
          <Link to="/about" className="navigation-item">
            من نحن
          </Link>
          <Link to="/contact" className="navigation-item">
            تواصل معنا
          </Link>
        </nav>

        {/* منطقة تسجيل الدخول */}
        <div className="flex items-center space-x-4 space-x-reverse">
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => navigate('/employee-dashboard')}>
                  <User className="ml-2 h-4 w-4" />
                  بوابة الموظف
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/employer-dashboard')}>
                  <Settings className="ml-2 h-4 w-4" />
                  بوابة صاحب العمل
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/ai-hub')}>
                  <Settings className="ml-2 h-4 w-4" />
                  مركز الذكاء الاصطناعي
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="ml-2 h-4 w-4" />
                  تسجيل خروج
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2 space-x-reverse">
              <Button variant="ghost" onClick={handleLoginClick}>
                تسجيل دخول
              </Button>
              <Button className="btn-primary">
                انضم الينا
              </Button>
            </div>
          )}

          {/* قائمة الجوال */}
          <Button variant="ghost" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <LoginPortalsDialog 
        isOpen={isLoginDialogOpen} 
        onClose={() => setIsLoginDialogOpen(false)} 
      />
    </header>
    </>
  );
};
