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
              <Route path="/services" element={<Services />} />
              <Route path="/services/individuals" element={<IndividualServices />} />
              <Route path="/services/employee-management" element={<EmployeeManagement />} />
              <Route path="/services/recruitment" element={<Recruitment />} />
              <Route path="/services/performance" element={<PerformanceEvaluation />} />
              <Route path="/services/training" element={<Training />} />
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
