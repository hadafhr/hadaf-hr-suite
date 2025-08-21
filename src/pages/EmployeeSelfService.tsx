import React, { useEffect } from 'react';
import { EmployeeDashboard } from '@/components/employee/EmployeeDashboard';

export const EmployeeSelfService = () => {
  useEffect(() => {
    // تطبيق الوضع المظلم التلقائي حسب الوقت
    const applyAutoDarkMode = () => {
      const hour = new Date().getHours();
      const isDarkTime = hour >= 19 || hour < 6; // من 7 مساءً حتى 6 صباحاً
      
      if (isDarkTime) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyAutoDarkMode();
    
    // فحص كل ساعة
    const interval = setInterval(applyAutoDarkMode, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <EmployeeDashboard />
    </div>
  );
};