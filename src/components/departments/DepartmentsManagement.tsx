import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import {
  Building2,
  Users,
  Plus,
  Search,
  Edit2,
  Trash2,
  ArrowLeft,
  Upload,
  Download,
  Settings,
  Target,
  TrendingUp,
  Filter,
  MoreVertical,
  Lightbulb,
  GitBranch,
  Layers,
  Crown,
  MapPin,
  Calendar,
  DollarSign,
  Eye,
  EyeOff,
  Shuffle
} from 'lucide-react';
import { useDepartments } from '@/hooks/useDepartments';
import DepartmentHierarchy from './DepartmentHierarchy';
import DepartmentDetails from './DepartmentDetails';
import OrganizationalChart from './OrganizationalChart';
import AIInsights from './AIInsights';
import DepartmentKPIs from './DepartmentKPIs';

interface DepartmentsManagementProps {
  onBack: () => void;
}

const DepartmentsManagement: React.FC<DepartmentsManagementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'hierarchy' | 'chart'>('list');
  const [filterType, setFilterType] = useState('all');
  const [filterFunction, setFilterFunction] = useState('all');

  const {
    departments,
    isLoading,
    createDepartment,
    updateDepartment,
    deleteDepartment,
    getDepartmentHierarchy,
    getAIInsights
  } = useDepartments();

  const [newDepartment, setNewDepartment] = useState({
    department_code: '',
    name_ar: '',
    name_en: '',
    description: '',
    function_type: 'operational',
    sector_type: 'private',
    parent_department_id: null,
    cost_center_code: '',
    location: '',
    budget_allocation: 0,
    visibility_level: 'internal',
    custom_fields: {}
  });

  // AI Insights and recommendations
  const [aiInsights, setAIInsights] = useState<any[]>([]);
  const [showAIPanel, setShowAIPanel] = useState(false);

  useEffect(() => {
    if (!isLoading && departments.length > 0) {
      loadAIInsights();
    }
  }, [departments, isLoading]);

  const loadAIInsights = async () => {
    try {
      const insights = await getAIInsights();
      setAIInsights(insights);
    } catch (error) {
      console.error('Failed to load AI insights:', error);
    }
  };

  // Filter departments based on search and filters
  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name_ar.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.name_en?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.department_code.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || dept.department_type === filterType;
    const matchesFunction = filterFunction === 'all' || dept.function_type === filterFunction;
    
    return matchesSearch && matchesType && matchesFunction && dept.is_active;
  });

  // Calculate department statistics
  const departmentStats = {
    total: departments.filter(d => d.is_active).length,
    strategic: departments.filter(d => d.function_type === 'strategic' && d.is_active).length,
    operational: departments.filter(d => d.function_type === 'operational' && d.is_active).length,
    support: departments.filter(d => d.function_type === 'support' && d.is_active).length,
    totalEmployees: departments.reduce((sum, d) => sum + (d.head_count || 0), 0),
    totalBudget: departments.reduce((sum, d) => sum + Number(d.budget_allocation || 0), 0)
  };

  const handleCreateDepartment = async () => {
    try {
      const departmentToCreate = {
        ...newDepartment,
        company_id: 'temp-company-id',
        department_type: 'operational',
        is_active: true,
        head_count: 0,
        sort_order: 0,
        function_type: newDepartment.function_type as "strategic" | "operational" | "support"
      };
      
      await createDepartment(departmentToCreate);
      setIsAddDialogOpen(false);
      setNewDepartment({
        department_code: '',
        name_ar: '',
        name_en: '',
        description: '',
        function_type: 'operational',
        sector_type: 'private',
        parent_department_id: null,
        cost_center_code: '',
        location: '',
        budget_allocation: 0,
        visibility_level: 'internal',
        custom_fields: {}
      });
      toast({
        title: "تم إنشاء القسم بنجاح",
        description: "تم إضافة القسم الجديد إلى الهيكل التنظيمي",
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "فشل في إنشاء القسم",
        variant: "destructive",
      });
    }
  };

  const handleDeleteDepartment = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا القسم؟')) {
      try {
        await deleteDepartment(id);
        toast({
          title: "تم حذف القسم",
          description: "تم حذف القسم بنجاح من الهيكل التنظيمي",
        });
      } catch (error) {
        toast({
          title: "خطأ",
          description: "فشل في حذف القسم",
          variant: "destructive",
        });
      }
    }
  };

  const getFunctionBadgeColor = (functionType: string) => {
    switch (functionType) {
      case 'strategic': return 'bg-primary text-primary-foreground';
      case 'operational': return 'bg-secondary text-secondary-foreground';
      case 'support': return 'bg-accent text-accent-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getVisibilityIcon = (level: string) => {
    return level === 'public' ? Eye : level === 'hr_only' ? EyeOff : Users;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">جاري تحميل الإدارات والأقسام...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button variant="outline" onClick={onBack} className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">الإدارات والأقسام</h1>
              <p className="text-muted-foreground mt-1">إدارة الهيكل التنظيمي الشامل</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <Button 
              variant="outline" 
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="relative"
            >
              <Lightbulb className="h-4 w-4 mr-2" />
              الذكاء الاصطناعي
              {aiInsights.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 text-xs p-0 flex items-center justify-center">
                  {aiInsights.length}
                </Badge>
              )}
            </Button>
            
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة قسم جديد
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>إضافة قسم جديد</DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>رمز القسم</Label>
                    <Input
                      value={newDepartment.department_code}
                      onChange={(e) => setNewDepartment(prev => ({...prev, department_code: e.target.value}))}
                      placeholder="HR, IT, FIN..."
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>نوع الوظيفة</Label>
                    <Select
                      value={newDepartment.function_type}
                      onValueChange={(value) => setNewDepartment(prev => ({...prev, function_type: value}))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="strategic">استراتيجي</SelectItem>
                        <SelectItem value="operational">تشغيلي</SelectItem>
                        <SelectItem value="support">دعم</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>الاسم بالعربية</Label>
                    <Input
                      value={newDepartment.name_ar}
                      onChange={(e) => setNewDepartment(prev => ({...prev, name_ar: e.target.value}))}
                      placeholder="قسم الموارد البشرية"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>الاسم بالإنجليزية</Label>
                    <Input
                      value={newDepartment.name_en}
                      onChange={(e) => setNewDepartment(prev => ({...prev, name_en: e.target.value}))}
                      placeholder="Human Resources Department"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>رمز مركز التكلفة</Label>
                    <Input
                      value={newDepartment.cost_center_code}
                      onChange={(e) => setNewDepartment(prev => ({...prev, cost_center_code: e.target.value}))}
                      placeholder="CC-001"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>الموقع</Label>
                    <Input
                      value={newDepartment.location}
                      onChange={(e) => setNewDepartment(prev => ({...prev, location: e.target.value}))}
                      placeholder="المبنى الرئيسي - الطابق الثالث"
                    />
                  </div>
                  
                  <div className="md:col-span-2 space-y-2">
                    <Label>الوصف</Label>
                    <Textarea
                      value={newDepartment.description}
                      onChange={(e) => setNewDepartment(prev => ({...prev, description: e.target.value}))}
                      placeholder="وصف القسم ومهامه الأساسية..."
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    إلغاء
                  </Button>
                  <Button onClick={handleCreateDepartment}>
                    إنشاء القسم
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">إجمالي الأقسام</p>
                  <p className="text-2xl font-bold">{departmentStats.total}</p>
                </div>
                <Building2 className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">استراتيجي</p>
                  <p className="text-2xl font-bold">{departmentStats.strategic}</p>
                </div>
                <Crown className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-accent to-accent/80 text-accent-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">تشغيلي</p>
                  <p className="text-2xl font-bold">{departmentStats.operational}</p>
                </div>
                <Layers className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-muted to-muted/80 text-muted-foreground">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">دعم</p>
                  <p className="text-2xl font-bold">{departmentStats.support}</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">إجمالي الموظفين</p>
                  <p className="text-2xl font-bold">{departmentStats.totalEmployees}</p>
                </div>
                <Users className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">إجمالي الميزانية</p>
                  <p className="text-lg font-bold">{departmentStats.totalBudget.toLocaleString()} ر.س</p>
                </div>
                <DollarSign className="h-8 w-8 opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          {/* AI Insights Panel */}
          {showAIPanel && (
            <Card className="w-80 h-fit">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2" />
                  رؤى الذكاء الاصطناعي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AIInsights insights={aiInsights} onApplyRecommendation={() => {}} />
              </CardContent>
            </Card>
          )}
          
          {/* Main Panel */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
                <TabsTrigger value="hierarchy">الهيكل التنظيمي</TabsTrigger>
                <TabsTrigger value="chart">المخطط التنظيمي</TabsTrigger>
                <TabsTrigger value="kpis">مؤشرات الأداء</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                {/* Search and Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="البحث في الأقسام..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={filterFunction} onValueChange={setFilterFunction}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="نوع الوظيفة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع الأنواع</SelectItem>
                      <SelectItem value="strategic">استراتيجي</SelectItem>
                      <SelectItem value="operational">تشغيلي</SelectItem>
                      <SelectItem value="support">دعم</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                    >
                      قائمة
                    </Button>
                    <Button
                      variant={viewMode === 'hierarchy' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('hierarchy')}
                    >
                      هيكل
                    </Button>
                  </div>
                </div>

                {/* Departments List/Hierarchy View */}
                {viewMode === 'list' ? (
                  <div className="grid gap-4">
                    {filteredDepartments.map((department) => (
                      <Card key={department.id} className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 space-x-reverse flex-1">
                              <div className="bg-primary/10 p-3 rounded-lg">
                                <Building2 className="h-6 w-6 text-primary" />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 space-x-reverse mb-2">
                                  <h3 className="text-lg font-semibold text-foreground">
                                    {department.name_ar}
                                  </h3>
                                  {department.name_en && (
                                    <span className="text-sm text-muted-foreground">({department.name_en})</span>
                                  )}
                                  <Badge variant="secondary" className="text-xs">
                                    {department.department_code}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground">
                                  <Badge className={getFunctionBadgeColor(department.function_type)}>
                                    {department.function_type === 'strategic' ? 'استراتيجي' :
                                     department.function_type === 'operational' ? 'تشغيلي' : 'دعم'}
                                  </Badge>
                                  
                                  {department.location && (
                                    <div className="flex items-center">
                                      <MapPin className="h-3 w-3 mr-1" />
                                      {department.location}
                                    </div>
                                  )}
                                  
                                  <div className="flex items-center">
                                    <Users className="h-3 w-3 mr-1" />
                                    {department.head_count || 0} موظف
                                  </div>
                                  
                                  {department.budget_allocation && Number(department.budget_allocation) > 0 && (
                                    <div className="flex items-center">
                                      <DollarSign className="h-3 w-3 mr-1" />
                                      {Number(department.budget_allocation).toLocaleString()} ر.س
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedDepartment(department.id)}
                              >
                                <Eye className="h-4 w-4" />
                                عرض
                              </Button>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {/* Edit handler */}}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteDepartment(department.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {department.description && (
                            <div className="mt-4 pt-4 border-t">
                              <p className="text-sm text-muted-foreground">{department.description}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <DepartmentHierarchy 
                        departments={filteredDepartments}
                        onSelectDepartment={setSelectedDepartment}
                      />
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="hierarchy" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <DepartmentHierarchy 
                      departments={departments}
                      onSelectDepartment={setSelectedDepartment}
                      showAdvanced={true}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="chart" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <OrganizationalChart departments={departments} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="kpis" className="mt-6">
                <DepartmentKPIs departments={departments} />
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Department Details Modal */}
        {selectedDepartment && (
          <DepartmentDetails
            departmentId={selectedDepartment}
            isOpen={!!selectedDepartment}
            onClose={() => setSelectedDepartment(null)}
          />
        )}
      </div>
    </div>
  );
};

export default DepartmentsManagement;