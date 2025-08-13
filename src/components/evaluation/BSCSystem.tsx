import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  Cog, 
  GraduationCap,
  TrendingUp,
  Target,
  Link,
  Plus,
  Edit,
  Eye,
  Download,
  Activity
} from 'lucide-react';

export const BSCSystem = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('overview');

  // BSC Perspectives with default data
  const perspectives = [
    {
      id: 'financial',
      name: isRTL ? 'البُعد المالي' : 'Financial Perspective',
      icon: DollarSign,
      weight: 25,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: isRTL ? 'النمو والربحية والعائد على الاستثمار' : 'Growth, profitability, and ROI',
      metrics: [
        { name: isRTL ? 'نمو الإيرادات' : 'Revenue Growth', target: 15, actual: 12, unit: '%' },
        { name: isRTL ? 'هامش الربح' : 'Profit Margin', target: 20, actual: 18, unit: '%' },
        { name: isRTL ? 'العائد على الاستثمار' : 'ROI', target: 12, actual: 14, unit: '%' }
      ]
    },
    {
      id: 'customer',
      name: isRTL ? 'بُعد العملاء' : 'Customer Perspective',
      icon: Users,
      weight: 25,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: isRTL ? 'رضا العملاء والاحتفاظ بهم واكتساب عملاء جدد' : 'Customer satisfaction, retention, and acquisition',
      metrics: [
        { name: isRTL ? 'رضا العملاء' : 'Customer Satisfaction', target: 90, actual: 88, unit: '%' },
        { name: isRTL ? 'معدل الاحتفاظ' : 'Retention Rate', target: 85, actual: 82, unit: '%' },
        { name: isRTL ? 'اكتساب عملاء جدد' : 'New Customer Acquisition', target: 200, actual: 180, unit: 'customers' }
      ]
    },
    {
      id: 'internal',
      name: isRTL ? 'العمليات الداخلية' : 'Internal Process Perspective',
      icon: Cog,
      weight: 25,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: isRTL ? 'كفاءة العمليات والجودة والابتكار' : 'Process efficiency, quality, and innovation',
      metrics: [
        { name: isRTL ? 'كفاءة العمليات' : 'Process Efficiency', target: 95, actual: 92, unit: '%' },
        { name: isRTL ? 'معدل الجودة' : 'Quality Rate', target: 99, actual: 97, unit: '%' },
        { name: isRTL ? 'وقت التسليم' : 'Delivery Time', target: 48, actual: 52, unit: 'hours' }
      ]
    },
    {
      id: 'learning',
      name: isRTL ? 'التعلم والنمو' : 'Learning & Growth Perspective',
      icon: GraduationCap,
      weight: 25,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: isRTL ? 'تطوير المهارات والقدرات والابتكار' : 'Skill development, capabilities, and innovation',
      metrics: [
        { name: isRTL ? 'ساعات التدريب' : 'Training Hours', target: 40, actual: 35, unit: 'hours/employee' },
        { name: isRTL ? 'رضا الموظفين' : 'Employee Satisfaction', target: 85, actual: 82, unit: '%' },
        { name: isRTL ? 'معدل الاحتفاظ بالمواهب' : 'Talent Retention', target: 90, actual: 88, unit: '%' }
      ]
    }
  ];

  const strategyMap = [
    {
      level: 'financial',
      objectives: [
        { id: 'f1', name: isRTL ? 'زيادة الإيرادات' : 'Increase Revenue', x: 20, y: 10 },
        { id: 'f2', name: isRTL ? 'تحسين الربحية' : 'Improve Profitability', x: 60, y: 10 }
      ]
    },
    {
      level: 'customer',
      objectives: [
        { id: 'c1', name: isRTL ? 'رضا العملاء' : 'Customer Satisfaction', x: 15, y: 30 },
        { id: 'c2', name: isRTL ? 'اكتساب عملاء جدد' : 'New Customer Acquisition', x: 50, y: 30 },
        { id: 'c3', name: isRTL ? 'الاحتفاظ بالعملاء' : 'Customer Retention', x: 75, y: 30 }
      ]
    },
    {
      level: 'internal',
      objectives: [
        { id: 'i1', name: isRTL ? 'تحسين العمليات' : 'Process Improvement', x: 20, y: 50 },
        { id: 'i2', name: isRTL ? 'ضمان الجودة' : 'Quality Assurance', x: 60, y: 50 }
      ]
    },
    {
      level: 'learning',
      objectives: [
        { id: 'l1', name: isRTL ? 'تطوير المهارات' : 'Skill Development', x: 25, y: 70 },
        { id: 'l2', name: isRTL ? 'الابتكار' : 'Innovation', x: 65, y: 70 }
      ]
    }
  ];

  const getPerformanceColor = (actual: number, target: number) => {
    const percentage = (actual / target) * 100;
    if (percentage >= 100) return 'text-success';
    if (percentage >= 80) return 'text-warning';
    return 'text-destructive';
  };

  const getProgressValue = (actual: number, target: number) => {
    return Math.min((actual / target) * 100, 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-3">
            <BarChart3 className="w-6 h-6 text-primary" />
            {isRTL ? 'بطاقة الأداء المتوازن (BSC)' : 'Balanced Scorecard (BSC)'}
          </h2>
          <p className="text-muted-foreground mt-1">
            {isRTL ? 'قياس الأداء من أربعة أبعاد متوازنة' : 'Performance measurement across four balanced perspectives'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Link className="w-4 h-4" />
            {isRTL ? 'خريطة الاستراتيجية' : 'Strategy Map'}
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            {isRTL ? 'تصدير BSC' : 'Export BSC'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-muted/30 p-1 rounded-xl">
          <TabsTrigger value="overview" className="rounded-lg">
            {isRTL ? 'نظرة عامة' : 'Overview'}
          </TabsTrigger>
          <TabsTrigger value="perspectives" className="rounded-lg">
            {isRTL ? 'الأبعاد' : 'Perspectives'}
          </TabsTrigger>
          <TabsTrigger value="strategy" className="rounded-lg">
            {isRTL ? 'خريطة الاستراتيجية' : 'Strategy Map'}
          </TabsTrigger>
          <TabsTrigger value="metrics" className="rounded-lg">
            {isRTL ? 'المقاييس' : 'Metrics'}
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {perspectives.map((perspective) => (
              <Card key={perspective.id} className={`border-l-4 ${perspective.borderColor} hover:shadow-soft transition-all duration-300`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 ${perspective.bgColor} rounded-lg`}>
                      <perspective.icon className={`w-6 h-6 ${perspective.color}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {perspective.weight}%
                    </Badge>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{perspective.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{perspective.description}</p>
                  
                  <div className="space-y-2">
                    {perspective.metrics.slice(0, 2).map((metric, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{metric.name}</span>
                        <span className={`font-medium ${getPerformanceColor(metric.actual, metric.target)}`}>
                          {metric.actual}{metric.unit}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button size="sm" variant="outline" className="w-full mt-4">
                    {isRTL ? 'عرض التفاصيل' : 'View Details'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Overall Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                {isRTL ? 'الأداء العام' : 'Overall Performance'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                {perspectives.map((perspective) => {
                  const avgPerformance = perspective.metrics.reduce((acc, metric) => 
                    acc + getProgressValue(metric.actual, metric.target), 0
                  ) / perspective.metrics.length;
                  
                  return (
                    <div key={perspective.id} className="text-center">
                      <div className="mb-2">
                        <span className="text-2xl font-bold text-foreground">{Math.round(avgPerformance)}%</span>
                      </div>
                      <Progress value={avgPerformance} className="h-2 mb-2" />
                      <span className="text-sm text-muted-foreground">{perspective.name}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Perspectives Tab */}
        <TabsContent value="perspectives" className="space-y-6">
          {perspectives.map((perspective) => (
            <Card key={perspective.id} className={`border-l-4 ${perspective.borderColor}`}>
              <CardHeader className={perspective.bgColor}>
                <CardTitle className="flex items-center gap-3">
                  <perspective.icon className={`w-6 h-6 ${perspective.color}`} />
                  {perspective.name}
                  <Badge className={`ml-auto ${perspective.color.replace('text-', 'bg-').replace('600', '100')} ${perspective.color.replace('600', '800')}`}>
                    {isRTL ? `الوزن: ${perspective.weight}%` : `Weight: ${perspective.weight}%`}
                  </Badge>
                </CardTitle>
                <CardDescription>{perspective.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {perspective.metrics.map((metric, index) => (
                    <Card key={index} className="border border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-foreground text-sm">{metric.name}</h4>
                          <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                            <Edit className="w-3 h-3" />
                          </Button>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{isRTL ? 'الهدف' : 'Target'}</span>
                            <span className="font-medium">{metric.target}{metric.unit}</span>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">{isRTL ? 'الفعلي' : 'Actual'}</span>
                            <span className={`font-medium ${getPerformanceColor(metric.actual, metric.target)}`}>
                              {metric.actual}{metric.unit}
                            </span>
                          </div>
                          <Progress 
                            value={getProgressValue(metric.actual, metric.target)} 
                            className="h-2"
                          />
                          <div className="text-xs text-center text-muted-foreground">
                            {Math.round(getProgressValue(metric.actual, metric.target))}% {isRTL ? 'مُحقق' : 'achieved'}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button size="sm" className="gap-2">
                    <Plus className="w-4 h-4" />
                    {isRTL ? 'إضافة مقياس' : 'Add Metric'}
                  </Button>
                  <Button size="sm" variant="outline" className="gap-2">
                    <Link className="w-4 h-4" />
                    {isRTL ? 'ربط المبادرات' : 'Link Initiatives'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Strategy Map Tab */}
        <TabsContent value="strategy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link className="w-5 h-5" />
                {isRTL ? 'خريطة الاستراتيجية' : 'Strategy Map'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'ربط الأهداف الاستراتيجية عبر الأبعاد الأربعة' : 'Link strategic objectives across the four perspectives'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-b from-green-50 to-orange-50 p-8 rounded-xl min-h-[500px]">
                {/* Perspective Labels */}
                <div className="absolute left-4 top-0 bottom-0 flex flex-col justify-around">
                  {perspectives.map((perspective) => (
                    <div key={perspective.id} className="flex items-center gap-2 text-sm font-medium">
                      <perspective.icon className={`w-4 h-4 ${perspective.color}`} />
                      {perspective.name}
                    </div>
                  ))}
                </div>
                
                {/* Objectives */}
                <div className="ml-32 relative">
                  {strategyMap.map((level) => (
                    <div key={level.level} className="mb-20">
                      {level.objectives.map((objective) => (
                        <div 
                          key={objective.id}
                          className="absolute bg-white border-2 border-primary/20 rounded-lg p-3 shadow-soft cursor-pointer hover:shadow-medium transition-all duration-300"
                          style={{ left: `${objective.x}%`, top: `${objective.y}%` }}
                        >
                          <span className="text-sm font-medium">{objective.name}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                  
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <marker id="arrowhead" markerWidth="10" markerHeight="7" 
                        refX="0" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#009F87" />
                      </marker>
                    </defs>
                    <line x1="25%" y1="15%" x2="20%" y2="35%" 
                      stroke="#009F87" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="65%" y1="15%" x2="55%" y2="35%" 
                      stroke="#009F87" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="55%" y1="35%" x2="25%" y2="55%" 
                      stroke="#009F87" strokeWidth="2" markerEnd="url(#arrowhead)" />
                    <line x1="25%" y1="55%" x2="30%" y2="75%" 
                      stroke="#009F87" strokeWidth="2" markerEnd="url(#arrowhead)" />
                  </svg>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button className="gap-2">
                  <Edit className="w-4 h-4" />
                  {isRTL ? 'تحرير الخريطة' : 'Edit Map'}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  {isRTL ? 'تصدير الخريطة' : 'Export Map'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Metrics Tab */}
        <TabsContent value="metrics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                {isRTL ? 'إدارة المقاييس' : 'Metrics Management'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'إضافة وتعديل وربط مقاييس الأداء بمصادر البيانات' : 'Add, edit, and link performance metrics to data sources'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {perspectives.map((perspective) => (
                  <div key={perspective.id}>
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <perspective.icon className={`w-5 h-5 ${perspective.color}`} />
                      {perspective.name}
                    </h3>
                    <div className="grid gap-4">
                      {perspective.metrics.map((metric, index) => (
                        <Card key={index} className="border border-border/50">
                          <CardContent className="p-4">
                            <div className="grid gap-4 md:grid-cols-4">
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  {isRTL ? 'اسم المقياس' : 'Metric Name'}
                                </Label>
                                <Input value={metric.name} className="mt-1" />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  {isRTL ? 'الهدف' : 'Target'}
                                </Label>
                                <Input value={metric.target} type="number" className="mt-1" />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  {isRTL ? 'القيمة الفعلية' : 'Actual Value'}
                                </Label>
                                <Input value={metric.actual} type="number" className="mt-1" />
                              </div>
                              <div>
                                <Label className="text-xs text-muted-foreground">
                                  {isRTL ? 'الوحدة' : 'Unit'}
                                </Label>
                                <Input value={metric.unit} className="mt-1" />
                              </div>
                            </div>
                            <div className="mt-4 flex gap-2">
                              <Button size="sm" variant="outline" className="gap-2">
                                <Link className="w-4 h-4" />
                                {isRTL ? 'ربط مصدر البيانات' : 'Link Data Source'}
                              </Button>
                              <Button size="sm" variant="outline" className="gap-2">
                                <Eye className="w-4 h-4" />
                                {isRTL ? 'عرض الاتجاه' : 'View Trend'}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};