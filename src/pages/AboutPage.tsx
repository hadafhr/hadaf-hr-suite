import React from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Target, Award, ArrowLeft, Mail, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>عن بُعد - منصة إدارة الموارد البشرية الرائدة في المملكة</title>
        <meta name="description" content="تعرف على بُعد، الشركة الرائدة في حلول إدارة الموارد البشرية في المملكة العربية السعودية. رؤيتنا، مهمتنا، وفريقنا المتخصص." />
      </Helmet>

      {/* Header with Back Button */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            العودة
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-6">
            عن منصة بُعد HR
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            نحن الشركة الرائدة في مجال تقنية إدارة الموارد البشرية في المملكة العربية السعودية، 
            نساعد الشركات على إدارة مواردها البشرية بكفاءة وفعالية من خلال حلول تقنية متطورة ومبتكرة.
          </p>
        </section>

        {/* Vision & Mission */}
        <section className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <CardContent className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">رؤيتنا</h3>
              <p className="text-muted-foreground leading-relaxed">
                أن نكون الشريك الأول والموثوق لجميع المنظمات في المملكة لإدارة مواردها البشرية بكفاءة عالية، 
                من خلال تقديم حلول تقنية مبتكرة تواكب التطورات العالمية وتلبي متطلبات السوق السعودي.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardContent className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">مهمتنا</h3>
              <p className="text-muted-foreground leading-relaxed">
                تمكين المنظمات من إدارة مواردها البشرية بأعلى معايير الجودة والكفاءة، 
                من خلال منصة متكاملة تجمع بين التقنيات الحديثة والخبرة المحلية، 
                مع ضمان الامتثال الكامل للأنظمة واللوائح السعودية.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            لماذا تختار منصة بُعد؟
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <CardContent className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold">فريق متخصص</h4>
                <p className="text-muted-foreground">
                  فريق من الخبراء المتخصصين في إدارة الموارد البشرية والتقنيات الحديثة
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold">امتثال كامل</h4>
                <p className="text-muted-foreground">
                  توافق تام مع جميع الأنظمة واللوائح السعودية وتحديثات مستمرة
                </p>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardContent className="text-center space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold">حلول شاملة</h4>
                <p className="text-muted-foreground">
                  منصة متكاملة تغطي جميع احتياجات إدارة الموارد البشرية
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center bg-muted/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">
            تواصل معنا
          </h2>
          <p className="text-muted-foreground mb-6">
            نحن هنا لمساعدتك في تطوير إدارة الموارد البشرية لمنظمتك
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button onClick={() => navigate('/contact')} className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              تواصل معنا
            </Button>
            <Button variant="outline" onClick={() => navigate('/demo-request')} className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              احجز عرضًا توضيحيًا
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;