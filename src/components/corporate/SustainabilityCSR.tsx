import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  Heart, 
  TrendingUp, 
  Target,
  Recycle,
  Award,
  Plus,
  Download,
  Filter,
  BarChart3,
  Users,
  DollarSign,
  Globe,
  Zap,
  ShieldCheck
} from 'lucide-react';

export const SustainabilityCSR: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    esgScore: 82,
    carbonReduction: 45,
    socialImpact: 15000,
    volunteering: 1240,
    donations: 850000,
    activeProjects: 18
  };

  const projects = [
    {
      id: 1,
      title: 'مبادرة الحد من الانبعاثات الكربونية',
      category: 'Environmental',
      status: 'active',
      impact: '45% تخفيض',
      budget: 500000,
      progress: 68,
      startDate: '2024-01-01',
      beneficiaries: 'جميع المنشآت'
    },
    {
      id: 2,
      title: 'برنامج دعم التعليم المحلي',
      category: 'Social',
      status: 'active',
      impact: '500 طالب',
      budget: 300000,
      progress: 85,
      startDate: '2024-02-15',
      beneficiaries: 'المجتمع المحلي'
    },
    {
      id: 3,
      title: 'مشروع الطاقة المتجددة',
      category: 'Environmental',
      status: 'active',
      impact: '35% طاقة نظيفة',
      budget: 1200000,
      progress: 42,
      startDate: '2024-03-01',
      beneficiaries: 'المنشآت الرئيسية'
    }
  ];

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Leaf className="h-8 w-8 text-primary" />
              الاستدامة والمسؤولية الاجتماعية
            </h2>
            <p className="text-muted-foreground mt-2">نظام شامل لإدارة برامج CSR & ESG والمسؤولية الاجتماعية</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 ml-2" />
              تصفية
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button size="sm" className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 ml-2" />
              مشروع جديد
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">تصنيف ESG</p>
                  <p className="text-2xl font-bold text-foreground">{stats.esgScore}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Award className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">تخفيض الانبعاثات</p>
                  <p className="text-2xl font-bold text-green-600">{stats.carbonReduction}%</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">المستفيدون</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.socialImpact.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">ساعات التطوع</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.volunteering}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">التبرعات (ريال)</p>
                  <p className="text-2xl font-bold text-orange-600">{(stats.donations/1000).toFixed(0)}K</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مشاريع نشطة</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activeProjects}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Zap className="h-6 w-6 text-primary" />
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
          <TabsTrigger value="environmental" className="flex flex-col gap-1 py-3">
            <Leaf className="h-4 w-4" />
            <span className="text-xs">البيئة</span>
          </TabsTrigger>
          <TabsTrigger value="social" className="flex flex-col gap-1 py-3">
            <Users className="h-4 w-4" />
            <span className="text-xs">المجتمع</span>
          </TabsTrigger>
          <TabsTrigger value="governance" className="flex flex-col gap-1 py-3">
            <ShieldCheck className="h-4 w-4" />
            <span className="text-xs">الحوكمة</span>
          </TabsTrigger>
          <TabsTrigger value="projects" className="flex flex-col gap-1 py-3">
            <Target className="h-4 w-4" />
            <span className="text-xs">المشاريع</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex flex-col gap-1 py-3">
            <Award className="h-4 w-4" />
            <span className="text-xs">التقارير</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-border/50 bg-gradient-to-br from-green-500/10 to-transparent">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-600" />
                  البيئة (E)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">درجة الأداء</span>
                    <span className="font-bold text-green-600">85/100</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-green-600" style={{ width: '85%' }} />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs">
                      <span>تخفيض الانبعاثات</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>الطاقة المتجددة</span>
                      <span className="font-medium">35%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-blue-500/10 to-transparent">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-600" />
                  المجتمع (S)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">درجة الأداء</span>
                    <span className="font-bold text-blue-600">88/100</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: '88%' }} />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs">
                      <span>البرامج الاجتماعية</span>
                      <span className="font-medium">12 برنامج</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>ساعات التطوع</span>
                      <span className="font-medium">1,240</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-gradient-to-br from-purple-500/10 to-transparent">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-purple-600" />
                  الحوكمة (G)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">درجة الأداء</span>
                    <span className="font-bold text-purple-600">92/100</span>
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-purple-600" style={{ width: '92%' }} />
                  </div>
                  <div className="space-y-2 pt-2">
                    <div className="flex justify-between text-xs">
                      <span>الشفافية</span>
                      <span className="font-medium">95%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span>الامتثال</span>
                      <span className="font-medium">98%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="environmental">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">المبادرات البيئية</h3>
                <p className="text-muted-foreground">إدارة البرامج البيئية والاستدامة</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">المسؤولية الاجتماعية</h3>
                <p className="text-muted-foreground">برامج خدمة المجتمع والتأثير الاجتماعي</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="governance">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <ShieldCheck className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">الحوكمة والامتثال</h3>
                <p className="text-muted-foreground">معايير الحوكمة وإدارة المخاطر</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          {projects.map((project) => (
            <Card key={project.id} className="border-border/50 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">نشط</Badge>
                        <Badge variant="outline">{project.category === 'Environmental' ? 'بيئي' : 'اجتماعي'}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>التأثير: {project.impact}</span>
                        <span>•</span>
                        <span>المستفيدون: {project.beneficiaries}</span>
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
                      <p className="text-lg font-bold text-foreground">{(project.budget/1000).toFixed(0)}K ريال</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">تاريخ البدء</p>
                      <p className="text-sm font-medium text-foreground">{project.startDate}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">التفاصيل</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="reports">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">تقارير الاستدامة</h3>
                <p className="text-muted-foreground">تقارير ESG والأداء البيئي والاجتماعي</p>
              </div>
              <Button className="bg-primary hover:bg-primary/90">
                <Download className="h-4 w-4 ml-2" />
                تحميل التقرير السنوي
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};