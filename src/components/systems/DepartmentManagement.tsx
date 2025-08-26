import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building, Users, Plus, Edit, Trash2, Search } from 'lucide-react';

interface Department {
  id: string;
  name: string;
  nameEn: string;
  managerId: string;
  managerName: string;
  employeeCount: number;
  budget: number;
  status: 'نشط' | 'غير نشط';
  description: string;
}

interface DepartmentManagementProps {
  onBack: () => void;
}

export const DepartmentManagement: React.FC<DepartmentManagementProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const departments: Department[] = [
    {
      id: 'DEPT001',
      name: 'تقنية المعلومات',
      nameEn: 'Information Technology',
      managerId: 'EMP001',
      managerName: 'أحمد محمد السالم',
      employeeCount: 25,
      budget: 500000,
      status: 'نشط',
      description: 'قسم تطوير وصيانة الأنظمة التقنية'
    },
    {
      id: 'DEPT002',
      name: 'الموارد البشرية',
      nameEn: 'Human Resources',
      managerId: 'EMP002',
      managerName: 'فاطمة أحمد العلي',
      employeeCount: 15,
      budget: 300000,
      status: 'نشط',
      description: 'قسم إدارة شؤون الموظفين والتوظيف'
    },
    {
      id: 'DEPT003',
      name: 'المالية والمحاسبة',
      nameEn: 'Finance & Accounting',
      managerId: 'EMP003',
      managerName: 'عبدالله يوسف الخالد',
      employeeCount: 18,
      budget: 200000,
      status: 'نشط',
      description: 'قسم إدارة الشؤون المالية والمحاسبية'
    }
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.managerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="hover:bg-[#009F87]/10"
        >
          <ArrowLeft className="h-4 w-4 ml-2" />
          العودة
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#009F87]/10 rounded-lg">
            <Building className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#009F87]">إدارة الأقسام والإدارات</h1>
            <p className="text-muted-foreground">إدارة شاملة للهيكل التنظيمي للشركة</p>
          </div>
        </div>
        <div className="mr-auto">
          <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
            <Plus className="h-4 w-4 ml-2" />
            إضافة قسم جديد
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#009F87] mb-1">{departments.length}</div>
            <div className="text-sm text-muted-foreground">إجمالي الأقسام</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {departments.reduce((sum, dept) => sum + dept.employeeCount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {departments.filter(d => d.status === 'نشط').length}
            </div>
            <div className="text-sm text-muted-foreground">أقسام نشطة</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="البحث في الأقسام..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Departments Grid */}
      {departments.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">لا توجد أقسام مُنشأة بعد</p>
          <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
            <Plus className="h-4 w-4 ml-2" />
            إضافة قسم جديد يدوياً
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#009F87]/10 rounded-lg">
                      <Building className="h-5 w-5 text-[#009F87]" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{department.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{department.nameEn}</p>
                    </div>
                  </div>
                  <Badge variant={department.status === 'نشط' ? 'default' : 'secondary'}>
                    {department.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {department.description}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-[#009F87]/5 p-3 rounded-lg text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users className="h-4 w-4 text-[#009F87] ml-1" />
                    </div>
                    <div className="font-semibold text-[#009F87]">{department.employeeCount}</div>
                    <div className="text-xs text-muted-foreground">موظف</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg text-center">
                    <div className="font-semibold text-green-600">
                      {department.budget.toLocaleString()} ر.س
                    </div>
                    <div className="text-xs text-muted-foreground">الميزانية</div>
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-blue-900 mb-1">مدير القسم</div>
                  <div className="text-sm text-blue-700">{department.managerName}</div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="h-4 w-4 ml-1" />
                    تحرير
                  </Button>
                  <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};