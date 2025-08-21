import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Phone, Mail, MapPin, MessageCircle, Instagram, Linkedin, Twitter } from 'lucide-react';

const Contact: React.FC = () => {
  const navigate = useNavigate();

  const contactMethods = [
    {
      title: "سناب شات",
      description: "تابعنا على سناب شات للحصول على آخر الأخبار والتحديثات",
      icon: MessageCircle,
      link: "https://snapchat.com/add/boudhr",
      color: "text-yellow-500"
    },
    {
      title: "واتساب",
      description: "تواصل معنا مباشرة عبر واتساب",
      icon: MessageCircle,
      link: "https://wa.me/966920033445",
      color: "text-green-500"
    },
    {
      title: "البريد الإلكتروني",
      description: "راسلنا على البريد الإلكتروني الرسمي",
      icon: Mail,
      link: "mailto:info@boud.com.sa",
      color: "text-blue-500"
    },
    {
      title: "إنستغرام",
      description: "تابع منشوراتنا وقصص نجاح عملائنا",
      icon: Instagram,
      link: "https://instagram.com/boudhr",
      color: "text-pink-500"
    },
    {
      title: "تيك توك",
      description: "شاهد محتوانا التعليمي والترفيهي",
      icon: MessageCircle,
      link: "https://tiktok.com/@boudhr",
      color: "text-gray-800"
    },
    {
      title: "لينكدإن",
      description: "تواصل معنا مهنياً على لينكدإن",
      icon: Linkedin,
      link: "https://linkedin.com/company/boudhr",
      color: "text-blue-600"
    },
    {
      title: "X (تويتر)",
      description: "تابع آخر الأخبار والإعلانات",
      icon: Twitter,
      link: "https://x.com/boudhr",
      color: "text-gray-900"
    }
  ];

  const officeInfo = {
    address: "الرياض، المملكة العربية السعودية",
    phone: "920033445",
    email: "info@boud.com.sa",
    workingHours: "الأحد - الخميس: 8:00 ص - 5:00 م"
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
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            تواصل معنا
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نحن هنا لمساعدتك! تواصل معنا عبر أي من قنوات التواصل التالية وسيسعد فريقنا بالرد عليك
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Methods */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-foreground mb-6">قنوات التواصل</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <method.icon className={`w-6 h-6 ${method.color}`} />
                      {method.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{method.description}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => window.open(method.link, '_blank')}
                      className="w-full"
                    >
                      تواصل الآن
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Office Information */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">معلومات المكتب</h2>
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">العنوان</h4>
                    <p className="text-muted-foreground">{officeInfo.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">الهاتف</h4>
                    <p className="text-muted-foreground">{officeInfo.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">البريد الإلكتروني</h4>
                    <p className="text-muted-foreground">{officeInfo.email}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-2">ساعات العمل</h4>
                  <p className="text-muted-foreground">{officeInfo.workingHours}</p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="mt-6 space-y-3">
              <Button 
                onClick={() => navigate('/demo-request')}
                className="w-full bg-primary hover:bg-primary/90"
              >
                اطلب عرض توضيحي
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/service-calculator')}
                className="w-full"
              >
                احسب اشتراكك
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/schedule-meeting')}
                className="w-full"
              >
                احجز اجتماع
              </Button>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            الأسئلة الشائعة
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">كم يستغرق الرد على الاستفسارات؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  نلتزم بالرد على جميع الاستفسارات خلال 24 ساعة في أيام العمل.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">هل يمكنني طلب عرض توضيحي مجاني؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  نعم، نوفر عروض توضيحية مجانية مخصصة حسب احتياجات شركتك.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">هل تقدمون الدعم باللغة العربية؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  نعم، فريق الدعم الفني لدينا يتحدث العربية ومتاح لمساعدتك.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">ما هي طرق الدفع المتاحة؟</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  نقبل التحويل البنكي، الشيكات، والدفع الإلكتروني المحلي.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;