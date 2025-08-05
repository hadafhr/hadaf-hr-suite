import React from 'react';
import { Home, FileText, CheckSquare, MessageCircle, Bell, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const navigationItems = [
  { id: 'dashboard', icon: Home, route: '/mobile-dashboard' },
  { id: 'requests', icon: FileText, route: '/mobile-requests' },
  { id: 'tasks', icon: CheckSquare, route: '/mobile-tasks' },
  { id: 'chat', icon: MessageCircle, route: '/mobile-chat' },
  { id: 'notifications', icon: Bell, route: '/mobile-notifications' },
  { id: 'profile', icon: User, route: '/mobile-profile' }
];

export const MobileNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
      <div className="flex items-center justify-around py-2">
        {navigationItems.map((item) => {
          const isActive = location.pathname === item.route;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.route)}
              className={cn(
                "flex flex-col items-center justify-center p-2 min-w-[60px]",
                "text-xs font-medium transition-colors",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Icon className={cn(
                "h-5 w-5 mb-1",
                isActive && "text-primary"
              )} />
              <span className="text-xs">{t(item.id)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};