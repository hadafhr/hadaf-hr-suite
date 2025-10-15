import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Heart, 
  TrendingUp, 
  Target,
  Calendar,
  Award,
  Plus,
  Download,
  Filter,
  BarChart3,
  Globe,
  UserCheck,
  Zap,
  BookOpen,
  Shield
} from 'lucide-react';

export const DiversityInclusion: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    diversityScore: 87,
    inclusionIndex: 92,
    genderBalance: 45,
    culturalDiversity: 23,
    disabilityInclusion: 8,
    activePrograms: 12
  };

  const programs = [
    {
      id: 1,
      title: 'برنامج التوازن بين الجنسين',
      description: 'مبادرة لتحقيق التوازن في التمثيل والفرص',
      status: 'active',
      participants: 248,
      progress: 78,
      startDate: '2024-01-15',
      impact: 'high'
    },
    {
      id: 2,
      title: 'برنامج دعم ذوي الإعاقة',
      description: 'توفير بيئة عمل شاملة ومساندة',
      status: 'active',
      participants: 18,
      progress: 85,
      startDate: '2024-02-01',
      impact: 'high'
    },
    {
      id: 3,
      title: 'برنامج التنوع الثقافي',
      description: 'الاحتفاء بالتنوع الثقافي والعرقي',
      status: 'active',
      participants: 156,
      progress: 92,
      startDate: '2024-03-10',
      impact: 'medium'
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
          <h1 className="text-3xl font-bold mb-2 text-foreground">التنوع والشمول</h1>
          <p className="text-muted-foreground">نظام شامل لتعزيز ثقافة التنوع والشمول في بيئة العمل</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مؤشر التنوع</p>
                  <p className="text-2xl font-bold text-foreground">{stats.diversityScore}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مؤشر الشمول</p>
                  <p className="text-2xl font-bold text-green-600">{stats.inclusionIndex}%</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">التوازن الجندري</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.genderBalance}%</p>
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
                  <p className="text-sm text-muted-foreground">التنوع الثقافي</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.culturalDiversity}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">دعم ذوي الإعاقة</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.disabilityInclusion}%</p>
                </div>
                <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">برامج نشطة</p>
                  <p className="text-2xl font-bold text-foreground">{stats.activePrograms}</p>
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
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl rounded-xl">
          <TabsTrigger value="overview" className="flex flex-col gap-1 py-3">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs">نظرة عامة</span>
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex flex-col gap-1 py-3">
            <Target className="h-4 w-4" />
            <span className="text-xs">البرامج</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex flex-col gap-1 py-3">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">التدريب</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex flex-col gap-1 py-3">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs">المقاييس</span>
          </TabsTrigger>
          <TabsTrigger value="policies" className="flex flex-col gap-1 py-3">
            <Shield className="h-4 w-4" />
            <span className="text-xs">السياسات</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">التوزيع الديموغرافي</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'التوازن بين الجنسين', male: 55, female: 45 },
                    { label: 'الفئات العمرية', young: 35, middle: 45, senior: 20 },
                    { label: 'التنوع الثقافي', local: 77, international: 23 }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <div className="flex gap-2">
                        {Object.entries(item).filter(([key]) => key !== 'label').map(([key, value], idx) => (
                          <div key={idx} className="flex-1">
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground capitalize">{key}</span>
                              <span className="font-bold">{value}%</span>
                            </div>
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${idx === 0 ? 'bg-blue-600' : idx === 1 ? 'bg-pink-600' : 'bg-purple-600'}`}
                                style={{ width: `${value}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">مبادرات التنوع والشمول</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: 'سياسة المساواة في الفرص', status: 'implemented', date: '2024-01-01' },
                    { title: 'برنامج الإرشاد المهني', status: 'active', date: '2024-02-15' },
                    { title: 'مبادرة بيئة العمل الشاملة', status: 'planning', date: '2024-12-01' }
                  ].map((initiative, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground text-sm">{initiative.title}</p>
                        <p className="text-xs text-muted-foreground">{initiative.date}</p>
                      </div>
                      <Badge className={
                        initiative.status === 'implemented' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                        initiative.status === 'active' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                        'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                      }>
                        {initiative.status === 'implemented' ? 'مطبق' :
                         initiative.status === 'active' ? 'نشط' : 'قيد التخطيط'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-4">
          {programs.map((program) => (
            <Card key={program.id} className="border-border/50 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{program.title}</h3>
                        <Badge className="bg-green-500/10 text-green-600 border-green-500/20">نشط</Badge>
                        <Badge variant="outline">{program.impact === 'high' ? 'تأثير عالي' : 'تأثير متوسط'}</Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{program.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">التقدم</span>
                      <span className="font-bold text-foreground">{program.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary-glow"
                        style={{ width: `${program.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-xs text-muted-foreground">المشاركون</p>
                      <p className="text-lg font-bold text-foreground">{program.participants}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">تاريخ البدء</p>
                      <p className="text-sm font-medium text-foreground">{program.startDate}</p>
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

        <TabsContent value="training">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">برامج التدريب على التنوع والشمول</h3>
                <p className="text-muted-foreground">تطوير مهارات الموظفين في مجال التنوع والشمول</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">مقاييس الأداء</h3>
                <p className="text-muted-foreground">متابعة وتحليل مؤشرات التنوع والشمول</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies">
          <Card className="border-border/50">
            <CardContent className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">السياسات والإجراءات</h3>
                <p className="text-muted-foreground">إدارة سياسات التنوع والشمول</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};