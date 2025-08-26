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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <h1 className="text-3xl font-bold text-primary">إدارة القوى العاملة المتقدمة</h1>
        </div>
        <Button className="gap-2">
          <Users className="w-4 h-4" />
          وردية جديدة
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="planning">تخطيط الورديات</TabsTrigger>
          <TabsTrigger value="schedules">الجدولة</TabsTrigger>
          <TabsTrigger value="locations">المواقع</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="planning">
          <Card>
            <CardHeader>
              <CardTitle>الورديات النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <p>تخطيط وتنظيم وإدارة شاملة للموارد البشرية والورديات</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkforceManagement;