import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Trophy, Target, BookOpen } from 'lucide-react';

interface TalentManagementDepartmentProps {
  onBack: () => void;
}

const TalentManagementDepartment = ({ onBack }: TalentManagementDepartmentProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <h1 className="text-3xl font-bold text-primary">إدارة المواهب والتطوير الوظيفي</h1>
        </div>
        <Button className="gap-2">
          <Star className="w-4 h-4" />
          اكتشاف مواهب
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="talents">بنك المواهب</TabsTrigger>
          <TabsTrigger value="programs">برامج التطوير</TabsTrigger>
          <TabsTrigger value="careers">المسارات الوظيفية</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>المواهب المكتشفة</CardTitle>
            </CardHeader>
            <CardContent>
              <p>اكتشاف وتطوير والاحتفاظ بأفضل المواهب في المؤسسة</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TalentManagementDepartment;