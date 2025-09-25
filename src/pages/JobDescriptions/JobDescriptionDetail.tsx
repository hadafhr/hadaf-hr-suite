import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Download, 
  Printer, 
  Share2, 
  Copy, 
  Building, 
  Users, 
  MapPin, 
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Target,
  Award,
  Briefcase,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock job data - in real app this would come from API
const mockJobDetail = {
  id: '1',
  title: 'مدير الموارد البشرية',
  department: 'الموارد البشرية',
  level: 'قيادي',
  workType: 'مكتبي',
  city: 'الرياض',
  salaryRange: '15000-25000',
  currency: 'SAR',
  
  overview: 'يقود مدير الموارد البشرية استراتيجية إدارة المواهب وتطوير رأس المال البشري في المؤسسة، ويشرف على جميع العمليات المتعلقة بالموظفين من التوظيف إلى التطوير والاحتفاظ بالمواهب.',
  
  responsibilities: [
    'وضع وتنفيذ استراتيجيات الموارد البشرية المتوافقة مع أهداف المؤسسة',
    'الإشراف على عمليات التوظيف والاختيار وتطوير برامج الاستقطاب',
    'تطوير وتنفيذ برامج التدريب وتطوير المهارات',
    'إدارة أنظمة الأداء والمكافآت والحوافز',
    'ضمان الامتثال للقوانين واللوائح المحلية والدولية',
    'قيادة وتطوير فريق الموارد البشرية',
    'إدارة علاقات الموظفين وحل النزاعات',
    'تطوير سياسات الموارد البشرية وإجراءات العمل'
  ],

  requirements: {
    education: [
      'بكالوريوس في إدارة الأعمال أو الموارد البشرية أو تخصص ذي صلة',
      'ماجستير في الموارد البشرية أو إدارة الأعمال (مفضل)'
    ],
    experience: [
      'خبرة لا تقل عن 8 سنوات في مجال الموارد البشرية',
      'خبرة إدارية لا تقل عن 5 سنوات في منصب قيادي',
      'خبرة في إدارة المواهب وتطوير الموظفين'
    ],
    languages: [
      'إجادة اللغة العربية (أساسي)',
      'إجادة اللغة الإنجليزية (متقدم)'
    ],
    software: [
      'برامج Microsoft Office (متقدم)',
      'أنظمة إدارة الموارد البشرية (HRIS)',
      'برامج إدارة المشاريع'
    ]
  },

  skills: {
    technical: [
      'إدارة الأداء والمواهب',
      'تحليل البيانات والمؤشرات',
      'التخطيط الاستراتيجي',
      'إدارة المشاريع',
      'المعرفة بقوانين العمل'
    ],
    soft: [
      'مهارات القيادة والتأثير',
      'التواصل الفعال',
      'حل المشكلات واتخاذ القرارات',
      'التفكير النقدي والإبداعي',
      'إدارة الوقت والأولويات'
    ]
  },

  relationships: {
    reportsTo: 'المدير التنفيذي',
    manages: [
      'مدير التوظيف',
      'مدير التدريب والتطوير',
      'مدير الرواتب والمزايا',
      'منسق شؤون الموظفين'
    ],
    internal: [
      'جميع رؤساء الأقسام',
      'الإدارة التنفيذية',
      'الشؤون القانونية',
      'المالية والمحاسبة'
    ],
    external: [
      'شركات التوظيف',
      'مزودي التدريب',
      'الجهات الحكومية',
      'النقابات المهنية'
    ]
  },

  workEnvironment: {
    location: 'مكتبي بنسبة 90%، ميداني بنسبة 10%',
    hours: 'من الأحد إلى الخميس، 8 ساعات يومياً',
    travel: 'سفر محلي أحياناً لحضور المؤتمرات والفعاليات',
    facilities: 'مكتب منفصل، أدوات تقنية حديثة، سيارة شركة'
  },

  salaryDetails: {
    source: 'استطلاع رواتب السعودية 2024',
    methodology: 'بناءً على بيانات من 150+ شركة في القطاع الخاص',
    lastUpdated: '2024-01-01',
    benefits: [
      'راتب أساسي: 15,000 - 25,000 ريال',
      'بدل سكن: 20% من الراتب الأساسي',
      'بدل مواصلات: 1,500 ريال',
      'تأمين طبي شامل',
      'إجازة سنوية مدفوعة الأجر'
    ]
  },

  interviewQuestions: [
    'كيف تطور استراتيجية الموارد البشرية لتتماشى مع أهداف المؤسسة؟',
    'ما هو أسلوبك في التعامل مع تحديات الاحتفاظ بالمواهب؟',
    'كيف تقيس نجاح برامج التدريب والتطوير؟',
    'ما هي تجربتك في إدارة التغيير التنظيمي؟',
    'كيف تتعامل مع النزاعات بين الموظفين والإدارة؟'
  ]
};

export default function JobDescriptionDetail() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState('overview');

  const handleDownloadPDF = () => {
    toast({
      title: "تحميل PDF",
      description: "سيتم تحميل الوصف الوظيفي كملف PDF قريباً",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockJobDetail.title,
        text: mockJobDetail.overview,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "تم نسخ الرابط",
        description: "تم نسخ رابط الوصف الوظيفي إلى الحافظة",
      });
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "تم نسخ الرابط",
      description: "تم نسخ رابط الوصف الوظيفي إلى الحافظة",
    });
  };

  const handleCreateSimilar = () => {
    toast({
      title: "إنشاء وصف مشابه",
      description: "سيتم فتح منشئ الوصف الوظيفي قريباً",
    });
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-background via-background to-muted/20 border-b">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/job-descriptions')}
              className="p-0 h-auto"
            >
              دليل الأوصاف الوظيفية
            </Button>
            <ArrowRight className="h-4 w-4 rotate-180" />
            <span>{mockJobDetail.title}</span>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-foreground mb-4">
                {mockJobDetail.title}
              </h1>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  {mockJobDetail.department}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Award className="h-4 w-4" />
                  {mockJobDetail.level}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  {mockJobDetail.workType}
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {mockJobDetail.city}
                </Badge>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {mockJobDetail.overview}
              </p>
            </div>

            <div className="lg:w-80">
              <Card>
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    متوسط الراتب
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">
                    {mockJobDetail.salaryRange} ﷼
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    شهرياً في السعودية
                  </p>
                  
                  <div className="space-y-3">
                    <Button onClick={handleDownloadPDF} className="w-full">
                      <Download className="h-4 w-4 ml-2" />
                      تحميل PDF
                    </Button>
                    
                    <div className="flex gap-2">
                      <Button onClick={handlePrint} variant="outline" className="flex-1">
                        <Printer className="h-4 w-4 ml-2" />
                        طباعة
                      </Button>
                      <Button onClick={handleShare} variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 ml-2" />
                        مشاركة
                      </Button>
                    </div>
                    
                    <Button onClick={handleCopyLink} variant="ghost" className="w-full">
                      <Copy className="h-4 w-4 ml-2" />
                      نسخ الرابط
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-3">هل تريد إنشاء وصف مشابه؟</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    استخدم هذا الوصف كنموذج لإنشاء وصف وظيفي جديد في مؤسستك
                  </p>
                  <Button onClick={handleCreateSimilar} className="w-full">
                    إنشاء وصف مشابه
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeSection} onValueChange={setActiveSection} className="space-y-8">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
            <TabsTrigger value="overview">نبذة</TabsTrigger>
            <TabsTrigger value="responsibilities">المهام</TabsTrigger>
            <TabsTrigger value="requirements">المتطلبات</TabsTrigger>
            <TabsTrigger value="skills">المهارات</TabsTrigger>
            <TabsTrigger value="relationships">العلاقات</TabsTrigger>
            <TabsTrigger value="environment">بيئة العمل</TabsTrigger>
            <TabsTrigger value="interview">أسئلة المقابلة</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  نبذة عن الدور
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed">
                  {mockJobDetail.overview}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  تفاصيل الراتب والمزايا
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">النطاق المتوقع:</h4>
                    <ul className="space-y-1">
                      {mockJobDetail.salaryDetails.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div className="text-sm text-muted-foreground">
                    <p><strong>المصدر:</strong> {mockJobDetail.salaryDetails.source}</p>
                    <p><strong>المنهجية:</strong> {mockJobDetail.salaryDetails.methodology}</p>
                    <p><strong>آخر تحديث:</strong> {mockJobDetail.salaryDetails.lastUpdated}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="responsibilities">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  المهام والمسؤوليات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mockJobDetail.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requirements" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>التعليم والمؤهلات</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockJobDetail.requirements.education.map((edu, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        {edu}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الخبرة المطلوبة</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockJobDetail.requirements.experience.map((exp, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Briefcase className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {exp}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>اللغات</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockJobDetail.requirements.languages.map((lang, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <MessageCircle className="h-4 w-4 text-purple-500 flex-shrink-0 mt-0.5" />
                        {lang}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>البرامج والأدوات</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockJobDetail.requirements.software.map((soft, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertCircle className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        {soft}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>المهارات التقنية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockJobDetail.skills.technical.map((skill, index) => (
                      <Badge key={index} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>المهارات السلوكية</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockJobDetail.skills.soft.map((skill, index) => (
                      <Badge key={index} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="relationships" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>التسلسل الإداري</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">يرفع إلى:</h4>
                    <p className="text-muted-foreground">{mockJobDetail.relationships.reportsTo}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">يدير:</h4>
                    <ul className="space-y-1">
                      {mockJobDetail.relationships.manages.map((person, index) => (
                        <li key={index} className="text-muted-foreground">• {person}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>الجهات ذات العلاقة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">داخلياً:</h4>
                    <ul className="space-y-1">
                      {mockJobDetail.relationships.internal.map((dept, index) => (
                        <li key={index} className="text-muted-foreground">• {dept}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">خارجياً:</h4>
                    <ul className="space-y-1">
                      {mockJobDetail.relationships.external.map((ext, index) => (
                        <li key={index} className="text-muted-foreground">• {ext}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="environment">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  بيئة وطبيعة العمل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">مكان العمل:</h4>
                        <p className="text-muted-foreground">{mockJobDetail.workEnvironment.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">ساعات العمل:</h4>
                        <p className="text-muted-foreground">{mockJobDetail.workEnvironment.hours}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">السفر:</h4>
                        <p className="text-muted-foreground">{mockJobDetail.workEnvironment.travel}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold">التسهيلات:</h4>
                        <p className="text-muted-foreground">{mockJobDetail.workEnvironment.facilities}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interview">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  أسئلة مقابلة شائعة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">
                  هذه مجموعة من الأسئلة الشائعة التي قد تطرح في مقابلات التوظيف لهذا المنصب:
                </p>
                <div className="space-y-4">
                  {mockJobDetail.interviewQuestions.map((question, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-muted/20">
                      <p className="font-medium">{index + 1}. {question}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}