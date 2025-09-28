import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Globe, CheckCircle, PlayCircle, Clock, Star, ChevronRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const DemoRequestPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    phone: '',
    employeeCount: '',
    country: '',
    services: [] as string[],
    message: ''
  });

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceChange = (service: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        services: [...prev.services, service]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        services: prev.services.filter(s => s !== service)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال طلب العرض التجريبي بنجاح",
      description: "سيتم التواصل معك خلال 24 ساعة لتنسيق موعد العرض التجريبي"
    });
    console.log('Demo request submitted:', formData);
  };

  const services = [
    'استشارات الموارد البشرية',
    'حوكمة الشركات',
    'التدريب والتطوير',
    'تقييم الأداء',
    'التوظيف والاستقطاب',
    'إدارة المواهب'
  ];

  const clientTestimonials = [
    {
      name: "أحمد المالكي",
      position: "مدير الموارد البشرية - شركة النخبة",
      quote: "تجربة استثنائية في تطوير نظام الموارد البشرية لدينا"
    },
    {
      name: "سارة العتيبي", 
      position: "الرئيس التنفيذي - مجموعة الرؤية",
      quote: "خبرة عملية ونتائج ملموسة خلال فترة قصيرة"
    }
  ];

  const journeySteps = [
    {
      icon: <Users className="w-8 h-8 text-[#003366]" />,
      title: "التشاور والتخطيط",
      description: "دراسة احتياجاتك وتصميم الحلول المناسبة"
    },
    {
      icon: <PlayCircle className="w-8 h-8 text-[#003366]" />,
      title: "التنفيذ المبدئي", 
      description: "تطبيق الحلول بشكل تدريجي ومدروس"
    },
    {
      icon: <Clock className="w-8 h-8 text-[#003366]" />,
      title: "المتابعة والدعم",
      description: "مراقبة النتائج وتقديم الدعم المستمر"
    },
    {
      icon: <Star className="w-8 h-8 text-[#003366]" />,
      title: "التوسع والتطوير",
      description: "تطوير وتوسيع النظام حسب نمو الشركة"
    }
  ];

  return (
    <div className="min-h-screen bg-[#1C1C1C] text-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة للصفحة الرئيسية
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1C1C] via-[#2A2A2A] to-[#1C1C1C]"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              اجمع بين الخبرة والتنفيذ مع عرض تجريبي مخصص
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              احصل على تجربة مخصصة لاحتياجاتك في الموارد البشرية والتنظيم، مع التركيز على الكفاءة والتطبيق الفعلي
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl font-bold text-[#003366] mb-2">+150</div>
              <div className="text-gray-300">شركة عملت معها</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#003366] mb-2">+300</div>
              <div className="text-gray-300">مشروع HR تم تنفيذه</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-[#003366] mb-2">30</div>
              <div className="text-gray-300">ثانية متوسط الاستجابة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Form */}
      <section className="py-20 bg-gradient-to-b from-[#1C1C1C] to-[#2A2A2A]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white">اطلب عرضك التجريبي المخصص</h2>
              <p className="text-gray-300 text-lg">املأ النموذج وسنقوم بالتواصل معك خلال 24 ساعة</p>
            </div>

            <Card className="bg-[#2A2A2A] border-gray-700">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-white">اسم الشركة</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="bg-[#1C1C1C] border-gray-600 text-white"
                        placeholder="أدخل اسم الشركة"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-white">الاسم الكامل</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="bg-[#1C1C1C] border-gray-600 text-white"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">البريد الإلكتروني</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="bg-[#1C1C1C] border-gray-600 text-white"
                        placeholder="your.email@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-[#1C1C1C] border-gray-600 text-white"
                        placeholder="+966 50 000 0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white">عدد الموظفين</Label>
                      <Select onValueChange={(value) => handleInputChange('employeeCount', value)}>
                        <SelectTrigger className="bg-[#1C1C1C] border-gray-600 text-white">
                          <SelectValue placeholder="اختر عدد الموظفين" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2A2A2A] border-gray-600">
                          <SelectItem value="1-10" className="text-white">1-10 موظفين</SelectItem>
                          <SelectItem value="11-50" className="text-white">11-50 موظف</SelectItem>
                          <SelectItem value="51-200" className="text-white">51-200 موظف</SelectItem>
                          <SelectItem value="200+" className="text-white">أكثر من 200 موظف</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">الدولة</Label>
                      <Select onValueChange={(value) => handleInputChange('country', value)}>
                        <SelectTrigger className="bg-[#1C1C1C] border-gray-600 text-white">
                          <SelectValue placeholder="اختر الدولة" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#2A2A2A] border-gray-600">
                          <SelectItem value="saudi" className="text-white">المملكة العربية السعودية</SelectItem>
                          <SelectItem value="uae" className="text-white">دولة الإمارات العربية المتحدة</SelectItem>
                          <SelectItem value="qatar" className="text-white">قطر</SelectItem>
                          <SelectItem value="kuwait" className="text-white">الكويت</SelectItem>
                          <SelectItem value="bahrain" className="text-white">البحرين</SelectItem>
                          <SelectItem value="oman" className="text-white">سلطنة عمان</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-white">الخدمات المهتم بها</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {services.map((service) => (
                        <div key={service} className="flex items-center space-x-2 space-x-reverse">
                          <Checkbox
                            id={service}
                            onCheckedChange={(checked) => handleServiceChange(service, !!checked)}
                            className="border-gray-600"
                          />
                          <Label htmlFor={service} className="text-white text-sm">{service}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">رسالة إضافية (اختيارية)</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className="bg-[#1C1C1C] border-gray-600 text-white min-h-[100px]"
                      placeholder="أخبرنا المزيد عن احتياجاتك..."
                    />
                  </div>

                  <div className="flex justify-center">
                    <Button type="submit" className="bg-[#003366] hover:bg-[#004499] text-white px-12 py-4 text-lg">
                      اطلب عرض تجريبي
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Client Journey */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">رحلة العميل معنا</h2>
            <p className="text-gray-300 text-lg">خطوات واضحة ومدروسة لضمان نجاح مشروعك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {journeySteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-[#2A2A2A] rounded-full flex items-center justify-center border-2 border-[#003366]">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
                {index < journeySteps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-8 -right-4 w-6 h-6 text-[#003366]" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-gradient-to-b from-[#1C1C1C] to-[#2A2A2A]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">ماذا يقول عملاؤنا</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {clientTestimonials.map((testimonial, index) => (
              <Card key={index} className="bg-[#2A2A2A] border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-[#003366] fill-current" />
                    <Star className="w-5 h-5 text-[#003366] fill-current" />
                    <Star className="w-5 h-5 text-[#003366] fill-current" />
                    <Star className="w-5 h-5 text-[#003366] fill-current" />
                    <Star className="w-5 h-5 text-[#003366] fill-current" />
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-[#003366] text-sm">{testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative CTAs */}
      <section className="py-20 bg-[#1C1C1C]">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-white mb-8">استكشف المزيد</h2>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button 
                variant="outline" 
                className="border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white px-8 py-4 text-lg"
              >
                <PlayCircle className="w-5 h-5 ml-2" />
                شاهد فيديو توضيحي
              </Button>
              
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-[#1C1C1C] px-8 py-4 text-lg"
                onClick={() => navigate('/')}
              >
                اطلع على الخدمات الكاملة
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DemoRequestPage;