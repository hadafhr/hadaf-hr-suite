import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Target, TrendingUp, Search, Plus, Star, Award } from 'lucide-react';

interface PerformanceEvaluationProps {
  onBack: () => void;
}

interface Evaluation {
  id: string;
  employeeName: string;
  employeeId: string;
  evaluationType: 'annual' | 'quarterly' | 'probation';
  period: string;
  overallScore: number;
  status: 'pending' | 'completed' | 'reviewed';
  evaluator: string;
  department: string;
  createdDate: string;
  dueDate: string;
}

interface Goal {
  id: string;
  employeeName: string;
  employeeId: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
  status: 'in_progress' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
}

export const PerformanceEvaluation: React.FC<PerformanceEvaluationProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const evaluations: Evaluation[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد علي',
      employeeId: 'EMP001',
      evaluationType: 'annual',
      period: '2024',
      overallScore: 4.2,
      status: 'completed',
      evaluator: 'سارة أحمد - مدير الموارد البشرية',
      department: 'الموارد البشرية',
      createdDate: '2024-01-01',
      dueDate: '2024-01-31'
    },
    {
      id: '2',
      employeeName: 'فاطمة عبد الرحمن',
      employeeId: 'EMP002',
      evaluationType: 'quarterly',
      period: 'Q1 2024',
      overallScore: 3.8,
      status: 'pending',
      evaluator: 'محمد خالد - مدير القسم',
      department: 'المحاسبة',
      createdDate: '2024-01-15',
      dueDate: '2024-02-15'
    },
    {
      id: '3',
      employeeName: 'عبد الله سعد',
      employeeId: 'EMP003',
      evaluationType: 'probation',
      period: 'فترة التجربة',
      overallScore: 4.5,
      status: 'reviewed',
      evaluator: 'علي حسن - المدير العام',
      department: 'تقنية المعلومات',
      createdDate: '2024-01-20',
      dueDate: '2024-02-20'
    }
  ];

  const goals: Goal[] = [
    {
      id: '1',
      employeeName: 'أحمد محمد علي',
      employeeId: 'EMP001',
      title: 'تطوير نظام إدارة الأداء',
      description: 'تصميم وتطوير نظام شامل لإدارة أداء الموظفين',
      targetDate: '2024-06-30',
      progress: 75,
      status: 'in_progress',
      priority: 'high'
    },
    {
      id: '2',
      employeeName: 'فاطمة عبد الرحمن',
      employeeId: 'EMP002',
      title: 'أتمتة العمليات المحاسبية',
      description: 'تحسين كفاءة العمليات المحاسبية من خلال الأتمتة',
      targetDate: '2024-04-15',
      progress: 90,
      status: 'in_progress',
      priority: 'medium'
    },
    {
      id: '3',
      employeeName: 'عبد الله سعد',
      employeeId: 'EMP003',
      title: 'تدريب الفريق على التقنيات الحديثة',
      description: 'تقديم برنامج تدريبي شامل للفريق على أحدث التقنيات',
      targetDate: '2024-03-31',
      progress: 100,
      status: 'completed',
      priority: 'high'
    }
  ];

  const getEvaluationTypeBadge = (type: string) => {
    const typeConfig = {
      annual: { text: isRTL ? 'سنوي' : 'Annual', className: 'bg-blue-100 text-blue-800' },
      quarterly: { text: isRTL ? 'ربع سنوي' : 'Quarterly', className: 'bg-green-100 text-green-800' },
      probation: { text: isRTL ? 'فترة تجربة' : 'Probation', className: 'bg-orange-100 text-orange-800' }
    };
    return typeConfig[type as keyof typeof typeConfig];
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: isRTL ? 'في الانتظار' : 'Pending', className: 'bg-yellow-100 text-yellow-800' },
      completed: { text: isRTL ? 'مكتمل' : 'Completed', className: 'bg-green-100 text-green-800' },
      reviewed: { text: isRTL ? 'تم المراجعة' : 'Reviewed', className: 'bg-blue-100 text-blue-800' },
      in_progress: { text: isRTL ? 'قيد التنفيذ' : 'In Progress', className: 'bg-blue-100 text-blue-800' },
      overdue: { text: isRTL ? 'متأخر' : 'Overdue', className: 'bg-red-100 text-red-800' }
    };
    return statusConfig[status as keyof typeof statusConfig];
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig = {
      high: { text: isRTL ? 'عالي' : 'High', className: 'bg-red-100 text-red-800' },
      medium: { text: isRTL ? 'متوسط' : 'Medium', className: 'bg-yellow-100 text-yellow-800' },
      low: { text: isRTL ? 'منخفض' : 'Low', className: 'bg-green-100 text-green-800' }
    };
    return priorityConfig[priority as keyof typeof priorityConfig];
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'text-green-600';
    if (score >= 3.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredEvaluations = evaluations.filter(evaluation => {
    const matchesSearch = evaluation.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         evaluation.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || evaluation.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className={`min-h-screen bg-background p-6 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              {isRTL ? 'رجوع' : 'Back'}
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isRTL ? 'تقييم الأداء' : 'Performance Evaluation'}
              </h1>
              <p className="text-muted-foreground">
                {isRTL ? 'إدارة تقييمات الأداء والأهداف والمتابعة' : 'Manage performance evaluations, goals and tracking'}
              </p>
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {isRTL ? 'تقييم جديد' : 'New Evaluation'}
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'التقييمات المكتملة' : 'Completed Evaluations'}
                  </p>
                  <p className="text-2xl font-bold">156</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'متوسط الأداء' : 'Average Performance'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">4.2</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'الأهداف المكتملة' : 'Goals Completed'}
                  </p>
                  <p className="text-2xl font-bold text-blue-600">89</p>
                </div>
                <Award className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {isRTL ? 'تحسن الأداء' : 'Performance Growth'}
                  </p>
                  <p className="text-2xl font-bold text-green-600">+12%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="evaluations" className="space-y-6">
          <TabsList>
            <TabsTrigger value="evaluations">{isRTL ? 'التقييمات' : 'Evaluations'}</TabsTrigger>
            <TabsTrigger value="goals">{isRTL ? 'الأهداف' : 'Goals & Objectives'}</TabsTrigger>
            <TabsTrigger value="reports">{isRTL ? 'التقارير' : 'Performance Reports'}</TabsTrigger>
          </TabsList>

          <TabsContent value="evaluations">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={isRTL ? 'البحث في التقييمات...' : 'Search evaluations...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
            </div>

            {/* Evaluations List */}
            <div className="space-y-6">
              {filteredEvaluations.map((evaluation) => {
                const typeBadge = getEvaluationTypeBadge(evaluation.evaluationType);
                const statusBadge = getStatusBadge(evaluation.status);
                
                return (
                  <Card key={evaluation.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{evaluation.employeeName}</CardTitle>
                          <p className="text-sm text-muted-foreground">{evaluation.employeeId} - {evaluation.department}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge className={typeBadge.className}>
                            {typeBadge.text}
                          </Badge>
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">{isRTL ? 'النتيجة الإجمالية' : 'Overall Score'}</p>
                            <p className={`text-2xl font-bold ${getScoreColor(evaluation.overallScore)}`}>
                              {evaluation.overallScore}/5.0
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'الفترة:' : 'Period:'}</span>
                            <span className="text-sm font-medium">{evaluation.period}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'المقيِّم:' : 'Evaluator:'}</span>
                            <span className="text-sm">{evaluation.evaluator}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'تاريخ الإنشاء:' : 'Created Date:'}</span>
                            <span className="text-sm font-medium">{evaluation.createdDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">{isRTL ? 'تاريخ الاستحقاق:' : 'Due Date:'}</span>
                            <span className="text-sm font-medium">{evaluation.dueDate}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-6">
                        <Button size="sm" variant="outline">
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'تحرير' : 'Edit'}
                        </Button>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'طباعة' : 'Print'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="goals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {goals.map((goal) => {
                const statusBadge = getStatusBadge(goal.status);
                const priorityBadge = getPriorityBadge(goal.priority);
                
                return (
                  <Card key={goal.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{goal.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge className={statusBadge.className}>
                            {statusBadge.text}
                          </Badge>
                          <Badge className={priorityBadge.className}>
                            {priorityBadge.text}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{goal.employeeName} - {goal.employeeId}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">{goal.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                            <span>{goal.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all" 
                              style={{ width: `${goal.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{isRTL ? 'تاريخ الهدف:' : 'Target Date:'}</span>
                          <span className="font-medium">{goal.targetDate}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'تحديث' : 'Update'}
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          {isRTL ? 'عرض' : 'View'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>{isRTL ? 'تقارير الأداء' : 'Performance Reports'}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {isRTL ? 'تقارير مفصلة عن أداء الموظفين والاتجاهات' : 'Detailed reports on employee performance and trends'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};