import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Clock, Calendar, MapPin, Target } from 'lucide-react';

interface WorkforceManagementProps {
  onBack: () => void;
}

const WorkforceManagement = ({ onBack }: WorkforceManagementProps) => {
  const [activeTab, setActiveTab] = useState('planning');

  return (
    <div className="workforce-container p-6 space-y-6 min-h-screen">
      {/* Header Section with RTL Support */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4 rtl:flex-row-reverse">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="workforce-button text-white hover:bg-gray-900 p-2 rounded-md"
          >
            <span className="text-xl">←</span>
          </Button>
          <h1 className="text-4xl font-bold text-white">إدارة القوى العاملة المتقدمة</h1>
        </div>
        <Button className="workforce-button-primary gap-2 btn-3d">
          <Users className="w-5 h-5" />
          وردية جديدة
        </Button>
      </div>

      {/* Enhanced Tabs with 3D Effects */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-black border border-gray-800 p-1 rounded-lg">
          <TabsTrigger 
            value="planning" 
            className="workforce-button data-[state=active]:bg-white data-[state=active]:text-black text-white border-none"
          >
            تخطيط الورديات
          </TabsTrigger>
          <TabsTrigger 
            value="schedules"
            className="workforce-button data-[state=active]:bg-white data-[state=active]:text-black text-white border-none"
          >
            الجدولة
          </TabsTrigger>
          <TabsTrigger 
            value="locations"
            className="workforce-button data-[state=active]:bg-white data-[state=active]:text-black text-white border-none"
          >
            المواقع
          </TabsTrigger>
          <TabsTrigger 
            value="analytics"
            className="workforce-button data-[state=active]:bg-white data-[state=active]:text-black text-white border-none"
          >
            التحليلات
          </TabsTrigger>
        </TabsList>

        {/* Enhanced Tab Content */}
        <TabsContent value="planning" className="space-y-6">
          <div className="workforce-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Calendar className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">الورديات النشطة</h2>
            </div>
            <p className="text-gray-300 mb-6">تخطيط وتنظيم وإدارة شاملة للموارد البشرية والورديات</p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="workforce-card p-4 text-center">
                <Users className="w-8 h-8 text-white mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white">العاملون النشطون</h3>
                <p className="text-2xl font-bold text-white">45</p>
              </div>
              <div className="workforce-card p-4 text-center">
                <Clock className="w-8 h-8 text-white mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white">الورديات اليوم</h3>
                <p className="text-2xl font-bold text-white">12</p>
              </div>
              <div className="workforce-card p-4 text-center">
                <Target className="w-8 h-8 text-white mx-auto mb-2" />
                <h3 className="text-lg font-semibold text-white">معدل الأداء</h3>
                <p className="text-2xl font-bold text-white">94%</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 rtl:flex-row-reverse">
              <Button className="workforce-button-primary btn-3d">
                إنشاء وردية جديدة
              </Button>
              <Button className="workforce-button btn-3d">
                عرض التقارير
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedules" className="space-y-6">
          <div className="workforce-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">جدولة الورديات</h2>
            </div>
            <p className="text-gray-300 mb-6">إدارة الجداول الزمنية وتوزيع المهام</p>
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <div className="workforce-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">إدارة المواقع</h2>
            </div>
            <p className="text-gray-300 mb-6">تتبع المواقع والمناطق الجغرافية</p>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="workforce-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-6 h-6 text-white" />
              <h2 className="text-2xl font-bold text-white">تحليلات الأداء</h2>
            </div>
            <p className="text-gray-300 mb-6">تقارير شاملة وإحصائيات متقدمة</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkforceManagement;