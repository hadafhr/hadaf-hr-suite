import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Calendar,
  Clock,
  Video,
  Phone,
  MessageCircle,
  User,
  Building2,
  Mail,
  CheckCircle,
  Users,
  Zap,
  Shield,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Schedule: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedMeeting, setSelectedMeeting] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    employees: '',
    industry: '',
    message: '',
    meetingType: 'video'
  });

  const meetingTypes = [
    {
      id: 'demo',
      title: 'عرض المنصة التوضيحي',
      description: 'جولة شاملة في المنصة وميزاتها الأساسية',
      duration: '30 دقيقة',
      icon: Video,
      color: 'text-blue-600',
      gradient: 'from-blue-50 to-blue-100',
      features: ['عرض مباشر للمنصة', 'إجابة على الأسئلة', 'تحديد الاحتياجات']
    },
    {
      id: 'consultation',
      title: 'استشارة موارد بشرية',
      description: 'نقاش مفصل حول احتياجات شركتك والحلول المناسبة',
      duration: '45 دقيقة',
      icon: Users,
      color: 'text-green-600',
      gradient: 'from-green-50 to-green-100',
      features: ['تحليل الاحتياجات', 'اقتراح الحلول', 'خطة التنفيذ', 'تقدير التكلفة']
    },
    {
      id: 'technical',
      title: 'اجتماع تقني متقدم',
      description: 'مناقشة التكاملات والمتطلبات التقنية المتخصصة',
      duration: '60 دقيقة',
      icon: Zap,
      color: 'text-purple-600',
      gradient: 'from-purple-50 to-purple-100',
      features: ['التكاملات المطلوبة', 'المتطلبات الأمنية', 'البنية التحتية', 'خطة الترحيل']
    },
    {
      id: 'training',
      title: 'جلسة تدريبية',
      description: 'تدريب مخصص لفريقك على استخدام المنصة',
      duration: '90 دقيقة',
      icon: Shield,
      color: 'text-orange-600',
      gradient: 'from-orange-50 to-orange-100',
      features: ['تدريب عملي', 'مواد تدريبية', 'اختبار المهارات', 'شهادة إتمام']
    }
  ];

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const experts = [
    {
      name: 'أحمد المحمد',
      title: 'مستشار حلول الموارد البشرية',
      speciality: 'تنفيذ الأنظمة وتحليل الاحتياجات',
      experience: '8 سنوات',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'فاطمة العتيبي',
      title: 'خبيرة التكاملات التقنية',
      speciality: 'الأنظمة الحكومية والتكاملات المتقدمة',
      experience: '10 سنوات',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80'
    },
    {
      name: 'سعد الشهري',
      title: 'مدرب معتمد',
      speciality: 'التدريب والتأهيل والدعم الفني',
      experience: '6 سنوات',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    }
  ];

  // Generate available dates (next 30 days, excluding weekends)
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends (Friday = 5, Saturday = 6)
      if (date.getDay() !== 5 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('ar-SA', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })
        });
      }
    }
    
    return dates.slice(0, 14); // Show next 14 business days
  };

  const availableDates = generateAvailableDates();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMeeting || !selectedDate || !selectedTime) {
      toast({
        title: "معلومات ناقصة",
        description: "يرجى اختيار نوع الاجتماع والتاريخ والوقت",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "تم حجز الاجتماع بنجاح!",
      description: `سنرسل لك رابط الاجتماع على ${formData.email}`,
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      employees: '',
      industry: '',
      message: '',
      meetingType: 'video'
    });
    setSelectedMeeting('');
    setSelectedDate('');
    setSelectedTime('');
    setIsSubmitting(false);
  };

  const selectedMeetingData = meetingTypes.find(m => m.id === selectedMeeting);

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
              {t('nav.schedule')}
            </h1>
            <p className="text-xl text-muted-foreground">
              احجز اجتماع مجاني مع خبرائنا لاستكشاف كيف يمكن لمنصة بُعد تحسين عمليات الموارد البشرية في شركتك
            </p>
          </div>
        </div>
      </div>

      {/* Meeting Types */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">اختر نوع الاجتماع</h2>
            <p className="text-xl text-muted-foreground">
              حدد نوع الاجتماع الذي يناسب احتياجاتك
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
            {meetingTypes.map((meeting) => (
              <Card 
                key={meeting.id}
                className={`cursor-pointer border-2 transition-all duration-300 hover:shadow-xl ${
                  selectedMeeting === meeting.id 
                    ? 'border-primary shadow-lg' 
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedMeeting(meeting.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${meeting.gradient} flex items-center justify-center`}>
                      <meeting.icon className={`w-8 h-8 ${meeting.color}`} />
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {meeting.duration}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2">{meeting.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {meeting.description}
                  </p>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-primary mb-3">ما يشمله الاجتماع:</h4>
                    <ul className="space-y-2">
                      {meeting.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {selectedMeeting === meeting.id && (
                    <div className="mt-4 pt-4 border-t border-primary/20">
                      <div className="flex items-center gap-2 text-primary">
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">محدد</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      {selectedMeeting && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Form */}
                <div className="lg:col-span-2">
                  <Card className="border-border">
                    <CardHeader>
                      <h2 className="text-2xl font-bold mb-2">معلومات الحجز</h2>
                      <p className="text-muted-foreground">
                        املأ التفاصيل أدناه لحجز اجتماعك
                      </p>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Info */}
                        <div>
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <User className="w-4 h-4" />
                            المعلومات الشخصية
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">الاسم الكامل *</label>
                              <Input 
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                                placeholder="اسمك الكامل"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">البريد الإلكتروني *</label>
                              <Input 
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="example@company.com"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">رقم الهاتف *</label>
                              <Input 
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleInputChange}
                                required
                                placeholder="+966 5X XXX XXXX"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">المسمى الوظيفي</label>
                              <Input 
                                name="position"
                                value={formData.company}
                                onChange={handleInputChange}
                                placeholder="مدير الموارد البشرية"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Company Info */}
                        <div>
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            معلومات الشركة
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-2">اسم الشركة *</label>
                              <Input 
                                name="company"
                                value={formData.company}
                                onChange={handleInputChange}
                                required
                                placeholder="اسم شركتك"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-2">عدد الموظفين</label>
                              <select 
                                name="employees"
                                value={formData.employees}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-border rounded-md bg-background"
                              >
                                <option value="">اختر عدد الموظفين</option>
                                <option value="1-10">1-10 موظف</option>
                                <option value="11-50">11-50 موظف</option>
                                <option value="51-200">51-200 موظف</option>
                                <option value="201-500">201-500 موظف</option>
                                <option value="500+">أكثر من 500 موظف</option>
                              </select>
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-medium mb-2">القطاع</label>
                              <select 
                                name="industry"
                                value={formData.industry}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-border rounded-md bg-background"
                              >
                                <option value="">اختر القطاع</option>
                                <option value="technology">التكنولوجيا</option>
                                <option value="healthcare">الرعاية الصحية</option>
                                <option value="education">التعليم</option>
                                <option value="retail">التجارة</option>
                                <option value="manufacturing">التصنيع</option>
                                <option value="finance">الخدمات المالية</option>
                                <option value="construction">الإنشاءات</option>
                                <option value="other">أخرى</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        {/* Meeting Details */}
                        <div>
                          <h3 className="font-semibold mb-4 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            تفاصيل الاجتماع
                          </h3>
                          
                          {/* Date Selection */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">اختر التاريخ *</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                              {availableDates.map((date) => (
                                <Button
                                  key={date.value}
                                  type="button"
                                  variant={selectedDate === date.value ? "default" : "outline"}
                                  className="h-auto py-3 text-xs"
                                  onClick={() => setSelectedDate(date.value)}
                                >
                                  {date.label}
                                </Button>
                              ))}
                            </div>
                          </div>

                          {/* Time Selection */}
                          {selectedDate && (
                            <div className="mb-4">
                              <label className="block text-sm font-medium mb-2">اختر الوقت *</label>
                              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                                {timeSlots.map((time) => (
                                  <Button
                                    key={time}
                                    type="button"
                                    variant={selectedTime === time ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedTime(time)}
                                  >
                                    {time}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Meeting Type */}
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">طريقة الاجتماع</label>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2">
                                <input 
                                  type="radio"
                                  name="meetingType"
                                  value="video"
                                  checked={formData.meetingType === 'video'}
                                  onChange={handleInputChange}
                                />
                                <Video className="w-4 h-4" />
                                مرئي عبر الإنترنت
                              </label>
                              <label className="flex items-center gap-2">
                                <input 
                                  type="radio"
                                  name="meetingType"
                                  value="phone"
                                  checked={formData.meetingType === 'phone'}
                                  onChange={handleInputChange}
                                />
                                <Phone className="w-4 h-4" />
                                مكالمة هاتفية
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* Additional Notes */}
                        <div>
                          <label className="block text-sm font-medium mb-2">ملاحظات إضافية</label>
                          <Textarea 
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            rows={4}
                            placeholder="اخبرنا عن احتياجاتك الخاصة أو أي أسئلة تود مناقشتها..."
                          />
                        </div>

                        <Button 
                          type="submit"
                          className="w-full"
                          size="lg"
                          disabled={isSubmitting || !selectedDate || !selectedTime}
                        >
                          {isSubmitting ? 'جاري الحجز...' : 'احجز الاجتماع'}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </div>

                {/* Summary & Experts */}
                <div className="space-y-6">
                  {/* Meeting Summary */}
                  <Card className="border-border">
                    <CardHeader>
                      <h3 className="text-lg font-bold">ملخص الاجتماع</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedMeetingData && (
                        <>
                          <div className="flex items-center gap-3">
                            <selectedMeetingData.icon className={`w-5 h-5 ${selectedMeetingData.color}`} />
                            <div>
                              <div className="font-medium">{selectedMeetingData.title}</div>
                              <div className="text-sm text-muted-foreground">{selectedMeetingData.duration}</div>
                            </div>
                          </div>
                          
                          {selectedDate && (
                            <div className="flex items-center gap-3">
                              <Calendar className="w-5 h-5 text-primary" />
                              <div>
                                <div className="font-medium">التاريخ</div>
                                <div className="text-sm text-muted-foreground">
                                  {availableDates.find(d => d.value === selectedDate)?.label}
                                </div>
                              </div>
                            </div>
                          )}
                          
                          {selectedTime && (
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-primary" />
                              <div>
                                <div className="font-medium">الوقت</div>
                                <div className="text-sm text-muted-foreground">{selectedTime}</div>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </CardContent>
                  </Card>

                  {/* Experts */}
                  <Card className="border-border">
                    <CardHeader>
                      <h3 className="text-lg font-bold">خبراؤنا</h3>
                      <p className="text-sm text-muted-foreground">
                        ستلتقي بأحد خبرائنا المتخصصين
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {experts.map((expert, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <img 
                            src={expert.image} 
                            alt={expert.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{expert.name}</h4>
                            <p className="text-sm text-primary">{expert.title}</p>
                            <p className="text-xs text-muted-foreground mt-1">{expert.speciality}</p>
                            <p className="text-xs text-muted-foreground">خبرة {expert.experience}</p>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Schedule;