import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Calendar, Clock, CheckCircle, User, Building, Mail, Phone, MapPin, MessageSquare, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { BoudLogo } from '@/components/BoudLogo';
import { PatternBackground } from '@/components/PatternBackground';

const meetingSchema = z.object({
  fullName: z.string().min(2, 'الاسم الكامل مطلوب'),
  companyName: z.string().optional(),
  email: z.string().email('البريد الإلكتروني غير صحيح'),
  phone: z.string().optional(),
  city: z.string().optional(),
  meetingDate: z.date({
    required_error: 'يرجى تحديد تاريخ الاجتماع',
  }),
  meetingTime: z.string({
    required_error: 'يرجى تحديد وقت الاجتماع',
  }),
  notes: z.string().optional(),
});

type MeetingForm = z.infer<typeof meetingSchema>;

const timeSlots = [
  '09:00 ص', '09:30 ص', '10:00 ص', '10:30 ص', '11:00 ص', '11:30 ص',
  '12:00 ظ', '12:30 ظ', '01:00 م', '01:30 م', '02:00 م', '02:30 م',
  '03:00 م', '03:30 م', '04:00 م', '04:30 م', '05:00 م', '05:30 م'
];

const saudiCities = [
  'الرياض', 'جدة', 'مكة المكرمة', 'المدينة المنورة', 'الدمام', 'الخبر', 'تبوك',
  'بريدة', 'خميس مشيط', 'حائل', 'الطائف', 'الجبيل', 'نجران', 'جازان',
  'ينبع', 'الأحساء', 'القطيف', 'أبها', 'الباحة', 'سكاكا', 'عرعر', 'رفحاء'
];

export const ScheduleMeeting: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<MeetingForm>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      fullName: '',
      companyName: '',
      email: '',
      phone: '',
      city: '',
      notes: '',
    },
  });

  const onSubmit = async (data: MeetingForm) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Meeting scheduled:', data);
      setIsSubmitted(true);
      setIsLoading(false);
      
      toast({
        title: "تم حجز اجتماعك بنجاح",
        description: "سيتم التواصل معك قريباً لتأكيد الموعد. شكراً لتواصلك معنا.",
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4 relative">
        <PatternBackground opacity={0.08} size={400} />
        <Card className="max-w-md w-full text-center shadow-strong relative z-10">
          <CardContent className="p-8">
            <div className="mb-6">
              <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                تم حجز اجتماعك بنجاح!
              </h1>
              <p className="text-muted-foreground leading-relaxed">
                سيتم التواصل معك قريباً لتأكيد الموعد. شكراً لتواصلك معنا.
              </p>
            </div>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                form.reset();
              }}
              className="w-full"
            >
              حجز اجتماع آخر
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 px-4 relative">
      <PatternBackground opacity={0.08} size={400} />
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with Logo and Back Button */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 hover:bg-primary/10"
          >
            <ArrowRight className="h-4 w-4" />
            العودة
          </Button>
          
          <div className="flex-1 flex justify-center">
            <BoudLogo variant="full" size="lg" showText />
          </div>
          
          <div className="w-20"></div> {/* Spacer for balance */}
        </div>
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Calendar className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">
              احجز اجتماعاً مع فريقنا المختص
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            اكتشف كيف يمكن لمنصتنا أن تساعدك في أتمتة جميع عمليات الموارد البشرية بسهولة واحترافية. 
            احجز جلسة تعريفية مجانية مخصصة حسب احتياج منشأتك.
          </p>
        </div>

        {/* Form */}
        <Card className="shadow-strong bg-background/95 backdrop-blur-sm border-border/50">
          <CardContent className="p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          الاسم الكامل *
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسمك الكامل" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Company Name */}
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Building className="h-4 w-4" />
                          اسم المنشأة
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسم منشأتك" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Email */}
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          البريد الإلكتروني *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="example@company.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Phone */}
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          رقم الجوال
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="05xxxxxxxx" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* City */}
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          المدينة
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر مدينتك" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {saudiCities.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Meeting Date */}
                  <FormField
                    control={form.control}
                    name="meetingDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          تاريخ الاجتماع *
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-right font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP", { locale: ar })
                                ) : (
                                  <span>اختر التاريخ</span>
                                )}
                                <Calendar className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date < new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              className="pointer-events-auto"
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Meeting Time */}
                  <FormField
                    control={form.control}
                    name="meetingTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          وقت الاجتماع *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الوقت المناسب" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        ملاحظات أو أسئلة إضافية
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="أخبرنا عن احتياجاتك أو أي أسئلة تود مناقشتها..."
                          className="min-h-[100px] resize-none"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2" />
                        جاري الحجز...
                      </>
                    ) : (
                      <>
                        <Calendar className="ml-2 h-4 w-4" />
                        احجز الاجتماع الآن
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card className="text-center p-6 bg-background/95 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">جلسة مخصصة</h3>
            <p className="text-sm text-muted-foreground">
              عرض تقديمي مخصص حسب احتياجات منشأتك
            </p>
          </Card>

          <Card className="text-center p-6 bg-background/95 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">خبراء متخصصون</h3>
            <p className="text-sm text-muted-foreground">
              فريق من الخبراء في الموارد البشرية والتقنية
            </p>
          </Card>

          <Card className="text-center p-6 bg-background/95 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">مجاني تماماً</h3>
            <p className="text-sm text-muted-foreground">
              استشارة مجانية بدون أي التزامات
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};