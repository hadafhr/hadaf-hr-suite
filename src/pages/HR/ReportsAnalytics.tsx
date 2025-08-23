import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { ReportGenerator } from '@/components/reporting/ReportGenerator';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  FileText, 
  Download,
  Calendar,
  Users,
  CheckCircle
} from 'lucide-react';

export const ReportsAnalytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    totalReports: 156,
    scheduledReports: 25,
    automatedReports: 42,
    customReports: 89,
    dashboards: 8,
    dataPoints: 15420
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="نظام التقارير والتحليلات الشامل"
          description="إدارة متكاملة للتقارير والتحليلات مع ربط بجميع أنظمة الموارد البشرية والبيانات"
          icon={<BarChart3 className="h-12 w-12 text-white" />}
          showBackButton={false}
        />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إجمالي التقارير</p>
                  <p className="text-2xl font-bold">{overviewStats.totalReports}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">تقارير مجدولة</p>
                  <p className="text-2xl font-bold">{overviewStats.scheduledReports}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">تقارير تلقائية</p>
                  <p className="text-2xl font-bold">{overviewStats.automatedReports}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">تقارير مخصصة</p>
                  <p className="text-2xl font-bold">{overviewStats.customReports}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">لوحات التحكم</p>
                  <p className="text-2xl font-bold">{overviewStats.dashboards}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">نقاط البيانات</p>
                  <p className="text-xl font-bold">{(overviewStats.dataPoints / 1000).toFixed(0)}ك</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <ReportGenerator />
        </div>
      </div>
    </div>
  );
};