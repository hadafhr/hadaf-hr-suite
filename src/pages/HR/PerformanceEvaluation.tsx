import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { SmartEvaluations } from '@/components/evaluation/SmartEvaluations';
import { 
  Target, 
  Users, 
  Award, 
  TrendingUp, 
  BarChart3,
  Star,
  FileText,
  CheckCircle
} from 'lucide-react';

export const PerformanceEvaluationSystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    totalEvaluations: 145,
    completedEvaluations: 112,
    pendingEvaluations: 33,
    averageScore: 4.2,
    topPerformers: 28,
    improvementNeeded: 15
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="نظام تقييم الأداء الذكي الشامل"
          description="إدارة متكاملة لتقييم الأداء والكفاءات مع ربط بأنظمة التطوير والمكافآت والترقيات"
          icon={<Target className="h-12 w-12 text-white" />}
          showBackButton={false}
        />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إجمالي التقييمات</p>
                  <p className="text-2xl font-bold">{overviewStats.totalEvaluations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">تقييمات مكتملة</p>
                  <p className="text-2xl font-bold">{overviewStats.completedEvaluations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">تقييمات معلقة</p>
                  <p className="text-2xl font-bold">{overviewStats.pendingEvaluations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">متوسط الدرجات</p>
                  <p className="text-2xl font-bold">{overviewStats.averageScore}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">أداء متميز</p>
                  <p className="text-2xl font-bold">{overviewStats.topPerformers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">يحتاج تطوير</p>
                  <p className="text-2xl font-bold">{overviewStats.improvementNeeded}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <SmartEvaluations />
        </div>
      </div>
    </div>
  );
};