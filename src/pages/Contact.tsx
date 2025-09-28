import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { BoudLogo } from '@/components/BoudLogo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ArrowLeft, Send, Phone, Mail, MapPin, Clock } from 'lucide-react';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, { message: "الاسم يجب أن يكون على الأقل حرفين" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صحيح" }),
  phone: z.string().min(10, { message: "رقم الهاتف يجب أن يكون على الأقل 10 أرقام" }),
  subject: z.string().min(5, { message: "الموضوع يجب أن يكون على الأقل 5 أحرف" }),
  message: z.string().min(10, { message: "الرسالة يجب أن تكون على الأقل 10 أحرف" })
});

type ContactForm = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  });

  const onSubmit = (data: ContactForm) => {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', data);
    toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.');
    form.reset();
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
            <BoudLogo variant="full" size="md" />
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
            نحن هنا لمساعدتك! املأ النموذج أدناه وسيتواصل معك فريقنا في أقرب وقت ممكن
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-primary" />
                  نموذج التواصل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>الاسم الكامل</FormLabel>
                            <FormControl>
                              <Input placeholder="أدخل اسمك الكامل" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>البريد الإلكتروني</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="example@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>رقم الهاتف</FormLabel>
                            <FormControl>
                              <Input placeholder="05xxxxxxxx" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>موضوع الرسالة</FormLabel>
                            <FormControl>
                              <Input placeholder="أدخل موضوع رسالتك" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>نص الرسالة</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="اكتب رسالتك هنا..."
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full"
                      disabled={form.formState.isSubmitting}
                    >
                      <Send className="w-4 h-4 ml-2" />
                      إرسال الرسالة
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات التواصل</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">الهاتف</h4>
                    <p className="text-muted-foreground">920033445</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">البريد الإلكتروني</h4>
                    <p className="text-muted-foreground">info@boud.com.sa</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">العنوان</h4>
                    <p className="text-muted-foreground">الرياض، المملكة العربية السعودية</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">ساعات العمل</h4>
                    <p className="text-muted-foreground">الأحد - الخميس: 8:00 ص - 5:00 م</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>خدمات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => navigate('/demo-request')}
                  className="w-full"
                  variant="default"
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;