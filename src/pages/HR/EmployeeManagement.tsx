import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import { BoudEmployeeManagement } from '@/components/BoudEmployeeManagement';
import { 
  Users, 
  UserPlus, 
  Building, 
  TrendingUp, 
  BarChart3,
  MapPin,
  FileText,
  CheckCircle
} from 'lucide-react';

export const EmployeeManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    totalEmployees: 248,
    newEmployees: 15,
    activeEmployees: 230,
    onLeave: 18,
    departments: 8,
    positions: 35
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <SystemHeader
          title="نظام إدارة شؤون الموظفين الشامل"
          description="إدارة متكاملة لبيانات الموظفين والتنظيم الإداري مع ربط بجميع أنظمة الموارد البشرية"
          icon={<Users className="h-12 w-12 text-white" />}
          showBackButton={false}
        />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Card className="bg-gradient-to-br from-primary to-primary/90 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">إجمالي الموظفين</p>
                  <p className="text-2xl font-bold">{overviewStats.totalEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">موظفين جدد</p>
                  <p className="text-2xl font-bold">{overviewStats.newEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">موظفين نشطين</p>
                  <p className="text-2xl font-bold">{overviewStats.activeEmployees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">في إجازة</p>
                  <p className="text-2xl font-bold">{overviewStats.onLeave}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Building className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">الإدارات</p>
                  <p className="text-2xl font-bold">{overviewStats.departments}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl border-0">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-white" />
                <div>
                  <p className="text-white/80 text-sm">المناصب</p>
                  <p className="text-2xl font-bold">{overviewStats.positions}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <BoudEmployeeManagement />
        </div>
      </div>
    </div>
  );
};