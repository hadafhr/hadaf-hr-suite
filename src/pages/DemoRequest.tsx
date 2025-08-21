import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Building, Users, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const DemoRequest: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    employeeCount: '',
    contactName: '',
    position: '',
    email: '',
    phone: '',
    message: '',
    preferredDemo: 'online'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast.success("تم إرسال طلبكم بنجاح! سيتم التواصل معكم خلال 24 ساعة.");
    setIsSubmitting(false);
    
    // Reset form
    setFormData({
      companyName: '',
      employeeCount: '',
      contactName: '',
      position: '',
      email: '',
      phone: '',
      message: '',
      preferredDemo: 'online'
    });
  };

  return (
    <div className="min-h-screen bg-background font-arabic">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              رجوع
            </Button>
            <img 
              src="/lovable-uploads/3c8f6f3e-60c9-4820-a3ff-6eb6a2bac597.png" 
              alt="BOUD HR Logo" 
              className="h-12 w-auto"
            />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              اطلب العرض التوضيحي
            </h1>
            <p className="text-lg text-muted-foreground">
              احصل على عرض توضيحي مجاني وشخصي لاكتشاف إمكانيات منصة بُعد HR
            </p>
          </div>

          {/* Demo Benefits */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">عرض مجاني 30 دقيقة</span>
                </div>
                <p className="text-sm text-muted-foreground">جلسة شخصية مع خبير المنتج</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="font-medium">تخصيص حسب احتياجاتكم</span>
                </div>
                <p className="text-sm text-muted-foreground">عرض مميزات النظام المناسبة لشركتكم</p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                معلومات الشركة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="companyName">اسم الشركة *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="ادخل اسم الشركة"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="employeeCount">عدد الموظفين *</Label>
                    <Select onValueChange={(value) => handleInputChange('employeeCount', value)} required>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر عدد الموظفين" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 موظفين</SelectItem>
                        <SelectItem value="11-50">11-50 موظف</SelectItem>
                        <SelectItem value="51-100">51-100 موظف</SelectItem>
                        <SelectItem value="101-500">101-500 موظف</SelectItem>
                        <SelectItem value="500+">أكثر من 500 موظف</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    معلومات جهة الاتصال
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">اسم المسؤول *</Label>
                      <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        placeholder="الاسم الكامل"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="position">المنصب</Label>
                      <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => handleInputChange('position', e.target.value)}
                        placeholder="مدير الموارد البشرية"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="example@company.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">رقم الهاتف *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="05xxxxxxxx"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="preferredDemo">نوع العرض المفضل</Label>
                  <Select onValueChange={(value) => handleInputChange('preferredDemo', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع العرض" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">عرض أونلاين (عبر الإنترنت)</SelectItem>
                      <SelectItem value="onsite">زيارة مكتبية</SelectItem>
                      <SelectItem value="phone">مكالمة هاتفية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">رسالة أو طلبات خاصة (اختياري)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="أخبرنا عن احتياجاتك الخاصة أو أي أسئلة لديك..."
                    rows={4}
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'جارٍ الإرسال...' : 'اطلب العرض التوضيحي'}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => navigate('/contact')}
                  >
                    أو تواصل معنا مباشرة
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              هل تحتاج للتحدث معنا مباشرة؟
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="outline" size="sm">
                <Phone className="w-4 h-4 ml-2" />
                920033445
              </Button>
              <Button variant="outline" size="sm">
                <Mail className="w-4 h-4 ml-2" />
                sales@boud.com.sa
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoRequest;