import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { TrainingDashboard } from '@/components/training/TrainingDashboard';
import { 
  BookOpen, 
  Users, 
  Award, 
  TrendingUp, 
  BarChart3,
  GraduationCap,
  FileText,
  CheckCircle
} from 'lucide-react';

export const TrainingDevelopment: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    totalCourses: 45,
    activeTrainees: 185,
    completedCourses: 320,
    certificates: 245,
    instructors: 12,
    trainingHours: 1250
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="نظام التدريب والتطوير الشامل"
          description="إدارة متكاملة للتدريب والتطوير المهني مع ربط بأنظمة التقييم والمسار الوظيفي"
          icon={<BookOpen className="h-12 w-12 text-white" />}
          showBackButton={false}
        />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إجمالي الدورات</p>
                  <p className="text-2xl font-bold">{overviewStats.totalCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">متدربين نشطين</p>
                  <p className="text-2xl font-bold">{overviewStats.activeTrainees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">دورات مكتملة</p>
                  <p className="text-2xl font-bold">{overviewStats.completedCourses}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">شهادات صادرة</p>
                  <p className="text-2xl font-bold">{overviewStats.certificates}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">مدربين</p>
                  <p className="text-2xl font-bold">{overviewStats.instructors}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">ساعات التدريب</p>
                  <p className="text-2xl font-bold">{overviewStats.trainingHours}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <TrainingDashboard onBack={() => {}} />
        </div>
      </div>
    </div>
  );
};