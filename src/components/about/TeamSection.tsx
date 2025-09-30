import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Linkedin, Mail, Award, Star, Code, Palette, Shield, Brain, Heart, Target } from 'lucide-react';
export const TeamSection = () => {
  const leadership = [{
    name: "أحمد محمد السالم",
    position: "الرئيس التنفيذي والمؤسس",
    bio: "خبرة تزيد عن 15 عاماً في قطاع التقنية وإدارة الأعمال، حاصل على ماجستير إدارة الأعمال من جامعة الملك سعود",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    specialties: ["القيادة الاستراتيجية", "إدارة الأعمال", "التطوير المؤسسي"],
    achievements: "قاد تطوير أكثر من 50 مشروع تقني ناجح"
  }, {
    name: "فاطمة عبدالله النمر",
    position: "مديرة التقنية والابتكار",
    bio: "خبيرة تقنية معلومات بخبرة 12 عاماً، متخصصة في الذكاء الاصطناعي وهندسة البرمجيات",
    image: "https://images.unsplash.com/photo-1494790108755-2616c669dc26?auto=format&fit=crop&w=300&q=80",
    specialties: ["الذكاء الاصطناعي", "هندسة البرمجيات", "الأمن السيبراني"],
    achievements: "براءة اختراع في أنظمة التعلم الآلي"
  }, {
    name: "محمد عبدالرحمن الشمري",
    position: "مدير المبيعات والتسويق",
    bio: "خبرة 10 سنوات في التسويق الرقمي وتطوير الأعمال، حاصل على شهادات متقدمة في التسويق الرقمي",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    specialties: ["التسويق الرقمي", "تطوير الأعمال", "إدارة العلاقات"],
    achievements: "نجح في زيادة المبيعات بنسبة 300% خلال عامين"
  }];
  const departments = [{
    name: "قسم التطوير",
    icon: Code,
    description: "فريق من أمهر المطورين والمهندسين",
    members: 15,
    color: "from-blue-500 to-blue-600",
    technologies: ["React", "Node.js", "Python", "Cloud Computing"]
  }, {
    name: "قسم التصميم",
    icon: Palette,
    description: "خبراء في تجربة المستخدم والتصميم الإبداعي",
    members: 8,
    color: "from-purple-500 to-pink-600",
    technologies: ["UI/UX", "Figma", "Adobe Creative Suite", "Prototyping"]
  }, {
    name: "قسم الأمن السيبراني",
    icon: Shield,
    description: "متخصصون في حماية البيانات والأنظمة",
    members: 6,
    color: "from-red-500 to-red-600",
    technologies: ["Cybersecurity", "Penetration Testing", "ISO 27001", "GDPR"]
  }, {
    name: "قسم الذكاء الاصطناعي",
    icon: Brain,
    description: "باحثون ومطورو حلول الذكاء الاصطناعي",
    members: 10,
    color: "from-emerald-500 to-teal-600",
    technologies: ["Machine Learning", "NLP", "Computer Vision", "Deep Learning"]
  }];
  const culture = [{
    icon: Heart,
    title: "بيئة عمل محفزة",
    description: "نوفر بيئة عمل إيجابية تشجع على الإبداع والنمو المهني"
  }, {
    icon: Target,
    title: "التطوير المستمر",
    description: "نستثمر في تطوير مهارات فريقنا من خلال التدريب والمؤتمرات"
  }, {
    icon: Award,
    title: "التقدير والمكافآت",
    description: "نقدر إنجازات فريقنا ونكافئ التميز والابتكار"
  }, {
    icon: Users,
    title: "العمل الجماعي",
    description: "نؤمن بقوة العمل الجماعي والتعاون لتحقيق أفضل النتائج"
  }];
  return (
    <section id="team" className="py-24 relative min-h-screen">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-gradient-to-br from-muted/12 to-muted/4 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-muted/15 to-muted/6 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-muted/20 to-muted/10 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute top-20 right-1/4 w-40 h-40 bg-muted/8 rounded-full blur-xl animate-bounce-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-32 h-32 bg-muted/25 rounded-full blur-lg animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-muted/12 rounded-full blur-md animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/3 w-16 h-16 bg-muted/18 rounded-full blur-sm animate-bounce"></div>
      </div>
      
      {/* Content Wrapper */}
      <div className="relative z-10 container mx-auto px-6 backdrop-blur-xl bg-black/20 rounded-3xl border border-border shadow-2xl shadow-accent/10 py-16">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-primary/10 to-primary-glow/10 text-primary border-primary/20 px-6 py-2 text-lg font-semibold">
            فريقنا المميز
          </Badge>
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
            أفضل العقول التقنية
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            فريق من الخبراء المتخصصين والمبدعين الذين يجمعون بين الخبرة العملية والرؤية المستقبلية
          </p>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">القيادة التنفيذية</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-border/20 bg-card/80 backdrop-blur-sm hover:bg-card/90">
                <CardContent className="p-8 text-center">
                  <div className="mb-6 relative">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary/20 group-hover:border-primary/40 transition-all duration-300"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
                      <Star className="h-4 w-4 text-primary-foreground" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2 text-foreground">{leader.name}</h4>
                  <p className="text-primary font-semibold mb-4">{leader.position}</p>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{leader.bio}</p>
                  <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    {leader.specialties.map((specialty, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="bg-muted/30 rounded-lg p-3 mb-4">
                    <p className="text-sm text-muted-foreground italic">
                      <Award className="h-4 w-4 inline mr-2 text-primary" />
                      {leader.achievements}
                    </p>
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" size="sm">
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm">
                      <Mail className="h-4 w-4 mr-2" />
                      البريد
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">أقسامنا المتخصصة</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {departments.map((dept, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-500 border-border/20 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${dept.color} mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <dept.icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-lg font-bold mb-3 text-foreground">{dept.name}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{dept.description}</p>
                  <Badge className="mb-4 bg-muted text-muted-foreground">
                    <Users className="h-3 w-3 mr-1" />
                    {dept.members} عضو
                  </Badge>
                  <div className="space-y-2">
                    {dept.technologies.map((tech, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs mr-1 mb-1">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Culture */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12 text-foreground">ثقافة العمل لدينا</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culture.map((item, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/20 bg-card/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold mb-3 text-foreground">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};