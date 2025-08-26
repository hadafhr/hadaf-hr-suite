import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scale, FileText, AlertTriangle } from 'lucide-react';

interface LegalAffairsProps {
  onBack: () => void;
}

const LegalAffairs = ({ onBack }: LegalAffairsProps) => {
  const [activeTab, setActiveTab] = useState('cases');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <h1 className="text-3xl font-bold text-primary">الشؤون القانونية والامتثال</h1>
        </div>
        <Button className="gap-2">
          <Scale className="w-4 h-4" />
          قضية جديدة
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cases">القضايا القانونية</TabsTrigger>
          <TabsTrigger value="contracts">العقود</TabsTrigger>
          <TabsTrigger value="compliance">الامتثال</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
        </TabsList>

        <TabsContent value="cases">
          <Card>
            <CardHeader>
              <CardTitle>القضايا النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <p>إدارة شاملة للقضايا القانونية والامتثال التنظيمي</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LegalAffairs;