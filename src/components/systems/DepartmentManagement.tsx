import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Building, Users, ArrowLeft, Search, Filter, Plus, Edit, Eye, Trash2,
  Download, FileText, RefreshCw, BarChart3, TrendingUp, Settings,
  Target, Award, Crown, Shield, Briefcase, CheckCircle, AlertTriangle,
  Upload, Activity, Calendar, Clock, Mail, Phone, Grid
} from 'lucide-react';
import { useDepartments, type Department } from '@/hooks/useDepartments';
import { EmptyDepartmentsView } from './EmptyDepartmentsView';
import { format } from 'date-fns';
import jsPDF from 'jspdf';

interface DepartmentManagementProps {
  onBack: () => void;
}

export const DepartmentManagement: React.FC<DepartmentManagementProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDetails, setShowDetails] = useState<{[key: string]: boolean}>({});
  const { departments, isLoading } = useDepartments();

  // Filter departments
  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = 
      dept.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.name_en?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && dept.is_active) ||
      (filterStatus === 'inactive' && !dept.is_active);
    
    return matchesSearch && matchesStatus;
  });

  // Statistics
  const stats = {
    total: departments.length,
    active: departments.filter(d => d.is_active).length,
    inactive: departments.filter(d => !d.is_active).length,
    totalEmployees: departments.reduce((sum, d) => sum + (d.head_count || 0), 0),
    totalBudget: departments.reduce((sum, d) => sum + (d.budget_allocation || 0), 0),
    avgBudget: departments.length > 0 ? Math.round(departments.reduce((sum, d) => sum + (d.budget_allocation || 0), 0) / departments.length) : 0
  };

  // Status card click handlers
  const handleStatusCardClick = (status: string) => {
    const statusDepartments = departments.filter(d => 
      status === 'active' ? d.is_active : 
      status === 'inactive' ? !d.is_active : true
    );
    setShowDetails(prev => ({ ...prev, [status]: !prev[status] }));
  };

  const handleExportPDF = async () => {
    try {
      const doc = new jsPDF();
      
      doc.setFontSize(16);
      doc.text('Departments Report', 20, 30);
      doc.setFontSize(12);
      doc.text(`Generated on: ${new Date().toLocaleDateString('ar-SA')}`, 20, 45);
      
      let yPos = 65;
      filteredDepartments.forEach((dept, index) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 30;
        }
        
        doc.text(`${index + 1}. ${dept.name_ar}`, 20, yPos);
        doc.text(`Department Code: ${dept.department_code || 'N/A'}`, 30, yPos + 10);
        doc.text(`Budget: ${dept.budget_allocation || 0}`, 30, yPos + 20);
        doc.text(`Employees: ${dept.head_count || 0}`, 30, yPos + 30);
        
        yPos += 50;
      });
      
      doc.save('departments-report.pdf');
      
      toast({
        title: "تم تصدير التقرير بنجاح",
        description: "تم تحميل ملف PDF لبيانات الأقسام"
      });
    } catch (error) {
      toast({
        title: "خطأ في التصدير",
        description: "حدث خطأ أثناء تصدير التقرير"
      });
    }
  };

  const handleExportExcel = () => {
    const csvContent = [
      ['Department Name', 'Department Head', 'Budget', 'Employees', 'Status'].join(','),
      ...filteredDepartments.map(dept => [
        `"${dept.name_ar}"`,
        `"${dept.department_code || 'N/A'}"`,
        dept.budget_allocation || 0,
        dept.head_count || 0,
        dept.is_active ? 'Active' : 'Inactive'
      ].join(','))
    ].join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = 'departments-report.csv';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
      title: "تم تصدير البيانات بنجاح",
      description: "تم تحميل ملف Excel لبيانات الأقسام"
    });
  };

  const handleRefreshData = () => {
    window.location.reload();
    toast({
      title: "تم تحديث البيانات",
      description: "تم تحديث بيانات الأقسام بنجاح"
    });
  };

  const handleAddDepartment = () => {
    alert('سيتم فتح نموذج إضافة قسم جديد');
  };

  const handleViewDepartment = (dept: Department) => {
    alert(`عرض تفاصيل القسم: ${dept.name_ar}`);
  };

  const handleEditDepartment = (dept: Department) => {
    alert(`تعديل القسم: ${dept.name_ar}`);
  };
  
  // If no departments exist, show empty state
  if (!isLoading && departments.length === 0) {
    return <EmptyDepartmentsView onDepartmentAdded={() => window.location.reload()} />;
  }

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
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm" onClick={handleExportPDF}>
                  <FileText className="h-4 w-4 ml-2" />
                  تصدير PDF
                </Button>
                <Button className="bg-primary/80 border-primary/30 text-white hover:bg-primary/90 backdrop-blur-sm" onClick={handleExportExcel}>
                  <Download className="h-4 w-4 ml-2" />
                  تصدير Excel
                </Button>
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg" onClick={handleRefreshData}>
                  <RefreshCw className="h-4 w-4 ml-2" />
                  تحديث البيانات
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="dashboard">لوحة التحكم</TabsTrigger>
            <TabsTrigger value="departments">إدارة الأقسام</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Daily Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleStatusCardClick('total')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي الأقسام</p>
                      <p className="text-2xl font-bold text-blue-600">{stats.total}</p>
                    </div>
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleStatusCardClick('active')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">الأقسام النشطة</p>
                      <p className="text-2xl font-bold text-green-600">{stats.active}</p>
                    </div>
                    <div className="p-2 bg-green-100 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleStatusCardClick('inactive')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">الأقسام غير النشطة</p>
                      <p className="text-2xl font-bold text-red-600">{stats.inactive}</p>
                    </div>
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-red-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleStatusCardClick('employees')}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">إجمالي الموظفين</p>
                      <p className="text-2xl font-bold text-purple-600">{stats.totalEmployees}</p>
                    </div>
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Users className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Detailed Department Lists for Each Status */}
            {Object.entries(showDetails).map(([status, isVisible]) => {
              if (!isVisible) return null;
              
              const statusDepartments = departments.filter(d => 
                status === 'active' ? d.is_active : 
                status === 'inactive' ? !d.is_active : true
              );
              const statusLabels = {
                total: 'جميع الأقسام',
                active: 'الأقسام النشطة',
                inactive: 'الأقسام غير النشطة',
                employees: 'توزيع الموظفين'
              };
              
              return (
                <Card key={status}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {statusLabels[status as keyof typeof statusLabels]}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setShowDetails(prev => ({ ...prev, [status]: false }))}
                      >
                        إخفاء
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {statusDepartments.map(dept => (
                        <div key={dept.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                              <Building className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <p className="font-medium">{dept.name_ar}</p>
                              <p className="text-sm text-muted-foreground">
                                {dept.department_code} - {dept.function_type || 'لم يحدد'}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={dept.is_active ? "default" : "secondary"}>
                              {dept.is_active ? 'نشط' : 'غير نشط'}
                            </Badge>
                            <Button size="sm" variant="ghost" onClick={() => handleViewDepartment(dept)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => handleEditDepartment(dept)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="departments" className="space-y-6">
            {/* Search and Filter */}
            <Card className="bg-white/70 backdrop-blur-sm border-white/20 shadow-xl">
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
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="bg-white/80 border-white/30">
                      <SelectValue placeholder="تصفية حسب الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأقسام</SelectItem>
                      <SelectItem value="active">الأقسام النشطة</SelectItem>
                      <SelectItem value="inactive">الأقسام غير النشطة</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button onClick={handleAddDepartment} className="bg-primary hover:bg-primary/90">
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة قسم جديد
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Departments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDepartments.map((dept) => (
                <Card key={dept.id} className="hover:shadow-lg transition-shadow border-0 bg-white/80 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{dept.name_ar}</CardTitle>
                      <Badge variant={dept.is_active ? "default" : "secondary"}>
                        {dept.is_active ? 'نشط' : 'غير نشط'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{dept.name_en}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">كود القسم: {dept.department_code}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">عدد الموظفين: {dept.head_count || 0}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Crown className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">نوع القسم: {dept.function_type || 'لم يحدد'}</span>
                      </div>
                      {dept.budget_allocation && (
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm">الميزانية: {dept.budget_allocation.toLocaleString()} ر.س</span>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" onClick={() => handleViewDepartment(dept)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditDepartment(dept)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تقارير الأقسام والإدارات</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  اختر نوع التقرير المطلوب لعرض البيانات التفصيلية للأقسام
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" onClick={handleExportPDF}>
                    <FileText className="h-4 w-4 ml-2" />
                    تقرير PDF
                  </Button>
                  <Button variant="outline" onClick={handleExportExcel}>
                    <Download className="h-4 w-4 ml-2" />
                    تقرير Excel
                  </Button>
                  <Button variant="outline">
                    <BarChart3 className="h-4 w-4 ml-2" />
                    تقرير تحليلي
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات النظام</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  إعدادات عامة لنظام إدارة الأقسام والإدارات
                </p>
                <div className="mt-4">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 ml-2" />
                    الإعدادات العامة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};