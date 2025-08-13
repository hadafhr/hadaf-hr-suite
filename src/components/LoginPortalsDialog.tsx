import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, Heart, ArrowLeft } from 'lucide-react';
import ecssPoral from '@/assets/e-css-portal.jpg';
import eisPortal from '@/assets/eis-portal.jpg';
import npcsPortal from '@/assets/npcs-portal.jpg';

interface LoginPortalsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginPortalsDialog: React.FC<LoginPortalsDialogProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handlePortalNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold text-primary mb-6">
            اختر بوابة الدخول
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee Portal */}
          <div 
            className="group relative overflow-hidden rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer" 
            onClick={() => handlePortalNavigation('/e-css')}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={ecssPoral} 
                alt="بوابة الموظفين" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <div className="bg-primary/90 backdrop-blur-sm rounded-full p-3">
                  <Users className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-xl font-bold text-primary">EMPLOYEE PORTAL</h4>
                <Badge variant="secondary" className="text-xs">بوابة الموظفين</Badge>
              </div>
              <h5 className="font-semibold mb-3 text-foreground">بوابة الموظفين الموحدة</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                منصة شاملة تجمع الخدمة الذاتية والوصول الفردي للموظفين - إدارة الإجازات، كشوف الرواتب، التقييمات، والخدمات الشخصية في مكان واحد.
              </p>
              <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                <span className="text-sm">دخول البوابة</span>
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Employers Portal */}
          <div 
            className="group relative overflow-hidden rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer" 
            onClick={() => handlePortalNavigation('/eis')}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={eisPortal} 
                alt="بوابة أصحاب العمل" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <div className="bg-primary/90 backdrop-blur-sm rounded-full p-3">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-xl font-bold text-primary">EMPLOYERS PORTAL</h4>
                <Badge variant="secondary" className="text-xs">بوابة أصحاب العمل</Badge>
              </div>
              <h5 className="font-semibold mb-3 text-foreground">بوابة أصحاب العمل الموحدة</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                مركز قيادي شامل يجمع أدوات إدارة الأعمال وخدمات أصحاب العمل - التوظيف، الرواتب، التقارير التنفيذية، والذكاء الاصطناعي في منصة واحدة.
              </p>
              <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                <span className="text-sm">دخول البوابة</span>
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Non-Profit Portal */}
          <div 
            className="group relative overflow-hidden rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer" 
            onClick={() => handlePortalNavigation('/npcs')}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={npcsPortal} 
                alt="بوابة القطاع غير الربحي" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute top-4 right-4">
                <div className="bg-primary/90 backdrop-blur-sm rounded-full p-3">
                  <Heart className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-3">
                <h4 className="text-xl font-bold text-primary">NON-PROFIT PORTAL</h4>
                <Badge variant="secondary" className="text-xs">بوابة القطاع غير الربحي</Badge>
              </div>
              <h5 className="font-semibold mb-3 text-foreground">بوابة القطاع غير الربحي</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                منصة متخصصة للمنظمات غير الربحية تدير المتطوعين والمشاريع الخيرية بكفاءة عالية، مع أدوات قياس الأثر المجتمعي والتنمية المستدامة.
              </p>
              <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                <span className="text-sm">دخول البوابة</span>
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};