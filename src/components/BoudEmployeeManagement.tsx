import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { useBoudEMS, BoudEmployee } from '@/hooks/useBoudEMS';

export const BoudEmployeeManagement: React.FC = () => {
  const { employees, isLoading, addEmployee, updateEmployee, deleteEmployee } = useBoudEMS();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<BoudEmployee | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    employee_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    employment_status: 'active' as const,
    hire_date: '',
    basic_salary: 0
  });

  const filteredEmployees = employees.filter(employee =>
    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employee_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddEmployee = async () => {
    try {
      await addEmployee(newEmployee);
      setIsAddDialogOpen(false);
      setNewEmployee({
        employee_id: '',
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        employment_status: 'active',
        hire_date: '',
        basic_salary: 0
      });
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };

  const handleUpdateEmployee = async () => {
    if (!selectedEmployee) return;
    
    try {
      await updateEmployee(selectedEmployee.id, selectedEmployee);
      setIsEditDialogOpen(false);
      setSelectedEmployee(null);
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDeleteEmployee = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا الموظف؟')) {
      try {
        await deleteEmployee(id);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: 'نشط', variant: 'default' as const },
      inactive: { label: 'غير نشط', variant: 'secondary' as const },
      terminated: { label: 'منتهي', variant: 'destructive' as const }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.active;
    return <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>;
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">إدارة الموظفين</h2>
          <p className="text-muted-foreground">إدارة وتنظيم بيانات الموظفين</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              إضافة موظف جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة موظف جديد</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">الاسم الأول</Label>
                  <Input
                    id="first_name"
                    value={newEmployee.first_name}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, first_name: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">اسم العائلة</Label>
                  <Input
                    id="last_name"
                    value={newEmployee.last_name}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, last_name: e.target.value }))}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="employee_id">رقم الموظف</Label>
                <Input
                  id="employee_id"
                  value={newEmployee.employee_id}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, employee_id: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="hire_date">تاريخ التوظيف</Label>
                <Input
                  id="hire_date"
                  type="date"
                  value={newEmployee.hire_date}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, hire_date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="basic_salary">الراتب الأساسي</Label>
                <Input
                  id="basic_salary"
                  type="number"
                  value={newEmployee.basic_salary}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, basic_salary: Number(e.target.value) }))}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddEmployee} className="flex-1">
                  إضافة
                </Button>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="البحث في الموظفين..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Employees List */}
      <Card>
        <CardHeader>
          <CardTitle>قائمة الموظفين ({filteredEmployees.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-medium text-primary">
                      {employee.first_name.charAt(0)}{employee.last_name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{employee.first_name} {employee.last_name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>رقم الموظف: {employee.employee_id}</span>
                      <span>{employee.email}</span>
                      {employee.phone && <span>{employee.phone}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(employee.employment_status)}
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedEmployee(employee);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteEmployee(employee.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            {filteredEmployees.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                لا توجد موظفين مطابقين لمعايير البحث
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تعديل بيانات الموظف</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit_first_name">الاسم الأول</Label>
                  <Input
                    id="edit_first_name"
                    value={selectedEmployee.first_name}
                    onChange={(e) => setSelectedEmployee(prev => prev ? { ...prev, first_name: e.target.value } : null)}
                  />
                </div>
                <div>
                  <Label htmlFor="edit_last_name">اسم العائلة</Label>
                  <Input
                    id="edit_last_name"
                    value={selectedEmployee.last_name}
                    onChange={(e) => setSelectedEmployee(prev => prev ? { ...prev, last_name: e.target.value } : null)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="edit_email">البريد الإلكتروني</Label>
                <Input
                  id="edit_email"
                  type="email"
                  value={selectedEmployee.email}
                  onChange={(e) => setSelectedEmployee(prev => prev ? { ...prev, email: e.target.value } : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit_phone">رقم الهاتف</Label>
                <Input
                  id="edit_phone"
                  value={selectedEmployee.phone || ''}
                  onChange={(e) => setSelectedEmployee(prev => prev ? { ...prev, phone: e.target.value } : null)}
                />
              </div>
              <div>
                <Label htmlFor="edit_status">الحالة</Label>
                <Select
                  value={selectedEmployee.employment_status}
                  onValueChange={(value) => setSelectedEmployee(prev => prev ? { ...prev, employment_status: value as any } : null)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">نشط</SelectItem>
                    <SelectItem value="inactive">غير نشط</SelectItem>
                    <SelectItem value="terminated">منتهي</SelectItem>
                    <SelectItem value="suspended">معلق</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpdateEmployee} className="flex-1">
                  حفظ التغييرات
                </Button>
                <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="flex-1">
                  إلغاء
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>تفاصيل الموظف</DialogTitle>
          </DialogHeader>
          {selectedEmployee && (
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-medium text-primary">
                    {selectedEmployee.first_name.charAt(0)}{selectedEmployee.last_name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{selectedEmployee.first_name} {selectedEmployee.last_name}</h3>
                <p className="text-muted-foreground">{selectedEmployee.employee_id}</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">البريد الإلكتروني:</span>
                  <span>{selectedEmployee.email}</span>
                </div>
                {selectedEmployee.phone && (
                  <div className="flex justify-between">
                    <span className="font-medium">رقم الهاتف:</span>
                    <span>{selectedEmployee.phone}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium">الحالة:</span>
                  {getStatusBadge(selectedEmployee.employment_status)}
                </div>
                {selectedEmployee.hire_date && (
                  <div className="flex justify-between">
                    <span className="font-medium">تاريخ التوظيف:</span>
                    <span>{new Date(selectedEmployee.hire_date).toLocaleDateString('ar-SA')}</span>
                  </div>
                )}
                {selectedEmployee.basic_salary && (
                  <div className="flex justify-between">
                    <span className="font-medium">الراتب الأساسي:</span>
                    <span>{selectedEmployee.basic_salary.toLocaleString()} ريال</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="font-medium">تاريخ الإضافة:</span>
                  <span>{new Date(selectedEmployee.created_at).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};