
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, User, Settings, LogOut } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* الشعار */}
        <Link to="/" className="flex items-center">
          <div>
            <h2 className="text-2xl font-bold text-foreground">بُعد</h2>
          </div>
        </Link>

        {/* التنقل الأساسي */}
        <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
          <Link to="/" className="navigation-item">
            الرئيسية
          </Link>
          <Link to="/services" className="navigation-item">
            خدماتنا
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
              <Button variant="ghost" onClick={onLogin}>
                تسجيل دخول
              </Button>
              <Button className="btn-primary">
                انظم الينا
              </Button>
            </div>
          )}

          {/* قائمة الجوال */}
          <Button variant="ghost" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};
