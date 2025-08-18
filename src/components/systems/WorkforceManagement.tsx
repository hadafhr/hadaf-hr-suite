import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Users, UserPlus, Search, Filter, Download } from 'lucide-react';

interface WorkforceManagementProps {
  onBack: () => void;
}

interface Employee {
  id: string;
  name: string;
  englishName: string;
  employeeId: string;
  department: string;
  position: string;
  hireDate: string;
  status: 'active' | 'inactive' | 'on_leave';
  salary: number;
  manager: string;
  phone: string;
  email: string;
}

export const WorkforceManagement: React.FC<WorkforceManagementProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const employees: Employee[] = [
    {
      id: '1',
      name: 'أحمد محمد علي',
      englishName: 'Ahmed Mohamed Ali',
      employeeId: 'EMP001',
      department: 'الموارد البشرية',
      position: 'مدير الموارد البشرية',
      hireDate: '2023-01-15',
      status: 'active',
      salary: 8000,
      manager: 'سارة أحمد',
      phone: '+966501234567',
      email: 'ahmed@company.com'
    },
    {
      id: '2',
      name: 'فاطمة عبد الرحمن',
      englishName: 'Fatima Abdulrahman',
      employeeId: 'EMP002',
      department: 'المحاسبة',
      position: 'محاسب أول',
      hireDate: '2023-03-20',
      status: 'active',
      salary: 6500,
      manager: 'محمد خالد',
      phone: '+966507654321',
      email: 'fatima@company.com'
    },
    {
      id: '3',
      name: 'عبد الله سعد',
      englishName: 'Abdullah Saad',
      employeeId: 'EMP003',
      department: 'تقنية المعلومات',
      position: 'مطور برمجيات',
      hireDate: '2023-05-10',
      status: 'on_leave',
      salary: 7000,
      manager: 'علي حسن',
      phone: '+966501122334',
      email: 'abdullah@company.com'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { text: isRTL ? 'نشط' : 'Active', className: 'bg-green-100 text-green-800' },
      inactive: { text: isRTL ? 'غير نشط' : 'Inactive', className: 'bg-red-100 text-red-800' },
      on_leave: { text: isRTL ? 'في إجازة' : 'On Leave', className: 'bg-yellow-100 text-yellow-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.englishName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || employee.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen bg-background p-6 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isRTL ? 'إدارة القوى العاملة' : 'Workforce Management'}
              </h1>
              <p className="text-muted-foreground">
                {isRTL ? 'إدارة شاملة لجميع الموظفين والهيكل التنظيمي' : 'Comprehensive management of all employees and organizational structure'}
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            {isRTL ? 'إضافة موظف جديد' : 'Add New Employee'}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'إجمالي الموظفين' : 'Total Employees'}
                  </p>
                  <p className="text-2xl font-bold">247</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'الموظفون النشطون' : 'Active Employees'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">234</p>
                </div>
                <UserPlus className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'في إجازة' : 'On Leave'}
                  </p>
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                </div>
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'الموظفون الجدد (هذا الشهر)' : 'New Hires (This Month)'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">5</p>
                </div>
                <UserPlus className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList>
            <TabsTrigger value="employees">{isRTL ? 'قائمة الموظفين' : 'Employee List'}</TabsTrigger>
            <TabsTrigger value="departments">{isRTL ? 'الأقسام' : 'Departments'}</TabsTrigger>
            <TabsTrigger value="analytics">{isRTL ? 'التحليلات' : 'Analytics'}</TabsTrigger>
          </TabsList>

          <TabsContent value="employees">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث عن موظف...' : 'Search employees...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  {isRTL ? 'تصفية' : 'Filter'}
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  {isRTL ? 'تصدير' : 'Export'}
                </Button>
              </div>
            </div>

            {/* Employee List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEmployees.map((employee) => {
                const statusBadge = getStatusBadge(employee.status);
                return (
                  <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{employee.name}</CardTitle>
                        <Badge className={statusBadge.className}>
                          {statusBadge.text}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{employee.englishName}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'رقم الموظف:' : 'Employee ID:'}</span>
                          <span className="font-medium">{employee.employeeId}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'القسم:' : 'Department:'}</span>
                          <span>{employee.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'المنصب:' : 'Position:'}</span>
                          <span>{employee.position}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'تاريخ التوظيف:' : 'Hire Date:'}</span>
                          <span>{employee.hireDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">{isRTL ? 'الراتب:' : 'Salary:'}</span>
                          <span className="font-medium">{employee.salary.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'تحرير' : 'Edit'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="departments">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'إدارة الأقسام' : 'Department Management'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'عرض وإدارة جميع أقسام الشركة وهيكلها التنظيمي' : 'View and manage all company departments and organizational structure'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'تحليلات القوى العاملة' : 'Workforce Analytics'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'تحليلات شاملة لأداء وإنتاجية القوى العاملة' : 'Comprehensive analytics for workforce performance and productivity'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};