import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Linkedin, Mail, Award, Star, Code, Palette, Shield, Brain, Heart, Target } from 'lucide-react';
export const TeamSection: React.FC = () => {
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
  return;
};