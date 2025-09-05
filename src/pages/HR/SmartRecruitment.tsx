import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { SmartHireSystem } from '@/components/recruitment/SmartHireSystem';
import { 
  Search, 
  Users, 
  UserPlus, 
  TrendingUp, 
  BarChart3,
  Target,
  FileText,
  CheckCircle,
  Brain,
  Bot
} from 'lucide-react';

export const SmartRecruitment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    activeJobs: 25,
    totalApplications: 185,
    shortlisted: 45,
    interviews: 28,
    hired: 12,
    rejections: 98,
    aiProcessed: 156,
    panelReviews: 42
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="منصة التوظيف الذكي SmartHire"
          description="أتمتة كامل دورة التوظيف مع الذكاء الاصطناعي، اللجنة، والتقارير التنفيذية"
          icon={<div className="flex items-center gap-2"><Bot className="h-8 w-8 text-white" /><Search className="h-8 w-8 text-white" /></div>}
          showBackButton={false}
        />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">وظائف نشطة</p>
                  <p className="text-2xl font-bold">{overviewStats.activeJobs}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">طلبات التقديم</p>
                  <p className="text-2xl font-bold">{overviewStats.totalApplications}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">قائمة مختصرة</p>
                  <p className="text-2xl font-bold">{overviewStats.shortlisted}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">مقابلات</p>
                  <p className="text-2xl font-bold">{overviewStats.interviews}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">تم التوظيف</p>
                  <p className="text-2xl font-bold">{overviewStats.hired}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">مرفوض</p>
                  <p className="text-2xl font-bold">{overviewStats.rejections}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">معالج بالذكاء</p>
                  <p className="text-2xl font-bold">{overviewStats.aiProcessed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">مراجعة اللجنة</p>
                  <p className="text-2xl font-bold">{overviewStats.panelReviews}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <SmartHireSystem />
        </div>
      </div>
    </div>
  );
};