import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CalendarDays, Clock, Users, Video, Phone, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DemoRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DemoRequestModal: React.FC<DemoRequestModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    companySize: '',
    jobTitle: '',
    interestedFeatures: [] as string[],
    preferredTime: '',
    additionalNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      interestedFeatures: prev.interestedFeatures.includes(feature)
        ? prev.interestedFeatures.filter(f => f !== feature)
        : [...prev.interestedFeatures, feature]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // محاكاة إرسال البيانات
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "تم تسجيل طلبك بنجاح! ✨",
      description: "سيتواصل معك فريق المبيعات خلال 24 ساعة لتحديد موعد العرض التوضيحي",
      variant: "default"
    });

    setIsSubmitting(false);
    onClose();
    
    // إعادة تعيين النموذج
    setFormData({
      fullName: '', email: '', phone: '', companyName: '', companySize: '',
      jobTitle: '', interestedFeatures: [], preferredTime: '', additionalNotes: ''
    });
  };

  const features = [
    'إدارة الموظفين', 'نظام الحضور والانصراف', 'إدارة الرواتب', 
    'التوظيف والاستقطاب', 'تقييم الأداء', 'إدارة الإجازات',
    'التدريب والتطوير', 'التقارير والتحليلات'
  ];

  const companySizes = [
    { value: '1-10', label: '1-10 موظفين' },
    { value: '11-50', label: '11-50 موظف' },
    { value: '51-200', label: '51-200 موظف' },
    { value: '201-500', label: '201-500 موظف' },
    { value: '500+', label: 'أكثر من 500 موظف' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-glow rounded-lg flex items-center justify-center">
              <Video className="w-4 h-4 text-white" />
            </div>
            اطلب عرضاً توضيحياً مجانياً
          </DialogTitle>
          <DialogDescription className="text-base mt-2">
            احصل على عرض توضيحي شخصي لمنصة بُعد HR واكتشف كيف يمكنها تحويل إدارة الموارد البشرية في شركتك
          </DialogDescription>
        </DialogHeader>

        {/* مميزات العرض التوضيحي */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CalendarDays className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm font-medium">30 دقيقة</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm font-medium">تفاعلي</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm font-medium">مخصص</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-sm font-medium">مجاني</p>
          </div>
        </div>

        <Separator />

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {/* المعلومات الشخصية */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">الاسم الكامل *</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                placeholder="اسمك الكامل"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">البريد الإلكتروني *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="your@company.com"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone">رقم الهاتف *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+966 5X XXX XXXX"
                required
              />
            </div>
            <div>
              <Label htmlFor="jobTitle">المسمى الوظيفي</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                placeholder="مدير الموارد البشرية"
              />
            </div>
          </div>

          {/* معلومات الشركة */}
          <Separator />
          <h3 className="text-lg font-semibold">معلومات الشركة</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">اسم الشركة *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="اسم شركتك"
                required
              />
            </div>
            <div>
              <Label htmlFor="companySize">حجم الشركة</Label>
              <Select
                value={formData.companySize}
                onValueChange={(value) => handleInputChange('companySize', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="اختر حجم الشركة" />
                </SelectTrigger>
                <SelectContent>
                  {companySizes.map(size => (
                    <SelectItem key={size.value} value={size.value}>
                      {size.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* المميزات المهتم بها */}
          <div>
            <Label>المميزات التي تهتم بها (اختيارية)</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {features.map(feature => (
                <Badge
                  key={feature}
                  variant={formData.interestedFeatures.includes(feature) ? "default" : "outline"}
                  className="cursor-pointer transition-colors"
                  onClick={() => toggleFeature(feature)}
                >
                  {feature}
                </Badge>
              ))}
            </div>
          </div>

          {/* الوقت المفضل */}
          <div>
            <Label htmlFor="preferredTime">الوقت المفضل للعرض</Label>
            <Select
              value={formData.preferredTime}
              onValueChange={(value) => handleInputChange('preferredTime', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="اختر الوقت المناسب" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">الصباح (9:00 - 12:00)</SelectItem>
                <SelectItem value="afternoon">بعد الظهر (1:00 - 5:00)</SelectItem>
                <SelectItem value="evening">المساء (6:00 - 9:00)</SelectItem>
                <SelectItem value="flexible">مرن</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ملاحظات إضافية */}
          <div>
            <Label htmlFor="additionalNotes">ملاحظات إضافية</Label>
            <Textarea
              id="additionalNotes"
              value={formData.additionalNotes}
              onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
              placeholder="أخبرنا عن التحديات التي تواجهها في إدارة الموارد البشرية..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              إلغاء
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  جاري الإرسال...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  احجز عرضك التوضيحي
                </div>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DemoRequestModal;