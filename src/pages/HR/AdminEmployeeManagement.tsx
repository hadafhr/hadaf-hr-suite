import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  Users,
  Filter,
  MoreHorizontal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Employee {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  status: 'active' | 'inactive' | 'on_leave';
  joinDate: string;
  avatar?: string;
}

export const AdminEmployeeManagement: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  // Mock employees data
  const employees: Employee[] = [
    {
      id: 'EMP001',
      name: 'أحمد محمد العلي',
      email: 'ahmed.ali@company.com',
      position: 'مطور برمجيات أول',
      department: 'تقنية المعلومات',
      status: 'active',
      joinDate: '2022-01-15'
    },
    {
      id: 'EMP002',
      name: 'فاطمة أحمد خالد',
      email: 'fatima.khalid@company.com',
      position: 'محاسبة رئيسية',
      department: 'المحاسبة',
      status: 'active',
      joinDate: '2021-06-10'
    },
    {
      id: 'EMP003',
      name: 'محمد عبدالله السعد',
      email: 'mohammed.saad@company.com',
      position: 'مدير المبيعات',
      department: 'المبيعات',
      status: 'on_leave',
      joinDate: '2020-03-22'
    },
    {
      id: 'EMP004',
      name: 'سارة علي الحسن',
      email: 'sarah.hassan@company.com',
      position: 'أخصائية موارد بشرية',
      department: 'الموارد البشرية',
      status: 'active',
      joinDate: '2023-01-08'
    }
  ];

  const [departments, setDepartments] = useState<string[]>([]);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">غير نشط</Badge>;
      case 'on_leave':
        return <Badge className="bg-yellow-100 text-yellow-800">في إجازة</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  const handleExportData = () => {
    // Here you would implement Excel export functionality
    alert('سيتم تصدير بيانات الموظفين إلى ملف Excel');
  };

  const handleImportData = () => {
    // Here you would implement Excel import functionality
    document.getElementById('excel-import')?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Here you would process the uploaded Excel file
      alert(`تم تحديد ملف: ${file.name}`);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" size="icon" onClick={() => navigate('/admin-dashboard')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="text-right">
                <h1 className="text-xl font-semibold">إدارة الموظفين</h1>
                <p className="text-sm text-muted-foreground">إضافة وتعديل بيانات الموظفين</p>
              </div>
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Button variant="outline" onClick={handleExportData}>
                <Download className="w-4 h-4 ml-1" />
                تصدير Excel
              </Button>
              <Button variant="outline" onClick={handleImportData}>
                <Upload className="w-4 h-4 ml-1" />
                استيراد Excel
              </Button>
              <Button>
                <Plus className="w-4 h-4 ml-1" />
                موظف جديد
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden file input for Excel import */}
      <input
        id="excel-import"
        type="file"
        accept=".xlsx,.xls"
        style={{ display: 'none' }}
        onChange={handleFileUpload}
      />

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{employees.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي الموظفين</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {employees.filter(e => e.status === 'active').length}
              </div>
              <div className="text-sm text-muted-foreground">موظفين نشطين</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {employees.filter(e => e.status === 'on_leave').length}
              </div>
              <div className="text-sm text-muted-foreground">في إجازة</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(employees.map(e => e.department)).size}
              </div>
              <div className="text-sm text-muted-foreground">الأقسام</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="البحث عن موظف..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 text-right"
                  />
                </div>
              </div>
              <div className="flex space-x-2 space-x-reverse">
                <select
                  className="px-3 py-2 border rounded-md text-sm"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  {departments.map((dept) => (
                    <option key={dept} value={dept === 'الكل' ? 'all' : dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employees List */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-right flex items-center">
              <Users className="w-5 h-5 ml-2" />
              قائمة الموظفين ({filteredEmployees.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {filteredEmployees.length === 0 ? (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">لا توجد موظفين تطابق معايير البحث</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        {getStatusBadge(employee.status)}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 ml-2" />
                              عرض الملف
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 ml-2" />
                              تعديل
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="w-4 h-4 ml-2" />
                              حذف
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <div className="text-right">
                          <h4 className="font-medium">{employee.name}</h4>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                          <div className="flex items-center space-x-2 space-x-reverse text-xs text-muted-foreground">
                            <span>{employee.department}</span>
                            <span>•</span>
                            <span>{employee.id}</span>
                            <span>•</span>
                            <span>انضم في {employee.joinDate}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{employee.email}</p>
                        </div>
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={employee.avatar} alt={employee.name} />
                          <AvatarFallback>
                            {employee.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};