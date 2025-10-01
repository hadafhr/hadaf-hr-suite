import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { ComprehensivePayrollSystem } from '@/components/payroll/ComprehensivePayrollSystem';
import { 
  DollarSign, 
  Users, 
  CreditCard, 
  TrendingUp, 
  BarChart3,
  Calculator,
  FileText,
  CheckCircle
} from 'lucide-react';

export const PayrollManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    totalEmployees: 248,
    totalPayroll: 2500000,
    processedPayrolls: 230,
    pendingPayrolls: 18,
    averageSalary: 10080,
    totalDeductions: 125000
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">نظام إدارة كشوف المرتبات الشامل</h1>
          <p className="text-gray-600">إدارة متكاملة لكشوف المرتبات والرواتب مع ربط بأنظمة الحضور والإجازات والمزايا</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-lg p-6">
          <ComprehensivePayrollSystem />
        </div>
      </div>
    </div>
  );
};