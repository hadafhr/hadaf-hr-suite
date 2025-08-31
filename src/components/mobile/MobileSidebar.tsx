import React from 'react';
import { X, Home, FileText, CheckSquare, MessageCircle, Bell, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const sidebarItems = [
  { id: 'dashboard', icon: Home, route: '/mobile-dashboard' },
  { id: 'requests', icon: FileText, route: '/mobile-requests' },
  { id: 'tasks', icon: CheckSquare, route: '/mobile-tasks' },
  { id: 'chat', icon: MessageCircle, route: '/mobile-chat' },
  { id: 'notifications', icon: Bell, route: '/mobile-notifications' },
  { id: 'profile', icon: User, route: '/mobile-profile' },
  { id: 'settings', icon: Settings, route: '/mobile-settings' }
];

export const MobileSidebar: React.FC<MobileSidebarProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = (route: string) => {
    navigate(route);
    onClose();
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/mobile-login');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={cn(
        "absolute top-0 h-full w-80 bg-background shadow-lg transition-transform duration-300",
        "border-r border-border",
        document.dir === 'rtl' ? 'right-0' : 'left-0'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">B</span>
            </div>
            <div>
              <h2 className="font-semibold">BOOD HR</h2>
              <p className="text-sm text-muted-foreground">Mobile App</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Items */}
        <div className="flex flex-col p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className="justify-start gap-3 h-12"
                onClick={() => handleNavigation(item.route)}
              >
                <Icon className="h-5 w-5" />
                {t(item.id)}
              </Button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 h-12 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            {t('logout')}
          </Button>
        </div>
      </div>
    </div>
  );
};