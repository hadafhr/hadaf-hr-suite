import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Plus, 
  Search, 
  Edit, 
  Eye, 
  FileText,
  Calendar,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const employees = [
  {
    id: 1,
    name: "أحمد محمد السعد",
    position: "مطور برمجيات أول",
    department: "تقنية المعلومات",
    email: "ahmed.saad@company.com",
    phone: "+966501234567",
    status: "نشط",
    joinDate: "2022-03-15",
    salary: "12000",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "فاطمة عبدالله النور",
    position: "محاسبة مالية",
    department: "المالية",
    email: "fatma.noor@company.com",
    phone: "+966507654321",
    status: "نشط",
    joinDate: "2021-07-20",
    salary: "9500",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "محمد عبدالرحمن الشمري",
    position: "مسؤول مبيعات",
    department: "المبيعات",
    email: "mohammed.shamari@company.com",
    phone: "+966509876543",
    status: "إجازة",
    joinDate: "2020-11-10",
    salary: "8500",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  }
];

export const EmployeeManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  const filteredEmployees = employees.filter(emp => 
    emp.name.includes(searchTerm) || 
    emp.department.includes(searchTerm) ||
    emp.position.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gradient mb-2">
              إدارة الموظفين
            </h1>
            <p className="text-muted-foreground">
              نظام شامل لإدارة بيانات وشؤون الموظفين
            </p>
          </div>
          <Button className="btn-primary">
            <Plus className="h-4 w-4 mr-2" />
            إضافة موظف جديد
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي الموظفين</p>
                <p className="text-2xl font-bold text-primary">247</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>
          
          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">الموظفين النشطين</p>
                <p className="text-2xl font-bold text-success">235</p>
              </div>
              <Users className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">في إجازة</p>
                <p className="text-2xl font-bold text-warning">8</p>
              </div>
              <Calendar className="h-8 w-8 text-warning" />
            </div>
          </Card>

          <Card className="dashboard-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">موظفين جدد هذا الشهر</p>
                <p className="text-2xl font-bold text-primary">12</p>
              </div>
              <Plus className="h-8 w-8 text-primary" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card className="dashboard-card">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="البحث عن موظف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">تصدير البيانات</Button>
              <Button variant="outline">فلتر متقدم</Button>
            </div>
          </div>
        </Card>

        {/* Employee List */}
        <Card className="dashboard-card">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">قائمة الموظفين</h3>
            
            <div className="grid gap-4">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <img 
                      src={employee.avatar} 
                      alt={employee.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-foreground">{employee.name}</h4>
                      <p className="text-sm text-muted-foreground">{employee.position}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {employee.email}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {employee.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium">{employee.department}</p>
                      <Badge variant={employee.status === 'نشط' ? 'default' : 'secondary'}>
                        {employee.status}
                      </Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedEmployee(employee)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">إجراءات سريعة</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Plus className="h-4 w-4 mr-2" />
                إضافة موظف جديد
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                تصدير قائمة الموظفين
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                إدارة الإجازات
              </Button>
            </div>
          </Card>

          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">التقارير</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                تقرير الحضور الشهري
              </Button>
              <Button variant="outline" className="w-full justify-start">
                تقرير الرواتب
              </Button>
              <Button variant="outline" className="w-full justify-start">
                تقرير الأداء
              </Button>
            </div>
          </Card>

          <Card className="dashboard-card">
            <h3 className="font-semibold mb-4">إحصائيات سريعة</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">متوسط الراتب</span>
                <span className="font-medium">9,750 ريال</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">متوسط سنوات الخبرة</span>
                <span className="font-medium">3.2 سنة</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">معدل دوران الموظفين</span>
                <span className="font-medium">4.8%</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};