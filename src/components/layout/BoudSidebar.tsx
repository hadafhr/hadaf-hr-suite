import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  UserPlus, 
  CalendarDays, 
  DollarSign, 
  GraduationCap, 
  BarChart3, 
  Settings,
  Home,
  Building2,
  Clock,
  FileText,
  Target
} from 'lucide-react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  onClick?: () => void;
}

interface BoudSidebarProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
  className?: string;
}

export const BoudSidebar: React.FC<BoudSidebarProps> = ({ 
  activeSection, 
  onSectionChange,
  className 
}) => {
  const sidebarItems: SidebarItem[] = [
    { id: 'dashboard', label: 'لوحة التحكم', icon: Home },
    { id: 'team', label: 'فريق العمل', icon: Users },
    { id: 'recruitment', label: 'التوظيف', icon: UserPlus },
    { id: 'attendance', label: 'الحضور والانصراف', icon: Clock },
    { id: 'leaves', label: 'الإجازات', icon: CalendarDays },
    { id: 'payroll', label: 'الرواتب', icon: DollarSign },
    { id: 'training', label: 'التدريب والتطوير', icon: GraduationCap },
    { id: 'performance', label: 'تقييم الأداء', icon: Target },
    { id: 'reports', label: 'التقارير', icon: BarChart3 },
    { id: 'organization', label: 'الهيكل التنظيمي', icon: Building2 },
    { id: 'documents', label: 'إدارة الوثائق', icon: FileText },
    { id: 'settings', label: 'الإعدادات', icon: Settings },
  ];

  return (
    <aside className={cn(
      "bg-white border-l border-separator w-64 h-[calc(100vh-4rem)] overflow-y-auto",
      className
    )}>
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "w-full justify-start h-11 px-3 text-text-secondary hover:text-primary hover:bg-accent transition-all duration-200",
                isActive && "bg-accent text-primary border-r-3 border-primary font-medium"
              )}
              onClick={() => onSectionChange?.(item.id)}
            >
              <Icon className={cn(
                "h-5 w-5 ml-3 transition-colors",
                isActive ? "text-primary" : "text-text-secondary group-hover:text-primary"
              )} />
              <span className="text-sm">{item.label}</span>
            </Button>
          );
        })}
      </nav>
    </aside>
  );
};