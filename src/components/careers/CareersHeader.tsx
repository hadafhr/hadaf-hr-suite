import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Home, Play, Sparkles } from 'lucide-react';
import DemoRequestModal from './DemoRequestModal';

const CareersHeader = () => {
  const navigate = useNavigate();
  const [showDemoModal, setShowDemoModal] = useState(false);

  const handleDemoRequest = () => {
    setShowDemoModal(true);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          {/* الشعار والعلامة التجارية */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              {/* شعار بُعد */}
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">ب</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-pulse"></div>
              </div>
              
              {/* اسم الشركة */}
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                  بُعد HR
                </span>
                <span className="text-xs text-muted-foreground -mt-1">
                  وظائف المستقبل
                </span>
              </div>
            </div>
          </div>

          {/* التنقل والأزرار */}
          <div className="flex items-center gap-4">
            {/* زر العودة للصفحة الرئيسية */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="hidden sm:flex items-center gap-2 hover:bg-muted/80 transition-colors"
            >
              <Home className="w-4 h-4" />
              الصفحة الرئيسية
            </Button>

            {/* زر طلب عرض توضيحي */}
            <Button
              onClick={handleDemoRequest}
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden"
              size="sm"
            >
              {/* تأثير الضوء المتحرك */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <div className="flex items-center gap-2 relative z-10">
                <Play className="w-4 h-4" />
                <span className="hidden sm:inline">اطلب عرض توضيحي</span>
                <span className="sm:hidden">عرض توضيحي</span>
                <Sparkles className="w-4 h-4 animate-pulse" />
              </div>
            </Button>

            {/* زر العودة للصفحة الرئيسية للشاشات الصغيرة */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="sm:hidden"
            >
              <Home className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* شريط الإنجازات السريع */}
        <div className="hidden md:flex items-center justify-center py-2 border-t bg-muted/30">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>+500 موظف سعيد</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span>+1000 تطبيق ناجح</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <span>منصة موثوقة 100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal العرض التوضيحي */}
      <DemoRequestModal 
        isOpen={showDemoModal} 
        onClose={() => setShowDemoModal(false)} 
      />
    </header>
  );
};

export default CareersHeader;