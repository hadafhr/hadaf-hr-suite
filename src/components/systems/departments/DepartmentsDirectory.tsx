import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Building2, Users, Search, Plus, Edit, 
  Trash2, Eye, MoreHorizontal, MapPin,
  Phone, Mail, Calendar, User, Settings,
  Filter, Download, Upload
} from 'lucide-react';

const DepartmentsDirectory = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const departments = [
    {
      id: 1,
      name: isRTL ? 'إدارة تقنية المعلومات' : 'Information Technology',
      nameEn: 'Information Technology',
      nameAr: 'إدارة تقنية المعلومات',
      manager: isRTL ? 'أحمد محمد الحلي' : 'Ahmed Mohammed Al-Hali',
      employees: 85,
      subUnits: 4,
      status: 'active',
      location: isRTL ? 'الطابق الثالث - مبنى A' : '3rd Floor - Building A',
      phone: '+966 11 234 5678',
      email: 'it@company.com',
      established: '2018-03-15',
      budget: 2500000,
      description: isRTL ? 'مسؤولة عن جميع الأنظمة التقنية والبرمجيات' : 'Responsible for all technical systems and software'
    },
    {
      id: 2,
      name: isRTL ? 'إدارة الموارد البشرية' : 'Human Resources',
      nameEn: 'Human Resources',
      nameAr: 'إدارة الموارد البشرية',
      manager: isRTL ? 'فاطمة أحمد محمود' : 'Fatima Ahmed Mahmoud',
      employees: 65,
      subUnits: 3,
      status: 'active',
      location: isRTL ? 'الطابق الثاني - مبنى B' : '2nd Floor - Building B',
      phone: '+966 11 234 5679',
      email: 'hr@company.com',
      established: '2015-01-10',
      budget: 1800000,
      description: isRTL ? 'إدارة شؤون الموظفين والتطوير المهني' : 'Employee affairs and professional development management'
    },
    {
      id: 3,
      name: isRTL ? 'الإدارة المالية' : 'Finance Department',
      nameEn: 'Finance Department',
      nameAr: 'الإدارة المالية',
      manager: isRTL ? 'خالد سعد العتيبي' : 'Khalid Saad Al-Otaibi',
      employees: 45,
      subUnits: 2,
      status: 'active',
      location: isRTL ? 'الطابق الأول - مبنى A' : '1st Floor - Building A',
      phone: '+966 11 234 5680',
      email: 'finance@company.com',
      established: '2014-06-20',
      budget: 3200000,
      description: isRTL ? 'إدارة الميزانيات والحسابات المالية' : 'Budget and financial accounts management'
    },
    {
      id: 4,
      name: isRTL ? 'إدارة التسويق' : 'Marketing Department',
      nameEn: 'Marketing Department',
      nameAr: 'إدارة التسويق',
      manager: isRTL ? 'نورا علي الزهراني' : 'Nora Ali Al-Zahrani',
      employees: 78,
      subUnits: 5,
      status: 'active',
      location: isRTL ? 'الطابق الرابع - مبنى B' : '4th Floor - Building B',
      phone: '+966 11 234 5681',
      email: 'marketing@company.com',
      established: '2016-09-12',
      budget: 2100000,
      description: isRTL ? 'التسويق الرقمي والحملات الإعلانية' : 'Digital marketing and advertising campaigns'
    },
    {
      id: 5,
      name: isRTL ? 'إدارة المبيعات' : 'Sales Department',
      nameEn: 'Sales Department',
      nameAr: 'إدارة المبيعات',
      manager: isRTL ? 'عبدالله محمد القحطاني' : 'Abdullah Mohammed Al-Qahtani',
      employees: 92,
      subUnits: 6,
      status: 'active',
      location: isRTL ? 'الطابق الأول - مبنى C' : '1st Floor - Building C',
      phone: '+966 11 234 5682',
      email: 'sales@company.com',
      established: '2013-11-05',
      budget: 2800000,
      description: isRTL ? 'المبيعات المباشرة وخدمة العملاء' : 'Direct sales and customer service'
    },
    {
      id: 6,
      name: isRTL ? 'إدارة العمليات' : 'Operations Department',
      nameEn: 'Operations Department',
      nameAr: 'إدارة العمليات',
      manager: isRTL ? 'سارة عبدالرحمن الشمري' : 'Sarah Abdulrahman Al-Shammari',
      employees: 56,
      subUnits: 3,
      status: 'active',
      location: isRTL ? 'الطابق الثاني - مبنى C' : '2nd Floor - Building C',
      phone: '+966 11 234 5683',
      email: 'operations@company.com',
      established: '2017-04-18',
      budget: 1900000,
      description: isRTL ? 'إدارة العمليات التشغيلية والجودة' : 'Operational processes and quality management'
    }
  ];

  const filteredDepartments = departments.filter(dept =>
    dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDepartment = () => {
    console.log('إضافة إدارة جديدة');
    // هنا يمكن فتح نموذج إضافة إدارة جديدة
  };

  const handleEditDepartment = (dept) => {
    console.log('تعديل الإدارة:', dept.name);
    setSelectedDepartment(dept);
    // هنا يمكن فتح نموذج التعديل
  };

  const handleDeleteDepartment = (dept) => {
    console.log('حذف الإدارة:', dept.name);
    // هنا يمكن فتح نافذة التأكيد للحذف
  };

  const handleViewDetails = (dept) => {
    console.log('عرض تفاصيل الإدارة:', dept.name);
    setSelectedDepartment(dept);
  };

  const getStatusBadge = (status) => {
    if (status === 'active') {
      return (
        <Badge className="bg-primary/10 text-primary border-primary/30">
          {isRTL ? 'نشطة' : 'Active'}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground">
        {isRTL ? 'غير نشطة' : 'Inactive'}
      </Badge>
    );
  };

  return (
    <div className="space-y-8">
      {/* شريط الأدوات */}
      <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft">
        <CardContent className="p-6">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={isRTL ? 'البحث في الإدارات...' : 'Search departments...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 border-border/30 focus:border-primary/50"
                />
              </div>
              <Button variant="outline" size="sm" className="border-border/30 hover:border-primary/50">
                <Filter className="h-4 w-4 ml-2" />
                {isRTL ? 'تصفية' : 'Filter'}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-border/30 hover:border-primary/50">
                <Upload className="h-4 w-4 ml-2" />
                {isRTL ? 'استيراد' : 'Import'}
              </Button>
              <Button variant="outline" size="sm" className="border-border/30 hover:border-primary/50">
                <Download className="h-4 w-4 ml-2" />
                {isRTL ? 'تصدير' : 'Export'}
              </Button>
              <Button 
                className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-soft hover:shadow-glow transition-all duration-300"
                onClick={handleAddDepartment}
              >
                <Plus className="h-4 w-4 ml-2" />
                {isRTL ? 'إضافة إدارة' : 'Add Department'}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* قائمة الإدارات */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDepartments.map((dept, index) => (
          <Card 
            key={dept.id} 
            className="group hover:shadow-glow hover:scale-[1.02] transition-all duration-500 border border-border/20 bg-white/95 backdrop-blur-sm overflow-hidden relative animate-fade-in"
            style={{animationDelay: `${index * 0.1}s`}}
          >
            {/* خلفية متحركة */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-xl -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
            
            <CardHeader className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                      {dept.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">{dept.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {getStatusBadge(dept.status)}
                  <Button variant="ghost" size="sm" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4 relative z-10">
              {/* معلومات المدير */}
              <div className="flex items-center gap-3 p-3 bg-card/30 rounded-xl">
                <div className="w-8 h-8 bg-muted/30 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{dept.manager}</p>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'مدير الإدارة' : 'Department Manager'}</p>
                </div>
              </div>

              {/* الإحصائيات */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-primary/5 rounded-xl">
                  <p className="text-2xl font-bold text-primary">{dept.employees}</p>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'موظف' : 'Employees'}</p>
                </div>
                <div className="text-center p-3 bg-muted/10 rounded-xl">
                  <p className="text-2xl font-bold text-foreground">{dept.subUnits}</p>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'وحدة فرعية' : 'Sub Units'}</p>
                </div>
              </div>

              {/* معلومات الاتصال */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{dept.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{dept.phone}</span>
                </div>
              </div>

              {/* الميزانية */}
              <div className="p-3 bg-primary/5 rounded-xl">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{isRTL ? 'الميزانية السنوية' : 'Annual Budget'}</span>
                  <span className="text-lg font-bold text-primary">
                    {dept.budget.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}
                  </span>
                </div>
              </div>

              {/* الوصف */}
              <p className="text-sm text-muted-foreground bg-card/30 p-3 rounded-xl">
                {dept.description}
              </p>

              {/* أزرار العمليات */}
              <div className="flex items-center justify-between pt-4 border-t border-border/20">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-primary hover:bg-primary/10"
                    onClick={() => handleViewDetails(dept)}
                  >
                    <Eye className="h-4 w-4 ml-1" />
                    {isRTL ? 'عرض' : 'View'}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 text-foreground hover:bg-muted/20"
                    onClick={() => handleEditDepartment(dept)}
                  >
                    <Edit className="h-4 w-4 ml-1" />
                    {isRTL ? 'تعديل' : 'Edit'}
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 text-destructive hover:bg-destructive/10"
                  onClick={() => handleDeleteDepartment(dept)}
                >
                  <Trash2 className="h-4 w-4 ml-1" />
                  {isRTL ? 'حذف' : 'Delete'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* رسالة عدم وجود نتائج */}
      {filteredDepartments.length === 0 && (
        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft">
          <CardContent className="p-12 text-center">
            <Building2 className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              {isRTL ? 'لا توجد إدارات' : 'No Departments Found'}
            </h3>
            <p className="text-muted-foreground mb-6">
              {isRTL ? 'لم يتم العثور على إدارات تطابق معايير البحث' : 'No departments match your search criteria'}
            </p>
            <Button 
              className="bg-gradient-to-r from-primary to-primary-glow text-white"
              onClick={handleAddDepartment}
            >
              <Plus className="h-4 w-4 ml-2" />
              {isRTL ? 'إضافة إدارة جديدة' : 'Add New Department'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DepartmentsDirectory;