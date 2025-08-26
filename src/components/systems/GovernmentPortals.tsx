import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Globe, Link, Shield, CheckCircle, AlertTriangle, 
  RefreshCw, Settings, Database, Wifi
} from 'lucide-react';

interface GovernmentPortalsProps {
  onBack: () => void;
}

const GovernmentPortals = ({ onBack }: GovernmentPortalsProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <h1 className="text-3xl font-bold text-primary">البوابات الحكومية والتكامل الخارجي</h1>
        </div>
        <Button className="gap-2">
          <Globe className="w-4 h-4" />
          ربط جديد
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="portals">البوابات</TabsTrigger>
          <TabsTrigger value="sync">المزامنة</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>التكامل مع الأنظمة الحكومية</CardTitle>
            </CardHeader>
            <CardContent>
              <p>ربط تلقائي مع قيوة ومداد والجوازات وأنظمة أخرى</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GovernmentPortals;