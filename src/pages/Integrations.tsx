import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Building,
  CreditCard,
  Shield,
  Zap,
  Globe,
  Database,
  Cloud,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Users,
  FileText,
  Clock,
  BarChart3,
  Headphones
} from 'lucide-react';

const Integrations: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('government');

  const categories = [
    { id: 'government', name: 'الأنظمة الحكومية', icon: Building, count: 8 },
    { id: 'banking', name: 'الأنظمة المصرفية', icon: CreditCard, count: 15 },
    { id: 'security', name: 'الأمان والهوية', icon: Shield, count: 6 },
    { id: 'productivity', name: 'أدوات الإنتاجية', icon: Zap, count: 12 },
    { id: 'communication', name: 'التواصل', icon: Globe, count: 9 },
    { id: 'data', name: 'البيانات والتحليلات', icon: Database, count: 7 }
  ];

  const integrations = {
    government: [
      {
        name: 'التأمينات الاجتماعية',
        nameEn: 'GOSI',
        description: 'تكامل كامل مع نظام التأمينات الاجتماعية لإرسال البيانات آلياً',
        logo: '🏛️',
        status: 'active',
        type: 'official',
        features: ['تسجيل الموظفين', 'الاشتراكات الشهرية', 'تقارير الامتثال', 'إيقاف الخدمات'],
        setupTime: '2-3 أيام',
        popularity: 98
      },
      {
        name: 'وزارة الموارد البشرية',
        nameEn: 'HRSD',
        description: 'ربط مع منصة قوى وأنظمة وزارة الموارد البشرية',
        logo: '👥',
        status: 'active',
        type: 'official',
        features: ['تقارير السعودة', 'رخص العمل', 'المخالفات', 'الشكاوى'],
        setupTime: '1-2 يوم',
        popularity: 95
      },
      {
        name: 'الهيئة العامة للزكاة والضريبة',
        nameEn: 'ZATCA',
        description: 'تكامل مع نظام الفوترة الإلكترونية وضريبة القيمة المضافة',
        logo: '💰',
        status: 'active',
        type: 'official',
        features: ['الفوترة الإلكترونية', 'ضريبة القيمة المضافة', 'التقارير الضريبية'],
        setupTime: '3-5 أيام',
        popularity: 89
      },
      {
        name: 'أبشر للأعمال',
        nameEn: 'Absher Business',
        description: 'تكامل مع منصة أبشر للخدمات الحكومية الإلكترونية',
        logo: '🌐',
        status: 'active',
        type: 'official',
        features: ['تأشيرات العمل', 'الإقامات', 'رخص العمل', 'الخدمات الحكومية'],
        setupTime: '2-4 أيام',
        popularity: 92
      },
      {
        name: 'المؤسسة العامة للتدريب التقني',
        nameEn: 'TVTC',
        description: 'ربط مع برامج التدريب والتأهيل المهني',
        logo: '🎓',
        status: 'coming_soon',
        type: 'official',
        features: ['برامج التدريب', 'الشهادات المهنية', 'المتدربين'],
        setupTime: '2-3 أيام',
        popularity: 78
      }
    ],
    banking: [
      {
        name: 'البنك الأهلي السعودي',
        nameEn: 'SNB',
        description: 'تحويل الرواتب وإدارة الحسابات المصرفية للموظفين',
        logo: '🏦',
        status: 'active',
        type: 'certified',
        features: ['تحويل الرواتب', 'كشوفات الحسابات', 'البطاقات المصرفية'],
        setupTime: '5-7 أيام',
        popularity: 94
      },
      {
        name: 'بنك الراجحي',
        nameEn: 'Al Rajhi Bank',
        description: 'خدمات مصرفية شاملة للشركات والموظفين',
        logo: '🏛️',
        status: 'active',
        type: 'certified',
        features: ['الرواتب الآلية', 'القروض', 'الحوالات', 'الخدمات الرقمية'],
        setupTime: '3-5 أيام',
        popularity: 96
      },
      {
        name: 'البنك السعودي للاستثمار',
        nameEn: 'SAIB',
        description: 'حلول مصرفية متطورة للشركات',
        logo: '💳',
        status: 'active',
        type: 'certified',
        features: ['إدارة السيولة', 'التمويل', 'الخدمات التجارية'],
        setupTime: '4-6 أيام',
        popularity: 87
      },
      {
        name: 'البنك الأول',
        nameEn: 'The First Bank',
        description: 'خدمات مصرفية رقمية للشركات الناشئة والمتوسطة',
        logo: '🏧',
        status: 'active',
        type: 'certified',
        features: ['الحسابات الرقمية', 'المدفوعات الفورية', 'التحليلات المالية'],
        setupTime: '2-3 أيام',
        popularity: 82
      }
    ],
    security: [
      {
        name: 'Microsoft Azure AD',
        nameEn: 'Azure Active Directory',
        description: 'تسجيل دخول موحد وإدارة الهويات المتقدمة',
        logo: '🔐',
        status: 'active',
        type: 'enterprise',
        features: ['Single Sign-On', 'Multi-Factor Authentication', 'إدارة المجموعات'],
        setupTime: '1-2 يوم',
        popularity: 91
      },
      {
        name: 'Google Workspace',
        nameEn: 'Google SSO',
        description: 'تكامل مع خدمات Google للمؤسسات',
        logo: '🌍',
        status: 'active',
        type: 'enterprise',
        features: ['Google SSO', 'Gmail', 'Google Drive', 'Calendar'],
        setupTime: '1 يوم',
        popularity: 88
      },
      {
        name: 'Auth0',
        nameEn: 'Auth0',
        description: 'منصة إدارة الهويات والوصول للمطورين',
        logo: '🛡️',
        status: 'active',
        type: 'developer',
        features: ['Custom Authentication', 'Social Login', 'API Security'],
        setupTime: '2-3 أيام',
        popularity: 75
      }
    ],
    productivity: [
      {
        name: 'Microsoft Office 365',
        nameEn: 'Office 365',
        description: 'تكامل مع حزمة Microsoft Office والتطبيقات السحابية',
        logo: '📊',
        status: 'active',
        type: 'enterprise',
        features: ['Outlook', 'Teams', 'SharePoint', 'OneDrive'],
        setupTime: '1-2 يوم',
        popularity: 95
      },
      {
        name: 'Slack',
        nameEn: 'Slack',
        description: 'تنبيهات وإشعارات الموارد البشرية في Slack',
        logo: '💬',
        status: 'active',
        type: 'productivity',
        features: ['إشعارات الطلبات', 'تذكيرات المهام', 'تقارير سريعة'],
        setupTime: '1 يوم',
        popularity: 84
      },
      {
        name: 'Zoom',
        nameEn: 'Zoom',
        description: 'جدولة المقابلات والاجتماعات آلياً',
        logo: '📹',
        status: 'active',
        type: 'communication',
        features: ['مقابلات العمل', 'الاجتماعات', 'التدريب عن بُعد'],
        setupTime: '1 يوم',
        popularity: 89
      }
    ],
    communication: [
      {
        name: 'WhatsApp Business',
        nameEn: 'WhatsApp API',
        description: 'إرسال الإشعارات والتنبيهات عبر WhatsApp',
        logo: '📱',
        status: 'active',
        type: 'communication',
        features: ['إشعارات الرواتب', 'تنبيهات الإجازات', 'رسائل الترحيب'],
        setupTime: '2-3 أيام',
        popularity: 92
      },
      {
        name: 'SMS Gateway',
        nameEn: 'SMS Services',
        description: 'إرسال الرسائل النصية للموظفين',
        logo: '💌',
        status: 'active',
        type: 'communication',
        features: ['رسائل التنبيه', 'كلمات المرور', 'الطوارئ'],
        setupTime: '1 يوم',
        popularity: 87
      },
      {
        name: 'البريد الإلكتروني',
        nameEn: 'Email Integration',
        description: 'إرسال البريد الإلكتروني المخصص والتقارير',
        logo: '✉️',
        status: 'active',
        type: 'communication',
        features: ['تقارير دورية', 'كشوف الراتب', 'الإشعارات الرسمية'],
        setupTime: '1 يوم',
        popularity: 98
      }
    ],
    data: [
      {
        name: 'Power BI',
        nameEn: 'Microsoft Power BI',
        description: 'تحليلات وتقارير متقدمة للبيانات',
        logo: '📈',
        status: 'active',
        type: 'analytics',
        features: ['لوحات المعلومات', 'التقارير التفاعلية', 'التحليلات المتقدمة'],
        setupTime: '2-4 أيام',
        popularity: 89
      },
      {
        name: 'Tableau',
        nameEn: 'Tableau',
        description: 'منصة تصور البيانات والتحليلات المرئية',
        logo: '📊',
        status: 'active',
        type: 'analytics',
        features: ['التصور المرئي', 'التقارير التنفيذية', 'التحليل التفاعلي'],
        setupTime: '3-5 أيام',
        popularity: 76
      },
      {
        name: 'Excel Integration',
        nameEn: 'Microsoft Excel',
        description: 'تصدير واستيراد البيانات مع Excel',
        logo: '📋',
        status: 'active',
        type: 'productivity',
        features: ['تصدير التقارير', 'استيراد البيانات', 'القوالب المخصصة'],
        setupTime: '1 يوم',
        popularity: 94
      }
    ]
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500 text-white">متاح</Badge>;
      case 'coming_soon':
        return <Badge variant="outline" className="border-orange-500 text-orange-600">قريباً</Badge>;
      case 'beta':
        return <Badge variant="outline" className="border-blue-500 text-blue-600">تجريبي</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'official':
        return <Badge className="bg-blue-500 text-white text-xs">رسمي</Badge>;
      case 'certified':
        return <Badge className="bg-green-500 text-white text-xs">معتمد</Badge>;
      case 'enterprise':
        return <Badge className="bg-purple-500 text-white text-xs">مؤسسي</Badge>;
      case 'developer':
        return <Badge className="bg-orange-500 text-white text-xs">مطور</Badge>;
      default:
        return null;
    }
  };

  const currentIntegrations = integrations[selectedCategory as keyof typeof integrations] || [];

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
          
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              {t('integrations.title')}
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              {t('integrations.desc')}
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">تكامل متاح</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">99.9%</div>
                <div className="text-sm text-muted-foreground">وقت التشغيل</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">مراقبة مستمرة</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">API</div>
                <div className="text-sm text-muted-foreground">واجهات مفتوحة</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 mb-12">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col items-center gap-2 py-3 text-xs"
                >
                  <category.icon className="w-5 h-5" />
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={selectedCategory}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentIntegrations.map((integration, index) => (
                  <Card 
                    key={index}
                    className="group hover:shadow-xl transition-all duration-300 border-border hover:border-primary/50 hover:-translate-y-1"
                  >
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center text-2xl">
                            {integration.logo}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                              {integration.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">{integration.nameEn}</p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {getStatusBadge(integration.status)}
                          {getTypeBadge(integration.type)}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {integration.description}
                      </p>
                    </CardHeader>
                    
                    <CardContent>
                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-medium text-sm text-primary mb-3">الميزات المتاحة:</h4>
                        <ul className="space-y-2">
                          {integration.features.slice(0, 3).map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </li>
                          ))}
                          {integration.features.length > 3 && (
                            <li className="text-sm text-primary">
                              +{integration.features.length - 3} ميزة أخرى
                            </li>
                          )}
                        </ul>
                      </div>

                      {/* Meta Info */}
                      <div className="space-y-3 pt-4 border-t border-border">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">وقت التفعيل</span>
                          </div>
                          <span className="font-medium">{integration.setupTime}</span>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <BarChart3 className="w-4 h-4 text-muted-foreground" />
                            <span className="text-muted-foreground">شعبية الاستخدام</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-primary to-primary-glow transition-all duration-500"
                                style={{ width: `${integration.popularity}%` }}
                              />
                            </div>
                            <span className="font-medium">{integration.popularity}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <Button 
                        className="w-full mt-6" 
                        variant={integration.status === 'active' ? 'default' : 'outline'}
                        disabled={integration.status === 'coming_soon'}
                      >
                        {integration.status === 'active' ? 'تفعيل التكامل' : 
                         integration.status === 'coming_soon' ? 'قريباً' : 'تعرف على المزيد'}
                        <ArrowRight className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Custom Integration */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-primary/20 rounded-2xl flex items-center justify-center">
              <Cloud className="w-12 h-12 text-primary" />
            </div>
            
            <h2 className="text-3xl font-bold mb-4">
              تحتاج تكامل مخصص؟
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              فريقنا التقني جاهز لتطوير تكاملات مخصصة حسب احتياجاتك الخاصة
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="text-center border-border">
                <CardContent className="pt-6">
                  <Database className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">API مخصص</h3>
                  <p className="text-sm text-muted-foreground">
                    تطوير واجهات برمجية خاصة لأنظمتك
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-border">
                <CardContent className="pt-6">
                  <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">تقارير مخصصة</h3>
                  <p className="text-sm text-muted-foreground">
                    تقارير وتحليلات حسب متطلباتك
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center border-border">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">دعم فني مخصص</h3>
                  <p className="text-sm text-muted-foreground">
                    فريق دعم متخصص لمشروعك
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 px-8"
                onClick={() => navigate('/contact')}
              >
                تحدث مع فريق التكامل
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8"
                onClick={() => navigate('/schedule')}
              >
                احجز استشارة تقنية
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">مزايا التكاملات</h2>
            <p className="text-xl text-muted-foreground">
              لماذا تختار تكاملات بُعد؟
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'أمان عالي',
                description: 'تشفير البيانات وحماية متقدمة',
                color: 'text-green-600'
              },
              {
                icon: Zap,
                title: 'سرعة الأداء',
                description: 'مزامنة فورية وأداء موثوق',
                color: 'text-blue-600'
              },
              {
                icon: Clock,
                title: 'إعداد سريع',
                description: 'تفعيل سهل في دقائق معدودة',
                color: 'text-purple-600'
              },
              {
                icon: Headphones,
                title: 'دعم متواصل',
                description: 'مساعدة فنية وإرشاد مستمر',
                color: 'text-orange-600'
              }
            ].map((benefit, index) => (
              <Card key={index} className="text-center border-border hover:shadow-lg transition-shadow">
                <CardHeader>
                  <benefit.icon className={`w-12 h-12 mx-auto mb-4 ${benefit.color}`} />
                  <h3 className="font-semibold">{benefit.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Integrations;