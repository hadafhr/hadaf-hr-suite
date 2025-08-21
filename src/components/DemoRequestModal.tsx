import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BoudLogo } from './BoudLogo';
import { Calendar, Users, Mail, Phone, Building, Play } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoRequestModal: React.FC<DemoRequestModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    employeeCount: '',
    preferredTime: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // محاكاة إرسال الطلب
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "تم إرسال طلبك بنجاح! 🎯",
      description: "سيتواصل معك أخصائي المبيعات خلال ساعة واحدة لتحديد موعد العرض التوضيحي",
    });

    setIsSubmitting(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const timeSlots = [
    '9:00 ص - 10:00 ص',
    '10:00 ص - 11:00 ص', 
    '11:00 ص - 12:00 م',
    '1:00 م - 2:00 م',
    '2:00 م - 3:00 م',
    '3:00 م - 4:00 م'
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BoudLogo variant="icon" size="md" />
          </div>
          <DialogTitle className="text-xl font-bold text-gradient flex items-center justify-center gap-2">
            <Play className="h-5 w-5" />
            اطلب عرضًا توضيحيًا
          </DialogTitle>
          <p className="text-muted-foreground text-sm mt-2">
            احجز عرضًا توضيحيًا مخصصًا لشركتك (30 دقيقة)
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-6">
          <div className="space-y-2">
            <Label htmlFor="companyName" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              اسم الجهة *
            </Label>
            <Input
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              placeholder="اسم الشركة أو المؤسسة"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="contactPerson">اسم المسؤول *</Label>
            <Input
              id="contactPerson"
              value={formData.contactPerson}
              onChange={(e) => handleInputChange('contactPerson', e.target.value)}
              placeholder="اسم الشخص المسؤول"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                البريد *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="البريد الإلكتروني"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                الجوال *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="05xxxxxxxx"
                required
              />
            </div>
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
            <Label htmlFor="preferredTime" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              الوقت المفضل
            </Label>
            <Select value={formData.preferredTime} onValueChange={(value) => handleInputChange('preferredTime', value)}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الوقت المناسب" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((slot) => (
                  <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="requirements">متطلبات خاصة</Label>
            <Textarea
              id="requirements"
              value={formData.requirements}
              onChange={(e) => handleInputChange('requirements', e.target.value)}
              placeholder="أي متطلبات أو أسئلة محددة تريد مناقشتها خلال العرض"
              rows={3}
            />
          </div>

          {/* ما ستحصل عليه في العرض */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
            <h4 className="font-semibold text-primary text-sm">ما ستحصل عليه في العرض التوضيحي:</h4>
            <ul className="text-xs space-y-1 text-muted-foreground">
              <li>• جولة شخصية في النظام</li>
              <li>• عرض مخصص حسب احتياجات شركتك</li>
              <li>• إجابة على جميع أسئلتك</li>
              <li>• خطة تنفيذ مخصصة</li>
              <li>• عرض سعر خاص</li>
            </ul>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-primary-glow"
            disabled={isSubmitting}
          >
            {isSubmitting ? "جاري الإرسال..." : "احجز العرض التوضيحي"}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-4">
          العرض التوضيحي مجاني بالكامل وبدون التزام
        </p>
      </DialogContent>
    </Dialog>
  );
};