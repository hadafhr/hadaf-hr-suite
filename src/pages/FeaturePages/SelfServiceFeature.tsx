import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Settings, 
  FileText, 
  Calendar,
  Clock,
  CreditCard,
  Bell,
  Download,
  Upload,
  CheckCircle,
  ArrowLeft,
  Smartphone,
  Globe,
  Shield
} from 'lucide-react';

const SelfServiceFeature: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "إدارة الملف الشخصي",
      description: "يمكن للموظفين تحديث بياناتهم الشخصية والمهنية بسهولة",
      icon: User,
      benefits: ["تحديث البيانات الشخصية", "إدارة الوثائق", "تحديث معلومات الاتصال"]
    },
    {
      title: "طلبات الإجازات",
      description: "نظام متطور لطلب وإدارة الإجازات مع موافقات تلقائية",
      icon: Calendar,
      benefits: ["طلب إجازة فوري", "تتبع حالة الطلب", "عرض رصيد الإجازات"]
    },
    {
      title: "كشوفات الراتب",
      description: "وصول مباشر لكشوفات الراتب والمزايا والخصومات",
      icon: CreditCard,
      benefits: ["تحميل كشوفات الراتب", "تفاصيل المزايا", "سجل الرواتب"]
    },
    {
      title: "سجل الحضور",
      description: "مراجعة سجل الحضور والانصراف وساعات العمل الإضافية",
      icon: Clock,
      benefits: ["تسجيل الحضور", "عرض ساعات العمل", "طلبات التصحيح"]
    },
    {
      title: "الوثائق والملفات",
      description: "مركز موحد لجميع الوثائق والملفات المهنية",
      icon: FileText,
      benefits: ["تحميل الوثائق", "مشاركة الملفات", "أرشفة رقمية"]
    },
    {
      title: "التنبيهات والإشعارات",
      description: "تنبيهات فورية للمهام والطلبات والتحديثات المهمة",
      icon: Bell,
      benefits: ["إشعارات فورية", "تذكيرات ذكية", "تنبيهات مخصصة"]
    }
  ];

  const mobileFeatures = [
    {
      title: "تطبيق جوال متطور",
      description: "وصول كامل لجميع الخدمات من خلال تطبيق الجوال"
    },
    {
      title: "تسجيل الحضور بالموقع",
      description: "تسجيل الحضور والانصراف باستخدام تقنية GPS"
    },
    {
      title: "إشعارات فورية",
      description: "تنبيهات مباشرة على الجوال لجميع التحديثات"
    }
  ];

  const benefits = [
    {
      title: "توفير الوقت",
      value: "80%",
      description: "تقليل الوقت المستغرق في العمليات الإدارية"
    },
    {
      title: "رضا الموظفين",
      value: "95%",
      description: "تحسن كبير في تجربة الموظف ورضاه"
    },
    {
      title: "تقليل الأوراق",
      value: "90%",
      description: "تحول رقمي كامل يقلل استخدام الورق"
    },
    {
      title: "دقة البيانات",
      value: "99%",
      description: "دقة عالية في البيانات مع تقليل الأخطاء"
    }
  ];

  return (
    <div className="min-h-screen bg-background font-arabic">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={() => navigate('/')} className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                العودة للرئيسية
              </Button>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-lg font-bold text-foreground">الخدمة الذاتية للموظفين</h1>
              </div>
            </div>
            <Button onClick={() => navigate('/employee-dashboard')} className="btn-primary">
              ابدأ الآن
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-background to-purple-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-4 py-2">
              خدمة ذاتية متطورة للموظفين
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              تمكين الموظفين من <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">إدارة شؤونهم بأنفسهم</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              منصة شاملة تمكن الموظفين من إدارة جميع احتياجاتهم الإدارية بسهولة ومرونة، 
              من طلبات الإجازات وحتى مراجعة كشوفات الراتب، كل ذلك في مكان واحد.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => navigate('/employee-dashboard')}>
                دخول لوحة الموظف
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/chat-messaging')}>
                شاهد العرض التوضيحي
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                خدمات شاملة للموظفين
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              مجموعة متكاملة من الخدمات الذاتية التي تمكن الموظفين من إنجاز مهامهم بكفاءة
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-blue-50">
                <CardHeader>
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl text-center">{feature.title}</CardTitle>
                  <CardDescription className="text-center leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-blue-600" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  تطبيق جوال متطور
                </span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                استمتع بجميع خدمات الموظفين من خلال تطبيق جوال سهل الاستخدام ومتوفر على جميع الأجهزة
              </p>
              
              <div className="space-y-4">
                {mobileFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 bg-white/80 rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Smartphone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-4 pt-4">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={() => navigate('/employee-dashboard')}>
                  جرب التطبيق
                </Button>
                <Button variant="outline">
                  تحميل التطبيق
                </Button>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-8 text-white">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-8 h-8" />
                    <h3 className="text-xl font-semibold">تطبيق بُعد HR</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">طلبات الإجازة</span>
                        <CheckCircle className="w-4 h-4" />
                      </div>
                      <div className="w-full bg-white/30 rounded-full h-2">
                        <div className="bg-white rounded-full h-2 w-3/4"></div>
                      </div>
                    </div>
                    
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">كشف الراتب</span>
                        <Download className="w-4 h-4" />
                      </div>
                      <div className="text-lg font-semibold">متاح للتحميل</div>
                    </div>
                    
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm">الحضور اليوم</span>
                        <Clock className="w-4 h-4" />
                      </div>
                      <div className="text-lg font-semibold">8:00 ص - جاري العمل</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                النتائج والفوائد
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              أرقام حقيقية تظهر تأثير الخدمة الذاتية على كفاءة العمل
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 bg-gradient-to-br from-white to-blue-50 border-0">
                <div className="text-4xl font-bold text-blue-600 mb-2">{benefit.value}</div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h2 className="text-4xl font-bold">
              أمان وخصوصية عالية المستوى
            </h2>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              نحن ملتزمون بحماية بيانات موظفيك وفقاً لأعلى معايير الأمان والخصوصية المحلية والدولية
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold mb-2">تشفير 256-bit</h4>
                <p className="text-sm text-muted-foreground">حماية متقدمة لجميع البيانات</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold mb-2">ISO 27001</h4>
                <p className="text-sm text-muted-foreground">معايير أمان معتمدة دولياً</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h4 className="font-semibold mb-2">امتثال محلي</h4>
                <p className="text-sm text-muted-foreground">متوافق مع القوانين السعودية</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-white">
              امنح موظفيك الاستقلالية التي يستحقونها
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              ابدأ الآن واكتشف كيف يمكن للخدمة الذاتية تحسين تجربة موظفيك وزيادة كفاءة عملك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-white/90 font-semibold px-8" onClick={() => navigate('/employee-dashboard')}>
                جرب الخدمة مجاناً
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10" onClick={() => navigate('/chat-messaging')}>
                تحدث مع خبير
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Settings className="w-6 h-6 text-blue-500" />
            <span className="text-lg font-semibold">الخدمة الذاتية - بُعد HR</span>
          </div>
          <p className="text-background/70 mb-6">
            تمكين الموظفين من إدارة شؤونهم بكفاءة وسهولة
          </p>
          <div className="flex justify-center gap-6">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              الرئيسية
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/chat-messaging')}>
              الدعم
            </Button>
            <Button variant="ghost" size="sm" onClick={() => navigate('/service-calculator')}>
              الأسعار
            </Button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SelfServiceFeature;