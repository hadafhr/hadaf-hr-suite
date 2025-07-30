import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HRLogin } from './HR/HRLogin';
import { EmployeeDashboard } from './HR/EmployeeDashboard';
import { AdminDashboard } from './HR/AdminDashboard';
import { AttendanceSystem } from './HR/AttendanceSystem';
import { LeaveManagement } from './HR/LeaveManagement';
import { RequestsManagement } from './HR/RequestsManagement';
import { EmployeeProfile } from './HR/EmployeeProfile';
import { AdminEmployeeManagement } from './HR/AdminEmployeeManagement';
import { PlatformModules } from './HR/PlatformModules';

export const HRApp: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Routes>
        <Route path="/hr-login" element={<HRLogin />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/attendance" element={<AttendanceSystem />} />
        <Route path="/leave-management" element={<LeaveManagement />} />
        <Route path="/requests" element={<RequestsManagement />} />
        <Route path="/employee-profile" element={<EmployeeProfile />} />
        <Route path="/admin/employees" element={<AdminEmployeeManagement />} />
        <Route path="/admin/platforms" element={<PlatformModules />} />
      </Routes>
    </div>
  );
};