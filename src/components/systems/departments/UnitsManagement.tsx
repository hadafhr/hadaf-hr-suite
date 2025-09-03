import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Layers, Building2, Users, Network, Plus, 
  Edit, Trash2, Eye, Link, Unlink, Search,
  ChevronRight, ChevronDown, Target, Settings
} from 'lucide-react';

const UnitsManagement = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [expandedDepts, setExpandedDepts] = useState(['1', '2']);

  const departmentsWithUnits = [
    {
      id: '1',
      name: isRTL ? 'إدارة تقنية المعلومات' : 'Information Technology',
      manager: isRTL ? 'أحمد محمد الحلي' : 'Ahmed Mohammed Al-Hali',
      totalEmployees: 85,
      units: [
        {
          id: 'u1',
          name: isRTL ? 'وحدة تطوير البرمجيات' : 'Software Development Unit',
          head: isRTL ? 'محمد علي السالم' : 'Mohammed Ali Al-Salem',
          employees: 32,
          status: 'active',
          description: isRTL ? 'تطوير وصيانة التطبيقات والأنظمة' : 'Development and maintenance of applications and systems'
        },
        {
          id: 'u2',
          name: isRTL ? 'وحدة الأمن السيبراني' : 'Cybersecurity Unit',
          head: isRTL ? 'فاطمة أحمد الزهراني' : 'Fatima Ahmed Al-Zahrani',
          employees: 18,
          status: 'active',
          description: isRTL ? 'حماية الأنظمة والبيانات الرقمية' : 'Protection of digital systems and data'
        },
        {
          id: 'u3',
          name: isRTL ? 'وحدة الدعم التقني' : 'Technical Support Unit',
          head: isRTL ? 'خالد سعد العتيبي' : 'Khalid Saad Al-Otaibi',
          employees: 25,
          status: 'active',
          description: isRTL ? 'دعم المستخدمين وحل المشاكل التقنية' : 'User support and technical problem solving'
        },
        {
          id: 'u4',
          name: isRTL ? 'وحدة البنية التحتية' : 'Infrastructure Unit',
          head: isRTL ? 'عبدالله محمد القحطاني' : 'Abdullah Mohammed Al-Qahtani',
          employees: 10,
          status: 'active',
          description: isRTL ? 'إدارة الخوادم والشبكات' : 'Server and network management'
        }
      ]
    },
    {
      id: '2',
      name: isRTL ? 'إدارة التسويق' : 'Marketing Department',
      manager: isRTL ? 'نورا علي الزهراني' : 'Nora Ali Al-Zahrani',
      totalEmployees: 78,
      units: [
        {
          id: 'u5',
          name: isRTL ? 'وحدة التسويق الرقمي' : 'Digital Marketing Unit',
          head: isRTL ? 'سارة عبدالرحمن الشمري' : 'Sarah Abdulrahman Al-Shammari',
          employees: 22,
          status: 'active',
          description: isRTL ? 'التسويق عبر المنصات الرقمية' : 'Marketing through digital platforms'
        },
        {
          id: 'u6',
          name: isRTL ? 'وحدة التسويق التقليدي' : 'Traditional Marketing Unit',
          head: isRTL ? 'علي حسن المطيري' : 'Ali Hassan Al-Mutairi',
          employees: 15,
          status: 'active',
          description: isRTL ? 'الإعلانات التقليدية والطباعة' : 'Traditional advertising and print'
        },
        {
          id: 'u7',
          name: isRTL ? 'وحدة العلاقات العامة' : 'Public Relations Unit',
          head: isRTL ? 'منى سالم الغامدي' : 'Mona Salem Al-Ghamdi',
          employees: 12,
          status: 'active',
          description: isRTL ? 'إدارة العلاقات مع الإعلام والجمهور' : 'Media and public relations management'
        },
        {
          id: 'u8',
          name: isRTL ? 'وحدة تحليل السوق' : 'Market Analysis Unit',
          head: isRTL ? 'يوسف أحمد الحربي' : 'Youssef Ahmed Al-Harbi',
          employees: 18,
          status: 'active',
          description: isRTL ? 'دراسة وتحليل اتجاهات السوق' : 'Market trends study and analysis'
        },
        {
          id: 'u9',
          name: isRTL ? 'وحدة إدارة العلامة التجارية' : 'Brand Management Unit',
          head: isRTL ? 'ريم محمد العمري' : 'Reem Mohammed Al-Omari',
          employees: 11,
          status: 'active',
          description: isRTL ? 'إدارة وتطوير الهوية التجارية' : 'Brand identity management and development'
        }
      ]
    },
    {
      id: '3',
      name: isRTL ? 'إدارة المبيعات' : 'Sales Department',
      manager: isRTL ? 'عبدالله محمد القحطاني' : 'Abdullah Mohammed Al-Qahtani',
      totalEmployees: 92,
      units: [
        {
          id: 'u10',
          name: isRTL ? 'وحدة المبيعات المباشرة' : 'Direct Sales Unit',
          head: isRTL ? 'أحمد سالم الدوسري' : 'Ahmed Salem Al-Dosari',
          employees: 35,
          status: 'active',
          description: isRTL ? 'المبيعات المباشرة للعملاء' : 'Direct customer sales'
        },
        {
          id: 'u11',
          name: isRTL ? 'وحدة المبيعات الإلكترونية' : 'E-commerce Unit',
          head: isRTL ? 'هند عبدالعزيز النجار' : 'Hind Abdulaziz Al-Najjar',
          employees: 28,
          status: 'active',
          description: isRTL ? 'المبيعات عبر المنصات الإلكترونية' : 'Sales through electronic platforms'
        },
        {
          id: 'u12',
          name: isRTL ? 'وحدة خدمة العملاء' : 'Customer Service Unit',
          head: isRTL ? 'نادية علي الشهري' : 'Nadia Ali Al-Shehri',
          employees: 29,
          status: 'active',
          description: isRTL ? 'دعم ومتابعة العملاء' : 'Customer support and follow-up'
        }
      ]
    },
    {
      id: '4',
      name: isRTL ? 'الإدارة المالية' : 'Finance Department',
      manager: isRTL ? 'خالد سعد العتيبي' : 'Khalid Saad Al-Otaibi',
      totalEmployees: 45,
      units: [
        {
          id: 'u13',
          name: isRTL ? 'وحدة المحاسبة' : 'Accounting Unit',
          head: isRTL ? 'عبدالرحمن محمد الجهني' : 'Abdulrahman Mohammed Al-Jehani',
          employees: 20,
          status: 'active',
          description: isRTL ? 'إدارة الحسابات والقوائم المالية' : 'Accounts and financial statements management'
        },
        {
          id: 'u14',
          name: isRTL ? 'وحدة الخزينة' : 'Treasury Unit',
          head: isRTL ? 'لطيفة أحمد البلوي' : 'Latifa Ahmed Al-Balawi',
          employees: 25,
          status: 'active',
          description: isRTL ? 'إدارة السيولة والاستثمارات' : 'Liquidity and investment management'
        }
      ]
    }
  ];

  const toggleDepartment = (deptId) => {
    setExpandedDepts(prev => 
      prev.includes(deptId) 
        ? prev.filter(id => id !== deptId)
        : [...prev, deptId]
    );
  };

  const handleAddUnit = (deptId) => {
    console.log('إضافة وحدة جديدة للإدارة:', deptId);
  };

  const handleEditUnit = (unit) => {
    console.log('تعديل الوحدة:', unit.name);
  };

  const handleDeleteUnit = (unit) => {
    console.log('حذف الوحدة:', unit.name);
  };

  const handleLinkUnit = (unit) => {
    console.log('ربط الوحدة:', unit.name);
  };

  const handleUnlinkUnit = (unit) => {
    console.log('إلغاء ربط الوحدة:', unit.name);
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
      {/* إحصائيات سريعة */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft hover:shadow-glow transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">4</p>
            <p className="text-sm text-muted-foreground">{isRTL ? 'إدارات رئيسية' : 'Main Departments'}</p>
          </CardContent>
        </Card>

        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft hover:shadow-glow transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Layers className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">14</p>
            <p className="text-sm text-muted-foreground">{isRTL ? 'وحدة فرعية' : 'Sub Units'}</p>
          </CardContent>
        </Card>

        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft hover:shadow-glow transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">300</p>
            <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي الموظفين' : 'Total Employees'}</p>
          </CardContent>
        </Card>

        <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft hover:shadow-glow transition-shadow duration-300">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Network className="h-6 w-6 text-white" />
            </div>
            <p className="text-2xl font-bold text-foreground">100%</p>
            <p className="text-sm text-muted-foreground">{isRTL ? 'معدل الربط' : 'Link Rate'}</p>
          </CardContent>
        </Card>
      </div>

      {/* الهيكل التنظيمي للوحدات */}
      <Card className="border border-border/20 bg-white/95 backdrop-blur-sm shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl font-bold text-foreground">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
              <Layers className="h-5 w-5 text-white" />
            </div>
            {isRTL ? 'هيكل الإدارات والوحدات' : 'Departments & Units Structure'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {departmentsWithUnits.map((dept) => (
            <div key={dept.id} className="border border-border/20 rounded-2xl overflow-hidden">
              {/* رأس الإدارة */}
              <div 
                className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 cursor-pointer hover:from-primary/10 hover:to-primary/15 transition-all duration-300"
                onClick={() => toggleDepartment(dept.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {expandedDepts.includes(dept.id) ? 
                        <ChevronDown className="h-5 w-5 text-primary" /> : 
                        <ChevronRight className="h-5 w-5 text-primary" />
                      }
                      <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-glow rounded-xl flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground">{dept.name}</h3>
                      <p className="text-sm text-muted-foreground">{dept.manager}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <p className="text-lg font-bold text-primary">{dept.units.length}</p>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'وحدة' : 'Units'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-foreground">{dept.totalEmployees}</p>
                      <p className="text-xs text-muted-foreground">{isRTL ? 'موظف' : 'Employees'}</p>
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-gradient-to-r from-primary to-primary-glow text-white shadow-soft hover:shadow-glow transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddUnit(dept.id);
                      }}
                    >
                      <Plus className="h-4 w-4 ml-1" />
                      {isRTL ? 'إضافة وحدة' : 'Add Unit'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* الوحدات الفرعية */}
              {expandedDepts.includes(dept.id) && (
                <div className="p-6 bg-white border-t border-border/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {dept.units.map((unit, index) => (
                      <Card 
                        key={unit.id} 
                        className="group hover:shadow-soft hover:scale-[1.02] transition-all duration-300 border border-border/20 bg-card/30 overflow-hidden relative"
                      >
                        {/* خلفية متحركة للوحدة */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        <CardContent className="p-4 relative z-10">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-muted/30 to-muted/10 group-hover:from-primary group-hover:to-primary-glow rounded-lg flex items-center justify-center transition-all duration-300">
                                <Target className="h-4 w-4 text-muted-foreground group-hover:text-white transition-colors duration-300" />
                              </div>
                              <div>
                                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">{unit.name}</h4>
                                <p className="text-xs text-muted-foreground">{unit.head}</p>
                              </div>
                            </div>
                            {getStatusBadge(unit.status)}
                          </div>

                          <p className="text-sm text-muted-foreground mb-3 bg-card/50 p-2 rounded-lg">
                            {unit.description}
                          </p>

                          <div className="flex items-center justify-between mb-4">
                            <div className="text-center">
                              <p className="text-lg font-bold text-primary">{unit.employees}</p>
                              <p className="text-xs text-muted-foreground">{isRTL ? 'موظف' : 'Employees'}</p>
                            </div>
                          </div>

                          {/* أزرار العمليات */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 text-primary hover:bg-primary/10"
                                onClick={() => handleEditUnit(unit)}
                              >
                                <Edit className="h-3 w-3 ml-1" />
                                {isRTL ? 'تعديل' : 'Edit'}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 text-primary hover:bg-primary/10"
                                onClick={() => handleLinkUnit(unit)}
                              >
                                <Link className="h-3 w-3 ml-1" />
                                {isRTL ? 'ربط' : 'Link'}
                              </Button>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteUnit(unit)}
                            >
                              <Trash2 className="h-3 w-3 ml-1" />
                              {isRTL ? 'حذف' : 'Delete'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default UnitsManagement;