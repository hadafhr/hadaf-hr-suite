import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search,
  Filter,
  Download,
  Edit3,
  Eye,
  Award,
  TrendingUp,
  TrendingDown,
  Minus,
  BarChart3,
  Target,
  Users,
  FileText,
  Brain,
  AlertTriangle
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  manager: string;
  smartScore: number;
  riskLevel: 'low' | 'medium' | 'high';
  components: {
    kpi: number;
    mbo: number;
    bsc: number;
    continuous: number;
    assessment: number;
    rating360: number;
  };
  trend: 'up' | 'down' | 'neutral';
  lastUpdate: string;
}

export const SmartScorecards = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Demo employees data
  const employees: Employee[] = [
    {
      id: '1',
      name: isRTL ? 'أحمد محمد' : 'Ahmed Mohammed',
      position: isRTL ? 'مطور برمجيات أول' : 'Senior Software Developer',
      department: isRTL ? 'تقنية المعلومات' : 'IT',
      manager: isRTL ? 'سارة أحمد' : 'Sarah Ahmed',
      smartScore: 85,
      riskLevel: 'low',
      components: { kpi: 88, mbo: 82, bsc: 85, continuous: 86, assessment: 84, rating360: 83 },
      trend: 'up',
      lastUpdate: '2024-01-15'
    },
    {
      id: '2',
      name: isRTL ? 'فاطمة علي' : 'Fatima Ali',
      position: isRTL ? 'مديرة المشاريع' : 'Project Manager',
      department: isRTL ? 'العمليات' : 'Operations',
      manager: isRTL ? 'محمد حسن' : 'Mohammed Hassan',
      smartScore: 78,
      riskLevel: 'medium',
      components: { kpi: 75, mbo: 80, bsc: 78, continuous: 79, assessment: 77, rating360: 78 },
      trend: 'neutral',
      lastUpdate: '2024-01-14'
    },
    {
      id: '3',
      name: isRTL ? 'خالد سالم' : 'Khalid Salem',
      position: isRTL ? 'أخصائي مبيعات' : 'Sales Specialist',
      department: isRTL ? 'المبيعات' : 'Sales',
      manager: isRTL ? 'نورا عبدالله' : 'Nora Abdullah',
      smartScore: 65,
      riskLevel: 'high',
      components: { kpi: 62, mbo: 68, bsc: 65, continuous: 64, assessment: 66, rating360: 65 },
      trend: 'down',
      lastUpdate: '2024-01-13'
    }
  ];

  const handleEmployeeClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsDrawerOpen(true);
  };

  const handleScoreEdit = (component: string, newValue: number) => {
    if (selectedEmployee) {
      const updatedEmployee = {
        ...selectedEmployee,
        components: {
          ...selectedEmployee.components,
          [component]: newValue
        }
      };
      // Recalculate smart score based on default weights
      const weights = { kpi: 0.3, mbo: 0.2, bsc: 0.1, continuous: 0.1, assessment: 0.1, rating360: 0.2 };
      const newSmartScore = Math.round(
        Object.entries(weights).reduce((sum, [key, weight]) => {
          return sum + (updatedEmployee.components[key as keyof typeof updatedEmployee.components] * weight);
        }, 0)
      );
      updatedEmployee.smartScore = newSmartScore;
      setSelectedEmployee(updatedEmployee);
      console.log(`Updated ${component} to ${newValue}, new Smart Score: ${newSmartScore}`);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 70) return 'text-blue-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return { variant: 'default' as const, label: isRTL ? 'ممتاز' : 'Excellent' };
    if (score >= 70) return { variant: 'secondary' as const, label: isRTL ? 'جيد' : 'Good' };
    if (score >= 60) return { variant: 'outline' as const, label: isRTL ? 'مقبول' : 'Average' };
    return { variant: 'destructive' as const, label: isRTL ? 'ضعيف' : 'Below Average' };
  };

  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'low': return { variant: 'default' as const, label: isRTL ? 'منخفض' : 'Low Risk', color: 'bg-green-100 text-green-800' };
      case 'medium': return { variant: 'secondary' as const, label: isRTL ? 'متوسط' : 'Medium Risk', color: 'bg-amber-100 text-amber-800' };
      case 'high': return { variant: 'destructive' as const, label: isRTL ? 'عالي' : 'High Risk', color: 'bg-red-100 text-red-800' };
      default: return { variant: 'outline' as const, label: isRTL ? 'غير محدد' : 'Unknown', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isRTL ? 'بطاقات النتائج الذكية' : 'Smart Scorecards'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'عرض وإدارة النتائج الذكية للموظفين' : 'View and manage employee smart scores'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder={isRTL ? 'البحث عن الموظفين...' : 'Search employees...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            {isRTL ? 'المرشحات' : 'Filters'}
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            {isRTL ? 'تصدير' : 'Export'}
          </Button>
        </div>
      </div>

      {/* Employee Table */}
      <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            {isRTL ? 'قائمة الموظفين' : 'Employee List'}
          </CardTitle>
          <CardDescription>
            {isRTL ? `إجمالي ${filteredEmployees.length} موظف` : `Total ${filteredEmployees.length} employees`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                    {isRTL ? 'الموظف' : 'Employee'}
                  </th>
                  <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                    {isRTL ? 'القسم' : 'Department'}
                  </th>
                  <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                    {isRTL ? 'النتيجة الذكية' : 'Smart Score'}
                  </th>
                  <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                    {isRTL ? 'المخاطر' : 'Risk Level'}
                  </th>
                  <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                    {isRTL ? 'الاتجاه' : 'Trend'}
                  </th>
                  <th className={`text-${isRTL ? 'right' : 'left'} py-3 font-semibold text-muted-foreground`}>
                    {isRTL ? 'الإجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => {
                  const scoreBadge = getScoreBadge(employee.smartScore);
                  const riskBadge = getRiskBadge(employee.riskLevel);
                  
                  return (
                    <tr 
                      key={employee.id} 
                      className="border-b border-border hover:bg-accent/30 cursor-pointer transition-colors"
                      onClick={() => handleEmployeeClick(employee)}
                    >
                      <td className="py-4">
                        <div>
                          <p className="font-medium text-foreground">{employee.name}</p>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <Badge variant="outline">{employee.department}</Badge>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold ${getScoreColor(employee.smartScore)}`}>
                            {employee.smartScore}
                          </span>
                          <Badge variant={scoreBadge.variant}>{scoreBadge.label}</Badge>
                        </div>
                        <Progress value={employee.smartScore} className="w-20 h-1 mt-1" />
                      </td>
                      <td className="py-4">
                        <Badge className={riskBadge.color}>{riskBadge.label}</Badge>
                      </td>
                      <td className="py-4">
                        {getTrendIcon(employee.trend)}
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1">
                            <Eye className="w-3 h-3" />
                            {isRTL ? 'عرض' : 'View'}
                          </Button>
                          <Button size="sm" variant="outline" className="gap-1">
                            <Edit3 className="w-3 h-3" />
                            {isRTL ? 'تعديل' : 'Edit'}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Employee Scorecard Drawer */}
      {isDrawerOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-card border-0 shadow-2xl">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-primary" />
                    {selectedEmployee.name}
                  </CardTitle>
                  <CardDescription>{selectedEmployee.position} • {selectedEmployee.department}</CardDescription>
                </div>
                <Button variant="outline" onClick={() => setIsDrawerOpen(false)}>
                  {isRTL ? 'إغلاق' : 'Close'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <Tabs defaultValue="summary" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="summary">{isRTL ? 'ملخص' : 'Summary'}</TabsTrigger>
                  <TabsTrigger value="details">{isRTL ? 'التفاصيل' : 'Details'}</TabsTrigger>
                  <TabsTrigger value="assessments">{isRTL ? 'التقييمات' : 'Assessments'}</TabsTrigger>
                  <TabsTrigger value="history">{isRTL ? 'التاريخ' : 'History'}</TabsTrigger>
                  <TabsTrigger value="notes">{isRTL ? 'الملاحظات' : 'Notes'}</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Smart Score Overview */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{isRTL ? 'النتيجة الذكية' : 'Smart Score'}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <div className={`text-6xl font-bold ${getScoreColor(selectedEmployee.smartScore)} mb-2`}>
                            {selectedEmployee.smartScore}
                          </div>
                          <Badge variant={getScoreBadge(selectedEmployee.smartScore).variant}>
                            {getScoreBadge(selectedEmployee.smartScore).label}
                          </Badge>
                          <Progress value={selectedEmployee.smartScore} className="mt-4" />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Component Breakdown */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">{isRTL ? 'تفكيك المكونات' : 'Component Breakdown'}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(selectedEmployee.components).map(([key, value]) => (
                            <div key={key} className="flex items-center justify-between">
                              <span className="text-sm font-medium capitalize">{key.toUpperCase()}</span>
                              <div className="flex items-center gap-2">
                                <span className={`font-semibold ${getScoreColor(value)}`}>{value}</span>
                                <Progress value={value} className="w-16 h-2" />
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="details" className="mt-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">{isRTL ? 'تعديل النتائج' : 'Edit Scores'}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(selectedEmployee.components).map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <Label className="capitalize">{key.toUpperCase()}</Label>
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              value={value}
                              onChange={(e) => handleScoreEdit(key, parseInt(e.target.value) || 0)}
                              className="w-20"
                            />
                            <Progress value={value} className="flex-1" />
                            <span className={`text-sm font-medium ${getScoreColor(value)}`}>{value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button className="gap-2">
                        <Edit3 className="w-4 h-4" />
                        {isRTL ? 'حفظ التغييرات' : 'Save Changes'}
                      </Button>
                      <Button variant="outline" className="gap-2">
                        <FileText className="w-4 h-4" />
                        {isRTL ? 'إرفاق دليل' : 'Attach Evidence'}
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="assessments" className="mt-6">
                  <p className="text-muted-foreground">{isRTL ? 'تفاصيل التقييمات...' : 'Assessment details...'}</p>
                </TabsContent>

                <TabsContent value="history" className="mt-6">
                  <p className="text-muted-foreground">{isRTL ? 'تاريخ النتائج...' : 'Score history...'}</p>
                </TabsContent>

                <TabsContent value="notes" className="mt-6">
                  <p className="text-muted-foreground">{isRTL ? 'ملاحظات المدير...' : 'Manager notes...'}</p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};