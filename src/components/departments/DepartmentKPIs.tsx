import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Target,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  BarChart3,
  Plus,
  Edit2,
  Trash2,
  Calendar,
  Award,
  AlertCircle,
  Building2
} from 'lucide-react';
import { Department, DepartmentKPI } from '@/hooks/useDepartments';

interface DepartmentKPIsProps {
  departments: Department[];
}

const DepartmentKPIs: React.FC<DepartmentKPIsProps> = ({ departments }) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  const [kpiFilter, setKpiFilter] = useState<string>('all');
  const [isAddKPIOpen, setIsAddKPIOpen] = useState(false);
  const [newKPI, setNewKPI] = useState({
    department_id: '',
    kpi_name: '',
    kpi_type: 'operational' as 'financial' | 'operational' | 'hr' | 'quality',
    target_value: 0,
    current_value: 0,
    unit_of_measure: '',
    frequency: 'monthly' as 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly'
  });

  // Mock KPIs data
  const mockKPIs: DepartmentKPI[] = [
    {
      id: '1',
      department_id: departments[0]?.id || '1',
      kpi_name: 'معدل الحضور',
      kpi_type: 'hr',
      target_value: 95,
      current_value: 92,
      unit_of_measure: '%',
      frequency: 'monthly',
      is_active: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-15'
    },
    {
      id: '2',
      department_id: departments[0]?.id || '1',
      kpi_name: 'الإيرادات الشهرية',
      kpi_type: 'financial',
      target_value: 500000,
      current_value: 480000,
      unit_of_measure: 'ريال',
      frequency: 'monthly',
      is_active: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-15'
    },
    {
      id: '3',
      department_id: departments[1]?.id || '2',
      kpi_name: 'رضا العملاء',
      kpi_type: 'quality',
      target_value: 90,
      current_value: 87,
      unit_of_measure: '%',
      frequency: 'monthly',
      is_active: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-15'
    },
    {
      id: '4',
      department_id: departments[1]?.id || '2',
      kpi_name: 'كفاءة العمليات',
      kpi_type: 'operational',
      target_value: 85,
      current_value: 88,
      unit_of_measure: '%',
      frequency: 'weekly',
      is_active: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-15'
    },
    {
      id: '5',
      department_id: departments[2]?.id || '3',
      kpi_name: 'معدل الدوران الوظيفي',
      kpi_type: 'hr',
      target_value: 5,
      current_value: 7,
      unit_of_measure: '%',
      frequency: 'quarterly',
      is_active: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-15'
    }
  ];

  // Filter KPIs
  const filteredKPIs = mockKPIs.filter(kpi => {
    const matchesDepartment = selectedDepartment === 'all' || kpi.department_id === selectedDepartment;
    const matchesType = kpiFilter === 'all' || kpi.kpi_type === kpiFilter;
    return matchesDepartment && matchesType && kpi.is_active;
  });

  // Calculate performance percentage
  const getPerformance = (kpi: DepartmentKPI) => {
    // For metrics where lower is better (like turnover rate)
    const isLowerBetter = kpi.kpi_name.includes('الدوران') || kpi.kpi_name.includes('تكلفة');
    
    if (isLowerBetter) {
      return kpi.target_value > 0 ? Math.max(0, (kpi.target_value / kpi.current_value) * 100) : 0;
    } else {
      return kpi.target_value > 0 ? (kpi.current_value / kpi.target_value) * 100 : 0;
    }
  };

  const getPerformanceStatus = (performance: number) => {
    if (performance >= 100) return { status: 'excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (performance >= 80) return { status: 'good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (performance >= 60) return { status: 'average', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { status: 'poor', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const getKPIIcon = (type: string) => {
    switch (type) {
      case 'financial': return DollarSign;
      case 'hr': return Users;
      case 'quality': return Award;
      case 'operational': return BarChart3;
      default: return Target;
    }
  };

  const getKPITypeText = (type: string) => {
    switch (type) {
      case 'financial': return 'مالي';
      case 'hr': return 'موارد بشرية';
      case 'quality': return 'جودة';
      case 'operational': return 'تشغيلي';
      default: return 'عام';
    }
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'يومي';
      case 'weekly': return 'أسبوعي';
      case 'monthly': return 'شهري';
      case 'quarterly': return 'ربع سنوي';
      case 'yearly': return 'سنوي';
      default: return 'غير محدد';
    }
  };

  // Calculate department KPI summary
  const getDepartmentSummary = () => {
    const summary = departments.map(dept => {
      const deptKPIs = mockKPIs.filter(kpi => kpi.department_id === dept.id && kpi.is_active);
      const avgPerformance = deptKPIs.length > 0 
        ? deptKPIs.reduce((sum, kpi) => sum + getPerformance(kpi), 0) / deptKPIs.length 
        : 0;
      
      return {
        department: dept,
        kpiCount: deptKPIs.length,
        avgPerformance: Math.round(avgPerformance),
        status: getPerformanceStatus(avgPerformance)
      };
    }).filter(item => item.kpiCount > 0);

    return summary;
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2">
          <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="اختر القسم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأقسام</SelectItem>
              {departments.map((dept) => (
                <SelectItem key={dept.id} value={dept.id}>
                  {dept.name_ar}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={kpiFilter} onValueChange={setKpiFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="نوع المؤشر" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="financial">مالي</SelectItem>
              <SelectItem value="operational">تشغيلي</SelectItem>
              <SelectItem value="hr">موارد بشرية</SelectItem>
              <SelectItem value="quality">جودة</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Dialog open={isAddKPIOpen} onOpenChange={setIsAddKPIOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              إضافة مؤشر جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إضافة مؤشر أداء جديد</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label>القسم</Label>
                <Select
                  value={newKPI.department_id}
                  onValueChange={(value) => setNewKPI(prev => ({...prev, department_id: value}))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القسم" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept.id} value={dept.id}>
                        {dept.name_ar}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>اسم المؤشر</Label>
                <Input
                  value={newKPI.kpi_name}
                  onChange={(e) => setNewKPI(prev => ({...prev, kpi_name: e.target.value}))}
                  placeholder="معدل الحضور"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>نوع المؤشر</Label>
                  <Select
                    value={newKPI.kpi_type}
                    onValueChange={(value: any) => setNewKPI(prev => ({...prev, kpi_type: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="financial">مالي</SelectItem>
                      <SelectItem value="operational">تشغيلي</SelectItem>
                      <SelectItem value="hr">موارد بشرية</SelectItem>
                      <SelectItem value="quality">جودة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>التكرار</Label>
                  <Select
                    value={newKPI.frequency}
                    onValueChange={(value: any) => setNewKPI(prev => ({...prev, frequency: value}))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">يومي</SelectItem>
                      <SelectItem value="weekly">أسبوعي</SelectItem>
                      <SelectItem value="monthly">شهري</SelectItem>
                      <SelectItem value="quarterly">ربع سنوي</SelectItem>
                      <SelectItem value="yearly">سنوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>القيمة المستهدفة</Label>
                  <Input
                    type="number"
                    value={newKPI.target_value}
                    onChange={(e) => setNewKPI(prev => ({...prev, target_value: Number(e.target.value)}))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>القيمة الحالية</Label>
                  <Input
                    type="number"
                    value={newKPI.current_value}
                    onChange={(e) => setNewKPI(prev => ({...prev, current_value: Number(e.target.value)}))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>وحدة القياس</Label>
                  <Input
                    value={newKPI.unit_of_measure}
                    onChange={(e) => setNewKPI(prev => ({...prev, unit_of_measure: e.target.value}))}
                    placeholder="%"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddKPIOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => setIsAddKPIOpen(false)}>
                إضافة المؤشر
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="department-summary">ملخص الأقسام</TabsTrigger>
          <TabsTrigger value="detailed-view">عرض تفصيلي</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">إجمالي المؤشرات</p>
                    <p className="text-2xl font-bold">{mockKPIs.filter(k => k.is_active).length}</p>
                  </div>
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">متفوقة</p>
                    <p className="text-2xl font-bold text-green-600">
                      {mockKPIs.filter(k => getPerformance(k) >= 100).length}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">تحتاج تحسين</p>
                    <p className="text-2xl font-bold text-red-600">
                      {mockKPIs.filter(k => getPerformance(k) < 80).length}
                    </p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">متوسط الأداء</p>
                    <p className="text-2xl font-bold">
                      {Math.round(mockKPIs.reduce((sum, k) => sum + getPerformance(k), 0) / mockKPIs.length)}%
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing KPIs */}
          <Card>
            <CardHeader>
              <CardTitle>المؤشرات الأعلى أداءً</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockKPIs
                  .sort((a, b) => getPerformance(b) - getPerformance(a))
                  .slice(0, 3)
                  .map((kpi) => {
                    const performance = getPerformance(kpi);
                    const status = getPerformanceStatus(performance);
                    const KPIIcon = getKPIIcon(kpi.kpi_type);
                    const department = departments.find(d => d.id === kpi.department_id);

                    return (
                      <div key={kpi.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${status.bgColor}`}>
                            <KPIIcon className={`h-5 w-5 ${status.color}`} />
                          </div>
                          <div>
                            <h4 className="font-semibold">{kpi.kpi_name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {department?.name_ar} • {getKPITypeText(kpi.kpi_type)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className={`text-lg font-bold ${status.color}`}>
                            {Math.round(performance)}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {kpi.current_value.toLocaleString()} / {kpi.target_value.toLocaleString()} {kpi.unit_of_measure}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Department Summary Tab */}
        <TabsContent value="department-summary" className="mt-6">
          <div className="grid gap-4">
            {getDepartmentSummary().map((summary) => (
              <Card key={summary.department.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold">{summary.department.name_ar}</h3>
                        <p className="text-sm text-muted-foreground">
                          {summary.kpiCount} مؤشر أداء
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${summary.status.color}`}>
                        {summary.avgPerformance}%
                      </div>
                      <p className="text-sm text-muted-foreground">متوسط الأداء</p>
                    </div>
                  </div>
                  
                  <Progress 
                    value={summary.avgPerformance} 
                    className="mb-4"
                  />
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    {mockKPIs
                      .filter(kpi => kpi.department_id === summary.department.id)
                      .slice(0, 4)
                      .map((kpi) => {
                        const performance = getPerformance(kpi);
                        return (
                          <div key={kpi.id} className="text-center p-2 bg-muted/30 rounded">
                            <p className="font-medium truncate">{kpi.kpi_name}</p>
                            <p className={`text-lg font-bold ${getPerformanceStatus(performance).color}`}>
                              {Math.round(performance)}%
                            </p>
                          </div>
                        );
                      })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Detailed View Tab */}
        <TabsContent value="detailed-view" className="mt-6">
          <div className="grid gap-4">
            {filteredKPIs.map((kpi) => {
              const performance = getPerformance(kpi);
              const status = getPerformanceStatus(performance);
              const KPIIcon = getKPIIcon(kpi.kpi_type);
              const department = departments.find(d => d.id === kpi.department_id);

              return (
                <Card key={kpi.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg ${status.bgColor}`}>
                          <KPIIcon className={`h-6 w-6 ${status.color}`} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{kpi.kpi_name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">
                              {department?.name_ar}
                            </Badge>
                            <Badge variant="outline">
                              {getKPITypeText(kpi.kpi_type)}
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {getFrequencyText(kpi.frequency)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">القيمة الحالية</p>
                        <p className="text-xl font-bold">
                          {kpi.current_value.toLocaleString()} {kpi.unit_of_measure}
                        </p>
                      </div>
                      
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">القيمة المستهدفة</p>
                        <p className="text-xl font-bold">
                          {kpi.target_value.toLocaleString()} {kpi.unit_of_measure}
                        </p>
                      </div>
                      
                      <div className="text-center p-3 bg-muted/30 rounded-lg">
                        <p className="text-sm text-muted-foreground">نسبة الإنجاز</p>
                        <p className={`text-xl font-bold ${status.color}`}>
                          {Math.round(performance)}%
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>تقدم الإنجاز</span>
                        <span className={status.color}>
                          {Math.round(performance)}%
                        </span>
                      </div>
                      <Progress value={Math.min(performance, 100)} />
                      
                      {performance < 80 && (
                        <div className="flex items-center gap-2 text-sm text-orange-600 bg-orange-50 p-2 rounded">
                          <AlertCircle className="h-4 w-4" />
                          <span>يحتاج هذا المؤشر إلى متابعة وتحسين</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {filteredKPIs.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  لا توجد مؤشرات أداء
                </h3>
                <p className="text-muted-foreground mb-4">
                  لم يتم إضافة أي مؤشرات أداء للأقسام المحددة بعد
                </p>
                <Button onClick={() => setIsAddKPIOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة مؤشر جديد
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DepartmentKPIs;