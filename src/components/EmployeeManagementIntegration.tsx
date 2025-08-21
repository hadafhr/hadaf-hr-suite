import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHRIntegration } from '@/hooks/useHRIntegration';
import {
  Users,
  UserPlus,
  Search,
  Building2,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  DollarSign,
  Edit,
  UserMinus,
  Loader2
} from 'lucide-react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export const EmployeeManagementIntegration = () => {
  const {
    employees,
    companyStats,
    isLoading,
    addEmployee,
    updateEmployee,
    deactivateEmployee,
    searchEmployees
  } = useHRIntegration();

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployeeData, setNewEmployeeData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    employee_id: '',
    basic_salary: 0,
    employment_status: 'active'
  });

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    searchEmployees(value);
  };

  const handleAddEmployee = async () => {
    const result = await addEmployee(newEmployeeData);
    if (result) {
      setIsAddDialogOpen(false);
      setNewEmployeeData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        employee_id: '',
        basic_salary: 0,
        employment_status: 'active'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-600">نشط</Badge>;
      case 'inactive':
        return <Badge variant="secondary">غير نشط</Badge>;
      case 'suspended':
        return <Badge variant="destructive">موقوف</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin ml-2" />
        <span>جارٍ تحميل نظام إدارة الموظفين...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6" dir="rtl">
      {/* رأس الصفحة والإحصائيات */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">نظام إدارة الموظفين</h1>
          <p className="text-muted-foreground">إدارة شاملة لموظفي الشركة</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              إضافة موظف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة موظف جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>الاسم الأول</Label>
                  <Input
                    value={newEmployeeData.first_name}
                    onChange={(e) => setNewEmployeeData(prev => ({
                      ...prev,
                      first_name: e.target.value
                    }))}
                    placeholder="الاسم الأول"
                  />
                </div>
                <div>
                  <Label>الاسم الأخير</Label>
                  <Input
                    value={newEmployeeData.last_name}
                    onChange={(e) => setNewEmployeeData(prev => ({
                      ...prev,
                      last_name: e.target.value
                    }))}
                    placeholder="الاسم الأخير"
                  />
                </div>
              </div>
              
              <div>
                <Label>رقم الموظف</Label>
                <Input
                  value={newEmployeeData.employee_id}
                  onChange={(e) => setNewEmployeeData(prev => ({
                    ...prev,
                    employee_id: e.target.value
                  }))}
                  placeholder="رقم الموظف"
                />
              </div>

              <div>
                <Label>البريد الإلكتروني</Label>
                <Input
                  type="email"
                  value={newEmployeeData.email}
                  onChange={(e) => setNewEmployeeData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))}
                  placeholder="البريد الإلكتروني"
                />
              </div>

              <div>
                <Label>رقم الهاتف</Label>
                <Input
                  value={newEmployeeData.phone}
                  onChange={(e) => setNewEmployeeData(prev => ({
                    ...prev,
                    phone: e.target.value
                  }))}
                  placeholder="رقم الهاتف"
                />
              </div>

              <div>
                <Label>الراتب الأساسي</Label>
                <Input
                  type="number"
                  value={newEmployeeData.basic_salary}
                  onChange={(e) => setNewEmployeeData(prev => ({
                    ...prev,
                    basic_salary: Number(e.target.value)
                  }))}
                  placeholder="الراتب الأساسي"
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={handleAddEmployee} className="flex-1">
                  إضافة الموظف
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* بطاقات الإحصائيات */}
      {companyStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="flex items-center p-6">
              <Users className="h-8 w-8 text-primary ml-4" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold">{companyStats.total_employees}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <TrendingUp className="h-8 w-8 text-green-600 ml-4" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">الموظفون النشطون</p>
                <p className="text-2xl font-bold">{companyStats.active_employees}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Calendar className="h-8 w-8 text-orange-600 ml-4" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">الطلبات المعلقة</p>
                <p className="text-2xl font-bold">{companyStats.pending_requests}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center p-6">
              <Building2 className="h-8 w-8 text-blue-600 ml-4" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">الأقسام</p>
                <p className="text-2xl font-bold">{companyStats.total_departments}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* شريط البحث */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="البحث عن موظف بالاسم أو رقم الموظف أو البريد الإلكتروني..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="pr-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* قائمة الموظفين */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            قائمة الموظفين ({employees.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {employees.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">لا يوجد موظفون للعرض</p>
              </div>
            ) : (
              employees.map((employee) => (
                <Card key={employee.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 space-x-reverse">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={employee.profile_picture_url} />
                          <AvatarFallback>
                            {employee.first_name[0]}{employee.last_name[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">
                              {employee.first_name} {employee.last_name}
                            </h3>
                            {getStatusBadge(employee.employment_status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              رقم الموظف: {employee.employee_id}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {employee.email}
                            </span>
                            <span className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              {employee.phone}
                            </span>
                            <span className="flex items-center gap-1">
                              <DollarSign className="h-3 w-3" />
                              {employee.basic_salary?.toLocaleString()} ريال
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="gap-2"
                        >
                          <Edit className="h-4 w-4" />
                          تعديل
                        </Button>
                        {employee.employment_status === 'active' && (
                          <Button
                            variant="destructive"
                            size="sm"
                            className="gap-2"
                            onClick={() => deactivateEmployee(employee.id)}
                          >
                            <UserMinus className="h-4 w-4" />
                            تعطيل
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};