import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Handshake, Award, Globe, Target, Users, Building, Crown, Star, CheckCircle, Zap, Heart, Shield } from 'lucide-react';
export const PartnersSection: React.FC = () => {
  const strategicPartners = [{
    name: "وزارة الموارد البشرية والتنمية الاجتماعية",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=200&q=80",
    description: "شراكة استراتيجية لتطوير حلول متوافقة مع رؤية المملكة 2030",
    type: "حكومي",
    color: "from-blue-500 to-blue-600",
    benefits: ["التكامل مع الأنظمة الحكومية", "الامتثال للوائح", "الدعم الرسمي"]
  }, {
    name: "المؤسسة العامة للتأمينات الاجتماعية",
    logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=200&q=80",
    description: "تكامل مباشر مع نظام التأمينات الاجتماعية وحماية الأجور",
    type: "حكومي",
    color: "from-emerald-500 to-emerald-600",
    benefits: ["الربط المباشر", "التحديث التلقائي", "الامتثال الكامل"]
  }, {
    name: "Microsoft Azure",
    logo: "https://images.unsplash.com/photo-1561736778-92e52a7769ef?auto=format&fit=crop&w=200&q=80",
    description: "شريك تقني في الحوسبة السحابية والذكاء الاصطناعي",
    type: "تقني",
    color: "from-purple-500 to-indigo-600",
    benefits: ["البنية التحتية السحابية", "أدوات الذكاء الاصطناعي", "الأمان المتقدم"]
  }, {
    name: "SAP Arabia",
    logo: "https://images.unsplash.com/photo-1558655146-364adde7eb38?auto=format&fit=crop&w=200&q=80",
    description: "تكامل مع حلول إدارة الأعمال والموارد المؤسسية",
    type: "تقني",
    color: "from-orange-500 to-red-500",
    benefits: ["تكامل ERP", "تبادل البيانات", "الأتمتة الشاملة"]
  }];
  const clientPartners = [{
    name: "أرامكو السعودية",
    industry: "النفط والغاز",
    employees: "70,000+",
    relationship: "عميل استراتيجي منذ 2021"
  }, {
    name: "الخطوط السعودية",
    industry: "الطيران",
    employees: "15,000+",
    relationship: "شريك في التحول الرقمي"
  }, {
    name: "مجموعة سامبا المالية",
    industry: "البنوك والمالية",
    employees: "8,000+",
    relationship: "تطوير حلول مخصصة"
  }, {
    name: "شركة المراعي",
    industry: "الأغذية والمشروبات",
    employees: "12,000+",
    relationship: "عميل متميز منذ 2020"
  }];
  const partnershipPrograms = [{
    icon: Crown,
    title: "برنامج الشراكة الذهبية",
    description: "للشركات الكبرى التي تبحث عن حلول مخصصة وشاملة",
    features: ["دعم مخصص 24/7", "تطوير ميزات حسب الطلب", "تدريب متقدم", "أولوية الدعم"],
    color: "from-yellow-500 to-orange-500"
  }, {
    icon: Star,
    title: "برنامج الشراكة الفضية",
    description: "للشركات المتوسطة التي تريد الاستفادة من جميع المزايا",
    features: ["دعم تقني متميز", "تدريب شامل", "تكامل محدود", "تقارير متقدمة"],
    color: "from-gray-400 to-gray-600"
  }, {
    icon: Award,
    title: "برنامج الشراكة البرونزية",
    description: "للشركات الناشئة والصغيرة بحلول ميسورة التكلفة",
    features: ["دعم تقني أساسي", "تدريب أساسي", "موارد تعليمية", "مجتمع المستخدمين"],
    color: "from-amber-600 to-yellow-700"
  }];
  const partnershipBenefits = [{
    icon: Zap,
    title: "نمو مشترك",
    description: "نساعد شركاءنا على تحقيق النمو والتوسع في أسواق جديدة"
  }, {
    icon: Shield,
    title: "دعم متخصص",
    description: "فريق دعم مخصص لكل شريك لضمان النجاح المشترك"
  }, {
    icon: Target,
    title: "أهداف مشتركة",
    description: "نعمل معاً لتحقيق أهداف استراتيجية طويلة المدى"
  }, {
    icon: Heart,
    title: "علاقات طويلة الأمد",
    description: "نبني شراكات قائمة على الثقة والاحترام المتبادل"
  }];
  return <section id="partners" className="py-20 bg-white">
      
    </section>;
};