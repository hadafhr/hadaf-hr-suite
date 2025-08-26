import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Target, TrendingUp, Users, Star, Award, 
  BarChart3, Calendar, CheckCircle, Brain
} from 'lucide-react';

interface SmartPerformanceManagementProps {
  onBack: () => void;
}

const SmartPerformanceManagement = ({ onBack }: SmartPerformanceManagementProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <h1 className="text-3xl font-bold text-primary">نظام إدارة الأداء الذكي</h1>
        </div>
        <Button className="gap-2">
          <Target className="w-4 h-4" />
          تقييم جديد
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="evaluations">التقييمات</TabsTrigger>
          <TabsTrigger value="goals">الأهداف</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>مؤشرات الأداء الذكية</CardTitle>
            </CardHeader>
            <CardContent>
              <p>نظام متقدم لإدارة وتحليل الأداء باستخدام الذكاء الاصطناعي</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SmartPerformanceManagement;