import React, { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import { LandingPage } from "@/pages/LandingPage";
import { Dashboard } from "@/pages/Dashboard";
import { Login } from "@/pages/Login";
import { Services } from "@/pages/Services";
import { IndividualServices } from "@/pages/ServicePlatforms/IndividualServices";
import { EmployeeManagement } from "@/pages/ServicePlatforms/EmployeeManagement";
import { Recruitment } from "@/pages/ServicePlatforms/Recruitment";
import { PerformanceEvaluation } from "@/pages/ServicePlatforms/PerformanceEvaluation";
import { Training } from "@/pages/ServicePlatforms/Training";
import { Reports } from "@/pages/ServicePlatforms/Reports";
import { BusinessManagement } from "@/pages/ServicePlatforms/BusinessManagement";
import { OrganizationalDevelopment } from "@/pages/ServicePlatforms/OrganizationalDevelopment";
import { WageProtection } from "@/pages/ServicePlatforms/WageProtection";
import { PlatformDevelopment } from "@/pages/ServicePlatforms/PlatformDevelopment";
import { NonProfitServices } from "@/pages/ServicePlatforms/NonProfitServices";
import { EmployeeDashboard } from "@/pages/EmployeeDashboard";
import { EmployerDashboard } from "@/pages/EmployerDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          <div className="min-h-screen">
            <Header 
              isAuthenticated={isAuthenticated}
              onLogin={() => window.location.href = '/login'}
              onLogout={handleLogout}
            />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
              <Route path="/employer-dashboard" element={<EmployerDashboard />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/individuals" element={<IndividualServices />} />
              <Route path="/services/employee-management" element={<EmployeeManagement />} />
              <Route path="/services/recruitment" element={<Recruitment />} />
              <Route path="/services/performance" element={<PerformanceEvaluation />} />
              <Route path="/services/training" element={<Training />} />
              <Route path="/services/business-management" element={<BusinessManagement />} />
              <Route path="/services/organizational-development" element={<OrganizationalDevelopment />} />
              <Route path="/services/wage-protection" element={<WageProtection />} />
              <Route path="/services/platform-development" element={<PlatformDevelopment />} />
              <Route path="/services/nonprofit-services" element={<NonProfitServices />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
