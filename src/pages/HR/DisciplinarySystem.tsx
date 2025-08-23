import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import ComprehensiveDisciplinarySystem from '@/components/disciplinary/ComprehensiveDisciplinarySystem';
import { 
  AlertTriangle, 
  Users, 
  FileText, 
  TrendingUp, 
  BarChart3,
  Clock,
  Shield,
  CheckCircle
} from 'lucide-react';

export const DisciplinarySystem: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    totalCases: 35,
    activeCases: 12,
    resolvedCases: 23,
    pendingInvestigations: 8,
    warningsIssued: 18,
    suspensions: 4
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="نظام الإجراءات التأديبية الشامل"
          description="إدارة متكاملة للإجراءات التأديبية والتحقيقات مع ربط بأنظمة الحضور والأداء"
          icon={<Shield className="h-12 w-12 text-white" />}
          showBackButton={false}
        />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إجمالي القضايا</p>
                  <p className="text-2xl font-bold">{overviewStats.totalCases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">قضايا نشطة</p>
                  <p className="text-2xl font-bold">{overviewStats.activeCases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">قضايا محلولة</p>
                  <p className="text-2xl font-bold">{overviewStats.resolvedCases}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">تحقيقات معلقة</p>
                  <p className="text-2xl font-bold">{overviewStats.pendingInvestigations}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إنذارات صادرة</p>
                  <p className="text-2xl font-bold">{overviewStats.warningsIssued}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إيقافات</p>
                  <p className="text-2xl font-bold">{overviewStats.suspensions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <ComprehensiveDisciplinarySystem />
        </div>
      </div>
    </div>
  );
};