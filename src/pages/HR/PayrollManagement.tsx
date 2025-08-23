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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="نظام إدارة كشوف المرتبات الشامل"
          description="إدارة متكاملة لكشوف المرتبات والرواتب مع ربط بأنظمة الحضور والإجازات والمزايا"
          icon={<DollarSign className="h-12 w-12 text-white" />}
          showBackButton={false}
        />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إجمالي الموظفين</p>
                  <p className="text-2xl font-bold">{overviewStats.totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إجمالي المرتبات</p>
                  <p className="text-xl font-bold">{(overviewStats.totalPayroll / 1000000).toFixed(1)}م</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">مرتبات معالجة</p>
                  <p className="text-2xl font-bold">{overviewStats.processedPayrolls}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">مرتبات معلقة</p>
                  <p className="text-2xl font-bold">{overviewStats.pendingPayrolls}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">متوسط الراتب</p>
                  <p className="text-2xl font-bold">{overviewStats.averageSalary.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إجمالي الخصومات</p>
                  <p className="text-xl font-bold">{(overviewStats.totalDeductions / 1000).toFixed(0)}ك</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <ComprehensivePayrollSystem />
        </div>
      </div>
    </div>
  );
};