import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const isArabic = i18n.language === 'ar';

  // Auto-generate breadcrumbs from current route if items not provided
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    
    const breadcrumbs: BreadcrumbItem[] = [
      { 
        label: isArabic ? 'لوحة التحكم' : 'Dashboard', 
        href: getDashboardRoute() 
      }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Skip the first segment if it's a dashboard route
      if (index === 0 && (segment.includes('dashboard') || segment.includes('portal'))) {
        return;
      }

      const label = getBreadcrumbLabel(segment, currentPath);
      breadcrumbs.push({
        label,
        href: index === pathSegments.length - 1 ? undefined : currentPath
      });
    });

    return breadcrumbs;
  };

  const getDashboardRoute = (): string => {
    const path = location.pathname;
    if (path.includes('admin-dashboard')) return '/admin-dashboard';
    if (path.includes('company-dashboard')) return '/company-dashboard';
    if (path.includes('employee-portal')) return '/employee-portal';
    return '/';
  };

  const getBreadcrumbLabel = (segment: string, fullPath: string): string => {
    const labelMap: Record<string, { ar: string; en: string }> = {
      // Admin routes
      'admin-dashboard': { ar: 'مدير النظام', en: 'System Admin' },
      'client-management': { ar: 'إدارة العملاء', en: 'Client Management' },
      'system-monitoring': { ar: 'مراقبة النظام', en: 'System Monitoring' },
      'subscription-management': { ar: 'إدارة الاشتراكات', en: 'Subscription Management' },
      'hr-management': { ar: 'إدارة النظام', en: 'HR Management' },
      'admin-analytics': { ar: 'التقارير والتحليلات', en: 'Reports & Analytics' },
      'system-development': { ar: 'تطوير النظام', en: 'System Development' },
      'security-settings': { ar: 'إعدادات الأمان', en: 'Security Settings' },

      // Company routes
      'company-dashboard': { ar: 'لوحة المنشأة', en: 'Company Dashboard' },
      'employees': { ar: 'الموظفون', en: 'Employees' },
      'departments': { ar: 'الأقسام', en: 'Departments' },
      'positions': { ar: 'المناصب', en: 'Positions' },
      'approvals': { ar: 'الاعتمادات', en: 'Approvals' },
      'integrations': { ar: 'التكاملات', en: 'Integrations' },
      'analytics': { ar: 'التحليلات', en: 'Analytics' },

      // Employee routes
      'employee-portal': { ar: 'بوابة الموظف', en: 'Employee Portal' },
      'profile': { ar: 'الملف الشخصي', en: 'Profile' },
      'requests': { ar: 'طلباتي', en: 'My Requests' },
      'attendance': { ar: 'الحضور والانصراف', en: 'Attendance' },
      'payroll': { ar: 'كشوف الراتب', en: 'Payroll' },
      'training': { ar: 'التدريب', en: 'Training' },
      'performance': { ar: 'تقييم الأداء', en: 'Performance' },
      'tasks': { ar: 'المهام', en: 'Tasks' },
      'notifications': { ar: 'الإشعارات', en: 'Notifications' },

      // Budget routes
      'budget': { ar: 'الميزانية', en: 'Budget' },
      'financial-planning': { ar: 'التخطيط المالي', en: 'Financial Planning' },

      // Settings
      'settings': { ar: 'الإعدادات', en: 'Settings' },
      'support': { ar: 'الدعم الفني', en: 'Support' },
      'help': { ar: 'المساعدة', en: 'Help' }
    };

    const segmentLabel = labelMap[segment];
    if (segmentLabel) {
      return isArabic ? segmentLabel.ar : segmentLabel.en;
    }

    // Fallback: capitalize and replace dashes with spaces
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const breadcrumbItems = items || generateBreadcrumbs();

  if (breadcrumbItems.length <= 1) {
    return null; // Don't show breadcrumbs for single-level pages
  }

  return (
    <nav className={`flex items-center gap-2 text-sm text-muted-foreground ${className}`}>
      <Button
        variant="ghost"
        size="sm"
        className="h-auto p-1 hover:text-primary"
        onClick={() => navigate(getDashboardRoute())}
      >
        <Home className="h-4 w-4" />
      </Button>

      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && (
            <ChevronRight className={`h-3 w-3 text-muted-foreground/50 ${isArabic ? 'rotate-180' : ''}`} />
          )}
          
          {item.href && index < breadcrumbItems.length - 1 ? (
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-1 font-medium hover:text-primary"
              onClick={() => navigate(item.href!)}
            >
              {item.label}
            </Button>
          ) : (
            <span className={`font-medium ${index === breadcrumbItems.length - 1 ? 'text-foreground' : 'text-muted-foreground'}`}>
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};