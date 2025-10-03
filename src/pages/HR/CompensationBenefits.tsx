import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SalaryScaleManager } from '@/components/compensation/SalaryScaleManager';
import { AnnualRaisesManager } from '@/components/compensation/AnnualRaisesManager';
import { PromotionManager } from '@/components/compensation/PromotionManager';
import { RewardsManager } from '@/components/compensation/RewardsManager';
import { AssignmentAllowances } from '@/components/compensation/AssignmentAllowances';
import { CompensationDashboard } from '@/components/compensation/CompensationDashboard';
import { WorkforcePlanningBudget } from '@/components/compensation/WorkforcePlanningBudget';
import { TravelExpensesManagement } from '@/components/compensation/TravelExpensesManagement';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { 
  DollarSign, 
  TrendingUp, 
  Award, 
  MapPin, 
  Users, 
  BarChart3,
  Settings,
  FileText,
  Gift,
  Plane,
  Target
} from 'lucide-react';

export const CompensationBenefits: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    totalEmployees: 248,
    averageSalary: 8500,
    pendingRaises: 15,
    pendingPromotions: 8,
    totalBudget: 2108000,
    activeAssignments: 5
  };

  return (
    <div className="min-h-screen p-6 bg-background text-foreground" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">نظام التعويضات والمزايا الشامل</h1>
          <p className="text-muted-foreground">إدارة متكاملة للتعويضات والمزايا مع ربط بأنظمة الأداء والرواتب والحوافز</p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 gap-1">
            <TabsTrigger value="dashboard" className="text-xs lg:text-sm">
              <BarChart3 className="w-4 h-4 ml-1" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="salary-scale" className="text-xs lg:text-sm">
              <DollarSign className="w-4 h-4 ml-1" />
              سلم الرواتب
            </TabsTrigger>
            <TabsTrigger value="raises" className="text-xs lg:text-sm">
              <TrendingUp className="w-4 h-4 ml-1" />
              العلاوات السنوية
            </TabsTrigger>
            <TabsTrigger value="promotions" className="text-xs lg:text-sm">
              <Award className="w-4 h-4 ml-1" />
              الترقيات
            </TabsTrigger>
            <TabsTrigger value="rewards" className="text-xs lg:text-sm">
              <Gift className="w-4 h-4 ml-1" />
              المكافآت
            </TabsTrigger>
            <TabsTrigger value="assignments" className="text-xs lg:text-sm">
              <MapPin className="w-4 h-4 ml-1" />
              بدل الانتداب
            </TabsTrigger>
            <TabsTrigger value="workforce-planning" className="text-xs lg:text-sm">
              <Target className="w-4 h-4 ml-1" />
              تخطيط القوى العاملة
            </TabsTrigger>
            <TabsTrigger value="travel-expenses" className="text-xs lg:text-sm">
              <Plane className="w-4 h-4 ml-1" />
              السفر والمصروفات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            <CompensationDashboard />
          </TabsContent>

          <TabsContent value="salary-scale" className="mt-6">
            <SalaryScaleManager />
          </TabsContent>

          <TabsContent value="raises" className="mt-6">
            <AnnualRaisesManager />
          </TabsContent>

          <TabsContent value="promotions" className="mt-6">
            <PromotionManager />
          </TabsContent>

          <TabsContent value="rewards" className="mt-6">
            <RewardsManager />
          </TabsContent>

          <TabsContent value="assignments" className="mt-6">
            <AssignmentAllowances />
          </TabsContent>

          <TabsContent value="workforce-planning" className="mt-6">
            <WorkforcePlanningBudget />
          </TabsContent>

          <TabsContent value="travel-expenses" className="mt-6">
            <TravelExpensesManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};