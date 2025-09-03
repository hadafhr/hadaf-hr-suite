import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Building } from 'lucide-react';

const EmployeeProfile = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const employeeData = {
    name: isRTL ? 'أحمد محمد علي' : 'Ahmed Mohammed Ali',
    position: isRTL ? 'مطور برمجيات أول' : 'Senior Software Developer',
    department: isRTL ? 'تقنية المعلومات' : 'IT Department',
    email: 'ahmed.mohammed@company.com',
    phone: '+966501234567',
    location: isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia',
    joinDate: '2023-01-15',
    status: 'active',
    avatar: '/placeholder.svg'
  };

  const getStatusBadge = (status: string) => {
    const statusMap = {
      active: { label: isRTL ? 'نشط' : 'Active', color: 'bg-green-100 text-green-800' },
      trial: { label: isRTL ? 'تحت التجربة' : 'Trial Period', color: 'bg-orange-100 text-orange-800' },
      leave: { label: isRTL ? 'في إجازة' : 'On Leave', color: 'bg-blue-100 text-blue-800' }
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
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {isRTL ? 'ملف الموظف الكامل' : 'Complete Employee Profile'}
        </h2>
        <p className="text-gray-600">
          {isRTL ? 'عرض جميع بيانات الموظف الشخصية والوظيفية' : 'View all employee personal and professional information'}
        </p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <Avatar className="h-24 w-24 mx-auto md:mx-0">
              <AvatarImage src={employeeData.avatar} alt={employeeData.name} />
              <AvatarFallback className="text-2xl">
                {employeeData.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{employeeData.name}</h3>
                  <p className="text-lg text-gray-600 mb-3">{employeeData.position}</p>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {employeeData.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {isRTL ? 'انضم في' : 'Joined'} {employeeData.joinDate}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {getStatusBadge(employeeData.status)}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">{isRTL ? 'البريد الإلكتروني' : 'Email'}</p>
                  <p className="font-medium text-gray-900">{employeeData.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">{isRTL ? 'رقم الهاتف' : 'Phone'}</p>
                  <p className="font-medium text-gray-900">{employeeData.phone}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">{isRTL ? 'الموقع' : 'Location'}</p>
                  <p className="font-medium text-gray-900">{employeeData.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <User className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">{isRTL ? 'الحالة الوظيفية' : 'Employment Status'}</p>
                  <div className="mt-1">
                    {getStatusBadge(employeeData.status)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmployeeProfile;