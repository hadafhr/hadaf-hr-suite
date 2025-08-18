import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle,
  Headphones,
  Calendar,
  Globe,
  Linkedin,
  Twitter,
  Youtube,
  Instagram
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Contact: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    preferredContact: 'email'
  });

  const contactMethods = [
    {
      icon: Phone,
      title: 'اتصل بنا',
      description: 'للدعم الفوري والاستشارات',
      value: '+966 11 123 4567',
      action: 'tel:+966111234567',
      available: 'الأحد - الخميس، 8 ص - 6 م'
    },
    {
      icon: MessageCircle,
      title: 'الدردشة المباشرة',
      description: 'تحدث مع فريق الدعم مباشرة',
      value: 'دردشة فورية',
      action: '/chat-messaging',
      available: 'متاح 24/7'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      description: 'للاستفسارات التفصيلية',
      value: 'support@boud.sa',
      action: 'mailto:support@boud.sa',
      available: 'استجابة خلال 24 ساعة'
    },
    {
      icon: Calendar,
      title: 'احجز اجتماع',
      description: 'عرض شخصي للمنصة',
      value: 'جدولة اجتماع',
      action: '/schedule',
      available: 'مواعيد مرنة'
    }
  ];

  const offices = [
    {
      city: 'الرياض',
      address: 'طريق الملك عبدالعزيز، حي العليا',
      phone: '+966 11 123 4567',
      email: 'riyadh@boud.sa',
      coordinates: { lat: 24.7136, lng: 46.6753 }
    },
    {
      city: 'جدة',
      address: 'شارع التحلية، حي الزهراء',
      phone: '+966 12 234 5678',
      email: 'jeddah@boud.sa',
      coordinates: { lat: 21.4858, lng: 39.1925 }
    },
    {
      city: 'الدمام',
      address: 'طريق الأمير محمد بن فهد، حي الشاطئ',
      phone: '+966 13 345 6789',
      email: 'dammam@boud.sa',
      coordinates: { lat: 26.4282, lng: 50.0777 }
    }
  ];

  const socialLinks = [
    { icon: Linkedin, name: 'LinkedIn', url: '#', color: 'text-blue-600' },
    { icon: Twitter, name: 'Twitter', url: '#', color: 'text-blue-400' },
    { icon: Youtube, name: 'YouTube', url: '#', color: 'text-red-600' },
    { icon: Instagram, name: 'Instagram', url: '#', color: 'text-pink-600' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "تم إرسال رسالتك بنجاح",
      description: "سنتواصل معك خلال 24 ساعة",
    });

    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
      preferredContact: 'email'
    });

    setIsSubmitting(false);
  };

  const handleContactMethod = (action: string) => {
    if (action.startsWith('tel:') || action.startsWith('mailto:')) {
      window.location.href = action;
    } else {
      navigate(action);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-8 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
            {t('btn.back')}
          </Button>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {t('contact.title')}
            </h1>
            <p className="text-xl text-muted-foreground">
              {t('contact.desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Contact Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">طرق التواصل</h2>
            <p className="text-xl text-muted-foreground">
              اختر الطريقة الأنسب للتواصل معنا
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactMethods.map((method, index) => (
              <Card 
                key={index}
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-border hover:border-primary/50 hover:-translate-y-1"
                onClick={() => handleContactMethod(method.action)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center group-hover:from-primary group-hover:to-primary-glow transition-all duration-300">
                    <method.icon className="w-8 h-8 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {method.description}
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="font-medium mb-2">{method.value}</div>
                  <div className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    {method.available}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="border-border">
              <CardHeader>
                <h2 className="text-2xl font-bold mb-2">أرسل لنا رسالة</h2>
                <p className="text-muted-foreground">
                  املأ النموذج وسنتواصل معك في أقرب وقت ممكن
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.form.name')} *
                      </label>
                      <Input 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="الاسم الكامل"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.form.email')} *
                      </label>
                      <Input 
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="البريد الإلكتروني"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('contact.form.company')}
                      </label>
                      <Input 
                        name="company"
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="اسم الشركة"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        رقم الهاتف
                      </label>
                      <Input 
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+966 5X XXX XXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      موضوع الرسالة *
                    </label>
                    <Input 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      placeholder="عن ماذا تريد التحدث؟"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('contact.form.message')} *
                    </label>
                    <Textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      placeholder="اكتب رسالتك هنا..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      طريقة التواصل المفضلة
                    </label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input 
                          type="radio"
                          name="preferredContact"
                          value="email"
                          checked={formData.preferredContact === 'email'}
                          onChange={handleInputChange}
                          className="ml-2 rtl:mr-2 rtl:ml-0"
                        />
                        بريد إلكتروني
                      </label>
                      <label className="flex items-center">
                        <input 
                          type="radio"
                          name="preferredContact"
                          value="phone"
                          checked={formData.preferredContact === 'phone'}
                          onChange={handleInputChange}
                          className="ml-2 rtl:mr-2 rtl:ml-0"
                        />
                        هاتف
                      </label>
                    </div>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>جاري الإرسال...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
                        {t('contact.form.submit')}
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Company Info */}
            <div className="space-y-8">
              {/* Offices */}
              <Card className="border-border">
                <CardHeader>
                  <h3 className="text-xl font-bold mb-2">مكاتبنا</h3>
                  <p className="text-muted-foreground">زر أحد مكاتبنا في المملكة</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  {offices.map((office, index) => (
                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
                      <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{office.city}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{office.address}</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            <a href={`tel:${office.phone}`} className="text-primary hover:underline">
                              {office.phone}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            <a href={`mailto:${office.email}`} className="text-primary hover:underline">
                              {office.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Business Hours */}
              <Card className="border-border">
                <CardHeader>
                  <h3 className="text-xl font-bold mb-2">ساعات العمل</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { day: 'الأحد - الخميس', time: '8:00 ص - 6:00 م', available: true },
                      { day: 'الجمعة', time: '1:00 م - 6:00 م', available: true },
                      { day: 'السبت', time: 'مغلق', available: false }
                    ].map((schedule, index) => (
                      <div key={index} className="flex justify-between items-center py-2">
                        <span className="font-medium">{schedule.day}</span>
                        <span className={`text-sm ${schedule.available ? 'text-green-600' : 'text-muted-foreground'}`}>
                          {schedule.time}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2 text-green-700">
                      <Headphones className="w-4 h-4" />
                      <span className="text-sm font-medium">الدعم الفني متاح 24/7</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border-border">
                <CardHeader>
                  <h3 className="text-xl font-bold mb-2">تابعنا</h3>
                  <p className="text-muted-foreground">ابق على اطلاع بآخر الأخبار والتحديثات</p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <a
                        key={index}
                        href={social.url}
                        className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center hover:shadow-md transition-all duration-300 ${social.color} hover:scale-105`}
                        title={social.name}
                      >
                        <social.icon className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">أسئلة شائعة</h2>
            <p className="text-xl text-muted-foreground">
              إجابات على أكثر الأسئلة شيوعاً
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: 'كم تستغرق عملية تنفيذ النظام؟',
                a: 'عادة ما تستغرق عملية التنفيذ من 2-6 أسابيع حسب حجم الشركة ومتطلباتها. نقوم بوضع خطة زمنية مفصلة بعد تحليل احتياجاتك.'
              },
              {
                q: 'هل يمكنني تجربة النظام قبل الشراء؟',
                a: 'نعم، نقدم تجربة مجانية لمدة 30 يوم مع دعم فني كامل لمساعدتك في تقييم النظام.'
              },
              {
                q: 'هل النظام متوافق مع الأنظمة الحكومية السعودية؟',
                a: 'نعم، النظام متكامل بالكامل مع التأمينات الاجتماعية ووزارة الموارد البشرية والأنظمة الحكومية الأخرى.'
              },
              {
                q: 'ما مستوى الدعم المقدم؟',
                a: 'نقدم دعم فني شامل متعدد المستويات بدءاً من الدعم الأساسي وصولاً للدعم المخصص 24/7 حسب الباقة.'
              },
              {
                q: 'هل بياناتي آمنة؟',
                a: 'نعم، نطبق أعلى معايير الأمان مع تشفير البيانات ونسخ احتياطية يومية ومراكز بيانات معتمدة في السعودية.'
              }
            ].map((faq, index) => (
              <Card key={index} className="border-border">
                <CardHeader>
                  <h3 className="font-semibold flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    {faq.q}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mr-8 rtl:ml-8 rtl:mr-0">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;