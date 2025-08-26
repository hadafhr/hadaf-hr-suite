import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Bot, Sparkles, MessageCircle } from 'lucide-react';

interface ArtificialIntelligenceProps {
  onBack: () => void;
}

const ArtificialIntelligence = ({ onBack }: ArtificialIntelligenceProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <h1 className="text-3xl font-bold text-primary">الذكاء الاصطناعي والأتمتة</h1>
        </div>
        <Button className="gap-2">
          <Brain className="w-4 h-4" />
          نموذج جديد
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="modules">النماذج</TabsTrigger>
          <TabsTrigger value="insights">الرؤى الذكية</TabsTrigger>
          <TabsTrigger value="chat">المساعد الذكي</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>النماذج الذكية النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <p>حلول ذكية لأتمتة العمليات وتحليل البيانات المتقدم</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ArtificialIntelligence;