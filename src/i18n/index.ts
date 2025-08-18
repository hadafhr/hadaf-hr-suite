import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Header & Navigation
      "nav.home": "Home",
      "nav.features": "Features", 
      "nav.knowledge": "Knowledge Center",
      "nav.guides": "Tutorials",
      "nav.pricing": "Pricing",
      "nav.contact": "Contact Us",
      "nav.login": "Login",
      "nav.schedule": "Schedule Meeting",
      "nav.integrations": "Integrations",
      "nav.about": "About",

      // Hero Section
      "hero.title": "Smart Cloud HR Management Platform",
      "hero.subtitle": "Comprehensive HR solutions powered by artificial intelligence for efficient workforce management",
      "hero.cta.demo": "Try Now",
      "hero.cta.meeting": "Schedule Meeting",
      "hero.stats.clients": "Happy Clients",
      "hero.stats.uptime": "System Uptime",
      "hero.stats.transactions": "Processed Transactions",

      // Features
      "features.title": "Platform Features",
      "features.subtitle": "Comprehensive HR solutions for modern businesses",
      "features.employee_management": "Employee Management",
      "features.employee_management_desc": "Complete employee lifecycle management with smart automation",
      "features.payroll": "Payroll System",
      "features.payroll_desc": "Automated payroll processing with Saudi labor law compliance",
      "features.attendance": "Attendance Management", 
      "features.attendance_desc": "Smart attendance tracking with biometric integration",
      "features.performance": "Performance Evaluation",
      "features.performance_desc": "360-degree performance assessment with AI insights",
      "features.recruitment": "Smart Recruitment",
      "features.recruitment_desc": "AI-powered recruitment with automated screening",
      "features.compliance": "Legal Compliance",
      "features.compliance_desc": "Full compliance with Saudi labor laws and regulations",
      "features.self_service": "Employee Self Service",
      "features.self_service_desc": "Empower employees with self-service capabilities",
      "features.analytics": "HR Analytics",
      "features.analytics_desc": "Data-driven insights for better HR decisions",
      "features.integration": "System Integration",
      "features.integration_desc": "Seamless integration with government systems",

      // Services Overview
      "services.title": "Our Solutions",
      "services.employee.title": "Employee Cloud Services",
      "services.employee.desc": "Self-service portal for leave requests, payroll, and personal information management",
      "services.employer.title": "Integrated Employer Services", 
      "services.employer.desc": "Comprehensive business management with recruitment, analytics, and AI tools",
      "services.nonprofit.title": "Non-Profit Sector Services",
      "services.nonprofit.desc": "Specialized solutions for NGOs with volunteer and project management",

      // Knowledge & Learning
      "knowledge.title": "Knowledge & Learning",
      "knowledge.desc": "Access comprehensive resources and step-by-step guides",
      "knowledge.center": "Knowledge Center",
      "knowledge.tutorials": "Tutorials",
      "knowledge.search": "Search resources...",

      // Integrations
      "integrations.title": "System Integrations",
      "integrations.desc": "Seamless connectivity with government and banking systems",
      "integrations.gosi": "GOSI Integration",
      "integrations.banks": "Banking Systems", 
      "integrations.govt": "Government Portals",
      "integrations.sso": "Single Sign-On",

      // Testimonials
      "testimonials.title": "Client Success Stories",
      "testimonials.subtitle": "See how we've transformed HR operations",

      // Pricing
      "pricing.title": "Choose Your Plan",
      "pricing.subtitle": "Flexible packages for businesses of all sizes",
      "pricing.basic": "Basic",
      "pricing.professional": "Professional", 
      "pricing.enterprise": "Enterprise",
      "pricing.monthly": "Monthly",
      "pricing.yearly": "Yearly",
      "pricing.save": "Save",
      "pricing.cta": "Get Started",

      // Contact
      "contact.title": "Get In Touch",
      "contact.desc": "Ready to transform your HR operations?",
      "contact.form.name": "Full Name",
      "contact.form.email": "Email Address",
      "contact.form.company": "Company Name",
      "contact.form.message": "Message",
      "contact.form.submit": "Send Message",

      // Footer
      "footer.product": "Product",
      "footer.resources": "Resources", 
      "footer.company": "Company",
      "footer.policies": "Policies",
      "footer.social": "Follow Us",
      "footer.rights": "All rights reserved",

      // Login Portals
      "portals.title": "Choose Login Portal",
      "portals.employee": "Employee Portal",
      "portals.employee_desc": "Unified employee portal with self-service and individual access",
      "portals.employer": "Employer Portal", 
      "portals.employer_desc": "Executive command center with business management and AI tools",
      "portals.nonprofit": "Non-Profit Portal",
      "portals.nonprofit_desc": "Specialized platform for NGOs with volunteer and project management",
      "portals.enter": "Enter Portal",

      // Common Buttons & Actions
      "btn.back": "Back",
      "btn.next": "Next", 
      "btn.submit": "Submit",
      "btn.cancel": "Cancel",
      "btn.save": "Save",
      "btn.edit": "Edit",
      "btn.delete": "Delete",
      "btn.view": "View",
      "btn.close": "Close",
      "btn.learn_more": "Learn More",
      "btn.get_started": "Get Started",
      "btn.try_now": "Try Now",

      // Status & Messages
      "msg.loading": "Loading...",
      "msg.success": "Operation completed successfully",
      "msg.error": "An error occurred",
      "msg.no_data": "No data available",

      // Language
      "language.arabic": "العربية",
      "language.english": "English",
      "language.switch": "Switch Language"
    }
  },
  ar: {
    translation: {
      // Header & Navigation  
      "nav.home": "الرئيسية",
      "nav.features": "المميزات",
      "nav.knowledge": "مركز المعرفة", 
      "nav.guides": "الشروحات",
      "nav.pricing": "الباقات",
      "nav.contact": "تواصل معنا",
      "nav.login": "تسجيل الدخول",
      "nav.schedule": "احجز اجتماع",
      "nav.integrations": "التكاملات",
      "nav.about": "من نحن",

      // Hero Section
      "hero.title": "منصة بُعد الذكية لإدارة الموارد البشرية",
      "hero.subtitle": "حلول شاملة للموارد البشرية مدعومة بالذكاء الاصطناعي لإدارة فعالة للقوى العاملة",
      "hero.cta.demo": "جرّب الآن", 
      "hero.cta.meeting": "احجز اجتماع",
      "hero.stats.clients": "عميل راضٍ",
      "hero.stats.uptime": "وقت تشغيل النظام",
      "hero.stats.transactions": "معاملة معالجة",

      // Features
      "features.title": "مميزات المنصة",
      "features.subtitle": "حلول شاملة للموارد البشرية للشركات العصرية",
      "features.employee_management": "إدارة الموظفين",
      "features.employee_management_desc": "إدارة شاملة لدورة حياة الموظف مع الأتمتة الذكية",
      "features.payroll": "نظام الرواتب", 
      "features.payroll_desc": "معالجة آلية للرواتب مع الامتثال لقانون العمل السعودي",
      "features.attendance": "إدارة الحضور والانصراف",
      "features.attendance_desc": "تتبع ذكي للحضور مع تكامل القياسات الحيوية",
      "features.performance": "تقييم الأداء",
      "features.performance_desc": "تقييم أداء شامل ٣٦٠ درجة مع رؤى ذكية",
      "features.recruitment": "التوظيف الذكي",
      "features.recruitment_desc": "توظيف مدعوم بالذكاء الاصطناعي مع الفحص الآلي",
      "features.compliance": "الامتثال القانوني",
      "features.compliance_desc": "امتثال كامل لقوانين العمل السعودية والأنظمة",
      "features.self_service": "الخدمة الذاتية للموظفين",
      "features.self_service_desc": "تمكين الموظفين بقدرات الخدمة الذاتية",
      "features.analytics": "تحليلات الموارد البشرية", 
      "features.analytics_desc": "رؤى مدفوعة بالبيانات لقرارات أفضل في الموارد البشرية",
      "features.integration": "تكامل الأنظمة",
      "features.integration_desc": "تكامل سلس مع الأنظمة الحكومية",

      // Services Overview
      "services.title": "حلولنا",
      "services.employee.title": "الخدمات السحابية للموظفين",
      "services.employee.desc": "بوابة الخدمة الذاتية لطلبات الإجازات والرواتب وإدارة المعلومات الشخصية",
      "services.employer.title": "خدمات أصحاب العمل المتكاملة",
      "services.employer.desc": "إدارة أعمال شاملة مع التوظيف والتحليلات وأدوات الذكاء الاصطناعي",
      "services.nonprofit.title": "خدمات القطاع غير الربحي",
      "services.nonprofit.desc": "حلول متخصصة للمنظمات غير الربحية مع إدارة المتطوعين والمشاريع",

      // Knowledge & Learning
      "knowledge.title": "المعرفة والتعلم",
      "knowledge.desc": "الوصول إلى موارد شاملة وأدلة خطوة بخطوة",
      "knowledge.center": "مركز المعرفة",
      "knowledge.tutorials": "الشروحات",
      "knowledge.search": "البحث في الموارد...",

      // Integrations
      "integrations.title": "تكاملات الأنظمة",
      "integrations.desc": "اتصال سلس مع الأنظمة الحكومية والمصرفية",
      "integrations.gosi": "تكامل التأمينات الاجتماعية",
      "integrations.banks": "الأنظمة المصرفية",
      "integrations.govt": "البوابات الحكومية", 
      "integrations.sso": "تسجيل الدخول الموحد",

      // Testimonials
      "testimonials.title": "قصص نجاح العملاء",
      "testimonials.subtitle": "شاهد كيف حولنا عمليات الموارد البشرية",

      // Pricing
      "pricing.title": "اختر باقتك",
      "pricing.subtitle": "باقات مرنة للشركات من جميع الأحجام",
      "pricing.basic": "أساسية",
      "pricing.professional": "احترافية",
      "pricing.enterprise": "مؤسساتية", 
      "pricing.monthly": "شهرياً",
      "pricing.yearly": "سنوياً",
      "pricing.save": "وفر",
      "pricing.cta": "ابدأ الآن",

      // Contact
      "contact.title": "تواصل معنا",
      "contact.desc": "مستعد لتحويل عمليات الموارد البشرية؟",
      "contact.form.name": "الاسم الكامل",
      "contact.form.email": "البريد الإلكتروني",
      "contact.form.company": "اسم الشركة",
      "contact.form.message": "الرسالة",
      "contact.form.submit": "إرسال الرسالة",

      // Footer
      "footer.product": "المنتج",
      "footer.resources": "الموارد",
      "footer.company": "الشركة", 
      "footer.policies": "السياسات",
      "footer.social": "تابعنا",
      "footer.rights": "جميع الحقوق محفوظة",

      // Login Portals
      "portals.title": "اختر بوابة الدخول",
      "portals.employee": "بوابة الموظفين",
      "portals.employee_desc": "بوابة الموظفين الموحدة مع الخدمة الذاتية والوصول الفردي",
      "portals.employer": "بوابة أصحاب العمل",
      "portals.employer_desc": "مركز قيادي تنفيذي مع إدارة الأعمال وأدوات الذكاء الاصطناعي",
      "portals.nonprofit": "بوابة القطاع غير الربحي", 
      "portals.nonprofit_desc": "منصة متخصصة للمنظمات غير الربحية مع إدارة المتطوعين والمشاريع",
      "portals.enter": "دخول البوابة",

      // Common Buttons & Actions
      "btn.back": "رجوع",
      "btn.next": "التالي",
      "btn.submit": "إرسال", 
      "btn.cancel": "إلغاء",
      "btn.save": "حفظ",
      "btn.edit": "تعديل",
      "btn.delete": "حذف",
      "btn.view": "عرض",
      "btn.close": "إغلاق",
      "btn.learn_more": "اعرف المزيد",
      "btn.get_started": "ابدأ الآن",
      "btn.try_now": "جرّب الآن",

      // Status & Messages
      "msg.loading": "جاري التحميل...",
      "msg.success": "تمت العملية بنجاح",
      "msg.error": "حدث خطأ",
      "msg.no_data": "لا توجد بيانات متاحة",

      // Language
      "language.arabic": "العربية",
      "language.english": "English", 
      "language.switch": "تغيير اللغة"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
    }
  });

export default i18n;