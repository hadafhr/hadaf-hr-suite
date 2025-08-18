
import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/hooks/useAuth';
import '@/i18n';
import { Header } from "@/components/Header";
import { LandingPage } from "@/pages/LandingPage";
import { Dashboard } from "@/pages/Dashboard";
import BoudHRAssistant from "@/components/BoudHRAssistant";
import { Login } from "@/pages/Login";
import { BusinessLogin } from "@/pages/BusinessLogin";
import { IndividualLogin } from "@/pages/IndividualLogin";
import { Services } from "@/pages/Services";
import { IndividualServices } from "@/pages/ServicePlatforms/IndividualServices";
import { EmployeeManagement } from "@/pages/ServicePlatforms/EmployeeManagement";
import { Recruitment } from "@/pages/ServicePlatforms/Recruitment";
import { PerformanceEvaluation } from "@/pages/ServicePlatforms/PerformanceEvaluation";
import { Training } from "@/pages/ServicePlatforms/Training";
import { Reports } from "@/pages/ServicePlatforms/Reports";
import { BusinessManagement } from "@/pages/ServicePlatforms/BusinessManagement";
import { OrganizationalDevelopment } from "@/pages/ServicePlatforms/OrganizationalDevelopment";
import { AIHub } from "@/pages/AIHub";
import { WageProtection } from "@/pages/ServicePlatforms/WageProtection";
import { CompensationBenefitsPlatform } from "@/pages/ServicePlatforms/CompensationBenefits";
import { PlatformDevelopment } from "@/pages/ServicePlatforms/PlatformDevelopment";
import { NonProfitServices } from "@/pages/ServicePlatforms/NonProfitServices";
import { UserManagement } from "@/pages/UserManagement";
import EmployeeSelfService from "@/pages/ServicePlatforms/EmployeeSelfService";
import { EmployeeDashboard } from "@/pages/EmployeeDashboard";
import { EmployerDashboard } from "@/pages/EmployerDashboard";
import { EmployeeProfile } from "@/pages/Employee/Profile";
import { LeaveRequest } from "@/pages/Employee/LeaveRequest";
import { Payroll } from "@/pages/Employee/Payroll";
import { Attendance } from "@/pages/Employee/Attendance";
import { PayrollManagement } from "@/pages/Employer/PayrollManagement";
import { AttendanceManagement } from "@/pages/Employer/AttendanceManagement";
import { LeaveManagement } from "@/pages/Employer/LeaveManagement";
import SmartHire from "@/pages/SmartHire";
import { BusinessPlatform } from "@/pages/BusinessPlatform";
import LegalPlatform from "@/pages/LegalPlatform";
import { EmployeeManagementPlatform } from "@/pages/EmployeeManagementPlatform";
import NotFound from "./pages/NotFound";
import { Register } from './pages/Register';
import { WageProtectionPage } from './pages/WageProtectionPage';
import ServiceCalculatorPage from './pages/ServiceCalculatorPage';
import { ChatMessagingPage } from './pages/ChatMessagingPage';
import BoudHRLandingPage from './pages/BoudHRLandingPage';
import MainLandingPage from './pages/MainLandingPage';
import Features from './pages/Features';
import Knowledge from './pages/Knowledge';
import Guides from './pages/Guides';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Schedule from './pages/Schedule';
import Integrations from './pages/Integrations';
import SubscriptionPackages from './pages/SubscriptionPackages';
import { HRApp } from './pages/HRApp';
import EmployeeManagementFeature from './pages/FeaturePages/EmployeeManagementFeature';
import SelfServiceFeature from './pages/FeaturePages/SelfServiceFeature';
import SelfServiceLogin from './pages/SelfServiceLogin';
import { Tutorials } from './pages/Tutorials';
import { EarnWithBoad } from './pages/EarnWithBoad';
import { ScheduleMeeting } from './pages/ScheduleMeeting';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import EmployeeManagementSystem from './pages/EmployeeManagementSystem';
import ComprehensiveEmployeeManagement from './pages/ComprehensiveEmployeeManagement';
import DisciplinarySystem from './pages/DisciplinarySystem';
import EmployeeServicesDepartment from './pages/EmployeeServicesDepartment';
import EmployeePortal from './pages/EmployeePortal';
import EmployerPortal from './pages/EmployerPortal';
import EmployeeRequests from './pages/EmployeeRequests';
import ReportsAnalytics from './pages/ReportsAnalytics';
import SystemSettings from './pages/SystemSettings';
import { ESignatureSystem } from './pages/ESignatureSystem';
import MeetingHub from './pages/MeetingHub';
import MeetingSubscription from './pages/MeetingSubscription';
import { AdminConfiguration } from './pages/AdminConfiguration';

// Mobile Pages
import { MobileLogin } from './pages/mobile/MobileLogin';
import { MobileDashboard } from './pages/mobile/MobileDashboard';
import { MobileRequests } from './pages/mobile/MobileRequests';
import { MobileTasks } from './pages/mobile/MobileTasks';
import { MobileChat } from './pages/mobile/MobileChat';
import { MobileNotifications } from './pages/mobile/MobileNotifications';
import { MobileProfile } from './pages/mobile/MobileProfile';

// BOOD HR Main Portals
import { ECSS } from './pages/portals/E-CSS';
import { EIS } from './pages/portals/EIS';
import { NPCS } from './pages/portals/NPCS';

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [currentLanguage, setCurrentLanguage] = React.useState<'ar' | 'en'>('ar');

  // Detect language from URL or localStorage
  React.useEffect(() => {
    const detectLanguage = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      const storedLang = localStorage.getItem('boud-language');
      
      if (urlLang === 'en' || urlLang === 'ar') {
        setCurrentLanguage(urlLang);
        localStorage.setItem('boud-language', urlLang);
      } else if (storedLang === 'en' || storedLang === 'ar') {
        setCurrentLanguage(storedLang);
      } else {
        // Default to Arabic
        setCurrentLanguage('ar');
        localStorage.setItem('boud-language', 'ar');
      }
    };

    detectLanguage();
  }, []);

  const handleLogin = () => {
    // يمكن تطوير هذا لاحقاً مع نظام المصادقة الحقيقي
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<MainLandingPage />} />
            <Route path="/en" element={<MainLandingPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/knowledge" element={<Knowledge />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/old-landing" element={<BoudHRLandingPage />} />
            <Route path="/self-service-login" element={<SelfServiceLogin />} />
            <Route path="/subscription-packages" element={<SubscriptionPackages />} />
            <Route path="/hr/*" element={<HRApp />} />
            <Route path="/old-home" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            <Route path="/business-login" element={<BusinessLogin />} />
            <Route path="/individual-login" element={<IndividualLogin />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              
              {/* Employee Routes */}
              <Route path="/employee/profile" element={<EmployeeProfile />} />
              <Route path="/employee/leave-request" element={<LeaveRequest />} />
              <Route path="/employee/payroll" element={<Payroll />} />
              <Route path="/employee/attendance" element={<Attendance />} />
              <Route path="/employee/performance" element={<PerformanceEvaluation />} />
              <Route path="/employee/training" element={<Training />} />
              <Route path="/employee/certificates" element={<PerformanceEvaluation />} />
              <Route path="/employee/communication" element={<IndividualServices />} />
              
              {/* Employer Routes */}
              <Route path="/employer/payroll" element={<PayrollManagement />} />
              <Route path="/employer/attendance" element={<AttendanceManagement />} />
              <Route path="/employer/leave-management" element={<LeaveManagement />} />
              
              {/* Service Routes */}
            <Route path="/services" element={<Services />} />
            <Route path="/tutorials" element={<Tutorials />} />
            <Route path="/earn-with-boad" element={<EarnWithBoad />} />
          <Route path="/schedule-meeting" element={<ScheduleMeeting />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/services/individuals" element={<IndividualServices />} />
              <Route path="/services/employee-management" element={<EmployeeManagement />} />
              <Route path="/services/recruitment" element={<Recruitment />} />
              <Route path="/services/performance" element={<PerformanceEvaluation />} />
              <Route path="/services/employee-self-service" element={<EmployeeSelfService />} />
              <Route path="/services/training" element={<Training />} />
              <Route path="/services/business-management" element={<BusinessManagement />} />
              <Route path="/services/organizational-development" element={<OrganizationalDevelopment />} />
              <Route path="/services/compensation-benefits" element={<CompensationBenefitsPlatform />} />
              <Route path="/services/wage-protection" element={<WageProtection />} />
              <Route path="/services/platform-development" element={<PlatformDevelopment />} />
              <Route path="/services/nonprofit-services" element={<NonProfitServices />} />
              
              {/* Service Platform Routes */}
              <Route path="/service-platforms/employee-self-service" element={<EmployeeSelfService />} />
              <Route path="/service-platforms/individual-services" element={<IndividualServices />} />
              <Route path="/service-platforms/employee-management" element={<EmployeeManagement />} />
              <Route path="/service-platforms/recruitment" element={<Recruitment />} />
              <Route path="/service-platforms/performance-evaluation" element={<PerformanceEvaluation />} />
              <Route path="/service-platforms/training" element={<Training />} />
              <Route path="/service-platforms/business-management" element={<BusinessManagement />} />
              <Route path="/service-platforms/organizational-development" element={<OrganizationalDevelopment />} />
              <Route path="/service-platforms/compensation-benefits" element={<CompensationBenefitsPlatform />} />
              <Route path="/service-platforms/wage-protection" element={<WageProtection />} />
              <Route path="/service-platforms/platform-development" element={<PlatformDevelopment />} />
              <Route path="/service-platforms/nonprofit-services" element={<NonProfitServices />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/ai-hub" element={<AIHub />} />
              <Route path="/smart-hire" element={<SmartHire />} />
              <Route path="/business-platform" element={<BusinessPlatform />} />
              <Route path="/legal-platform" element={<LegalPlatform />} />
              <Route path="/employee-management-platform" element={<EmployeeManagementPlatform />} />
              <Route path="/user-management" element={<UserManagement />} />
              
              {/* New Platform Routes */}
              <Route path="/wage-protection-platform" element={<WageProtectionPage />} />
              <Route path="/wage-protection" element={<WageProtectionPage />} />
              <Route path="/service-calculator" element={<ServiceCalculatorPage />} />
              <Route path="/chat-messaging" element={<ChatMessagingPage />} />
              
              {/* Feature Pages Routes */}
              <Route path="/employee-management" element={<EmployeeManagementFeature />} />
              <Route path="/employee-self-service" element={<SelfServiceFeature />} />
              <Route path="/compensation-benefits" element={<CompensationBenefitsPlatform />} />
              <Route path="/performance-evaluation" element={<PerformanceEvaluation />} />
              <Route path="/training" element={<Training />} />
              <Route path="/platform-development" element={<PlatformDevelopment />} />
              <Route path="/business-management" element={<BusinessManagement />} />
              <Route path="/non-profit-services" element={<NonProfitServices />} />
              
               {/* Employee Management System Routes */}
          <Route path="/employee-management-system" element={<EmployeeManagementSystem />} />
              <Route path="/employee-services-department" element={<EmployeeServicesDepartment />} />
          <Route path="/comprehensive-employee-management" element={<ComprehensiveEmployeeManagement />} />
          <Route path="/disciplinary-system" element={<DisciplinarySystem />} />
              <Route path="/employee-requests" element={<EmployeeRequests />} />
              <Route path="/reports-analytics" element={<ReportsAnalytics />} />
              <Route path="/system-settings" element={<SystemSettings />} />
               <Route path="/employee-portal" element={<EmployeePortal />} />
               <Route path="/employer-portal" element={<EmployerPortal />} />
               
                {/* E-Signature System */}
                <Route path="/e-signature" element={<ESignatureSystem />} />
                <Route path="/electronic-signature" element={<ESignatureSystem />} />
                
                {/* Meeting Hub System */}
                <Route path="/meeting-hub" element={<MeetingHub />} />
                <Route path="/meeting-hub/subscription" element={<MeetingSubscription />} />
                
                {/* Admin Configuration */}
                <Route path="/admin-configuration" element={<AdminConfiguration />} />
                
                {/* Mobile App Routes */}
                <Route path="/mobile-login" element={<MobileLogin />} />
                <Route path="/mobile-dashboard" element={<MobileDashboard />} />
                <Route path="/mobile-requests" element={<MobileRequests />} />
                <Route path="/mobile-tasks" element={<MobileTasks />} />
                <Route path="/mobile-chat" element={<MobileChat />} />
                <Route path="/mobile-notifications" element={<MobileNotifications />} />
                <Route path="/mobile-profile" element={<MobileProfile />} />

                {/* BOOD HR Main Portal Routes */}
                <Route path="/e-css" element={<ECSS />} />
                <Route path="/eis" element={<EIS />} />
                <Route path="/npcs" element={<NPCS />} />
                <Route path="/employee-portal" element={<ECSS />} />
                <Route path="/employer-portal" element={<EIS />} />
                <Route path="/nonprofit-portal" element={<NPCS />} />
               
               <Route path="*" element={<NotFound />} />
            </Routes>
            
            {/* Global BOUD HR Assistant */}
            <BoudHRAssistant language={currentLanguage} />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
