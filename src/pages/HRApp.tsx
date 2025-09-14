import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HRLogin } from './HR/HRLogin';
import { EmployeeDashboard } from './HR/EmployeeDashboard';
import { AdminDashboard } from './HR/AdminDashboard';
import { AttendanceSystem } from './HR/AttendanceSystem';
import { LeaveManagement } from './HR/LeaveManagement';
import { PayrollManagement } from './HR/PayrollManagement';
import { PerformanceEvaluationSystem } from './HR/PerformanceEvaluation';
import { EmployeeManagement } from './HR/EmployeeManagement';
import { TrainingDevelopment } from './HR/TrainingDevelopment';
import { RecruitmentManagement } from './HR/RecruitmentManagement';
import { ReportsAnalytics } from './HR/ReportsAnalytics';
import { DisciplinarySystem } from './HR/DisciplinarySystem';
import { RequestsManagement } from './HR/RequestsManagement';
import { EmployeeProfile } from './HR/EmployeeProfile';
import { AdminEmployeeManagement } from './HR/AdminEmployeeManagement';
import { PlatformModules } from './HR/PlatformModules';
import { CompensationBenefits } from './HR/CompensationBenefits';

export const HRApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/hr-login" element={<HRLogin />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/attendance" element={<AttendanceSystem />} />
        <Route path="/leave-management" element={<LeaveManagement />} />
        <Route path="/payroll" element={<PayrollManagement />} />
        <Route path="/performance" element={<PerformanceEvaluationSystem />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
        <Route path="/training" element={<TrainingDevelopment />} />
        <Route path="/recruitment" element={<RecruitmentManagement />} />
        <Route path="/reports" element={<ReportsAnalytics />} />
        <Route path="/disciplinary" element={<DisciplinarySystem />} />
        <Route path="/compensation" element={<CompensationBenefits />} />
        <Route path="/requests" element={<RequestsManagement />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/admin/employees" element={<AdminEmployeeManagement />} />
        <Route path="/admin/platforms" element={<PlatformModules />} />
      </Routes>
    </div>
  );
};