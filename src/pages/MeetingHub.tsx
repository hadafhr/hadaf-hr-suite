import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Video, BarChart3, FileText, CheckSquare, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { DashboardTab } from '@/components/meeting-hub/DashboardTab';
import { MeetingsTab } from '@/components/meeting-hub/MeetingsTab';
import { DocumentsTab } from '@/components/meeting-hub/DocumentsTab';
import { TasksTab } from '@/components/meeting-hub/TasksTab';
import { AnalyticsTab } from '@/components/meeting-hub/AnalyticsTab';
interface MeetingHubProps {
  onBack?: () => void;
}
export default function MeetingHub({
  onBack
}: MeetingHubProps = {}) {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const handleJoinMeeting = (meetingId: string) => {
    toast({
      title: "انضمام للاجتماع",
      description: `تم الانضمام لاجتماع ${meetingId} بنجاح`
    });
  };
  const handleStartNewMeeting = () => {
    toast({
      title: "بدء اجتماع جديد",
      description: "تم إنشاء اجتماع جديد بنجاح"
    });
  };
  return <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">قسم الإجتماعات</h1>
          <p className="text-muted-foreground">منصة متكاملة لإدارة اجتماعات الشركة والتعاون الفعال المتقدم</p>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="meetings" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              الاجتماعات
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              المستندات
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <CheckSquare className="h-4 w-4" />
              المهام
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              التقارير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <DashboardTab onJoinMeeting={handleJoinMeeting} onStartNewMeeting={handleStartNewMeeting} />
          </TabsContent>

          <TabsContent value="meetings">
            <MeetingsTab onJoinMeeting={handleJoinMeeting} />
          </TabsContent>

          <TabsContent value="documents">
            <DocumentsTab />
          </TabsContent>

          <TabsContent value="tasks">
            <TasksTab />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>;
}