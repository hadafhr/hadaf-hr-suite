import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Users, Globe, CheckCircle, PlayCircle, Clock, Star, ChevronRight, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import buodLogo from '@/assets/buod-logo-white.png';

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
    <div className="min-h-screen bg-black text-white relative overflow-hidden" dir="rtl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#008C6A]/20 via-transparent to-[#008C6A]/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#008C6A" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-black via-gray-900 to-black backdrop-blur-xl border-b border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-[#008C6A] via-[#009F87] to-[#00694F] opacity-80"></div>
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
                <BarChart3 className="h-8 w-8 text-[#008C6A] animate-pulse" />
                <div className="absolute -inset-1 bg-[#008C6A]/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">
                  احجز عرض تجريبي
                </h1>
                <p className="text-sm text-gray-400 animate-fade-in">
                  استشارات الموارد البشرية الاحترافية
                </p>
              </div>
            </div>

            {/* Right Section - Back Button */}
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/')}
                className="group relative flex items-center space-x-2 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-[#008C6A]/40 hover:border-[#008C6A]/70 hover:from-[#008C6A]/30 hover:to-[#00694F]/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#008C6A]/50 shadow-lg hover:shadow-[#008C6A]/20"
              >
                <ArrowLeft className="w-5 h-5 text-white group-hover:text-[#008C6A] transition-colors duration-300" />
                <span className="text-sm text-white font-bold tracking-wider group-hover:text-[#008C6A] transition-colors duration-300">
                  العودة للرئيسية
                </span>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#008C6A]/0 via-[#008C6A]/20 to-[#008C6A]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </button>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#008C6A] to-transparent"></div>
        </div>
      </header>

      {/* Floating Elements for Professional Look */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-[#008C6A]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-32 left-16 w-32 h-32 bg-[#008C6A]/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 right-20 w-16 h-16 bg-[#008C6A]/15 rounded-full blur-lg animate-pulse delay-500"></div>

      {/* Enhanced Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="container mx-auto px-4 relative z-10">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-[#008C6A]/30 to-transparent blur-sm"></div>
          
          <div className="text-center mb-16">
            <div className="relative inline-flex items-center justify-center w-32 h-32 rounded-full mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
              <img 
                src="/boud-logo-white.png" 
                alt="شعار بُعد" 
                className="h-28 w-28 object-contain transition-all duration-300 group-hover:brightness-110 z-10 relative drop-shadow-2xl" 
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent leading-tight">
              اجمع بين الخبرة والتنفيذ مع عرض تجريبي مخصص
            </h1>
            <div className="relative max-w-3xl mx-auto">
              <p className="text-gray-300 text-xl leading-relaxed bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl">
                احصل على تجربة مخصصة لاحتياجاتك في الموارد البشرية والتنظيم، مع التركيز على الكفاءة والتطبيق الفعلي
              </p>
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <div className="text-center bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl hover:shadow-[#008C6A]/30 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-[#008C6A] mb-2 bg-gradient-to-r from-[#008C6A] to-[#00694F] bg-clip-text text-transparent">+150</div>
              <div className="text-gray-300">شركة عملت معها</div>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl hover:shadow-[#008C6A]/30 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-[#008C6A] mb-2 bg-gradient-to-r from-[#008C6A] to-[#00694F] bg-clip-text text-transparent">+300</div>
              <div className="text-gray-300">مشروع HR تم تنفيذه</div>
            </div>
            <div className="text-center bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl hover:shadow-[#008C6A]/30 transition-all duration-300 hover:scale-105">
              <div className="text-4xl font-bold text-[#008C6A] mb-2 bg-gradient-to-r from-[#008C6A] to-[#00694F] bg-clip-text text-transparent">30</div>
              <div className="text-gray-300">ثانية متوسط الاستجابة</div>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Request Form */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">اطلب عرضك التجريبي المخصص</h2>
              <p className="text-gray-300 text-lg bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-[#008C6A]/20 inline-block">املأ النموذج وسنقوم بالتواصل معك خلال 24 ساعة</p>
            </div>

            <Card className="bg-black/40 backdrop-blur-xl border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20 hover:shadow-[#008C6A]/30 transition-all duration-300">
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="companyName" className="text-white">اسم الشركة</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        className="bg-black/60 border-[#008C6A]/40 text-white focus:border-[#008C6A] transition-colors duration-300"
                        placeholder="أدخل اسم الشركة"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-white">الاسم الكامل</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        className="bg-black/60 border-[#008C6A]/40 text-white focus:border-[#008C6A] transition-colors duration-300"
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
                        className="bg-black/60 border-[#008C6A]/40 text-white focus:border-[#008C6A] transition-colors duration-300"
                        placeholder="your.email@company.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-white">رقم الهاتف</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-black/60 border-[#008C6A]/40 text-white focus:border-[#008C6A] transition-colors duration-300"
                        placeholder="+966 50 000 0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-white">عدد الموظفين</Label>
                      <Select onValueChange={(value) => handleInputChange('employeeCount', value)}>
                        <SelectTrigger className="bg-black/60 border-[#008C6A]/40 text-white focus:border-[#008C6A] transition-colors duration-300">
                          <SelectValue placeholder="اختر عدد الموظفين" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border-[#008C6A]/40">
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
                        <SelectTrigger className="bg-black/60 border-[#008C6A]/40 text-white focus:border-[#008C6A] transition-colors duration-300">
                          <SelectValue placeholder="اختر الدولة" />
                        </SelectTrigger>
                        <SelectContent className="bg-black/90 backdrop-blur-xl border-[#008C6A]/40">
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
                            className="border-[#008C6A]/40 data-[state=checked]:bg-[#008C6A] data-[state=checked]:border-[#008C6A]"
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
                        className="bg-black/60 border-[#008C6A]/40 text-white min-h-[100px] focus:border-[#008C6A] transition-colors duration-300"
                        placeholder="أخبرنا المزيد عن احتياجاتك..."
                      />
                  </div>

                  <div className="flex justify-center">
                    <Button type="submit" className="bg-gradient-to-r from-[#008C6A] to-[#00694F] hover:from-[#00694F] hover:to-[#008C6A] text-white px-12 py-4 text-lg shadow-2xl shadow-[#008C6A]/40 hover:shadow-[#008C6A]/60 transition-all duration-300 hover:scale-105">
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
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">رحلة العميل معنا</h2>
            <p className="text-gray-300 text-lg bg-black/20 backdrop-blur-sm p-4 rounded-xl border border-[#008C6A]/20 inline-block">خطوات واضحة ومدروسة لضمان نجاح مشروعك</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {journeySteps.map((step, index) => (
              <div key={index} className="text-center relative bg-black/20 backdrop-blur-sm p-6 rounded-2xl border border-[#008C6A]/20 shadow-xl hover:shadow-[#008C6A]/30 transition-all duration-300 hover:scale-105">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#008C6A]/20 to-[#00694F]/20 rounded-full flex items-center justify-center border-2 border-[#008C6A] shadow-lg shadow-[#008C6A]/40">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{step.title}</h3>
                <p className="text-gray-300">{step.description}</p>
                {index < journeySteps.length - 1 && (
                  <ChevronRight className="hidden lg:block absolute top-8 -right-4 w-6 h-6 text-[#008C6A] animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Testimonials */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">ماذا يقول عملاؤنا</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {clientTestimonials.map((testimonial, index) => (
              <Card key={index} className="bg-black/40 backdrop-blur-xl border-[#008C6A]/30 shadow-2xl shadow-[#008C6A]/20 hover:shadow-[#008C6A]/30 transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Star className="w-5 h-5 text-[#008C6A] fill-current animate-pulse" />
                    <Star className="w-5 h-5 text-[#008C6A] fill-current animate-pulse" />
                    <Star className="w-5 h-5 text-[#008C6A] fill-current animate-pulse" />
                    <Star className="w-5 h-5 text-[#008C6A] fill-current animate-pulse" />
                    <Star className="w-5 h-5 text-[#008C6A] fill-current animate-pulse" />
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <h4 className="font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-[#008C6A] text-sm">{testimonial.position}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Alternative CTAs */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8">
            <h2 className="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent">استكشف المزيد</h2>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <Button 
                variant="outline" 
                className="border-[#008C6A] text-[#008C6A] hover:bg-[#008C6A] hover:text-white px-8 py-4 text-lg shadow-lg shadow-[#008C6A]/20 hover:shadow-[#008C6A]/40 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <PlayCircle className="w-5 h-5 ml-2" />
                شاهد فيديو توضيحي
              </Button>
              
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
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