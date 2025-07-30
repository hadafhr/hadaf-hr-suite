
import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { LandingPage } from "@/pages/LandingPage";
import { Dashboard } from "@/pages/Dashboard";
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
import { LegalPlatform } from "@/pages/LegalPlatform";
import { EmployeeManagementPlatform } from "@/pages/EmployeeManagementPlatform";
import NotFound from "./pages/NotFound";
import { WageProtectionPage } from './pages/WageProtectionPage';
import ServiceCalculatorPage from './pages/ServiceCalculatorPage';
import { ChatMessagingPage } from './pages/ChatMessagingPage';
import BoudHRLandingPage from './pages/BoudHRLandingPage';
import { HRApp } from './pages/HRApp';
import EmployeeManagementFeature from './pages/FeaturePages/EmployeeManagementFeature';
import SelfServiceFeature from './pages/FeaturePages/SelfServiceFeature';

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

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
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<BoudHRLandingPage />} />
            <Route path="/hr/*" element={<HRApp />} />
            <Route path="/old-home" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
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
              <Route path="/services/individuals" element={<IndividualServices />} />
              <Route path="/services/employee-management" element={<EmployeeManagement />} />
              <Route path="/services/recruitment" element={<Recruitment />} />
              <Route path="/services/performance" element={<PerformanceEvaluation />} />
              <Route path="/services/employee-self-service" element={<EmployeeSelfService />} />
              <Route path="/services/training" element={<Training />} />
              <Route path="/services/business-management" element={<BusinessManagement />} />
              <Route path="/services/organizational-development" element={<OrganizationalDevelopment />} />
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
              <Route path="/performance-evaluation" element={<PerformanceEvaluation />} />
              <Route path="/training" element={<Training />} />
              <Route path="/platform-development" element={<PlatformDevelopment />} />
              <Route path="/business-management" element={<BusinessManagement />} />
              <Route path="/non-profit-services" element={<NonProfitServices />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
