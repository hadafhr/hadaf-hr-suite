import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, Users, DollarSign, Calendar, AlertTriangle, 
  Target, BarChart3, Download, RefreshCw, Settings
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const PredictiveAnalytics = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('turnover');

  const turnoverData = [
    { month: 'Jan', predicted: 8, actual: 7, trend: 'stable' },
    { month: 'Feb', predicted: 10, actual: 9, trend: 'up' },
    { month: 'Mar', predicted: 12, actual: 11, trend: 'up' },
    { month: 'Apr', predicted: 15, actual: 14, trend: 'up' },
    { month: 'May', predicted: 18, actual: 16, trend: 'up' },
    { month: 'Jun', predicted: 22, actual: 20, trend: 'up' },
    { month: 'Jul', predicted: 25, actual: null, trend: 'up' },
    { month: 'Aug', predicted: 23, actual: null, trend: 'down' },
    { month: 'Sep', predicted: 20, actual: null, trend: 'down' }
  ];

  const salaryBudgetData = [
    { department: 'IT', current: 450000, predicted: 520000, variance: 15.5 },
    { department: 'Sales', current: 380000, predicted: 420000, variance: 10.5 },
    { department: 'Marketing', current: 280000, predicted: 310000, variance: 10.7 },
    { department: 'HR', current: 220000, predicted: 240000, variance: 9.1 },
    { department: 'Finance', current: 320000, predicted: 345000, variance: 7.8 }
  ];

  const leavePatterns = [
    { period: 'Ramadan', type: 'Religious', predicted: 45, impact: 'High' },
    { period: 'Eid Al-Fitr', type: 'Holiday', predicted: 80, impact: 'Critical' },
    { period: 'Eid Al-Adha', type: 'Holiday', predicted: 75, impact: 'Critical' },
    { period: 'Summer', type: 'Vacation', predicted: 60, impact: 'High' },
    { period: 'School Term', type: 'Family', predicted: 25, impact: 'Medium' }
  ];

  const riskFactors = [
    { 
      department: 'Sales',
      risk: 25,
      factors: ['High workload', 'Competition offers', 'Bonus delays'],
      timeline: '3-6 months'
    },
    { 
      department: 'IT',
      risk: 18,
      factors: ['Market demand', 'Skill premium', 'Remote work'],
      timeline: '6-9 months'
    },
    { 
      department: 'Marketing',
      risk: 12,
      factors: ['Campaign pressure', 'Performance targets'],
      timeline: '9-12 months'
    }
  ];

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              {isRTL ? 'التحليلات التنبؤية' : 'Predictive Analytics'}
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                {isRTL ? 'تحديث البيانات' : 'Refresh Data'}
              </Button>
              <Button size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                {isRTL ? 'تصدير' : 'Export'}
              </Button>
              <Button size="sm" variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                {isRTL ? 'إعدادات' : 'Settings'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="turnover">{isRTL ? 'التنبؤ بالدوران' : 'Turnover Prediction'}</TabsTrigger>
              <TabsTrigger value="budget">{isRTL ? 'توقع الميزانية' : 'Budget Forecast'}</TabsTrigger>
              <TabsTrigger value="leave">{isRTL ? 'أنماط الإجازات' : 'Leave Patterns'}</TabsTrigger>
            </TabsList>

            <TabsContent value="turnover" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Turnover Prediction Chart */}
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {isRTL ? 'التنبؤ بمعدل دوران الموظفين' : 'Employee Turnover Prediction'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={turnoverData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="actual" 
                            stroke="hsl(var(--primary))" 
                            strokeWidth={2}
                            name={isRTL ? 'فعلي' : 'Actual'}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="predicted" 
                            stroke="hsl(var(--chart-2))" 
                            strokeWidth={2}
                            strokeDasharray="5 5"
                            name={isRTL ? 'متوقع' : 'Predicted'}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Risk Departments */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      {isRTL ? 'الأقسام عالية المخاطر' : 'High-Risk Departments'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {riskFactors.map((dept, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold">{dept.department}</h4>
                          <Badge variant={dept.risk > 20 ? 'destructive' : dept.risk > 10 ? 'secondary' : 'default'}>
                            {dept.risk}%
                          </Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">
                            {isRTL ? 'العوامل:' : 'Factors:'}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {dept.factors.map((factor, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {factor}
                              </Badge>
                            ))}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {isRTL ? 'الإطار الزمني:' : 'Timeline:'} {dept.timeline}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="budget" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Budget Forecast Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isRTL ? 'توقعات ميزانية الرواتب' : 'Salary Budget Forecast'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={salaryBudgetData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="department" />
                        <YAxis />
                        <Tooltip formatter={(value) => `SAR ${value.toLocaleString()}`} />
                        <Bar dataKey="current" fill="hsl(var(--primary))" name={isRTL ? 'حالي' : 'Current'} />
                        <Bar dataKey="predicted" fill="hsl(var(--chart-2))" name={isRTL ? 'متوقع' : 'Predicted'} />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Budget Variance */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isRTL ? 'تحليل التباين' : 'Variance Analysis'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {salaryBudgetData.map((dept, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <h4 className="font-semibold">{dept.department}</h4>
                            <p className="text-sm text-muted-foreground">
                              {isRTL ? 'زيادة متوقعة:' : 'Expected increase:'} SAR {(dept.predicted - dept.current).toLocaleString()}
                            </p>
                          </div>
                          <Badge variant={dept.variance > 12 ? 'destructive' : 'secondary'}>
                            +{dept.variance}%
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="leave" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Leave Patterns Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isRTL ? 'أنماط الإجازات المتوقعة' : 'Predicted Leave Patterns'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={leavePatterns}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="predicted"
                          label={({ period, predicted }) => `${period}: ${predicted}%`}
                        >
                          {leavePatterns.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                {/* Leave Impact Analysis */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">
                      {isRTL ? 'تحليل التأثير' : 'Impact Analysis'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {leavePatterns.map((pattern, idx) => (
                        <div key={idx} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{pattern.period}</h4>
                            <Badge variant={
                              pattern.impact === 'Critical' ? 'destructive' : 
                              pattern.impact === 'High' ? 'secondary' : 'default'
                            }>
                              {pattern.impact}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-muted-foreground">{pattern.type}</span>
                            <span className="font-semibold">{pattern.predicted}% {isRTL ? 'إجازة متوقعة' : 'expected leave'}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-destructive/10 rounded-lg">
                <Users className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">25%</p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'مخاطر تسريب عالية' : 'High attrition risk'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <DollarSign className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">12.5%</p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'زيادة الميزانية المتوقعة' : 'Expected budget increase'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-chart-2/10 rounded-lg">
                <Calendar className="h-6 w-6 text-chart-2" />
              </div>
              <div>
                <p className="text-2xl font-bold">80%</p>
                <p className="text-sm text-muted-foreground">
                  {isRTL ? 'ذروة الإجازات (عيد الفطر)' : 'Peak leave (Eid Al-Fitr)'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;