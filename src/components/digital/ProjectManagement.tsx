import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Briefcase, 
  TrendingUp, 
  Users, 
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Target,
  Plus,
  Download,
  Filter,
  BarChart3,
  AlertCircle,
  FileText,
  Activity
} from 'lucide-react';

export const ProjectManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    activeProjects: 18,
    completedProjects: 45,
    totalBudget: 5200000,
    teamMembers: 85,
    onTimeDelivery: 92,
    avgProgress: 68
  };

  const projects = [
    {
      id: 1,
      name: 'تحديث نظام إدارة الموارد البشرية',
      status: 'in-progress',
      progress: 72,
      budget: 850000,
      spent: 612000,
      startDate: '2024-09-01',
      endDate: '2025-01-31',
      team: 12,
      priority: 'high'
    },
    {
      id: 2,
      name: 'تطوير تطبيق الجوال',
      status: 'in-progress',
      progress: 45,
      budget: 650000,
      spent: 292500,
      startDate: '2024-10-15',
      endDate: '2025-03-15',
      team: 8,
      priority: 'high'
    },
    {
      id: 3,
      name: 'تدريب الموظفين على الأنظمة الجديدة',
      status: 'planning',
      progress: 15,
      budget: 320000,
      spent: 48000,
      startDate: '2024-12-01',
      endDate: '2025-02-28',
      team: 6,
      priority: 'medium'
    }
  ];

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="space-y-4">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">إدارة المشاريع</h1>
          <p className="text-muted-foreground">نظام متكامل لإدارة وتتبع المشاريع المؤسسية</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مشاريع نشطة</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activeProjects}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Briefcase className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مشاريع مكتملة</p>
                  <p className="text-2xl font-bold text-green-600">{stats.completedProjects}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الميزانية الكلية</p>
                  <p className="text-2xl font-bold text-foreground">{(stats.totalBudget/1000000).toFixed(1)}M</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">أعضاء الفريق</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.teamMembers}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">التسليم في الموعد</p>
                  <p className="text-2xl font-bold text-green-600">{stats.onTimeDelivery}%</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">متوسط التقدم</p>
                  <p className="text-2xl font-bold text-foreground">{stats.avgProgress}%</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl rounded-xl">
          <TabsTrigger value="overview" className="flex flex-col gap-1 py-3">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">نظرة عامة</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex flex-col gap-1 py-3">
            <Briefcase className="h-4 w-4" />
            <span className="text-xs">المشاريع</span>
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex flex-col gap-1 py-3">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">الجدول الزمني</span>
          </TabsTrigger>
          <TabsTrigger value="budget" className="flex flex-col gap-1 py-3">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs">الميزانية</span>
          </TabsTrigger>
          <TabsTrigger value="team" className="flex flex-col gap-1 py-3">
            <Users className="h-4 w-4" />
            <span className="text-xs">الفريق</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex flex-col gap-1 py-3">
            <FileText className="h-4 w-4" />
            <span className="text-xs">التقارير</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">توزيع حالة المشاريع</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { status: 'قيد التنفيذ', count: 12, percentage: 67, color: 'bg-blue-600' },
                    { status: 'التخطيط', count: 6, percentage: 33, color: 'bg-yellow-600' },
                    { status: 'مكتملة', count: 45, percentage: 100, color: 'bg-green-600' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{item.status}</span>
                        <span className="text-muted-foreground">{item.count} مشروع</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${item.percentage}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">التنبيهات والمواعيد النهائية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { project: 'تحديث نظام HR', deadline: '2025-01-31', daysLeft: 58, priority: 'high' },
                    { project: 'تطوير تطبيق الجوال', deadline: '2025-03-15', daysLeft: 102, priority: 'high' },
                    { project: 'تدريب الموظفين', deadline: '2025-02-28', daysLeft: 86, priority: 'medium' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        item.priority === 'high' ? 'bg-red-600' :
                        item.priority === 'medium' ? 'bg-yellow-600' : 'bg-blue-600'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">{item.project}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{item.daysLeft} يوم متبقي</span>
                          <span>•</span>
                          <span>{item.deadline}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="border-border/50 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{project.name}</h3>
                        <Badge className={
                          project.status === 'in-progress' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                          project.status === 'planning' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                          'bg-green-500/10 text-green-600 border-green-500/20'
                        }>
                          {project.status === 'in-progress' ? 'قيد التنفيذ' :
                           project.status === 'planning' ? 'التخطيط' : 'مكتمل'}
                        </Badge>
                        <Badge variant="outline" className={
                          project.priority === 'high' ? 'border-red-500/50 text-red-600' :
                          project.priority === 'medium' ? 'border-yellow-500/50 text-yellow-600' :
                          'border-blue-500/50 text-blue-600'
                        }>
                          {project.priority === 'high' ? 'أولوية عالية' :
                           project.priority === 'medium' ? 'أولوية متوسطة' : 'أولوية منخفضة'}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {project.startDate} - {project.endDate}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {project.team} عضو
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">التقدم</span>
                      <span className="font-bold text-foreground">{project.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary-glow"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground">الميزانية</p>
                      <p className="text-lg font-bold text-foreground">{(project.budget/1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">المصروف</p>
                      <p className="text-lg font-bold text-blue-600">{(project.spent/1000).toFixed(0)}K</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">المتبقي</p>
                      <p className="text-lg font-bold text-green-600">{((project.budget - project.spent)/1000).toFixed(0)}K</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">التفاصيل</Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">التقرير</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="timeline" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">الجدول الزمني للمشاريع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects.map((project, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-3 h-3 rounded-full ${
                          project.status === 'in-progress' ? 'bg-blue-600' :
                          project.status === 'planning' ? 'bg-yellow-600' : 'bg-green-600'
                        }`} />
                        {index < projects.length - 1 && (
                          <div className="w-0.5 h-full bg-border mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <div className="p-4 bg-muted/30 rounded-lg">
                          <h4 className="font-medium text-foreground mb-2">{project.name}</h4>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{project.startDate}</span>
                            <span>→</span>
                            <span>{project.endDate}</span>
                            <Badge variant="outline" className="text-xs">{project.progress}%</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">توزيع الميزانية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{project.name}</span>
                        <span className="text-muted-foreground">{(project.budget/1000).toFixed(0)}K</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-400" 
                          style={{ width: `${(project.spent / project.budget) * 100}%` }} 
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>مصروف: {(project.spent/1000).toFixed(0)}K</span>
                        <span>متبقي: {((project.budget - project.spent)/1000).toFixed(0)}K</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">ملخص المالي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-500/10 to-transparent rounded-lg">
                    <p className="text-sm text-muted-foreground mb-1">إجمالي الميزانية</p>
                    <p className="text-3xl font-bold text-foreground">
                      {(stats.totalBudget/1000000).toFixed(2)}M ريال
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">المنفق</p>
                      <p className="text-lg font-bold text-green-600">
                        {(projects.reduce((sum, p) => sum + p.spent, 0)/1000).toFixed(0)}K
                      </p>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">المتبقي</p>
                      <p className="text-lg font-bold text-blue-600">
                        {(projects.reduce((sum, p) => sum + (p.budget - p.spent), 0)/1000).toFixed(0)}K
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-border/50">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">نسبة الإنفاق الكلية</span>
                      <span className="font-medium">
                        {((projects.reduce((sum, p) => sum + p.spent, 0) / projects.reduce((sum, p) => sum + p.budget, 0)) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600" 
                        style={{ width: `${(projects.reduce((sum, p) => sum + p.spent, 0) / projects.reduce((sum, p) => sum + p.budget, 0)) * 100}%` }} 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">أعضاء الفريق</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'أحمد السعيد', role: 'مدير المشروع', projects: 3, tasks: 12, availability: 85 },
                  { name: 'سارة محمد', role: 'مطور رئيسي', projects: 2, tasks: 18, availability: 92 },
                  { name: 'خالد أحمد', role: 'مصمم UI/UX', projects: 2, tasks: 15, availability: 78 },
                  { name: 'فاطمة علي', role: 'محلل أعمال', projects: 3, tasks: 10, availability: 88 }
                ].map((member, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-foreground">{member.name}</h4>
                        <p className="text-xs text-muted-foreground">{member.role}</p>
                      </div>
                      <Badge variant="outline">{member.availability}% متاح</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المشاريع</span>
                        <span className="font-medium">{member.projects}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">المهام</span>
                        <span className="font-medium">{member.tasks}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">تقارير المشاريع</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { name: 'تقرير حالة المشاريع - ديسمبر 2024', date: '2024-12-01', size: '2.8 MB', status: 'جديد' },
                  { name: 'تقرير الميزانية والمصروفات Q4', date: '2024-11-25', size: '1.5 MB', status: null },
                  { name: 'تقرير الأداء الشهري - نوفمبر', date: '2024-11-30', size: '1.2 MB', status: null },
                  { name: 'تقرير تحليل المخاطر', date: '2024-11-15', size: '2.1 MB', status: null }
                ].map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-medium text-foreground">{report.name}</p>
                        {report.status && (
                          <Badge className="bg-green-500/10 text-green-600 border-green-500/20 text-xs">
                            {report.status}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
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
