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
  Gift
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
    <div className="min-h-screen p-6" style={{ background: '#000000', color: '#ffffff' }}>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>نظام التعويضات والمزايا الشامل</h1>
          <p style={{ color: '#e8e4e0' }}>إدارة متكاملة للتعويضات والمزايا مع ربط بأنظمة الأداء والرواتب والحوافز</p>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="salary-scale">سلم الرواتب</TabsTrigger>
            <TabsTrigger value="raises">العلاوات السنوية</TabsTrigger>
            <TabsTrigger value="promotions">الترقيات</TabsTrigger>
            <TabsTrigger value="rewards">المكافآت</TabsTrigger>
            <TabsTrigger value="assignments">بدل الانتداب</TabsTrigger>
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
        </Tabs>
      </div>
    </div>
  );
};