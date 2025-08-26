import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Target, BookOpen } from 'lucide-react';

interface OrganizationalDevelopmentProps {
  onBack: () => void;
}

const OrganizationalDevelopment = ({ onBack }: OrganizationalDevelopmentProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <h1 className="text-3xl font-bold text-primary">التطوير التنظيمي والتغيير</h1>
        </div>
        <Button className="gap-2">
          <Target className="w-4 h-4" />
          برنامج تطوير
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="programs">البرامج</TabsTrigger>
          <TabsTrigger value="change">إدارة التغيير</TabsTrigger>
          <TabsTrigger value="culture">الثقافة التنظيمية</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>مؤشرات التطوير التنظيمي</CardTitle>
            </CardHeader>
            <CardContent>
              <p>إدارة شاملة لبرامج التطوير والتحول التنظيمي</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OrganizationalDevelopment;