import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: "Dashboard",
      requests: "Requests",
      tasks: "Tasks",
      chat: "Chat",
      notifications: "Notifications",
      profile: "Profile",
      settings: "Settings",
      logout: "Logout",
      
      // Login
      login: "Login",
      username: "Username",
      password: "Password",
      email: "Email",
      rememberMe: "Remember Me",
      forgotPassword: "Forgot Password?",
      loginWithBiometrics: "Login with Biometrics",
      loginWithNafath: "Login with Nafath",
      language: "Language",
      welcome: "Welcome to BOOD HR",
      loginSubtitle: "Sign in to access your HR portal",
      
      // Dashboard
      employeeRequests: "Employee Requests",
      attendanceOverview: "Attendance Overview",
      leaveBalance: "Leave Balance",
      payrollInfo: "Payroll Information",
      myTeam: "My Team",
      recentActivity: "Recent Activity",
      
      // Requests
      newRequest: "New Request",
      leaveRequest: "Leave Request",
      salaryCertificate: "Salary Certificate",
      salaryAdvance: "Salary Advance",
      businessTrip: "Business Trip",
      equipmentRequest: "Equipment Request",
      attendanceModification: "Attendance Modification",
      resignation: "Resignation",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      
      // General
      submit: "Submit",
      cancel: "Cancel",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      view: "View",
      search: "Search",
      filter: "Filter",
      date: "Date",
      status: "Status",
      actions: "Actions",
      close: "Close",
      
      // Common phrases
      goodMorning: "Good Morning",
      goodAfternoon: "Good Afternoon",
      goodEvening: "Good Evening"
    }
  },
  ar: {
    translation: {
      // Navigation
      dashboard: "لوحة التحكم",
      requests: "الطلبات",
      tasks: "المهام",
      chat: "الدردشة",
      notifications: "التنبيهات",
      profile: "الملف الشخصي",
      settings: "الإعدادات",
      logout: "تسجيل الخروج",
      
      // Login
      login: "تسجيل الدخول",
      username: "اسم المستخدم",
      password: "كلمة المرور",
      email: "البريد الإلكتروني",
      rememberMe: "تذكرني",
      forgotPassword: "نسيت كلمة المرور؟",
      loginWithBiometrics: "تسجيل الدخول بالبصمة",
      loginWithNafath: "تسجيل الدخول بنفاذ",
      language: "اللغة",
      welcome: "مرحباً بك في نظام بُعد HR",
      loginSubtitle: "سجل دخولك للوصول إلى بوابة الموارد البشرية",
      
      // Dashboard
      employeeRequests: "طلبات الموظفين",
      attendanceOverview: "نظرة عامة على الحضور",
      leaveBalance: "رصيد الإجازات",
      payrollInfo: "معلومات كشف الراتب",
      myTeam: "فريقي",
      recentActivity: "النشاط الأخير",
      
      // Requests
      newRequest: "طلب جديد",
      leaveRequest: "طلب إجازة",
      salaryCertificate: "شهادة راتب",
      salaryAdvance: "سلفة راتب",
      businessTrip: "رحلة عمل",
      equipmentRequest: "طلب معدات",
      attendanceModification: "تعديل حضور",
      resignation: "استقالة",
      pending: "قيد الانتظار",
      approved: "موافق عليه",
      rejected: "مرفوض",
      
      // General
      submit: "إرسال",
      cancel: "إلغاء",
      save: "حفظ",
      edit: "تعديل",
      delete: "حذف",
      view: "عرض",
      search: "بحث",
      filter: "تصفية",
      date: "التاريخ",
      status: "الحالة",
      actions: "الإجراءات",
      close: "إغلاق",
      
      // Common phrases
      goodMorning: "صباح الخير",
      goodAfternoon: "مساء الخير",
      goodEvening: "مساء الخير"
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