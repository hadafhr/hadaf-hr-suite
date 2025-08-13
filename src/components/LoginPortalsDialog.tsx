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
          {/* E-CSS - Employee Portal */}
          <div 
            className="group relative overflow-hidden rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer" 
            onClick={() => handlePortalNavigation('/e-css')}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={ecssPoral} 
                alt="بوابة الموظف - E-CSS" 
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
                <h4 className="text-xl font-bold text-primary">E-CSS</h4>
                <Badge variant="secondary" className="text-xs">بوابة الموظف</Badge>
              </div>
              <h5 className="font-semibold mb-3 text-foreground">الخدمة الذاتية السحابية للموظفين</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                منصة شاملة تمكن الموظفين من إدارة جميع احتياجاتهم المهنية بسهولة - من طلب الإجازات والسلف إلى مراجعة كشوف الرواتب والتقييمات.
              </p>
              <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                <span className="text-sm">دخول البوابة</span>
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* EIS - Employer Portal */}
          <div 
            className="group relative overflow-hidden rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer" 
            onClick={() => handlePortalNavigation('/eis')}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={eisPortal} 
                alt="بوابة صاحب العمل - EIS" 
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
                <h4 className="text-xl font-bold text-primary">EIS</h4>
                <Badge variant="secondary" className="text-xs">بوابة صاحب العمل</Badge>
              </div>
              <h5 className="font-semibold mb-3 text-foreground">الخدمات المتكاملة لأصحاب العمل</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                مركز قيادي متطور يوفر لوحة تحكم شاملة لإدارة المؤسسة - من التوظيف والرواتب إلى التقارير التنفيذية والذكاء الاصطناعي.
              </p>
              <div className="flex items-center text-primary font-medium group-hover:text-primary/80 transition-colors">
                <span className="text-sm">دخول البوابة</span>
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* NPCS - Nonprofit Portal */}
          <div 
            className="group relative overflow-hidden rounded-2xl bg-background border border-border hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer" 
            onClick={() => handlePortalNavigation('/npcs')}
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={npcsPortal} 
                alt="بوابة القطاع غير الربحي - NPCS" 
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
                <h4 className="text-xl font-bold text-primary">NPCS</h4>
                <Badge variant="secondary" className="text-xs">القطاع غير الربحي</Badge>
              </div>
              <h5 className="font-semibold mb-3 text-foreground">الخدمات الشاملة للقطاع غير الربحي</h5>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                منصة مخصصة للمنظمات غير الربحية تدير المتطوعين والمشاريع الخيرية بكفاءة عالية، مع أدوات قياس الأثر المجتمعي.
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