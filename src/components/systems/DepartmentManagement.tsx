import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Building, Users, Plus, Edit, Trash2, Search } from 'lucide-react';
import { useDepartments, type Department } from '@/hooks/useDepartments';
import { EmptyDepartmentsView } from './EmptyDepartmentsView';

interface DepartmentManagementProps {
  onBack: () => void;
}

export const DepartmentManagement: React.FC<DepartmentManagementProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { departments, isLoading } = useDepartments();
  
  // If no departments exist, show empty state
  if (!isLoading && departments.length === 0) {
    return <EmptyDepartmentsView onDepartmentAdded={() => window.location.reload()} />;
  }

  const filteredDepartments = departments.filter(dept =>
    dept.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.name_en?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="ghost"
          onClick={onBack}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4 ml-2" />
          العودة
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Building className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-primary">إدارة الأقسام والإدارات</h1>
            <p className="text-muted-foreground">إدارة شاملة للهيكل التنظيمي للشركة</p>
          </div>
        </div>
        <div className="mr-auto">
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 ml-2" />
            إضافة قسم جديد
          </Button>
        </div>
      </div>

      {/* Search and Stats */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-primary mb-1">{departments.length}</div>
            <div className="text-sm text-muted-foreground">إجمالي الأقسام</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">
              {departments.reduce((sum, dept) => sum + (dept.head_count || 0), 0)}
            </div>
            <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">
              {departments.filter(d => d.is_active).length}
            </div>
            <div className="text-sm text-muted-foreground">أقسام نشطة</div>
          </CardContent>
        </Card>
        <Card>
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
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDepartments.map((department) => (
          <Card key={department.id} className="hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Building className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{department.name_ar}</CardTitle>
                    <p className="text-sm text-muted-foreground">{department.name_en || 'غير محدد'}</p>
                  </div>
                </div>
                <Badge variant={department.is_active ? 'default' : 'secondary'}>
                  {department.is_active ? 'نشط' : 'غير نشط'}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {department.description || 'لا يوجد وصف'}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-primary/5 p-3 rounded-lg text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Users className="h-4 w-4 text-primary ml-1" />
                  </div>
                  <div className="font-semibold text-primary">{department.head_count || 0}</div>
                  <div className="text-xs text-muted-foreground">موظف</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg text-center">
                  <div className="font-semibold text-green-600">
                    {department.budget_allocation?.toLocaleString() || '0'} ر.س
                  </div>
                  <div className="text-xs text-muted-foreground">الميزانية</div>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-blue-900 mb-1">نوع القسم</div>
                <div className="text-sm text-blue-700">{department.department_type || 'غير محدد'}</div>
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
    </div>
  );
};