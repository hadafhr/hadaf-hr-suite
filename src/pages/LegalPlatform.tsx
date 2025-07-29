import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Scale, MessageSquare, FileText, Users, Brain, 
  Upload, Download, Calendar, Clock, CheckCircle,
  AlertTriangle, Star, Shield, BookOpen, Briefcase,
  Search, Filter, Eye, Edit, Trash2, Send,
  Building2, User, Gavel, DollarSign, Award,
  Archive, Lock, Zap, TrendingUp, Globe
} from 'lucide-react';

// بيانات الاستشارات النموذجية
const consultationTypes = [
  {
    id: 'labor',
    title: 'استشارات عمالية',
    description: 'نظام العمل السعودي والعلاقات العمالية',
    icon: Users,
    color: 'text-primary',
    services: ['عقود العمل', 'النزاعات العمالية', 'الرواتب والحوافز', 'إنهاء الخدمة', 'السعودة'],
    aiTrained: true,
    responseTime: '1-3 ساعات'
  },
  {
    id: 'commercial',
    title: 'استشارات تجارية',
    description: 'نظام الشركات والأنشطة التجارية',
    icon: Building2,
    color: 'text-success',
    services: ['تأسيس الشركات', 'العقود التجارية', 'السجل التجاري', 'الامتثال التجاري', 'الاستثمار الأجنبي'],
    aiTrained: true,
    responseTime: '2-4 ساعات'
  },
  {
    id: 'regulatory',
    title: 'استشارات نظامية',
    description: 'الأنظمة واللوائح التنفيذية',
    icon: Scale,
    color: 'text-warning',
    services: ['اللوائح التنفيذية', 'القرارات الوزارية', 'الامتثال النظامي', 'التراخيص', 'الرقابة الحكومية'],
    aiTrained: true,
    responseTime: '3-6 ساعات'
  },
  {
    id: 'establishment',
    title: 'خدمات التأسيس',
    description: 'تأسيس وتسجيل المنشآت',
    icon: Award,
    color: 'text-info',
    services: ['تأسيس المنشآت', 'الهياكل القانونية', 'التراخيص التجارية', 'العلامات التجارية', 'براءات الاختراع'],
    aiTrained: false,
    responseTime: '24-48 ساعة'
  }
];

// الاحصائيات الرئيسية
const legalStats = [
  { title: 'الاستشارات الشهرية', value: '1,247', change: '+18%', icon: FileText, color: 'text-primary' },
  { title: 'العملاء النشطين', value: '834', change: '+12%', icon: Users, color: 'text-success' },
  { title: 'معدل الاستجابة', value: '2.3 ساعة', change: '-15%', icon: Clock, color: 'text-warning' },
  { title: 'نسبة الرضا', value: '96%', change: '+4%', icon: Star, color: 'text-info' }
];

// الاستشارات الحديثة
const recentConsultations = [
  {
    id: 1,
    title: 'استشارة حول إنهاء عقد العمل',
    type: 'عمالية',
    client: 'شركة التقنية المتقدمة',
    status: 'مكتمل',
    priority: 'عالي',
    date: '2024-01-20',
    response_time: '2 ساعات',
    ai_generated: true
  },
  {
    id: 2,
    title: 'مراجعة عقد شراكة تجارية',
    type: 'تجارية',
    client: 'أحمد محمد الأعمال',
    status: 'قيد المراجعة',
    priority: 'متوسط',
    date: '2024-01-20',
    response_time: 'انتظار',
    ai_generated: false
  },
  {
    id: 3,
    title: 'استعلام عن متطلبات السعودة',
    type: 'نظامية',
    client: 'مؤسسة الخدمات الطبية',
    status: 'جديد',
    priority: 'منخفض',
    date: '2024-01-20',
    response_time: 'انتظار',
    ai_generated: true
  }
];

// باقات الاشتراك
const subscriptionPackages = [
  {
    id: 'basic',
    name: 'الباقة الأساسية',
    price: '500',
    duration: 'شهرياً',
    features: [
      'استشارات غير محدودة عبر AI',
      '5 استشارات بشرية شهرياً',
      'أرشفة المستندات',
      'دعم تقني أساسي'
    ],
    popular: false
  },
  {
    id: 'professional',
    name: 'الباقة المهنية',
    price: '1,200',
    duration: 'شهرياً',
    features: [
      'جميع مميزات الباقة الأساسية',
      '15 استشارة بشرية شهرياً',
      'مستشار قانوني مخصص',
      'صياغة العقود والمستندات',
      'تقارير شهرية',
      'دعم تقني متقدم'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'باقة المؤسسات',
    price: 'حسب الطلب',
    duration: 'سنوياً',
    features: [
      'جميع مميزات الباقة المهنية',
      'استشارات غير محدودة',
      'فريق قانوني مخصص',
      'تدريب قانوني للموظفين',
      'خدمات الامتثال المستمرة',
      'دعم على مدار الساعة'
    ],
    popular: false
  }
];

export const LegalPlatform: React.FC = () => {
  const [aiQuery, setAiQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-success/20 text-success border-success';
      case 'قيد المراجعة': return 'bg-warning/20 text-warning border-warning';
      case 'جديد': return 'bg-info/20 text-info border-info';
      default: return 'bg-muted/20 text-muted-foreground border-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالي': return 'bg-destructive text-destructive-foreground';
      case 'متوسط': return 'bg-warning text-warning-foreground';
      case 'منخفض': return 'bg-info text-info-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Scale className="h-8 w-8 text-primary" />
            منصة الاستشارات القانونية الذكية
          </h1>
          <p className="text-muted-foreground mt-2">
            استشارات قانونية تفاعلية مدعومة بالذكاء الاصطناعي - تجارية وعمالية
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            حجز موعد
          </Button>
          <Button className="bg-primary text-primary-foreground">
            <MessageSquare className="h-4 w-4 mr-2" />
            استشارة فورية
          </Button>
        </div>
      </div>

      {/* الإحصائيات الرئيسية */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {legalStats.map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-success mt-1">
                {stat.change} من الشهر الماضي
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* المستشار القانوني الذكي */}
      <Card className="bg-gradient-to-r from-primary/10 to-blue-500/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            المستشار القانوني الذكي
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary">
              مدعوم بـ GPT-4
            </Badge>
          </CardTitle>
          <CardDescription>
            احصل على إجابات فورية ودقيقة لاستفساراتك القانونية على مدار الساعة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <Textarea
                placeholder="مثال: ما هي الخطوات المطلوبة لإنهاء عقد العمل وفقاً لنظام العمل السعودي؟"
                value={aiQuery}
                onChange={(e) => setAiQuery(e.target.value)}
                className="min-h-[100px] text-right resize-none"
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="نوع الاستشارة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="labor">عمالية</SelectItem>
                  <SelectItem value="commercial">تجارية</SelectItem>
                  <SelectItem value="regulatory">نظامية</SelectItem>
                  <SelectItem value="establishment">تأسيس</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button className="bg-primary text-primary-foreground">
              <Brain className="h-4 w-4 mr-2" />
              احصل على الاستشارة
            </Button>
          </div>
          
          {/* أمثلة للأسئلة الشائعة */}
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-muted-foreground">أسئلة شائعة:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'متطلبات إنهاء عقد العمل',
                'خطوات تأسيس شركة محدودة',
                'حقوق الموظف في الإجازات',
                'شروط السعودة الجديدة',
                'العقود التجارية الإلكترونية'
              ].map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => setAiQuery(question)}
                >
                  {question}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* أنواع الاستشارات */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                خدمات الاستشارات القانونية
              </CardTitle>
              <CardDescription>
                خدمات شاملة للأفراد والمنشآت
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {consultationTypes.map((type) => (
                <div key={type.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                      <type.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{type.title}</h4>
                        {type.aiTrained && (
                          <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary">
                            <Brain className="h-3 w-3 mr-1" />
                            AI متقدم
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {type.services.slice(0, 3).map((service, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {service}
                          </Badge>
                        ))}
                        {type.services.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{type.services.length - 3} المزيد
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        وقت الاستجابة: {type.responseTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      طلب استشارة
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* الاستشارات الحديثة */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                الاستشارات الحديثة
                <Badge variant="outline" className="text-xs">
                  {recentConsultations.length} نشط
                </Badge>
              </CardTitle>
              <CardDescription>
                آخر الطلبات والاستفسارات
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentConsultations.map((consultation) => (
                <div key={consultation.id} className="p-3 border rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge className={getStatusColor(consultation.status)}>
                      {consultation.status}
                    </Badge>
                    <Badge variant="outline" className={getPriorityColor(consultation.priority)}>
                      {consultation.priority}
                    </Badge>
                  </div>
                  
                  <h4 className="font-medium text-sm">{consultation.title}</h4>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{consultation.client}</span>
                    <span>•</span>
                    <span>{consultation.type}</span>
                    {consultation.ai_generated && (
                      <>
                        <span>•</span>
                        <Brain className="h-3 w-3" />
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-muted-foreground">{consultation.date}</span>
                    <span className="font-medium">{consultation.response_time}</span>
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" className="w-full text-sm">
                عرض جميع الاستشارات
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* التفاصيل والخدمات */}
      <Tabs defaultValue="consultations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="consultations">الاستشارات</TabsTrigger>
          <TabsTrigger value="documents">المستندات</TabsTrigger>
          <TabsTrigger value="contracts">العقود</TabsTrigger>
          <TabsTrigger value="subscriptions">الباقات</TabsTrigger>
          <TabsTrigger value="archive">الأرشيف</TabsTrigger>
        </TabsList>

        <TabsContent value="consultations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>طلب استشارة جديدة</CardTitle>
              <CardDescription>
                املأ النموذج للحصول على استشارة قانونية متخصصة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="consultation-type">نوع الاستشارة</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع الاستشارة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="labor">استشارة عمالية</SelectItem>
                      <SelectItem value="commercial">استشارة تجارية</SelectItem>
                      <SelectItem value="regulatory">استشارة نظامية</SelectItem>
                      <SelectItem value="establishment">خدمات التأسيس</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">الأولوية</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="حدد الأولوية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">عالي (1-3 ساعات)</SelectItem>
                      <SelectItem value="medium">متوسط (3-6 ساعات)</SelectItem>
                      <SelectItem value="low">منخفض (24-48 ساعة)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">عنوان الاستشارة</Label>
                <Input
                  id="title"
                  placeholder="اكتب عنواناً واضحاً لاستشارتك"
                  className="text-right"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">تفاصيل الاستشارة</Label>
                <Textarea
                  id="details"
                  placeholder="اشرح حالتك بالتفصيل مع ذكر الوقائع والمستندات المتاحة..."
                  className="min-h-[120px] text-right resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>إرفاق ملفات (اختياري)</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    اسحب الملفات هنا أو انقر للاختيار
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    الحد الأقصى: 10 ملفات، 50MB للملف الواحد
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="bg-primary text-primary-foreground">
                  <Send className="h-4 w-4 mr-2" />
                  إرسال الاستشارة
                </Button>
                <Button variant="outline">
                  <Brain className="h-4 w-4 mr-2" />
                  احصل على رد فوري من AI
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>إدارة المستندات القانونية</CardTitle>
              <CardDescription>
                صياغة وإدارة المستندات القانونية مع التوقيع الرقمي
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>سيتم عرض المستندات القانونية والعقود هنا</p>
                <Button variant="outline" className="mt-4">
                  <Upload className="h-4 w-4 mr-2" />
                  رفع مستند جديد
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contracts">
          <Card>
            <CardHeader>
              <CardTitle>مراجعة العقود</CardTitle>
              <CardDescription>
                مراجعة وصياغة العقود التجارية والعمالية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Gavel className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>خدمة مراجعة العقود ستكون متاحة قريباً</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subscriptions">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPackages.map((pkg) => (
              <Card key={pkg.id} className={`relative ${pkg.popular ? 'border-primary shadow-lg' : ''}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground">
                      الأكثر شعبية
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">
                    {pkg.price} {pkg.price !== 'حسب الطلب' && 'ريال'}
                  </div>
                  <CardDescription>{pkg.duration}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${pkg.popular ? 'bg-primary text-primary-foreground' : ''}`}
                    variant={pkg.popular ? 'default' : 'outline'}
                  >
                    {pkg.price === 'حسب الطلب' ? 'طلب عرض سعر' : 'اشترك الآن'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="archive">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Archive className="h-5 w-5" />
                الأرشيف القانوني
              </CardTitle>
              <CardDescription>
                جميع الاستشارات والمستندات السابقة مع إمكانية البحث
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    placeholder="البحث في الأرشيف..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline">
                    <Search className="h-4 w-4 mr-2" />
                    بحث
                  </Button>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    تصفية
                  </Button>
                </div>
                
                <div className="text-center py-8 text-muted-foreground">
                  <Archive className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>سيتم عرض الأرشيف القانوني هنا</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};