import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BoudLogo } from './BoudLogo';
import { Building, Users, Mail, Phone, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FreeTrialModal: React.FC<FreeTrialModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    employeeCount: '',
    sector: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // محاكاة إرسال البيانات
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "تم إرسال طلبك بنجاح! 🎉",
      description: "سيتواصل معك فريقنا خلال 24 ساعة لتفعيل تجربتك المجانية",
    });

    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BoudLogo variant="icon" size="md" />
          </div>
          <DialogTitle className="text-xl font-bold text-gradient">
            تجربة مجانية لمدة 14 يومًا
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-2">
            احصل على وصول كامل لجميع مزايا نظام بُعد HR مجانًا
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              اسم الشركة *
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="اسم شركتك أو مؤسستك"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              البريد الإلكتروني *
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="email@company.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              رقم الجوال *
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="05xxxxxxxx"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="employeeCount" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              عدد الموظفين *
            </Label>
            <Select value={formData.employeeCount} onValueChange={(value) => handleInputChange('employeeCount', value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر عدد الموظفين" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1-10">1-10 موظفين</SelectItem>
                <SelectItem value="11-50">11-50 موظف</SelectItem>
                <SelectItem value="51-250">51-250 موظف</SelectItem>
                <SelectItem value="250+">أكثر من 250 موظف</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>القطاع</Label>
            <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر قطاع الشركة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="private">قطاع خاص</SelectItem>
                <SelectItem value="nonprofit">مؤسسة غير ربحية</SelectItem>
                <SelectItem value="healthcare">صحي</SelectItem>
                <SelectItem value="education">تعليمي</SelectItem>
                <SelectItem value="government">حكومي</SelectItem>
                <SelectItem value="other">أخرى</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* مميزات التجربة المجانية */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-primary flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              ما ستحصل عليه:
            </h4>
            <ul className="text-sm space-y-1">
              <li>• وصول كامل لجميع الوحدات</li>
              <li>• إعداد مجاني للنظام</li>
              <li>• تدريب الفريق</li>
              <li>• دعم فني 24/7</li>
            </ul>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-primary-glow"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإرسال..." : "ابدأ تجربتك المجانية"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          بالنقر على "ابدأ تجربتك المجانية" فإنك توافق على شروط الخدمة وسياسة الخصوصية
        </p>
      </DialogContent>
    </Dialog>
  );
};