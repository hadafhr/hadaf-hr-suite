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
import { 
  DollarSign, 
  TrendingUp, 
  Award, 
  MapPin, 
  Users, 
  BarChart3,
  Settings,
  FileText
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
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">التعويضات والمزايا</h1>
            <p className="text-muted-foreground mt-2">
              إدارة شاملة لنظام الرواتب والمكافآت والترقيات
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <FileText className="w-4 h-4 ml-2" />
              تقرير شهري
            </Button>
            <Button>
              <Settings className="w-4 h-4 ml-2" />
              إعدادات النظام
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                  <p className="text-2xl font-bold">{overviewStats.totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">متوسط الراتب</p>
                  <p className="text-2xl font-bold">{overviewStats.averageSalary.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm text-muted-foreground">علاوات معلقة</p>
                  <p className="text-2xl font-bold">{overviewStats.pendingRaises}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-sm text-muted-foreground">ترقيات معلقة</p>
                  <p className="text-2xl font-bold">{overviewStats.pendingPromotions}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الميزانية</p>
                  <p className="text-xl font-bold">{(overviewStats.totalBudget / 1000000).toFixed(1)}م</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm text-muted-foreground">انتدابات نشطة</p>
                  <p className="text-2xl font-bold">{overviewStats.activeAssignments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
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