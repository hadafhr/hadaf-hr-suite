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

export default function MeetingHub() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleJoinMeeting = (meetingId: string) => {
    toast({
      title: "انضمام للاجتماع",
      description: `تم الانضمام لاجتماع ${meetingId} بنجاح`,
    });
  };

  const handleStartNewMeeting = () => {
    toast({
      title: "بدء اجتماع جديد",
      description: "تم إنشاء اجتماع جديد بنجاح",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 p-6 bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/20">
          <div className="flex items-center gap-6">
            <Button variant="outline" size="sm" onClick={() => navigate('/')} className="border-gray-300 hover:bg-primary/5">
              <ArrowLeft className="h-4 w-4 ml-2" />
              رجوع
            </Button>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-3xl flex items-center justify-center shadow-lg">
                <Video className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">نظام الاجتماعات الذكي المتطور</h1>
                <p className="text-muted-foreground text-lg">منصة متكاملة لإدارة اجتماعات الشركة والتعاون الفعال المتقدم</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-gradient-to-r from-primary to-primary/80" onClick={handleStartNewMeeting}>
              <Video className="h-4 w-4 ml-2" />
              بدء اجتماع جديد
            </Button>
          </div>
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
            <DashboardTab 
              onJoinMeeting={handleJoinMeeting} 
              onStartNewMeeting={handleStartNewMeeting}
            />
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
    </div>
  );
}