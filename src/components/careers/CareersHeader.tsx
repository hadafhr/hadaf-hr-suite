import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Play, Sparkles, BarChart3, Users } from 'lucide-react';
import DemoRequestModal from './DemoRequestModal';
import { useCareers } from '@/hooks/useCareers';
import buodLogo from '@/assets/buod-logo-white.png';

const CareersHeader = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [showDemoModal, setShowDemoModal] = useState(false);
  const { jobs } = useCareers();
  const isArabic = i18n.language === 'ar';

  const handleDemoRequest = () => {
    setShowDemoModal(true);
  };

  return (
    <>
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-background via-card to-background backdrop-blur-xl border-b border-border shadow-2xl">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-accent opacity-80"></div>
        </div>
        
        <div className="w-full px-4 sm:px-6 lg:px-8 relative">
          <div className="flex items-center justify-between h-24">
            {/* Logo Section */}
            <div className="flex items-center">
              <Link to="/" className="hover:scale-105 transition-all duration-300">
                <img 
                  src={buodLogo} 
                  alt="Buod HR" 
                  className="h-48 w-auto filter brightness-200 contrast-125 hover:brightness-225 transition-all duration-300 drop-shadow-2xl hover:scale-105 cursor-pointer" 
                />
              </Link>
            </div>

            {/* Center Section - Title & Icon */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Users className="h-8 w-8 text-accent animate-pulse" />
                <div className="absolute -inset-1 bg-accent/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  {isArabic ? 'وظائف بُعد HR' : 'Buod HR Careers'}
                </h1>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  {isArabic ? 'انضم إلى فريق المستقبل' : 'Join The Future Team'}
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-background via-card to-background backdrop-blur-xl rounded-2xl border border-border shadow-xl p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {isArabic ? 'حالة النظام' : 'System Status'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-lg shadow-success/50"></div>
                    <span className="text-xs text-success font-semibold">
                      {isArabic ? 'متاح' : 'Online'}
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3"></div>
                
                {/* Language & Settings Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  {/* Language Toggle Button */}
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    tabIndex={0}
                    aria-label={isArabic ? 'تغيير اللغة إلى الإنجليزية' : 'Change language to Arabic'}
                    className="group relative flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-border hover:border-accent hover:bg-accent/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
                  >
                    {/* Language Text */}
                    <span className="text-sm text-foreground font-bold tracking-wider group-hover:text-accent-foreground transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                    
                    {/* Animated Indicator */}
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-accent shadow-lg transition-all duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent opacity-0 group-hover:opacity-30 animate-ping"></div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </button>
                </div>
              </div>
              
              {/* Quick Stats Mini Panel */}
              <div className="bg-gradient-to-r from-background to-card backdrop-blur-lg rounded-xl border border-border px-3 py-2 shadow-lg">
                <div className="flex items-center space-x-3 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">{jobs.length} {isArabic ? 'وظيفة' : 'Jobs'}</span>
                  </div>
                  <div className="w-px h-3 bg-border"></div>
                  <div className="flex items-center space-x-1">
                    <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
                    <span className="text-muted-foreground">{isArabic ? 'محدّث' : 'Updated'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
        </div>
      </header>

      {/* Modal العرض التوضيحي */}
      <DemoRequestModal 
        isOpen={showDemoModal} 
        onClose={() => setShowDemoModal(false)} 
      />
    </>
  );
};

export default CareersHeader;