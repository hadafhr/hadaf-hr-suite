import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart3, 
  Plus, 
  Edit3, 
  Trash2, 
  Link,
  TrendingUp,
  AlertCircle,
  Target,
  Calendar
} from 'lucide-react';

interface KPI {
  id: string;
  name: string;
  description: string;
  weight: number;
  targetValue: number;
  currentValue: number;
  measurementUnit: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  dataSource: string;
  calculationMethod: string;
  achievementPercentage: number;
  department: string;
  status: 'active' | 'paused' | 'completed';
}

export const KPISystem: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const [selectedDepartment, setSelectedDepartment] = useState<string>('sales');
  const [isAddingKPI, setIsAddingKPI] = useState(false);
  const [newKPI, setNewKPI] = useState<Partial<KPI>>({
    frequency: 'monthly',
    weight: 0,
    targetValue: 0,
    currentValue: 0,
    status: 'active'
  });

  // مكتبة KPI افتراضية حسب الوظائف
  const departmentKPIs = {
    sales: [
      {
        id: 'sales_1',
        name: isRTL ? 'تحقيق الحصة' : 'Quota Achievement',
        description: isRTL ? 'نسبة تحقيق الحصة المبيعية المستهدفة' : 'Percentage of target sales quota achieved',
        weight: 35,
        targetValue: 100,
        currentValue: 92,
        measurementUnit: '%',
        frequency: 'monthly' as const,
        dataSource: isRTL ? 'نظام CRM' : 'CRM System',
        calculationMethod: isRTL ? '(المبيعات الفعلية / الهدف) × 100' : '(Actual Sales / Target) × 100',
        achievementPercentage: 92,
        department: 'sales',
        status: 'active' as const
      },
      {
        id: 'sales_2',
        name: isRTL ? 'نمو الإيراد' : 'Revenue Growth',
        description: isRTL ? 'نسبة نمو الإيراد مقارنة بالفترة السابقة' : 'Revenue growth percentage compared to previous period',
        weight: 25,
        targetValue: 15,
        currentValue: 18,
        measurementUnit: '%',
        frequency: 'quarterly' as const,
        dataSource: isRTL ? 'النظام المالي' : 'Financial System',
        calculationMethod: isRTL ? '((الإيراد الحالي - الإيراد السابق) / الإيراد السابق) × 100' : '((Current Revenue - Previous Revenue) / Previous Revenue) × 100',
        achievementPercentage: 120,
        department: 'sales',
        status: 'active' as const
      },
      {
        id: 'sales_3',
        name: isRTL ? 'دقة التوقع' : 'Forecast Accuracy',
        description: isRTL ? 'دقة التوقعات المبيعية' : 'Sales forecast accuracy',
        weight: 15,
        targetValue: 85,
        currentValue: 78,
        measurementUnit: '%',
        frequency: 'monthly' as const,
        dataSource: isRTL ? 'تقارير المبيعات' : 'Sales Reports',
        calculationMethod: isRTL ? '100 - متوسط الانحراف المطلق' : '100 - Average Absolute Deviation',
        achievementPercentage: 92,
        department: 'sales',
        status: 'active' as const
      },
      {
        id: 'sales_4',
        name: isRTL ? 'تحصيل الذمم' : 'Collections',
        description: isRTL ? 'نسبة تحصيل المستحقات في الوقت المحدد' : 'Percentage of receivables collected on time',
        weight: 15,
        targetValue: 95,
        currentValue: 88,
        measurementUnit: '%',
        frequency: 'monthly' as const,
        dataSource: isRTL ? 'النظام المالي' : 'Financial System',
        calculationMethod: isRTL ? '(المحصل في الوقت / إجمالي المستحقات) × 100' : '(Collected on Time / Total Receivables) × 100',
        achievementPercentage: 93,
        department: 'sales',
        status: 'active' as const
      },
      {
        id: 'sales_5',
        name: isRTL ? 'رضا العملاء' : 'Customer Satisfaction',
        description: isRTL ? 'درجة رضا العملاء من 5 نقاط' : 'Customer satisfaction score out of 5 points',
        weight: 10,
        targetValue: 4.5,
        currentValue: 4.2,
        measurementUnit: isRTL ? 'نقطة' : 'points',
        frequency: 'quarterly' as const,
        dataSource: isRTL ? 'استطلاعات الرضا' : 'Satisfaction Surveys',
        calculationMethod: isRTL ? 'متوسط تقييمات العملاء' : 'Average customer ratings',
        achievementPercentage: 93,
        department: 'sales',
        status: 'active' as const
      }
    ],
    hr: [
      {
        id: 'hr_1',
        name: isRTL ? 'معدل الاحتفاظ بالموظفين' : 'Employee Retention Rate',
        description: isRTL ? 'نسبة الموظفين المحتفظ بهم خلال السنة' : 'Percentage of employees retained during the year',
        weight: 30,
        targetValue: 90,
        currentValue: 87,
        measurementUnit: '%',
        frequency: 'quarterly' as const,
        dataSource: isRTL ? 'نظام الموارد البشرية' : 'HR System',
        calculationMethod: isRTL ? '((الموظفون في بداية الفترة - المغادرون) / الموظفون في بداية الفترة) × 100' : '((Employees at Start - Departures) / Employees at Start) × 100',
        achievementPercentage: 97,
        department: 'hr',
        status: 'active' as const
      },
      {
        id: 'hr_2',
        name: isRTL ? 'متوسط وقت التوظيف' : 'Average Time to Hire',
        description: isRTL ? 'متوسط الوقت لإكمال عملية التوظيف' : 'Average time to complete hiring process',
        weight: 25,
        targetValue: 30,
        currentValue: 35,
        measurementUnit: isRTL ? 'يوم' : 'days',
        frequency: 'monthly' as const,
        dataSource: isRTL ? 'نظام التوظيف' : 'Recruitment System',
        calculationMethod: isRTL ? 'متوسط الوقت من النشر حتى القبول' : 'Average time from posting to acceptance',
        achievementPercentage: 86,
        department: 'hr',
        status: 'active' as const
      },
      {
        id: 'hr_3',
        name: isRTL ? 'رضا الموظفين' : 'Employee Satisfaction',
        description: isRTL ? 'درجة رضا الموظفين من 5 نقاط' : 'Employee satisfaction score out of 5 points',
        weight: 25,
        targetValue: 4.0,
        currentValue: 3.8,
        measurementUnit: isRTL ? 'نقطة' : 'points',
        frequency: 'quarterly' as const,
        dataSource: isRTL ? 'استطلاعات الموظفين' : 'Employee Surveys',
        calculationMethod: isRTL ? 'متوسط تقييمات الموظفين' : 'Average employee ratings',
        achievementPercentage: 95,
        department: 'hr',
        status: 'active' as const
      },
      {
        id: 'hr_4',
        name: isRTL ? 'إنجاز التدريب' : 'Training Completion',
        description: isRTL ? 'نسبة إكمال البرامج التدريبية المطلوبة' : 'Percentage of required training programs completed',
        weight: 20,
        targetValue: 95,
        currentValue: 89,
        measurementUnit: '%',
        frequency: 'quarterly' as const,
        dataSource: isRTL ? 'نظام التدريب' : 'Training System',
        calculationMethod: isRTL ? '(المكتمل / المطلوب) × 100' : '(Completed / Required) × 100',
        achievementPercentage: 94,
        department: 'hr',
        status: 'active' as const
      }
    ]
  };

  const currentKPIs = departmentKPIs[selectedDepartment as keyof typeof departmentKPIs] || [];
  const totalWeight = currentKPIs.reduce((sum, kpi) => sum + kpi.weight, 0);
  const overallAchievement = currentKPIs.reduce((sum, kpi) => sum + (kpi.achievementPercentage * kpi.weight / 100), 0);

  const departmentLabels = {
    sales: isRTL ? 'المبيعات' : 'Sales',
    hr: isRTL ? 'الموارد البشرية' : 'Human Resources',
    finance: isRTL ? 'المالية' : 'Finance',
    it: isRTL ? 'تقنية المعلومات' : 'IT'
  };

  const frequencyLabels = {
    daily: isRTL ? 'يومي' : 'Daily',
    weekly: isRTL ? 'أسبوعي' : 'Weekly',
    monthly: isRTL ? 'شهري' : 'Monthly',
    quarterly: isRTL ? 'ربع سنوي' : 'Quarterly'
  };

  const statusLabels = {
    active: isRTL ? 'نشط' : 'Active',
    paused: isRTL ? 'متوقف' : 'Paused',
    completed: isRTL ? 'مكتمل' : 'Completed'
  };

  const statusColors = {
    active: 'bg-green-500',
    paused: 'bg-yellow-500',
    completed: 'bg-blue-500'
  };

  const handleAddKPI = () => {
    setIsAddingKPI(true);
  };

  const handleSaveKPI = () => {
    if (newKPI.name && newKPI.description) {
      console.log('Saving new KPI:', newKPI);
      setIsAddingKPI(false);
      setNewKPI({
        frequency: 'monthly',
        weight: 0,
        targetValue: 0,
        currentValue: 0,
        status: 'active'
      });
    }
  };

  const handleCancelAdd = () => {
    setIsAddingKPI(false);
    setNewKPI({
      frequency: 'monthly',
      weight: 0,
      targetValue: 0,
      currentValue: 0,
      status: 'active'
    });
  };

  const handleLinkDataSource = (kpiId?: string) => {
    console.log('Linking data source for KPI:', kpiId);
  };

  const handleSetQuarterlyTargets = () => {
    console.log('Setting quarterly targets...');
  };

  const handleLockPeriod = () => {
    console.log('Locking period...');
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            {isRTL ? 'نظام مؤشرات الأداء الرئيسية (KPI)' : 'Key Performance Indicators (KPI) System'}
          </CardTitle>
          <CardDescription>
            {isRTL ? 'قياس الأداء من خلال مؤشرات كمية مع حساب تلقائي عند ربط مصادر البيانات' : 'Performance measurement through quantitative indicators with automatic calculation when data sources are linked'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Label htmlFor="department">{isRTL ? 'اختر الإدارة:' : 'Select Department:'}</Label>
            <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">{departmentLabels.sales}</SelectItem>
                <SelectItem value="hr">{departmentLabels.hr}</SelectItem>
                <SelectItem value="finance">{departmentLabels.finance}</SelectItem>
                <SelectItem value="it">{departmentLabels.it}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            {isRTL ? 'التقدم العام - ' : 'Overall Progress - '}{departmentLabels[selectedDepartment as keyof typeof departmentLabels]}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {isRTL ? 'إجمالي الإنجاز' : 'Total Achievement'}
              </span>
              <span className="text-lg font-bold">{overallAchievement.toFixed(1)}%</span>
            </div>
            <Progress value={overallAchievement} className="h-3" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {isRTL ? 'إجمالي الأوزان' : 'Total Weights'}
              </span>
              <span className={`text-sm font-medium ${totalWeight === 100 ? 'text-green-600' : 'text-red-600'}`}>
                {totalWeight}%
              </span>
            </div>
            
            {totalWeight !== 100 && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-700 dark:text-yellow-400">
                  {isRTL ? 'تحذير: إجمالي الأوزان يجب أن يساوي 100%' : 'Warning: Total weights should equal 100%'}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button onClick={handleAddKPI} className="gap-2">
          <Plus className="w-4 h-4" />
          {isRTL ? 'تعيين مؤشرات' : 'Assign Indicators'}
        </Button>
        <Button onClick={() => handleLinkDataSource()} variant="outline" className="gap-2">
          <Link className="w-4 h-4" />
          {isRTL ? 'ربط مصدر بيانات' : 'Link Data Source'}
        </Button>
        <Button onClick={handleSetQuarterlyTargets} variant="outline" className="gap-2">
          <Target className="w-4 h-4" />
          {isRTL ? 'تعيين أهداف ربع سنوية' : 'Set Quarterly Targets'}
        </Button>
        <Button onClick={handleLockPeriod} variant="outline" className="gap-2">
          <Calendar className="w-4 h-4" />
          {isRTL ? 'قفل الفترة' : 'Lock Period'}
        </Button>
      </div>

      {/* Add New KPI Form */}
      {isAddingKPI && (
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'إضافة مؤشر أداء جديد' : 'Add New KPI'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="kpi-name">{isRTL ? 'اسم المؤشر' : 'KPI Name'}</Label>
                <Input
                  id="kpi-name"
                  value={newKPI.name || ''}
                  onChange={(e) => setNewKPI({...newKPI, name: e.target.value})}
                  placeholder={isRTL ? 'أدخل اسم المؤشر' : 'Enter KPI name'}
                />
              </div>
              
              <div>
                <Label htmlFor="kpi-weight">{isRTL ? 'الوزن (%)' : 'Weight (%)'}</Label>
                <Input
                  id="kpi-weight"
                  type="number"
                  value={newKPI.weight || ''}
                  onChange={(e) => setNewKPI({...newKPI, weight: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="kpi-target">{isRTL ? 'القيمة المستهدفة' : 'Target Value'}</Label>
                <Input
                  id="kpi-target"
                  type="number"
                  value={newKPI.targetValue || ''}
                  onChange={(e) => setNewKPI({...newKPI, targetValue: Number(e.target.value)})}
                  placeholder="0"
                />
              </div>

              <div>
                <Label htmlFor="kpi-unit">{isRTL ? 'وحدة القياس' : 'Measurement Unit'}</Label>
                <Input
                  id="kpi-unit"
                  value={newKPI.measurementUnit || ''}
                  onChange={(e) => setNewKPI({...newKPI, measurementUnit: e.target.value})}
                  placeholder={isRTL ? 'مثال: %, دولار, عدد' : 'e.g., %, $, count'}
                />
              </div>

              <div>
                <Label htmlFor="kpi-frequency">{isRTL ? 'تكرار القياس' : 'Frequency'}</Label>
                <Select value={newKPI.frequency} onValueChange={(value) => setNewKPI({...newKPI, frequency: value as any})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">{frequencyLabels.daily}</SelectItem>
                    <SelectItem value="weekly">{frequencyLabels.weekly}</SelectItem>
                    <SelectItem value="monthly">{frequencyLabels.monthly}</SelectItem>
                    <SelectItem value="quarterly">{frequencyLabels.quarterly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="kpi-source">{isRTL ? 'مصدر البيانات' : 'Data Source'}</Label>
                <Input
                  id="kpi-source"
                  value={newKPI.dataSource || ''}
                  onChange={(e) => setNewKPI({...newKPI, dataSource: e.target.value})}
                  placeholder={isRTL ? 'مثال: نظام CRM' : 'e.g., CRM System'}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="kpi-description">{isRTL ? 'وصف المؤشر' : 'KPI Description'}</Label>
              <Textarea
                id="kpi-description"
                value={newKPI.description || ''}
                onChange={(e) => setNewKPI({...newKPI, description: e.target.value})}
                placeholder={isRTL ? 'اكتب وصفاً تفصيلياً للمؤشر' : 'Write a detailed description of the KPI'}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="kpi-calculation">{isRTL ? 'طريقة الحساب' : 'Calculation Method'}</Label>
              <Textarea
                id="kpi-calculation"
                value={newKPI.calculationMethod || ''}
                onChange={(e) => setNewKPI({...newKPI, calculationMethod: e.target.value})}
                placeholder={isRTL ? 'اكتب المعادلة أو طريقة الحساب' : 'Write the formula or calculation method'}
                rows={2}
              />
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleSaveKPI}>
                {isRTL ? 'حفظ المؤشر' : 'Save KPI'}
              </Button>
              <Button onClick={handleCancelAdd} variant="outline">
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPIs List */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          {isRTL ? 'مؤشرات الأداء - ' : 'KPIs - '}{departmentLabels[selectedDepartment as keyof typeof departmentLabels]}
        </h3>
        
        {currentKPIs.map((kpi) => (
          <Card key={kpi.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-foreground">{kpi.name}</h4>
                    <Badge variant="outline" className={`text-white ${statusColors[kpi.status]}`}>
                      {statusLabels[kpi.status]}
                    </Badge>
                    <Badge variant="secondary">
                      {frequencyLabels[kpi.frequency]}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">{kpi.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
                    <div>
                      <span className="text-xs text-muted-foreground">{isRTL ? 'الوزن' : 'Weight'}</span>
                      <div className="font-medium">{kpi.weight}%</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{isRTL ? 'الهدف' : 'Target'}</span>
                      <div className="font-medium">{kpi.targetValue} {kpi.measurementUnit}</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{isRTL ? 'الحالي' : 'Current'}</span>
                      <div className="font-medium">{kpi.currentValue} {kpi.measurementUnit}</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{isRTL ? 'مصدر البيانات' : 'Data Source'}</span>
                      <div className="font-medium text-xs">{kpi.dataSource}</div>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">{isRTL ? 'طريقة الحساب' : 'Calculation'}</span>
                      <div className="font-medium text-xs">{kpi.calculationMethod}</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {isRTL ? 'نسبة الإنجاز' : 'Achievement'}
                      </span>
                      <span className="text-sm font-medium">{kpi.achievementPercentage.toFixed(1)}%</span>
                    </div>
                    <Progress value={kpi.achievementPercentage} className="h-2" />
                  </div>
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleLinkDataSource(kpi.id)}
                    className="gap-1"
                  >
                    <Link className="w-3 h-3" />
                    {isRTL ? 'ربط' : 'Link'}
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1">
                    <Edit3 className="w-3 h-3" />
                    {isRTL ? 'تعديل' : 'Edit'}
                  </Button>
                  <Button size="sm" variant="outline" className="gap-1 text-red-600 hover:text-red-700">
                    <Trash2 className="w-3 h-3" />
                    {isRTL ? 'حذف' : 'Delete'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};