import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, CheckCircle, User, Building, Mail, Phone, MapPin, MessageSquare, ArrowRight, Search, Filter, TrendingUp, Target, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Breadcrumb } from '@/components/Breadcrumb';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { BoudLogo } from '@/components/BoudLogo';
import { PatternBackground } from '@/components/PatternBackground';
import buodLogo from '@/assets/buod-logo-white.png';

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

const meetingTypes = [
  {
    type: 'demo',
    title: 'عرض تجريبي للنظام',
    description: 'جولة شاملة في النظام ومميزاته',
    duration: '30 دقيقة',
    icon: Calendar
  },
  {
    type: 'consultation',
    title: 'استشارة تقنية',
    description: 'مناقشة احتياجاتك التقنية والتكامل',
    duration: '45 دقيقة',
    icon: Target
  },
  {
    type: 'sales',
    title: 'مناقشة الأسعار والباقات',
    description: 'عرض الباقات والأسعار المناسبة',
    duration: '20 دقيقة',
    icon: TrendingUp
  }
];

export const ScheduleMeeting: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isArabic = i18n.language === 'ar';
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMeetingType, setSelectedMeetingType] = useState('demo');

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
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto bg-card backdrop-blur-xl shadow-2xl border border-border">
            <CardContent className="p-8 text-center">
              <div className="space-y-6">
                <div className="w-20 h-20 bg-primary rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-primary-foreground" />
                </div>
                
                <h2 className="text-3xl font-bold text-foreground">
                  تم حجز اجتماعك بنجاح!
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed">
                  سيتم التواصل معك قريباً لتأكيد الموعد. شكراً لتواصلك معنا.
                </p>
                
                <div className="bg-accent/20 p-4 rounded-lg border border-border">
                  <h3 className="font-semibold text-foreground mb-2">
                    الخطوات التالية:
                  </h3>
                  <ul className="text-muted-foreground text-sm space-y-1 text-right">
                    <li>• مراجعة بيانات الاجتماع</li>
                    <li>• تأكيد الموعد عبر البريد الإلكتروني</li>
                    <li>• إرسال رابط الاجتماع الافتراضي</li>
                    <li>• التذكير قبل الموعد بـ 24 ساعة</li>
                  </ul>
                </div>
                
                <Button 
                  onClick={() => {
                    setIsSubmitted(false);
                    form.reset();
                  }}
                  className="bg-primary hover:bg-accent text-primary-foreground font-bold transition-all duration-300 hover:scale-105"
                >
                  حجز اجتماع آخر
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden" dir={isArabic ? 'rtl' : 'ltr'}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g fill="#b1a086" fill-opacity="0.3"><circle cx="30" cy="30" r="2"/></g></g></svg>')}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
        </div>
      </div>
      
      {/* Professional Interactive Header */}
      <header className="relative z-10 bg-gradient-to-r from-background via-card to-background backdrop-blur-xl border-b border-border shadow-2xl">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-accent via-accent to-accent opacity-80"></div>
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
                <Calendar className="h-8 w-8 text-accent animate-pulse" />
                <div className="absolute -inset-1 bg-accent/20 rounded-full blur animate-ping"></div>
              </div>
              
              <div className="flex flex-col text-center">
                <h1 className="text-2xl font-bold text-foreground">
                  {isArabic ? 'احجز اجتماع' : 'Schedule Meeting'}
                </h1>
                <p className="text-sm text-muted-foreground animate-fade-in">
                  {isArabic ? 'جلسة تعريفية مجانية' : 'Free Consultation Session'}
                </p>
              </div>
            </div>

            {/* Right Section - Professional Controls Panel */}
            <div className="flex flex-col items-end space-y-4">
              {/* Status Panel */}
              <div className="bg-gradient-to-r from-background via-card to-background backdrop-blur-xl rounded-2xl border border-border shadow-xl p-4 min-w-[200px]">
                {/* Status Indicator */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    {isArabic ? 'حالة الحجز' : 'Booking Status'}
                  </span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-lg shadow-success/50"></div>
                    <span className="text-xs text-success font-semibold">
                      {isArabic ? 'متاح' : 'Available'}
                    </span>
                  </div>
                </div>
                
                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-3"></div>
                
                {/* Language & Settings Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-medium">
                    {isArabic ? 'اللغة' : 'Language'}
                  </span>
                  
                  {/* Language Toggle Button */}
                  <button 
                    onClick={() => i18n.changeLanguage(isArabic ? 'en' : 'ar')}
                    tabIndex={0}
                    aria-label={isArabic ? 'تغيير اللغة إلى الإنجليزية' : 'Change language to Arabic'}
                    className="group relative flex items-center space-x-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-border hover:border-accent hover:bg-accent/30 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent shadow-lg"
                  >
                    {/* Language Text */}
                    <span className="text-sm text-foreground font-bold tracking-wider group-hover:text-accent-foreground transition-colors duration-300">
                      {isArabic ? 'EN' : 'العربية'}
                    </span>
                    
                    {/* Animated Indicator */}
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-accent shadow-lg transition-all duration-300"></div>
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-accent opacity-0 group-hover:opacity-30 animate-ping"></div>
                    </div>
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-accent/0 via-accent/20 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
        </div>
      </header>

      <main className="relative z-10 w-full mx-auto px-4 py-8">
        {/* Breadcrumb Navigation - Far Right */}
        <div className="flex justify-end mb-6 mr-0">
          <div className="ml-auto">
            <Breadcrumb 
              items={[
                { label: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                { label: isArabic ? 'احجز اجتماع' : 'Schedule Meeting', path: '/schedule-meeting' }
              ]}
            />
          </div>
        </div>
        
        {/* Floating Elements for Professional Look */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-32 left-16 w-32 h-32 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 right-20 w-16 h-16 bg-accent/15 rounded-full blur-lg animate-pulse delay-500"></div>
        
        {/* Enhanced Hero Section */}
        <div className="text-center mb-12 relative">
          {/* Floating background elements */}
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-96 h-2 bg-gradient-to-r from-transparent via-accent/30 to-transparent blur-sm"></div>
          
          <div className="relative inline-flex items-center justify-center w-40 h-40 rounded-full mb-8 transition-all duration-300 hover:scale-105 group cursor-pointer">
            <Calendar className="h-20 w-20 text-accent group-hover:text-foreground transition-colors duration-300 z-10 relative drop-shadow-2xl" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          
          <h2 className="text-5xl font-bold mb-8 text-foreground leading-tight">
            {isArabic ? 'احجز اجتماعاً مع فريقنا المختص' : 'Schedule a Meeting with Our Expert Team'}
          </h2>
          
          <div className="relative max-w-3xl mx-auto">
            <p className="text-muted-foreground text-lg leading-relaxed bg-card backdrop-blur-sm p-6 rounded-2xl border border-border shadow-xl">
              {isArabic 
                ? 'اكتشف كيف يمكن لمنصتنا أن تساعدك في أتمتة جميع عمليات الموارد البشرية بسهولة واحترافية - معتمدة وفقاً لأنظمة المملكة العربية السعودية'
                : 'Discover how our platform can help you automate all HR processes easily and professionally - Certified according to Saudi Arabia regulations'
              }
            </p>
            <div className="absolute -inset-1 bg-gradient-to-r from-accent/20 via-transparent to-accent/20 rounded-2xl blur opacity-50"></div>
          </div>
        </div>

        {/* Meeting Types Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <Card className="bg-card backdrop-blur-xl shadow-2xl border border-border hover:border-accent transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground rounded-t-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-background/10"></div>
              <CardTitle className="text-center flex items-center justify-center gap-2 relative z-10">
                <Target className="h-6 w-6 text-primary-foreground" />
                اختر نوع الاجتماع المناسب
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 bg-card">
              <div className="grid md:grid-cols-3 gap-6">
                {meetingTypes.map((meeting, index) => (
                  <div 
                    key={meeting.type} 
                    onClick={() => setSelectedMeetingType(meeting.type)}
                    className={`group cursor-pointer p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                      selectedMeetingType === meeting.type 
                        ? 'border-accent bg-accent/20' 
                        : 'border-border hover:border-accent hover:bg-accent/10'
                    }`}
                  >
                    <div className="text-center">
                      <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-all duration-300 ${
                        selectedMeetingType === meeting.type 
                          ? 'bg-accent text-accent-foreground' 
                          : 'bg-accent/20 text-accent group-hover:bg-accent/30'
                      }`}>
                        <meeting.icon className="h-8 w-8" />
                      </div>
                      <h3 className="font-bold text-foreground mb-2">{meeting.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{meeting.description}</p>
                      <Badge variant="outline" className="text-accent border-accent">
                        {meeting.duration}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Form Section */}
        <Card className="max-w-4xl mx-auto mb-12 bg-card backdrop-blur-xl shadow-2xl border border-border hover:border-accent transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-primary via-accent to-primary text-primary-foreground rounded-t-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-background/10"></div>
            <CardTitle className="text-center text-2xl relative z-10">
              <Calendar className="h-6 w-6 text-primary-foreground inline mr-2" />
              نموذج حجز الاجتماع
            </CardTitle>
            <CardDescription className="text-center text-primary-foreground/90 relative z-10">
              املأ البيانات التالية لحجز اجتماعك مع فريقنا المختص
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-6 bg-card">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2 text-foreground">
                          <User className="h-4 w-4 text-accent" />
                          الاسم الكامل *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="أدخل اسمك الكامل" 
                            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent hover:border-accent transition-all duration-200"
                            {...field} 
                          />
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
                        <FormLabel className="flex items-center gap-2 text-foreground">
                          <Building className="h-4 w-4 text-accent" />
                          اسم المنشأة
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="أدخل اسم منشأتك" 
                            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent hover:border-accent transition-all duration-200"
                            {...field} 
                          />
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
                        <FormLabel className="flex items-center gap-2 text-foreground">
                          <Mail className="h-4 w-4 text-accent" />
                          البريد الإلكتروني *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="example@company.com" 
                            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent hover:border-accent transition-all duration-200"
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
                        <FormLabel className="flex items-center gap-2 text-foreground">
                          <Phone className="h-4 w-4 text-accent" />
                          رقم الجوال
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="05xxxxxxxx" 
                            className="bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent hover:border-accent transition-all duration-200"
                            {...field} 
                          />
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
                        <FormLabel className="flex items-center gap-2 text-foreground">
                          <MapPin className="h-4 w-4 text-accent" />
                          المدينة
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-input border-border text-foreground focus:border-accent focus:ring-accent hover:border-accent transition-all duration-200">
                              <SelectValue placeholder="اختر مدينتك" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border">
                            {saudiCities.map((city) => (
                              <SelectItem key={city} value={city} className="text-foreground hover:bg-accent/20 focus:bg-accent/30">
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
                        <FormLabel className="flex items-center gap-2 text-foreground">
                          <Calendar className="h-4 w-4 text-accent" />
                          تاريخ الاجتماع *
                        </FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full pl-3 text-right font-normal bg-input border-border text-foreground hover:border-accent transition-all duration-200",
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
                        <FormLabel className="flex items-center gap-2 text-foreground">
                          <Clock className="h-4 w-4 text-accent" />
                          وقت الاجتماع *
                        </FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-input border-border text-foreground focus:border-accent focus:ring-accent hover:border-accent transition-all duration-200">
                              <SelectValue placeholder="اختر الوقت المناسب" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-card border-border">
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time} className="text-foreground hover:bg-accent/20 focus:bg-accent/30">
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
                      <FormLabel className="flex items-center gap-2 text-foreground">
                        <MessageSquare className="h-4 w-4 text-accent" />
                        ملاحظات أو أسئلة إضافية
                      </FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="أخبرنا عن احتياجاتك أو أي أسئلة تود مناقشتها..."
                          className="min-h-[100px] resize-none bg-input border-border text-foreground placeholder:text-muted-foreground focus:border-accent focus:ring-accent hover:border-accent transition-all duration-200"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="pt-4 text-center">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-accent text-primary-foreground font-bold px-12 py-3 text-lg transition-all duration-300 hover:scale-105 shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground ml-2" />
                        جاري الحجز...
                      </>
                    ) : (
                      <>
                        <Calendar className="ml-2 h-4 w-4" />
                        احجز الاجتماع الآن
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground mt-3">
                    سيتم التواصل معك خلال 24 ساعة لتأكيد الموعد
                  </p>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="group bg-card backdrop-blur-xl shadow-2xl border border-border hover:border-accent transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center bg-card">
                <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-all duration-300">
                  <Calendar className="h-6 w-6 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">جلسة مخصصة</h3>
                <p className="text-sm text-muted-foreground">
                  عرض تقديمي مخصص حسب احتياجات منشأتك
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-card backdrop-blur-xl shadow-2xl border border-border hover:border-accent transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center bg-card">
                <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-all duration-300">
                  <User className="h-6 w-6 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">خبراء متخصصون</h3>
                <p className="text-sm text-muted-foreground">
                  فريق من الخبراء في الموارد البشرية والتقنية
                </p>
              </CardContent>
            </Card>

            <Card className="group bg-card backdrop-blur-xl shadow-2xl border border-border hover:border-accent transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center bg-card">
                <div className="h-12 w-12 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/30 transition-all duration-300">
                  <CheckCircle className="h-6 w-6 text-accent group-hover:text-accent-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">مجاني تماماً</h3>
                <p className="text-sm text-muted-foreground">
                  استشارة مجانية بدون أي التزامات
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Terms Section */}
        <div className="mt-8 p-6 bg-warning/20 border border-warning rounded-lg backdrop-blur-sm max-w-6xl mx-auto">
          <div className="flex items-start">
            <AlertCircle className="h-6 w-6 text-warning mt-0.5 ml-3 animate-pulse" />
            <div>
              <h4 className="font-semibold text-warning-foreground mb-2 flex items-center gap-2">
                <span className="text-2xl">📅</span>
                {isArabic ? 'ملاحظات مهمة حول الحجز' : 'Important Booking Notes'}
              </h4>
              <ul className="text-warning-foreground text-sm space-y-2 text-right leading-relaxed">
                <li>• جميع الاجتماعات مجانية وبدون أي التزامات</li>
                <li>• سيتم إرسال رابط الاجتماع الافتراضي عبر البريد الإلكتروني</li>
                <li>• يمكن إعادة جدولة الاجتماع حتى 24 ساعة قبل الموعد</li>
                <li>• مدة الاجتماع تتراوح بين 20-45 دقيقة حسب نوع الاجتماع</li>
                <li>• جميع البيانات محمية وسرية وفقاً لقوانين حماية البيانات في المملكة</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
