import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Users, FileText, Download, Plus } from 'lucide-react';
import TeamDashboard from './team/TeamDashboard';
import EmployeeDirectory from './team/EmployeeDirectory';

interface TeamMembersProps {
  onBack: () => void;
}

interface TeamMember {
  id: string;
  employeeNumber: string;
  name: string;
  position: string;
  department: 'IT' | 'HR' | 'Finance' | 'Marketing' | 'Operations' | 'Sales';
  status: 'Active' | 'On Leave' | 'Inactive' | 'Terminated';
  level: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Manager';
  manager: string;
  email: string;
  phone: string;
  startDate: string;
  contractType: string;
  performanceScore: number;
  attendanceRate: number;
  yearsOfExperience: number;
  salary: number;
}

export const TeamMembers: React.FC<TeamMembersProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState<TeamMember | null>(null);

  // Mock data for demonstration
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      employeeNumber: 'EMP-2024-001',
      name: 'أحمد محمد السعيد',
      position: 'مطور برمجيات أول',
      department: 'IT',
      status: 'Active',
      level: 'Senior',
      manager: 'محمد أحمد الخالدي',
      email: 'ahmed.saeed@company.com',
      phone: '+966501234567',
      startDate: '2022-01-15',
      contractType: 'دائم',
      performanceScore: 92,
      attendanceRate: 96,
      yearsOfExperience: 5,
      salary: 12000
    },
    {
      id: '2',
      employeeNumber: 'EMP-2024-002',
      name: 'فاطمة عبدالله النور',
      position: 'محاسبة رئيسية',
      department: 'Finance',
      status: 'Active',
      level: 'Mid',
      manager: 'عبدالرحمن محمد الأحمد',
      email: 'fatima.noor@company.com',
      phone: '+966502345678',
      startDate: '2021-03-10',
      contractType: 'دائم',
      performanceScore: 88,
      attendanceRate: 98,
      yearsOfExperience: 3,
      salary: 10000
    }
  ];

  // Calculate statistics
  const stats = {
    totalMembers: 127,
    activeMembers: 115,
    departments: 8,
    avgPerformance: 89,
    avgAttendance: 94,
    avgExperience: 4.2
  };

  const handleExport = () => {
    toast({
      title: "تم التصدير بنجاح",
      description: "تم تصدير تقرير فريق العمل كملف PDF",
    });
  };

  const handlePrint = () => {
    toast({
      title: "جاري الطباعة",
      description: "يتم تحضير التقرير للطباعة",
    });
  };

  const handleSelectEmployee = (employee: TeamMember) => {
    setSelectedEmployee(employee);
    setActiveTab('profile');
  };

  const renderHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
      <div className="absolute inset-0 bg-[url('/lovable-uploads/boud-pattern-bg.jpg')] opacity-5"></div>
      <div className="relative p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  فريق العمل
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  منظومة شاملة لإدارة جميع أعضاء الفريق مع أدوات التحليل المتقدمة والتقارير التفصيلية
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 ml-2" />
              تصدير التقرير
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <FileText className="h-4 w-4 ml-2" />
              طباعة
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-2" />
              موظف جديد
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="p-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="directory">دليل الموظفين</TabsTrigger>
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="add">إضافة موظف</TabsTrigger>
            <TabsTrigger value="tasks">المهام والملاحظات</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <TeamDashboard stats={stats} />
          </TabsContent>

          <TabsContent value="directory">
            <EmployeeDirectory 
              members={teamMembers} 
              onSelectEmployee={handleSelectEmployee}
            />
          </TabsContent>

          <TabsContent value="profile">
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                {selectedEmployee ? `عرض تفاصيل: ${selectedEmployee.name}` : 'اختر موظفاً لعرض تفاصيله'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="add">
            <div className="text-center py-12">
              <p className="text-muted-foreground">نموذج إضافة موظف جديد</p>
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="text-center py-12">
              <p className="text-muted-foreground">إدارة المهام والملاحظات</p>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="text-center py-12">
              <p className="text-muted-foreground">التقارير والإحصائيات</p>
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="text-center py-12">
              <p className="text-muted-foreground">إعدادات النظام</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};