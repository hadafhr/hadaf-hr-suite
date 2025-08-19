import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Building2,
  Users,
  MapPin,
  DollarSign,
  Target,
  TrendingUp,
  Calendar,
  Edit2,
  Settings,
  Award,
  Briefcase,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  BarChart3,
  FileText,
  UserPlus
} from 'lucide-react';
import { useDepartments } from '@/hooks/useDepartments';

interface DepartmentDetailsProps {
  departmentId: string;
  isOpen: boolean;
  onClose: () => void;
}

const DepartmentDetails: React.FC<DepartmentDetailsProps> = ({
  departmentId,
  isOpen,
  onClose
}) => {
  const { departments } = useDepartments();
  const [activeTab, setActiveTab] = useState('overview');
  const department = departments.find(d => d.id === departmentId);

  // Mock data for demonstration
  const mockEmployees = [
    {
      id: '1',
      name: 'أحمد محمد',
      position: 'مدير القسم',
      avatar: '/api/placeholder/32/32',
      email: 'ahmed@company.com',
      phone: '+966501234567',
      joinDate: '2022-01-15',
      status: 'نشط'
    },
    {
      id: '2',
      name: 'فاطمة عبدالله',
      position: 'أخصائي أول',
      avatar: '/api/placeholder/32/32',
      email: 'fatima@company.com',
      phone: '+966501234568',
      joinDate: '2022-03-10',
      status: 'نشط'
    },
    {
      id: '3',
      name: 'محمد الخالدي',
      position: 'محلل',
      avatar: '/api/placeholder/32/32',
      email: 'mohamed@company.com',
      phone: '+966501234569',
      joinDate: '2023-06-01',
      status: 'نشط'
    }
  ];

  const mockKPIs = [
    {
      id: '1',
      name: 'كفاءة العمليات',
      current: 88,
      target: 90,
      unit: '%',
      trend: 'up'
    },
    {
      id: '2',
      name: 'رضا العملاء',
      current: 87,
      target: 85,
      unit: '%',
      trend: 'up'
    },
    {
      id: '3',
      name: 'معدل الحضور',
      current: 95,
      target: 95,
      unit: '%',
      trend: 'stable'
    }
  ];

  const mockProjects = [
    {
      id: '1',
      name: 'تطوير النظام الجديد',
      status: 'قيد التنفيذ',
      progress: 75,
      deadline: '2024-03-15',
      priority: 'عالية'
    },
    {
      id: '2',
      name: 'تحسين الأمان السيبراني',
      status: 'مكتمل',
      progress: 100,
      deadline: '2024-02-01',
      priority: 'متوسطة'
    },
    {
      id: '3',
      name: 'تدريب الموظفين',
      status: 'مجدول',
      progress: 25,
      deadline: '2024-04-30',
      priority: 'منخفضة'
    }
  ];

  const mockRequests = [
    {
      id: '1',
      type: 'إجازة',
      employee: 'أحمد محمد',
      date: '2024-01-20',
      status: 'معلق'
    },
    {
      id: '2',
      type: 'سلفة',
      employee: 'فاطمة عبدالله',
      date: '2024-01-19',
      status: 'موافق عليه'
    },
    {
      id: '3',
      type: 'إضافية',
      employee: 'محمد الخالدي',
      date: '2024-01-18',
      status: 'مرفوض'
    }
  ];

  if (!department) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'bg-green-100 text-green-800';
      case 'قيد التنفيذ': return 'bg-blue-100 text-blue-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      case 'مجدول': return 'bg-yellow-100 text-yellow-800';
      case 'موافق عليه': return 'bg-green-100 text-green-800';
      case 'معلق': return 'bg-yellow-100 text-yellow-800';
      case 'مرفوض': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'عالية': return 'bg-red-100 text-red-800';
      case 'متوسطة': return 'bg-yellow-100 text-yellow-800';
      case 'منخفضة': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Building2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <DialogTitle className="text-xl">{department.name_ar}</DialogTitle>
                {department.name_en && (
                  <p className="text-muted-foreground">{department.name_en}</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Edit2 className="h-4 w-4 mr-2" />
                تعديل
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                إعدادات
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
              <TabsTrigger value="employees">الموظفون</TabsTrigger>
              <TabsTrigger value="kpis">مؤشرات الأداء</TabsTrigger>
              <TabsTrigger value="projects">المشاريع</TabsTrigger>
              <TabsTrigger value="requests">الطلبات</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="overview" className="mt-0 space-y-6">
                {/* Basic Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">عدد الموظفين</p>
                          <p className="text-2xl font-bold">{department.head_count || 0}</p>
                        </div>
                        <Users className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">الميزانية</p>
                          <p className="text-lg font-bold">
                            {Number(department.budget_allocation || 0).toLocaleString()} ر.س
                          </p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">المشاريع النشطة</p>
                          <p className="text-2xl font-bold">
                            {mockProjects.filter(p => p.status === 'قيد التنفيذ').length}
                          </p>
                        </div>
                        <Briefcase className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">معدل الأداء</p>
                          <p className="text-2xl font-bold text-green-600">88%</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Department Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>معلومات القسم</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">رمز القسم</label>
                          <p className="font-semibold">{department.department_code}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">نوع الوظيفة</label>
                          <Badge className="ml-2">
                            {department.function_type === 'strategic' ? 'استراتيجي' :
                             department.function_type === 'operational' ? 'تشغيلي' : 'دعم'}
                          </Badge>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-muted-foreground">رمز مركز التكلفة</label>
                          <p className="font-semibold">{department.cost_center_code || 'غير محدد'}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">الموقع</label>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <p className="font-semibold">{department.location || 'غير محدد'}</p>
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium text-muted-foreground">تاريخ الإنشاء</label>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <p className="font-semibold">
                              {new Date(department.created_at).toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                        </div>

                        <div>
                          <label className="text-sm font-medium text-muted-foreground">مستوى الرؤية</label>
                          <Badge variant="outline">
                            {department.visibility_level === 'public' ? 'عام' :
                             department.visibility_level === 'internal' ? 'داخلي' : 'موارد بشرية فقط'}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {department.description && (
                      <div className="mt-6 pt-6 border-t">
                        <label className="text-sm font-medium text-muted-foreground">الوصف</label>
                        <p className="mt-2 text-foreground">{department.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>النشاط الأخير</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <UserPlus className="h-4 w-4 text-green-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">تم تعيين موظف جديد</p>
                          <p className="text-sm text-muted-foreground">محمد الخالدي - محلل نظم</p>
                        </div>
                        <span className="text-sm text-muted-foreground">قبل 3 أيام</span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Target className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">تحديث مؤشر أداء</p>
                          <p className="text-sm text-muted-foreground">كفاءة العمليات: 88%</p>
                        </div>
                        <span className="text-sm text-muted-foreground">قبل 5 أيام</span>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Briefcase className="h-4 w-4 text-purple-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">بدء مشروع جديد</p>
                          <p className="text-sm text-muted-foreground">تطوير النظام الجديد</p>
                        </div>
                        <span className="text-sm text-muted-foreground">قبل أسبوع</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="employees" className="mt-0">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>موظفو القسم</CardTitle>
                      <Button size="sm">
                        <UserPlus className="h-4 w-4 mr-2" />
                        إضافة موظف
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockEmployees.map((employee) => (
                        <div key={employee.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={employee.avatar} />
                              <AvatarFallback>{employee.name.slice(0, 2)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{employee.name}</h4>
                              <p className="text-sm text-muted-foreground">{employee.position}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <Badge className={getStatusColor(employee.status)}>
                              {employee.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">
                              انضم في {new Date(employee.joinDate).toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kpis" className="mt-0">
                <div className="grid gap-4">
                  {mockKPIs.map((kpi) => (
                    <Card key={kpi.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <BarChart3 className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="font-semibold">{kpi.name}</h3>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold">{kpi.current}{kpi.unit}</span>
                            <span className="text-muted-foreground"> / {kpi.target}{kpi.unit}</span>
                          </div>
                        </div>
                        
                        <Progress value={(kpi.current / kpi.target) * 100} className="mb-2" />
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>التقدم: {Math.round((kpi.current / kpi.target) * 100)}%</span>
                          <span className={kpi.trend === 'up' ? 'text-green-600' : 'text-gray-600'}>
                            {kpi.trend === 'up' ? '↗ متزايد' : '→ مستقر'}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="projects" className="mt-0">
                <div className="grid gap-4">
                  {mockProjects.map((project) => (
                    <Card key={project.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold">{project.name}</h3>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                              <Badge className={getPriorityColor(project.priority)} variant="outline">
                                {project.priority}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold">{project.progress}%</span>
                            <p className="text-sm text-muted-foreground">
                              موعد التسليم: {new Date(project.deadline).toLocaleDateString('ar-SA')}
                            </p>
                          </div>
                        </div>
                        
                        <Progress value={project.progress} />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="requests" className="mt-0">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {mockRequests.map((request) => (
                        <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                              <FileText className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{request.type}</h4>
                              <p className="text-sm text-muted-foreground">{request.employee}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <Badge className={getStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                              <p className="text-sm text-muted-foreground mt-1">
                                {new Date(request.date).toLocaleDateString('ar-SA')}
                              </p>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DepartmentDetails;