import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Linkedin, Mail, Award, Star, Code, Palette, Shield, Brain, Heart, Target } from 'lucide-react';

export const TeamSection: React.FC = () => {
  const leadership = [
    {
      name: "أحمد محمد السالم",
      position: "الرئيس التنفيذي والمؤسس",
      bio: "خبرة تزيد عن 15 عاماً في قطاع التقنية وإدارة الأعمال، حاصل على ماجستير إدارة الأعمال من جامعة الملك سعود",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      specialties: ["القيادة الاستراتيجية", "إدارة الأعمال", "التطوير المؤسسي"],
      achievements: "قاد تطوير أكثر من 50 مشروع تقني ناجح"
    },
    {
      name: "فاطمة عبدالله النمر",
      position: "مديرة التقنية والابتكار",
      bio: "خبيرة تقنية معلومات بخبرة 12 عاماً، متخصصة في الذكاء الاصطناعي وهندسة البرمجيات",
      image: "https://images.unsplash.com/photo-1494790108755-2616c669dc26?auto=format&fit=crop&w=300&q=80",
      specialties: ["الذكاء الاصطناعي", "هندسة البرمجيات", "الأمن السيبراني"],
      achievements: "براءة اختراع في أنظمة التعلم الآلي"
    },
    {
      name: "محمد عبدالرحمن الشمري",
      position: "مدير المبيعات والتسويق",
      bio: "خبرة 10 سنوات في التسويق الرقمي وتطوير الأعمال، حاصل على شهادات متقدمة في التسويق الرقمي",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
      specialties: ["التسويق الرقمي", "تطوير الأعمال", "إدارة العلاقات"],
      achievements: "نجح في زيادة المبيعات بنسبة 300% خلال عامين"
    }
  ];

  const departments = [
    {
      name: "قسم التطوير",
      icon: Code,
      description: "فريق من أمهر المطورين والمهندسين",
      members: 15,
      color: "from-blue-500 to-blue-600",
      technologies: ["React", "Node.js", "Python", "Cloud Computing"]
    },
    {
      name: "قسم التصميم",
      icon: Palette, 
      description: "خبراء في تجربة المستخدم والتصميم الإبداعي",
      members: 8,
      color: "from-purple-500 to-pink-600",
      technologies: ["UI/UX", "Figma", "Adobe Creative Suite", "Prototyping"]
    },
    {
      name: "قسم الأمن السيبراني",
      icon: Shield,
      description: "متخصصون في حماية البيانات والأنظمة",
      members: 6,
      color: "from-red-500 to-red-600", 
      technologies: ["Cybersecurity", "Penetration Testing", "ISO 27001", "GDPR"]
    },
    {
      name: "قسم الذكاء الاصطناعي",
      icon: Brain,
      description: "باحثون ومطورو حلول الذكاء الاصطناعي",
      members: 10,
      color: "from-emerald-500 to-teal-600",
      technologies: ["Machine Learning", "NLP", "Computer Vision", "Deep Learning"]
    }
  ];

  const culture = [
    {
      icon: Heart,
      title: "بيئة عمل محفزة",
      description: "نوفر بيئة عمل إيجابية تشجع على الإبداع والنمو المهني"
    },
    {
      icon: Target,
      title: "التطوير المستمر", 
      description: "نستثمر في تطوير مهارات فريقنا من خلال التدريب والمؤتمرات"
    },
    {
      icon: Award,
      title: "التقدير والمكافآت",
      description: "نقدر إنجازات فريقنا ونكافئ التميز والابتكار"
    },
    {
      icon: Users,
      title: "العمل الجماعي",
      description: "نؤمن بقوة العمل الجماعي والتعاون لتحقيق أفضل النتائج"
    }
  ];

  return (
    <section id="team" className="py-20 bg-black min-h-screen">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center space-y-8 mb-20">
          <div className="relative">
            <div className="absolute -inset-4 bg-white/10 rounded-2xl blur-2xl opacity-30 animate-pulse"></div>
            <Badge className="relative bg-black/80 text-white border-[#1A1A1A] px-6 py-3 text-base font-semibold backdrop-blur-sm shadow-2xl hover:shadow-white/20 transition-all duration-300 hover:scale-105">
              <Users className="w-5 h-5 mr-2 text-white" />
              فريق العمل
            </Badge>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-5xl lg:text-6xl font-bold text-white leading-tight animate-fade-in text-center drop-shadow-2xl">
              <span className="block mb-2">فريقنا المتميز من</span>
              <span className="bg-gradient-to-r from-white via-gray-200 to-white bg-clip-text text-transparent animate-scale-in block">
                الخبراء والمبدعين
              </span>
            </h2>
            
            <div className="w-24 h-1 bg-gradient-to-r from-white to-gray-300 mx-auto rounded-full opacity-80 shadow-lg shadow-white/30"></div>
          </div>
          
          <p className="text-xl lg:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
            يجمعون بين الخبرة العملية والشغف بالابتكار لتقديم أفضل الحلول التقنية
            <br />
            <span className="text-[#E0E0E0] font-semibold">مع فهم عميق لاحتياجات السوق المحلي</span>
          </p>
        </div>

        {/* Leadership Team */}
        <div className="mb-20">
          <div className="text-center space-y-6 mb-12">
            <div className="relative inline-block">
              <div className="absolute -inset-3 bg-white/10 rounded-xl blur-xl opacity-30"></div>
              <h3 className="relative text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl">
                القيادة <span className="bg-gradient-to-r from-[#E0E0E0] to-white bg-clip-text text-transparent">التنفيذية</span>
              </h3>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-white to-[#E0E0E0] mx-auto rounded-full shadow-lg shadow-white/20"></div>
            <p className="text-lg text-white/90">الفريق القيادي الذي يوجه رؤية الشركة ويحقق أهدافها الاستراتيجية</p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8" dir="rtl">
            {leadership.map((leader, index) => (
              <Card key={index} className="group bg-black border-[#1A1A1A] hover:shadow-2xl hover:shadow-gray-400/20 transition-all duration-500 overflow-hidden transform hover:scale-105 shadow-xl shadow-black/50">
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={leader.image} 
                      alt={leader.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="p-6 bg-black">
                    <h4 className="text-xl font-bold text-white mb-2">{leader.name}</h4>
                    <p className="text-[#E0E0E0] font-semibold mb-3">{leader.position}</p>
                    <p className="text-white/90 text-sm mb-4 leading-relaxed">{leader.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {leader.specialties.map((specialty, idx) => (
                        <Badge key={idx} className="bg-black/80 text-white border-[#1A1A1A] text-xs hover:bg-[#1A1A1A] transition-colors">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-sm text-white/90 mb-4">
                      <Star className="w-4 h-4 text-yellow-400 mr-2" />
                      {leader.achievements}
                    </div>
                    
                    <div className="flex gap-3">
                      <Button size="sm" className="bg-black text-white border-[#1A1A1A] hover:bg-[#1A1A1A] hover:scale-105 transition-all duration-200">
                        <Linkedin className="w-4 h-4 mr-2 text-white" />
                        LinkedIn
                      </Button>
                      <Button size="sm" className="bg-black/80 text-white border-[#1A1A1A] hover:bg-[#1A1A1A] hover:scale-105 transition-all duration-200">
                        <Mail className="w-4 h-4 mr-2 text-white" />
                        راسل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Departments */}
        <div className="mb-20">
          <div className="text-center space-y-6 mb-12">
            <div className="relative inline-block">
              <div className="absolute -inset-3 bg-white/10 rounded-xl blur-xl opacity-30"></div>
              <h3 className="relative text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl">
                أقسام <span className="bg-gradient-to-r from-[#E0E0E0] to-white bg-clip-text text-transparent">الشركة</span>
              </h3>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-white to-[#E0E0E0] mx-auto rounded-full shadow-lg shadow-white/20"></div>
            <p className="text-lg text-white/90">فرق متخصصة تعمل بتناغم لتحقيق التميز في كل جانب من جوانب عملنا</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8" dir="rtl">
            {departments.map((dept, index) => (
              <Card key={index} className="group bg-black border-[#1A1A1A] hover:shadow-2xl hover:shadow-gray-400/20 transition-all duration-300 transform hover:scale-105 shadow-xl shadow-black/50">
                <CardContent className="p-8 bg-black">
                  <div className="flex items-center mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br ${dept.color} rounded-xl mr-4 shadow-lg`}>
                      <dept.icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white">{dept.name}</h4>
                      <p className="text-[#E0E0E0] text-sm">{dept.members} عضو</p>
                    </div>
                  </div>
                  
                  <p className="text-white/90 mb-6">{dept.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-[#E0E0E0] mb-2">التخصصات:</p>
                    <div className="flex flex-wrap gap-2">
                      {dept.technologies.map((tech, idx) => (
                        <Badge key={idx} className="bg-black/80 text-white border-[#1A1A1A] text-xs hover:bg-[#1A1A1A] transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Company Culture */}
        <div className="bg-black border border-[#1A1A1A] rounded-2xl shadow-2xl shadow-black/50 p-8 lg:p-12">
          <div className="text-center space-y-6 mb-12">
            <div className="relative inline-block">
              <div className="absolute -inset-3 bg-white/10 rounded-xl blur-xl opacity-30"></div>
              <h3 className="relative text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl">
                ثقافة <span className="bg-gradient-to-r from-[#E0E0E0] to-white bg-clip-text text-transparent">الشركة</span>
              </h3>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-r from-white to-[#E0E0E0] mx-auto rounded-full shadow-lg shadow-white/20"></div>
            <p className="text-lg text-white/90">القيم والمبادئ التي تحكم بيئة عملنا وتجعلها مكاناً مميزاً للإبداع والنمو</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8" dir="rtl">
            {culture.map((item, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-sm rounded-2xl mb-4 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-white/30 transition-all duration-300 border border-[#1A1A1A]">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-bold text-white mb-3">{item.title}</h4>
                <p className="text-white/90 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join Team CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-black to-black/90 border border-[#1A1A1A] rounded-2xl p-8 lg:p-12 shadow-2xl shadow-black/50">
            <h3 className="text-3xl font-bold mb-4 text-white">انضم إلى فريقنا المميز</h3>
            <p className="text-xl mb-8 text-white/90">هل تريد أن تكون جزءاً من قصة نجاحنا؟ ابحث عن الفرص الوظيفية المتاحة</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-black text-white border-[#1A1A1A] hover:bg-[#1A1A1A] hover:scale-105 transition-all duration-200 px-6 py-3 text-lg shadow-lg">
                الوظائف المتاحة
              </Button>
              <Button className="bg-black/80 text-white border-[#1A1A1A] hover:bg-[#1A1A1A] hover:scale-105 transition-all duration-200 px-6 py-3 text-lg shadow-lg">
                أرسل سيرتك الذاتية
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};