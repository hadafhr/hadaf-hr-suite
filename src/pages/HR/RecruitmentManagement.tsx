import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import SmartHire from '@/pages/SmartHire';
import { 
  Users, 
  UserPlus, 
  Search, 
  TrendingUp, 
  BarChart3,
  Target,
  FileText,
  CheckCircle
} from 'lucide-react';

export const RecruitmentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    activeJobs: 25,
    totalApplications: 185,
    shortlisted: 45,
    interviews: 28,
    hired: 12,
    rejections: 98
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="نظام التوظيف الذكي الشامل"
          description="إدارة متكاملة للتوظيف والاستقطاب مع ربط بأنظمة تقييم المرشحين والمقابلات"
          icon={<Search className="h-12 w-12 text-white" />}
          showBackButton={false}
        />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
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
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <SmartHire />
        </div>
      </div>
    </div>
  );
};