import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Core Navigation - Complete BOOD HR translation keys
      "nav.dashboard": "Dashboard",
      "nav.requests": "My Requests", 
      "nav.employees": "Employees",
      "nav.settings": "Settings",
      "nav.profile": "Profile",
      "nav.tasks": "Tasks",
      "nav.chat": "Chat",
      "nav.notifications": "Notifications",
      "nav.reports": "Reports",
      "nav.analytics": "Analytics",
      "nav.training": "Training",
      "nav.recruitment": "Recruitment",
      "nav.performance": "Performance",
      "nav.payroll": "Payroll",
      "nav.attendance": "Attendance",
      "nav.compliance": "Compliance",
      "nav.leave": "Leave Management",
      "nav.organization": "Organization",
      "nav.programs": "Programs",
      "nav.volunteers": "Volunteers",
      "nav.donors": "Donors",
      "nav.ai": "AI Assistant",

      // Buttons
      "btn.submit": "Submit",
      "btn.approve": "Approve", 
      "btn.reject": "Reject",
      "btn.back": "Back",
      "btn.save": "Save",
      "btn.cancel": "Cancel",
      "btn.edit": "Edit",
      "btn.delete": "Delete",
      "btn.view": "View",
      "btn.create": "Create",
      "btn.update": "Update",
      "btn.search": "Search",
      "btn.filter": "Filter",
      "btn.export": "Export",
      "btn.import": "Import",
      "btn.download": "Download",
      "btn.upload": "Upload",
      "btn.close": "Close",
      "btn.next": "Next",
      "btn.previous": "Previous",
      "btn.confirm": "Confirm",

      // Status
      "status.pending": "Pending",
      "status.approved": "Approved",
      "status.rejected": "Rejected", 
      "status.active": "Active",
      "status.inactive": "Inactive",
      "status.completed": "Completed",
      "status.in_progress": "In Progress",
      "status.draft": "Draft",
      "status.published": "Published",
      "status.cancelled": "Cancelled",

      // Messages
      "msg.saved": "Saved successfully",
      "msg.error": "Unexpected error occurred",
      "msg.success": "Operation completed successfully",
      "msg.warning": "Warning: Please review before proceeding",
      "msg.info": "Information",
      "msg.loading": "Loading...",
      "msg.no_data": "No data available",
      "msg.confirm_delete": "Are you sure you want to delete this item?",
      "msg.changes_saved": "Changes saved successfully",

      // Login & Dashboard
      "login.welcome": "Welcome to BOOD HR",
      "login.subtitle": "Sign in to access your HR portal",
      "dashboard.welcome": "Welcome",
      "dashboard.overview": "Overview",
      "dashboard.quick_actions": "Quick Actions",
      "dashboard.leave_balance": "Leave Balance",
      "dashboard.pending_approvals": "Pending Approvals",

      // Requests  
      "requests.new": "New Request",
      "requests.leave": "Leave Request",
      "requests.salary_certificate": "Salary Certificate",
      "requests.salary_advance": "Salary Advance",
      "requests.training": "Training Request",

      // AI Assistant
      "ai.assistant": "AI Assistant",
      "ai.chat": "Chat with AI",
      "ai.insights": "AI Insights",

      // Nonprofit
      "nonprofit.programs": "Programs",
      "nonprofit.volunteers": "Volunteers",
      "nonprofit.governance": "Governance",

      // Common
      "common.search_placeholder": "Search...",
      "common.welcome_back": "Welcome back"
    }
  },
  ar: {
    translation: {
      // Core Navigation - Complete Arabic translations
      "nav.dashboard": "لوحة المعلومات",
      "nav.requests": "طلباتي",
      "nav.employees": "الموظفون", 
      "nav.settings": "الإعدادات",
      "nav.profile": "الملف الشخصي",
      "nav.tasks": "المهام",
      "nav.chat": "الدردشة",
      "nav.notifications": "التنبيهات",
      "nav.reports": "التقارير",
      "nav.analytics": "التحليلات",
      "nav.training": "التدريب",
      "nav.recruitment": "التوظيف",
      "nav.performance": "الأداء",
      "nav.payroll": "كشوف الراتب",
      "nav.attendance": "الحضور والانصراف",
      "nav.compliance": "الامتثال",
      "nav.leave": "إدارة الإجازات",
      "nav.organization": "الهيكل التنظيمي",
      "nav.programs": "البرامج",
      "nav.volunteers": "المتطوعون",
      "nav.donors": "المانحون",
      "nav.ai": "المساعد الذكي",

      // Buttons
      "btn.submit": "إرسال",
      "btn.approve": "اعتماد",
      "btn.reject": "رفض",
      "btn.back": "رجوع",
      "btn.save": "حفظ",
      "btn.cancel": "إلغاء",
      "btn.edit": "تعديل",
      "btn.delete": "حذف",
      "btn.view": "عرض",
      "btn.create": "إنشاء",
      "btn.update": "تحديث",
      "btn.search": "بحث",
      "btn.filter": "تصفية",
      "btn.export": "تصدير",
      "btn.import": "استيراد",
      "btn.download": "تحميل",
      "btn.upload": "رفع",
      "btn.close": "إغلاق",
      "btn.next": "التالي",
      "btn.previous": "السابق",
      "btn.confirm": "تأكيد",

      // Status
      "status.pending": "قيد المراجعة",
      "status.approved": "معتمد",
      "status.rejected": "مرفوض",
      "status.active": "نشط",
      "status.inactive": "غير نشط",
      "status.completed": "مكتمل",
      "status.in_progress": "قيد التنفيذ",
      "status.draft": "مسودة",
      "status.published": "منشور",
      "status.cancelled": "ملغى",

      // Messages
      "msg.saved": "تم الحفظ بنجاح",
      "msg.error": "حدث خطأ غير متوقع",
      "msg.success": "تمت العملية بنجاح",
      "msg.warning": "تحذير: يرجى المراجعة قبل المتابعة",
      "msg.info": "معلومات",
      "msg.loading": "جاري التحميل...",
      "msg.no_data": "لا توجد بيانات متاحة",
      "msg.confirm_delete": "هل أنت متأكد من حذف هذا العنصر؟",
      "msg.changes_saved": "تم حفظ التغييرات بنجاح",

      // Login & Dashboard
      "login.welcome": "مرحباً بك في نظام بُعد HR",
      "login.subtitle": "سجل دخولك للوصول إلى بوابة الموارد البشرية",
      "dashboard.welcome": "مرحباً",
      "dashboard.overview": "نظرة عامة",
      "dashboard.quick_actions": "الإجراءات السريعة",
      "dashboard.leave_balance": "رصيد الإجازات",
      "dashboard.pending_approvals": "الموافقات المعلقة",

      // Requests
      "requests.new": "طلب جديد",
      "requests.leave": "طلب إجازة",
      "requests.salary_certificate": "شهادة راتب",
      "requests.salary_advance": "سلفة راتب",
      "requests.training": "طلب تدريب",

      // AI Assistant
      "ai.assistant": "المساعد الذكي",
      "ai.chat": "دردشة مع الذكاء الاصطناعي",
      "ai.insights": "رؤى ذكية",

      // Nonprofit
      "nonprofit.programs": "البرامج",
      "nonprofit.volunteers": "المتطوعون",
      "nonprofit.governance": "الحوكمة",

      // Common
      "common.search_placeholder": "بحث...",
      "common.welcome_back": "مرحباً بعودتك"
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