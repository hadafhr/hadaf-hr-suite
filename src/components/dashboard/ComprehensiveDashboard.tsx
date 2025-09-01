import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Clock, 
  DollarSign, 
  TrendingUp,
  Building,
  CheckCircle,
  Target,
  Award,
  Calendar
} from 'lucide-react';
import { mockEmployees } from '@/data/mockEmployees';

interface ComprehensiveDashboardProps {
  onNavigateToSection: (section: string) => void;
}

export const ComprehensiveDashboard: React.FC<ComprehensiveDashboardProps> = ({ onNavigateToSection }) => {
  const totalEmployees = mockEmployees.length;
  const activeEmployees = mockEmployees.filter(emp => emp.status === 'active').length;
  const avgPerformance = Math.round(mockEmployees.reduce((sum, emp) => sum + emp.performanceScore, 0) / totalEmployees);
  const totalPayroll = mockEmployees.reduce((sum, emp) => sum + emp.salary, 0);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-border/20 bg-gradient-to-br from-primary/5 to-primary/10 cursor-pointer hover:shadow-lg transition-all" onClick={() => onNavigateToSection('employees')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">{totalEmployees}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-success/5 to-success/10 cursor-pointer hover:shadow-lg transition-all" onClick={() => onNavigateToSection('employees')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">موظفين نشطين</p>
                <p className="text-2xl font-bold text-success">{activeEmployees}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-amber-500/5 to-amber-500/10 cursor-pointer hover:shadow-lg transition-all" onClick={() => onNavigateToSection('performance')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متوسط الأداء</p>
                <p className="text-2xl font-bold text-amber-600">{avgPerformance}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-gradient-to-br from-blue-500/5 to-blue-500/10 cursor-pointer hover:shadow-lg transition-all" onClick={() => onNavigateToSection('payroll')}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الرواتب</p>
                <p className="text-2xl font-bold text-blue-600">{(totalPayroll / 1000).toFixed(0)}K</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-border/20 bg-card/30 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>الأنظمة الرئيسية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { name: 'الحضور والانصراف', icon: Clock, key: 'attendance' },
                { name: 'الإجازات', icon: Calendar, key: 'leaves' },
                { name: 'التدريب', icon: Award, key: 'training' },
                { name: 'الأقسام', icon: Building, key: 'departments' },
                { name: 'تقييم الأداء', icon: Target, key: 'performance' },
                { name: 'التقارير', icon: TrendingUp, key: 'reports' }
              ].map((system) => (
                <Button 
                  key={system.key}
                  variant="outline" 
                  className="h-20 flex-col gap-2 hover:bg-[#009F87] hover:text-white"
                  onClick={() => onNavigateToSection(system.key)}
                >
                  <system.icon className="h-6 w-6" />
                  <span className="text-xs">{system.name}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/20 bg-card/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>إحصائيات سريعة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">معدل الحضور</span>
              <span className="font-bold text-success">95%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">الإجازات المعلقة</span>
              <span className="font-bold text-amber-600">12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">التقييمات المطلوبة</span>
              <span className="font-bold text-blue-600">8</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">دورات التدريب النشطة</span>
              <span className="font-bold text-purple-600">5</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};