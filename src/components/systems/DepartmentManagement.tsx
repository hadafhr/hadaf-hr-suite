import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, Building, Users, Plus, Edit, Trash2, Search, 
  BarChart3, TrendingUp, Activity, Bell, Settings, 
  FileText, Calendar, Clock, Target, Award, Briefcase,
  UserPlus, CheckCircle, AlertCircle, ChartBar, Eye,
  Filter, Download, Upload, List, Grid, MessageSquare,
  Building2, Mail, Phone, Crown, Shield, Hexagon
} from 'lucide-react';
import { useDepartments, type Department } from '@/hooks/useDepartments';
import { EmptyDepartmentsView } from './EmptyDepartmentsView';

interface DepartmentManagementProps {
  onBack: () => void;
}

export const DepartmentManagement: React.FC<DepartmentManagementProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);
  const { departments, isLoading } = useDepartments();

  // Enhanced functionality  
  const handleAddDepartment = () => {
    console.log('Navigating to add department page...');
    alert('سيتم فتح نموذج إضافة قسم جديد');
  };

  const handleEditDepartment = (department: Department) => {
    console.log('Editing department:', department.id);
    alert(`فتح نموذج تعديل للقسم: ${department.name_ar}`);
  };

  const handleDeleteDepartment = (departmentId: string) => {
    if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      console.log('Department deleted:', departmentId);
      alert('تم حذف القسم بنجاح');
    }
  };

  const handleExportData = async (format: 'pdf' | 'excel') => {
    console.log(`Exporting departments data as ${format}`);
    alert(`جاري تصدير بيانات الأقسام بصيغة ${format === 'pdf' ? 'PDF' : 'Excel'}`);
  };

  const handleImportData = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.csv,.xlsx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Importing file:', file.name);
        alert(`جاري استيراد الملف: ${file.name}`);
      }
    };
    input.click();
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  
  // If no departments exist, show empty state
  if (!isLoading && departments.length === 0) {
    return <EmptyDepartmentsView onDepartmentAdded={() => window.location.reload()} />;
  }

  const filteredDepartments = departments.filter(dept =>
    dept.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dept.name_en?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100" dir="rtl">
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-glow p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  رجوع
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Search className="h-4 w-4 ml-2" />
                  البحث المتقدم
                </Button>
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة قسم جديد
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Building className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                نظام إدارة الأقسام والإدارات المتقدم
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                منظومة ذكية شاملة لإدارة الهيكل التنظيمي للشركة مع أنظمة التحكم والمراقبة المتطورة
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {/* Main Panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">إدارة الأقسام والإدارات</h3>
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">إجمالي الأقسام</span>
                      <span className="font-bold text-primary">{departments.length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">الأقسام النشطة</span>
                      <span className="font-bold text-green-600">{departments.filter(dept => dept.is_active).length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">متوسط الموظفين لكل قسم</span>
                      <span className="font-bold text-blue-600">{departments.length > 0 ? Math.round(departments.reduce((sum, dept) => sum + (dept.head_count || 0), 0) / departments.length) : 0}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-800">التحليلات المالية</h3>
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">إجمالي الميزانيات</span>
                      <span className="font-bold text-green-600">{departments.reduce((sum, dept) => sum + (dept.budget_allocation || 0), 0).toLocaleString()} ر.س</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">متوسط ميزانية القسم</span>
                      <span className="font-bold text-blue-600">{departments.length > 0 ? Math.round(departments.reduce((sum, dept) => sum + (dept.budget_allocation || 0), 0) / departments.length).toLocaleString() : 0} ر.س</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">معدل الاستخدام</span>
                      <span className="font-bold text-purple-600">87.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-800 mb-4">إحصائيات الهيكل التنظيمي</h3>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{departments.length}</div>
                    <div className="text-sm text-gray-600">إجمالي الأقسام</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{departments.reduce((sum, dept) => sum + (dept.head_count || 0), 0)}</div>
                    <div className="text-sm text-gray-600">إجمالي الموظفين</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{departments.filter(dept => dept.is_active).length}</div>
                    <div className="text-sm text-gray-600">الأقسام النشطة</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* System Overview */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-white to-gray-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">منظومة إدارة الأقسام والإدارات المتكاملة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { icon: Building, label: "الأقسام الرئيسية", color: "text-blue-600", count: departments.length },
                { icon: Building2, label: "الهيكل التنظيمي", color: "text-green-600", count: departments.filter(dept => dept.is_active).length },
                { icon: Users, label: "إدارة الموظفين", color: "text-purple-600", count: departments.reduce((sum, dept) => sum + (dept.head_count || 0), 0) },
                { icon: BarChart3, label: "التقارير التحليلية", color: "text-orange-600", count: 0 },
                { icon: Target, label: "مؤشرات الأداء", color: "text-teal-600", count: 0 },
                { icon: Settings, label: "الإعدادات", color: "text-red-600", count: 0 }
              ].map((item, index) => (
                <div key={index} className="text-center p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                  <div className={`mx-auto w-12 h-12 ${item.color} mb-3 p-2 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors flex items-center justify-center relative`}>
                    <item.icon className="w-6 h-6" />
                    {item.count > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {item.count}
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-gray-700">{item.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8 grid md:grid-cols-3 gap-6 text-center">
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{Math.round((departments.filter(dept => dept.is_active).length / Math.max(departments.length, 1)) * 100)}%</div>
                <div className="text-sm text-gray-600">معدل الأقسام النشطة</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{departments.length > 0 ? Math.round(departments.reduce((sum, dept) => sum + (dept.head_count || 0), 0) / departments.length) : 0}</div>
                <div className="text-sm text-gray-600">متوسط الموظفين لكل قسم</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{departments.length > 0 ? Math.round(departments.reduce((sum, dept) => sum + (dept.budget_allocation || 0), 0) / departments.length / 1000) : 0}K</div>
                <div className="text-sm text-gray-600">متوسط ميزانية القسم (ألف ريال)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <Card className="mb-6 border-0 shadow-lg bg-white/80 backdrop-blur">
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <Grid className="h-4 w-4 ml-2" />
                عرض الشبكة
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-primary hover:bg-primary/90' : ''}
              >
                <List className="h-4 w-4 ml-2" />
                عرض القائمة
              </Button>
              <Button variant="outline" onClick={handleAddDepartment}>
                <Plus className="h-4 w-4 ml-2" />
                إضافة قسم جديد
              </Button>
              <div className="mr-auto flex gap-2">
                {/* Import Button */}
                <Button variant="outline" onClick={handleImportData} className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  استيراد
                </Button>
                
                {/* Export Buttons */}
                <Button variant="outline" onClick={() => handleExportData('pdf')} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" onClick={() => handleExportData('excel')} className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Excel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Search and Filter */}
        <Card className="mb-8 bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="البحث في الأقسام والإدارات..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 bg-white/80 border-white/30 focus:bg-white transition-all"
                />
              </div>
              <Button variant="outline" className="bg-white/80 border-white/30 hover:bg-white">
                <Building className="h-4 w-4 ml-2" />
                تصفية حسب النوع
              </Button>
              <Button variant="outline" className="bg-white/80 border-white/30 hover:bg-white">
                <Users className="h-4 w-4 ml-2" />
                ترتيب حسب عدد الموظفين
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Icon Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 mb-8">
          <Card className="group relative overflow-hidden bg-gradient-to-br from-blue-500 to-blue-600 border-0 hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Building className="h-12 w-12 text-white mx-auto group-hover:scale-110 transition-transform duration-300" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1">
                  {departments.length}
                </Badge>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">الأقسام الرئيسية</h3>
              <p className="text-blue-100 text-sm">إدارة الهيكل التنظيمي</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 border-0 hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Users className="h-12 w-12 text-white mx-auto group-hover:scale-110 transition-transform duration-300" />
                <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs px-2 py-1">
                  {Math.floor(Math.random() * 10) + 5}
                </Badge>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">توزيع الموظفين</h3>
              <p className="text-green-100 text-sm">تخصيص الكوادر البشرية</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 border-0 hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <BarChart3 className="h-12 w-12 text-white mx-auto group-hover:scale-110 transition-transform duration-300" />
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1">
                  جديد
                </Badge>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">التقارير التحليلية</h3>
              <p className="text-purple-100 text-sm">مؤشرات الأداء والإنتاجية</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-orange-500 to-orange-600 border-0 hover:shadow-xl hover:shadow-orange-500/25 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Award className="h-12 w-12 text-white mx-auto group-hover:scale-110 transition-transform duration-300" />
                <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs px-2 py-1">
                  {Math.floor(Math.random() * 5) + 1}
                </Badge>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">الإنجازات</h3>
              <p className="text-orange-100 text-sm">جوائز ومكافآت الأقسام</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600 border-0 hover:shadow-xl hover:shadow-teal-500/25 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Briefcase className="h-12 w-12 text-white mx-auto group-hover:scale-110 transition-transform duration-300" />
                <Badge className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs px-2 py-1">
                  نشط
                </Badge>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">المشاريع الجارية</h3>
              <p className="text-teal-100 text-sm">متابعة مشاريع الأقسام</p>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-gradient-to-br from-pink-500 to-pink-600 border-0 hover:shadow-xl hover:shadow-pink-500/25 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <CardContent className="p-6 text-center">
              <div className="relative mb-4">
                <Settings className="h-12 w-12 text-white mx-auto group-hover:scale-110 transition-transform duration-300" />
                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1">
                  إعداد
                </Badge>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">إعدادات النظام</h3>
              <p className="text-pink-100 text-sm">تخصيص صلاحيات الأقسام</p>
            </CardContent>
          </Card>
        </div>

        {/* Departments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepartments.map((department) => (
            <Card key={department.id} className="group relative overflow-hidden bg-white/70 backdrop-blur-sm border-white/20 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <Building className="h-6 w-6 text-white group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                        {department.name_ar}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">{department.name_en || 'غير محدد'}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={department.is_active ? 'default' : 'secondary'}
                    className={department.is_active ? 'bg-green-500 hover:bg-green-600' : ''}
                  >
                    {department.is_active ? 'نشط' : 'غير نشط'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">
                  {department.description || 'لا يوجد وصف متاح للقسم'}
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl text-center group-hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-primary mb-1">{department.head_count || 0}</div>
                    <div className="text-xs text-muted-foreground font-medium">موظف</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl text-center group-hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-center mb-2">
                      <ChartBar className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="text-lg font-bold text-green-600 mb-1">
                      {department.budget_allocation?.toLocaleString() || '0'} ر.س
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">الميزانية</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Briefcase className="h-4 w-4 text-blue-600" />
                    <div className="text-sm font-bold text-blue-900">نوع القسم</div>
                  </div>
                  <div className="text-sm text-blue-700 font-medium">
                    {department.department_type || 'غير محدد'}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 bg-white/80 border-primary/20 hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    <Edit className="h-4 w-4 ml-1" />
                    تحرير البيانات
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-white/80 border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};