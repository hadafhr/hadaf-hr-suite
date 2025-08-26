import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BookOpen, Play, Award, Users, Clock, Target, 
  TrendingUp, Calendar, CheckCircle, Star
} from 'lucide-react';

interface AdvancedTrainingSystemProps {
  onBack: () => void;
}

const AdvancedTrainingSystem = ({ onBack }: AdvancedTrainingSystemProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <h1 className="text-3xl font-bold text-primary">نظام التدريب والتطوير المتقدم</h1>
        </div>
        <Button className="gap-2">
          <BookOpen className="w-4 h-4" />
          دورة جديدة
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="courses">الدورات</TabsTrigger>
          <TabsTrigger value="paths">المسارات</TabsTrigger>
          <TabsTrigger value="certificates">الشهادات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>منصة التدريب المتقدمة</CardTitle>
            </CardHeader>
            <CardContent>
              <p>نظام شامل للتعلم والتطوير المهني المستمر</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdvancedTrainingSystem;