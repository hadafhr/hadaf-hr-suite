import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Search, Filter, Eye, Edit, Trash2, Mail, Phone, MapPin, 
  Calendar, Building, Users, Download, Upload, Plus
} from 'lucide-react';

const EmployeeDirectory = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const employees = [
    {
      id: 'EMP001',
      name: isRTL ? 'أحمد محمد علي' : 'Ahmed Mohammed Ali',
      position: isRTL ? 'مطور برمجيات أول' : 'Senior Software Developer',
      department: isRTL ? 'تقنية المعلومات' : 'IT',
      email: 'ahmed.mohammed@company.com',
      phone: '+966501234567',
      status: 'active',
      joinDate: '2023-01-15',
      location: isRTL ? 'الرياض' : 'Riyadh',
      avatar: '/placeholder.svg'
    },
    {
      id: 'EMP002',
      name: isRTL ? 'سارة أحمد حسن' : 'Sara Ahmed Hassan',
      position: isRTL ? 'مدير مشروع' : 'Project Manager',
      department: isRTL ? 'تقنية المعلومات' : 'IT',
      email: 'sara.ahmed@company.com',
      phone: '+966501234568',
      status: 'active',
      joinDate: '2022-08-10',
      location: isRTL ? 'جدة' : 'Jeddah',
      avatar: '/placeholder.svg'
    },
    {
      id: 'EMP003',
      name: isRTL ? 'محمد علي الأحمد' : 'Mohammed Ali Al-Ahmad',
      position: isRTL ? 'أخصائي موارد بشرية' : 'HR Specialist',
      department: isRTL ? 'الموارد البشرية' : 'HR',
      email: 'mohammed.ali@company.com',
      phone: '+966501234569',
      status: 'trial',
      joinDate: '2024-05-20',
      location: isRTL ? 'الدمام' : 'Dammam',
      avatar: '/placeholder.svg'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: isRTL ? 'نشط' : 'Active', color: 'bg-green-100 text-green-800' },
      trial: { label: isRTL ? 'تحت التجربة' : 'Trial Period', color: 'bg-orange-100 text-orange-800' },
      leave: { label: isRTL ? 'في إجازة' : 'On Leave', color: 'bg-blue-100 text-blue-800' },
      terminated: { label: isRTL ? 'منتهية الخدمة' : 'Terminated', color: 'bg-red-100 text-red-800' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap];
    return (
      <Badge className={statusInfo.color}>
        {statusInfo.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            {isRTL ? 'دليل الموظفين' : 'Employee Directory'}
          </h2>
          <p className="text-gray-600 mt-1">
            {isRTL ? 'قائمة شاملة بجميع الموظفين مع إمكانية البحث والفلترة' : 'Complete employee listing with search and filtering capabilities'}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            {isRTL ? 'استيراد' : 'Import'}
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            {isRTL ? 'تصدير' : 'Export'}
          </Button>
          <Button className="flex items-center gap-2 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            {isRTL ? 'إضافة موظف' : 'Add Employee'}
          </Button>
        </div>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {employees.map((employee) => (
          <Card key={employee.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={employee.avatar} alt={employee.name} />
                    <AvatarFallback>
                      {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-gray-900">{employee.name}</h3>
                    <p className="text-sm text-gray-500">{employee.id}</p>
                  </div>
                </div>
                {getStatusBadge(employee.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Building className="h-4 w-4" />
                  <span>{employee.position}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{employee.department}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>{employee.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>{employee.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{isRTL ? 'تاريخ الانضمام:' : 'Joined:'} {employee.joinDate}</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    {isRTL ? 'عرض' : 'View'}
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    {isRTL ? 'تعديل' : 'Edit'}
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EmployeeDirectory;