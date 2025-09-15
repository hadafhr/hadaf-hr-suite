import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UnifiedHeader } from '@/components/shared/UnifiedHeader';
import { Breadcrumbs } from '@/components/shared/Breadcrumbs';
import { NotificationBell } from '@/components/shared/NotificationSystem';
import { useAnalytics, useTrackEvent } from '@/components/shared/AnalyticsProvider';
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  FileText,
  Download,
  Upload,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  Calculator,
  Database,
  Settings,
  Filter
} from 'lucide-react';

// Mock Data Interfaces
interface BudgetCategory {
  id: string;
  name: string;
  code: string;
  allocated: number;
  spent: number;
  variance: number;
  status: 'on_track' | 'warning' | 'critical';
}

interface BudgetScenario {
  id: string;
  name: string;
  type: 'base' | 'optimistic' | 'conservative';
  totalBudget: number;
  variance: number;
  isActive: boolean;
}

interface BudgetForecast {
  month: string;
  budgeted: number;
  actual: number;
  forecast: number;
}

export const NewBudgetPlanning: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedScenario, setSelectedScenario] = useState('base');
  const [selectedYear, setSelectedYear] = useState('2024');
  const { track } = useAnalytics();
  const trackEvent = useTrackEvent();
  
  const isArabic = i18n.language === 'ar';

  // Mock Data
  const budgetCategories: BudgetCategory[] = [
    {
      id: '1',
      name: 'الرواتب والأجور',
      code: 'SAL001',
      allocated: 2400000,
      spent: 1850000,
      variance: -550000,
      status: 'on_track'
    },
    {
      id: '2',
      name: 'التوظيف والتدريب',
      code: 'REC001',
      allocated: 180000,
      spent: 195000,
      variance: 15000,
      status: 'warning'
    },
    {
      id: '3',
      name: 'المزايا والحوافز',
      code: 'BEN001',
      allocated: 360000,
      spent: 380000,
      variance: 20000,
      status: 'critical'
    },
    {
      id: '4',
      name: 'التأمين الصحي',
      code: 'INS001',
      allocated: 240000,
      spent: 185000,
      variance: -55000,
      status: 'on_track'
    }
  ];

  const budgetScenarios: BudgetScenario[] = [
    {
      id: '1',
      name: 'السيناريو الأساسي',
      type: 'base',
      totalBudget: 3180000,
      variance: 0,
      isActive: true
    },
    {
      id: '2',
      name: 'السيناريو المتفائل',
      type: 'optimistic',
      totalBudget: 3500000,
      variance: 320000,
      isActive: false
    },
    {
      id: '3',
      name: 'السيناريو المحافظ',
      type: 'conservative',
      totalBudget: 2850000,
      variance: -330000,
      isActive: false
    }
  ];

  const forecastData: BudgetForecast[] = [
    { month: 'يناير', budgeted: 265000, actual: 258000, forecast: 262000 },
    { month: 'فبراير', budgeted: 265000, actual: 272000, forecast: 268000 },
    { month: 'مارس', budgeted: 265000, actual: 261000, forecast: 264000 },
    { month: 'أبريل', budgeted: 265000, actual: 0, forecast: 270000 },
    { month: 'مايو', budgeted: 265000, actual: 0, forecast: 275000 },
    { month: 'يونيو', budgeted: 265000, actual: 0, forecast: 268000 }
  ];

  const handleCreateBudget = () => {
    trackEvent.trackBudgetVersion();
    navigate('/budget/create');
  };

  const handleImportActuals = () => {
    trackEvent.trackActualsImport();
    // Handle file import logic
  };

  const handleExportReport = (format: 'pdf' | 'xlsx') => {
    trackEvent.trackComplianceExport('budget');
    // Handle export logic
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      on_track: 'secondary',
      warning: 'default',
      critical: 'destructive'
    } as const;
    
    const labels = {
      on_track: isArabic ? 'في المسار' : 'On Track',
      warning: isArabic ? 'تحذير' : 'Warning',
      critical: isArabic ? 'حرج' : 'Critical'
    };
    
    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat(isArabic ? 'ar-SA' : 'en-US', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const calculateUtilization = (allocated: number, spent: number) => {
    return allocated > 0 ? (spent / allocated) * 100 : 0;
  };

  const breadcrumbItems = [
    { label: isArabic ? 'لوحة التحكم' : 'Dashboard', href: '/company-dashboard' },
    { label: isArabic ? 'الميزانية والتخطيط المالي' : 'Budget & Financial Planning', href: '/budget-planning' }
  ];

  const totalAllocated = budgetCategories.reduce((sum, cat) => sum + cat.allocated, 0);
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalVariance = budgetCategories.reduce((sum, cat) => sum + cat.variance, 0);

  return (
    <div className="min-h-screen bg-background">
      <UnifiedHeader showAuthActions={true} userRole="company" />
      
      <div className="container mx-auto px-4 py-6">
        <Breadcrumbs items={breadcrumbItems} />
        
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {isArabic ? 'الميزانية والتخطيط المالي للموارد البشرية' : 'HR Budget & Financial Planning'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isArabic ? 'إدارة شاملة لميزانيات الموارد البشرية والتخطيط المالي' : 'Comprehensive HR budget management and financial planning'}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2025">2025</SelectItem>
              </SelectContent>
            </Select>
            <NotificationBell count={2} />
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'إجمالي المخصص' : 'Total Allocated'}
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalAllocated)}</div>
              <p className="text-xs text-muted-foreground">
                {isArabic ? 'للسنة المالية' : 'for fiscal year'} {selectedYear}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'إجمالي المنفق' : 'Total Spent'}
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
              <p className="text-xs text-muted-foreground">
                {((totalSpent / totalAllocated) * 100).toFixed(1)}% {isArabic ? 'من المخصص' : 'of allocated'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'الفرق (التباين)' : 'Variance'}
              </CardTitle>
              {totalVariance >= 0 ? 
                <TrendingUp className="h-4 w-4 text-red-500" /> : 
                <TrendingDown className="h-4 w-4 text-green-500" />
              }
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalVariance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {formatCurrency(Math.abs(totalVariance))}
              </div>
              <p className="text-xs text-muted-foreground">
                {totalVariance >= 0 ? (isArabic ? 'زيادة عن المخطط' : 'over budget') : (isArabic ? 'وفر من المخطط' : 'under budget')}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {isArabic ? 'معدل الاستخدام' : 'Utilization Rate'}
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {((totalSpent / totalAllocated) * 100).toFixed(1)}%
              </div>
              <Progress value={(totalSpent / totalAllocated) * 100} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              {isArabic ? 'الإجراءات السريعة' : 'Quick Actions'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                onClick={handleCreateBudget}
                className="h-auto p-4 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Plus className="h-6 w-6" />
                <span className="text-xs text-center">
                  {isArabic ? 'إنشاء ميزانية' : 'Create Budget'}
                </span>
              </Button>

              <Button 
                onClick={handleImportActuals}
                className="h-auto p-4 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Upload className="h-6 w-6" />
                <span className="text-xs text-center">
                  {isArabic ? 'استيراد البيانات الفعلية' : 'Import Actuals'}
                </span>
              </Button>

              <Button 
                onClick={() => handleExportReport('pdf')}
                className="h-auto p-4 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Download className="h-6 w-6" />
                <span className="text-xs text-center">
                  {isArabic ? 'تصدير التقرير' : 'Export Report'}
                </span>
              </Button>

              <Button 
                onClick={() => navigate('/budget/scenarios')}
                className="h-auto p-4 flex flex-col items-center gap-2"
                variant="outline"
              >
                <Target className="h-6 w-6" />
                <span className="text-xs text-center">
                  {isArabic ? 'إدارة السيناريوهات' : 'Manage Scenarios'}
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">
              {isArabic ? 'نظرة عامة' : 'Overview'}
            </TabsTrigger>
            <TabsTrigger value="categories">
              {isArabic ? 'الفئات' : 'Categories'}
            </TabsTrigger>
            <TabsTrigger value="scenarios">
              {isArabic ? 'السيناريوهات' : 'Scenarios'}
            </TabsTrigger>
            <TabsTrigger value="forecasting">
              {isArabic ? 'التنبؤات' : 'Forecasting'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Budget Utilization Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5" />
                    {isArabic ? 'استخدام الميزانية حسب الفئة' : 'Budget Utilization by Category'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">
                      {isArabic ? 'مخطط دائري لاستخدام الميزانية' : 'Budget Utilization Pie Chart'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Variance Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    {isArabic ? 'تحليل الفروقات' : 'Variance Analysis'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">
                      {isArabic ? 'مخطط شريطي لتحليل الفروقات' : 'Variance Analysis Bar Chart'}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  {isArabic ? 'فئات الميزانية' : 'Budget Categories'}
                </CardTitle>
                <CardDescription>
                  {isArabic ? 'إدارة وتتبع فئات الميزانية المختلفة' : 'Manage and track different budget categories'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetCategories.map((category) => (
                    <div key={category.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">{category.code}</p>
                        </div>
                        {getStatusBadge(category.status)}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-muted-foreground">{isArabic ? 'مخصص' : 'Allocated'}</p>
                          <p className="font-medium">{formatCurrency(category.allocated)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{isArabic ? 'منفق' : 'Spent'}</p>
                          <p className="font-medium">{formatCurrency(category.spent)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{isArabic ? 'التباين' : 'Variance'}</p>
                          <p className={`font-medium ${category.variance >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                            {formatCurrency(Math.abs(category.variance))}
                            {category.variance >= 0 ? ' ↑' : ' ↓'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{isArabic ? 'الاستخدام' : 'Utilization'}</span>
                          <span>{calculateUtilization(category.allocated, category.spent).toFixed(1)}%</span>
                        </div>
                        <Progress value={calculateUtilization(category.allocated, category.spent)} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scenarios" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  {isArabic ? 'سيناريوهات الميزانية' : 'Budget Scenarios'}
                </CardTitle>
                <CardDescription>
                  {isArabic ? 'مقارنة السيناريوهات المختلفة لاتخاذ قرارات مدروسة' : 'Compare different scenarios for informed decision making'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {budgetScenarios.map((scenario) => (
                    <div key={scenario.id} className={`p-4 border rounded-lg ${scenario.isActive ? 'border-primary bg-primary/5' : ''}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{scenario.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {scenario.type === 'base' ? (isArabic ? 'أساسي' : 'Base') :
                             scenario.type === 'optimistic' ? (isArabic ? 'متفائل' : 'Optimistic') :
                             (isArabic ? 'محافظ' : 'Conservative')}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {scenario.isActive && (
                            <Badge variant="default">
                              {isArabic ? 'نشط' : 'Active'}
                            </Badge>
                          )}
                          <Button size="sm" variant="outline">
                            {isArabic ? 'عرض التفاصيل' : 'View Details'}
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">{isArabic ? 'إجمالي الميزانية' : 'Total Budget'}</p>
                          <p className="font-medium text-lg">{formatCurrency(scenario.totalBudget)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">{isArabic ? 'الفرق عن الأساسي' : 'Variance from Base'}</p>
                          <p className={`font-medium text-lg ${scenario.variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {scenario.variance === 0 ? '-' : 
                             `${scenario.variance > 0 ? '+' : ''}${formatCurrency(scenario.variance)}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  {isArabic ? 'التنبؤات المالية' : 'Financial Forecasting'}
                </CardTitle>
                <CardDescription>
                  {isArabic ? 'توقعات الإنفاق والميزانية للأشهر القادمة' : 'Spending and budget forecasts for upcoming months'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center mb-6">
                    <p className="text-muted-foreground">
                      {isArabic ? 'مخطط خطي للتنبؤات المالية' : 'Financial Forecasting Line Chart'}
                    </p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">{isArabic ? 'الشهر' : 'Month'}</th>
                          <th className="text-right py-2">{isArabic ? 'مخطط' : 'Budgeted'}</th>
                          <th className="text-right py-2">{isArabic ? 'فعلي' : 'Actual'}</th>
                          <th className="text-right py-2">{isArabic ? 'متوقع' : 'Forecast'}</th>
                          <th className="text-right py-2">{isArabic ? 'الفرق' : 'Variance'}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {forecastData.map((item, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-2">{item.month}</td>
                            <td className="text-right py-2">{formatCurrency(item.budgeted)}</td>
                            <td className="text-right py-2">
                              {item.actual > 0 ? formatCurrency(item.actual) : '-'}
                            </td>
                            <td className="text-right py-2">{formatCurrency(item.forecast)}</td>
                            <td className="text-right py-2">
                              {item.actual > 0 ? (
                                <span className={item.actual > item.budgeted ? 'text-red-600' : 'text-green-600'}>
                                  {formatCurrency(Math.abs(item.actual - item.budgeted))}
                                  {item.actual > item.budgeted ? ' ↑' : ' ↓'}
                                </span>
                              ) : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};