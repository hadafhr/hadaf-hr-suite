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

        <TabsContent value="environmental" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">الانبعاثات الكربونية</span>
                  <Leaf className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">-45%</p>
                <p className="text-xs text-green-600 mt-1">↓ تخفيض من العام الماضي</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">استهلاك المياه</span>
                  <Recycle className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">-32%</p>
                <p className="text-xs text-blue-600 mt-1">↓ تخفيض من العام الماضي</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">الطاقة المتجددة</span>
                  <Zap className="h-4 w-4 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">35%</p>
                <p className="text-xs text-orange-600 mt-1">↑ من إجمالي الطاقة</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  البصمة الكربونية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { source: 'الكهرباء والطاقة', emissions: 1250, percentage: 42, trend: 'down' },
                    { source: 'النقل والمواصلات', emissions: 850, percentage: 28, trend: 'down' },
                    { source: 'النفايات', emissions: 450, percentage: 15, trend: 'stable' },
                    { source: 'أخرى', emissions: 450, percentage: 15, trend: 'down' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{item.source}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground">{item.emissions} طن CO₂</span>
                          <span className={`text-xs ${
                            item.trend === 'down' ? 'text-green-600' :
                            item.trend === 'up' ? 'text-red-600' : 'text-muted-foreground'
                          }`}>
                            {item.trend === 'down' ? '↓' : item.trend === 'up' ? '↑' : '→'}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-green-600 to-green-400" 
                          style={{ width: `${item.percentage}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Zap className="h-5 w-5 text-orange-600" />
                  الطاقة المتجددة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-foreground">الطاقة الشمسية</span>
                      <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20">نشط</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">القدرة الإنتاجية</span>
                        <span className="font-medium">2.5 ميجاوات</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">الإنتاج السنوي</span>
                        <span className="font-medium">3,200 MWh</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">المبادرات الحالية</h4>
                    {[
                      { initiative: 'استبدال إضاءة LED', progress: 95 },
                      { initiative: 'عزل حراري للمباني', progress: 78 },
                      { initiative: 'نظام إدارة الطاقة', progress: 60 }
                    ].map((item, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-foreground">{item.initiative}</span>
                          <span className="text-muted-foreground">{item.progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-green-600" style={{ width: `${item.progress}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Recycle className="h-5 w-5 text-blue-600" />
                  إدارة النفايات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">معدل إعادة التدوير</p>
                      <p className="text-xl font-bold text-blue-600">68%</p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">الحد من النفايات</p>
                      <p className="text-xl font-bold text-green-600">42%</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { type: 'ورق وكرتون', amount: '3.2 طن', color: 'bg-blue-600' },
                      { type: 'بلاستيك', amount: '1.8 طن', color: 'bg-green-600' },
                      { type: 'معادن', amount: '1.5 طن', color: 'bg-gray-600' },
                      { type: 'إلكترونيات', amount: '0.5 طن', color: 'bg-purple-600' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-sm text-foreground">{item.type}</span>
                        </div>
                        <span className="text-sm font-medium text-muted-foreground">{item.amount}/شهر</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  الأهداف البيئية 2024
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { goal: 'تخفيض الانبعاثات بنسبة 50%', target: 50, current: 45, status: 'on-track' },
                    { goal: 'الوصول إلى 40% طاقة متجددة', target: 40, current: 35, status: 'on-track' },
                    { goal: 'تحقيق 75% معدل تدوير', target: 75, current: 68, status: 'on-track' },
                    { goal: 'خفض استهلاك المياه 35%', target: 35, current: 32, status: 'on-track' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{item.goal}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.current}% من {item.target}%
                          </p>
                        </div>
                        <Badge className={
                          item.status === 'on-track' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                          item.status === 'at-risk' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' :
                          'bg-red-500/10 text-red-600 border-red-500/20'
                        }>
                          {item.status === 'on-track' ? 'على المسار' : item.status === 'at-risk' ? 'معرض للخطر' : 'متأخر'}
                        </Badge>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-600" 
                          style={{ width: `${(item.current / item.target) * 100}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">المستفيدون</span>
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">15,000</p>
                <p className="text-xs text-blue-600 mt-1">↑ +18% هذا العام</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">ساعات التطوع</span>
                  <Heart className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">1,240</p>
                <p className="text-xs text-purple-600 mt-1">↑ +25% هذا العام</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">التبرعات</span>
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">850K</p>
                <p className="text-xs text-green-600 mt-1">↑ +12% هذا العام</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">الشراكات</span>
                  <Globe className="h-4 w-4 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">28</p>
                <p className="text-xs text-orange-600 mt-1">مؤسسة شريكة</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4">
            {[
              {
                title: 'برنامج دعم التعليم',
                category: 'تعليم',
                beneficiaries: 500,
                budget: 300000,
                volunteers: 45,
                description: 'توفير منح دراسية وتجهيز مدارس في المناطق النائية',
                impact: ['500 طالب مستفيد', '10 مدارس تم تجهيزها', '45 متطوع'],
                color: 'blue'
              },
              {
                title: 'مبادرة الرعاية الصحية',
                category: 'صحة',
                beneficiaries: 2500,
                budget: 450000,
                volunteers: 32,
                description: 'توفير خدمات صحية مجانية وحملات توعية',
                impact: ['2500 مستفيد', '15 حملة توعوية', '32 متطوع طبي'],
                color: 'red'
              },
              {
                title: 'برنامج دعم الأسر المنتجة',
                category: 'اقتصادي',
                beneficiaries: 150,
                budget: 200000,
                volunteers: 28,
                description: 'تمكين الأسر اقتصادياً من خلال المشاريع الصغيرة',
                impact: ['150 أسرة منتجة', '85 مشروع صغير', '28 مدرب'],
                color: 'green'
              },
              {
                title: 'مبادرة حماية البيئة المحلية',
                category: 'بيئة',
                beneficiaries: 5000,
                budget: 180000,
                volunteers: 120,
                description: 'حملات تشجير وتنظيف وتوعية بيئية',
                impact: ['5000 شجرة', '15 حملة تنظيف', '120 متطوع'],
                color: 'green'
              }
            ].map((program, index) => (
              <Card key={index} className="border-border/50 hover:border-primary/50 transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-foreground">{program.title}</h3>
                        <Badge variant="outline" className="text-xs">{program.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{program.description}</p>
                      <div className="flex gap-4 text-sm">
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {program.beneficiaries} مستفيد
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <Heart className="h-4 w-4" />
                          {program.volunteers} متطوع
                        </span>
                        <span className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-4 w-4" />
                          {(program.budget/1000).toFixed(0)}K ريال
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
                    {program.impact.map((item, idx) => (
                      <div key={idx} className="p-3 bg-muted/30 rounded-lg text-center">
                        <p className="text-sm font-medium text-foreground">{item}</p>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm">التفاصيل</Button>
                    <Button size="sm" className="bg-primary hover:bg-primary/90">التقرير</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="governance" className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4 mb-4">
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">درجة الشفافية</span>
                  <ShieldCheck className="h-4 w-4 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">95%</p>
                <p className="text-xs text-purple-600 mt-1">ممتاز</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">الامتثال</span>
                  <ShieldCheck className="h-4 w-4 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">98%</p>
                <p className="text-xs text-green-600 mt-1">متوافق</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">المراجعات</span>
                  <Award className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-xs text-blue-600 mt-1">هذا العام</p>
              </CardContent>
            </Card>
            <Card className="border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">السياسات</span>
                  <BarChart3 className="h-4 w-4 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-foreground">42</p>
                <p className="text-xs text-orange-600 mt-1">سياسة نشطة</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-purple-600" />
                  معايير الحوكمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { standard: 'الشفافية والإفصاح', score: 95, status: 'excellent' },
                    { standard: 'استقلالية مجلس الإدارة', score: 92, status: 'excellent' },
                    { standard: 'حقوق المساهمين', score: 88, status: 'good' },
                    { standard: 'إدارة المخاطر', score: 90, status: 'excellent' },
                    { standard: 'أخلاقيات العمل', score: 96, status: 'excellent' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">{item.standard}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{item.score}%</span>
                          <Badge className={
                            item.status === 'excellent' ? 'bg-purple-500/10 text-purple-600 border-purple-500/20' :
                            item.status === 'good' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                            'bg-orange-500/10 text-orange-600 border-orange-500/20'
                          }>
                            {item.status === 'excellent' ? 'ممتاز' : item.status === 'good' ? 'جيد' : 'متوسط'}
                          </Badge>
                        </div>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-purple-600" style={{ width: `${item.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-5 w-5 text-blue-600" />
                  الامتثال والمراجعات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      type: 'مراجعة داخلية',
                      date: '2024-11-15',
                      status: 'completed',
                      findings: 'لا توجد ملاحظات جوهرية',
                      score: 98
                    },
                    {
                      type: 'مراجعة خارجية',
                      date: '2024-10-20',
                      status: 'completed',
                      findings: 'توصيات تحسينية بسيطة',
                      score: 95
                    },
                    {
                      type: 'تدقيق امتثال',
                      date: '2024-12-10',
                      status: 'in-progress',
                      findings: 'جاري التنفيذ',
                      score: null
                    },
                    {
                      type: 'مراجعة المخاطر',
                      date: '2024-09-05',
                      status: 'completed',
                      findings: 'جميع المخاطر مُدارة بفعالية',
                      score: 96
                    }
                  ].map((audit, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">{audit.type}</span>
                        <Badge className={
                          audit.status === 'completed' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                          audit.status === 'in-progress' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                          'bg-orange-500/10 text-orange-600 border-orange-500/20'
                        }>
                          {audit.status === 'completed' ? 'مكتمل' : audit.status === 'in-progress' ? 'جارٍ' : 'مجدول'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{audit.date}</p>
                      <p className="text-sm text-foreground">{audit.findings}</p>
                      {audit.score && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">النتيجة:</span>
                          <span className="text-sm font-bold text-foreground">{audit.score}%</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Target className="h-5 w-5 text-green-600" />
                  إدارة المخاطر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { risk: 'مخاطر مالية', level: 'low', mitigation: 'نظام مراقبة شامل' },
                    { risk: 'مخاطر تشغيلية', level: 'medium', mitigation: 'خطط طوارئ محدثة' },
                    { risk: 'مخاطر سمعة', level: 'low', mitigation: 'إدارة علاقات عامة فعالة' },
                    { risk: 'مخاطر قانونية', level: 'low', mitigation: 'فريق قانوني متخصص' },
                    { risk: 'مخاطر إلكترونية', level: 'medium', mitigation: 'أمن سيبراني متقدم' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">{item.risk}</p>
                        <p className="text-xs text-muted-foreground">{item.mitigation}</p>
                      </div>
                      <Badge className={
                        item.level === 'low' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                        item.level === 'medium' ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' :
                        'bg-red-500/10 text-red-600 border-red-500/20'
                      }>
                        {item.level === 'low' ? 'منخفض' : item.level === 'medium' ? 'متوسط' : 'عالي'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  السياسات والإجراءات
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { category: 'سياسات الحوكمة', count: 12, updated: '2024-11-01' },
                    { category: 'سياسات الامتثال', count: 8, updated: '2024-10-15' },
                    { category: 'سياسات الأخلاقيات', count: 6, updated: '2024-09-20' },
                    { category: 'سياسات إدارة المخاطر', count: 10, updated: '2024-11-10' },
                    { category: 'سياسات الإفصاح', count: 6, updated: '2024-10-25' }
                  ].map((policy, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{policy.category}</p>
                        <p className="text-xs text-muted-foreground">آخر تحديث: {policy.updated}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-foreground">{policy.count}</span>
                        <Button variant="ghost" size="sm">
                          عرض
                        </Button>
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

        <TabsContent value="reports" className="space-y-4">
          <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-2">تقرير الاستدامة السنوي 2024</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    التقرير الشامل لأداء الشركة في معايير ESG والمسؤولية الاجتماعية
                  </p>
                  <div className="flex gap-4 text-sm mb-4">
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <BarChart3 className="h-4 w-4" />
                      120 صفحة
                    </span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Award className="h-4 w-4" />
                      معتمد دولياً
                    </span>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90">
                  <Download className="h-4 w-4 ml-2" />
                  تحميل PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-green-600" />
                  التقارير البيئية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: 'تقرير الانبعاثات الكربونية Q4',
                      date: '2024-12-01',
                      size: '2.4 MB',
                      status: 'جديد'
                    },
                    {
                      title: 'تقرير استهلاك الطاقة 2024',
                      date: '2024-11-15',
                      size: '1.8 MB',
                      status: null
                    },
                    {
                      title: 'تقرير إدارة النفايات Q3',
                      date: '2024-10-01',
                      size: '1.5 MB',
                      status: null
                    },
                    {
                      title: 'تقرير المياه والموارد',
                      date: '2024-09-20',
                      size: '2.1 MB',
                      status: null
                    }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-foreground">{report.title}</p>
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

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  التقارير الاجتماعية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: 'تقرير البرامج الاجتماعية 2024',
                      date: '2024-11-30',
                      size: '3.2 MB',
                      status: 'جديد'
                    },
                    {
                      title: 'تقرير التطوع والمشاركة',
                      date: '2024-11-01',
                      size: '1.9 MB',
                      status: null
                    },
                    {
                      title: 'تقرير التبرعات Q4',
                      date: '2024-10-15',
                      size: '1.2 MB',
                      status: null
                    },
                    {
                      title: 'تقرير الشراكات المجتمعية',
                      date: '2024-09-10',
                      size: '2.5 MB',
                      status: null
                    }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-foreground">{report.title}</p>
                          {report.status && (
                            <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20 text-xs">
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

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-purple-600" />
                  تقارير الحوكمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: 'تقرير الحوكمة السنوي 2024',
                      date: '2024-12-05',
                      size: '4.1 MB',
                      status: 'جديد'
                    },
                    {
                      title: 'تقرير الامتثال Q4',
                      date: '2024-11-20',
                      size: '2.3 MB',
                      status: null
                    },
                    {
                      title: 'تقرير المراجعة الداخلية',
                      date: '2024-11-15',
                      size: '1.7 MB',
                      status: null
                    },
                    {
                      title: 'تقرير إدارة المخاطر',
                      date: '2024-10-30',
                      size: '2.8 MB',
                      status: null
                    }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-foreground">{report.title}</p>
                          {report.status && (
                            <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20 text-xs">
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

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  تقارير ESG الموحدة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    {
                      title: 'تقرير ESG الربع السنوي Q4',
                      date: '2024-12-01',
                      size: '5.3 MB',
                      status: 'جديد'
                    },
                    {
                      title: 'تقرير ESG النصف سنوي',
                      date: '2024-07-01',
                      size: '6.8 MB',
                      status: null
                    },
                    {
                      title: 'تقرير الأداء ESG 2023',
                      date: '2024-01-15',
                      size: '12.5 MB',
                      status: null
                    },
                    {
                      title: 'ملخص KPIs للاستدامة',
                      date: '2024-11-25',
                      size: '1.4 MB',
                      status: null
                    }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-foreground">{report.title}</p>
                          {report.status && (
                            <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
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
          </div>

          <Card className="border-border/50 bg-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Award className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-foreground mb-2">اشتراك في التقارير الدورية</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    احصل على تقارير الاستدامة والمسؤولية الاجتماعية فور صدورها عبر البريد الإلكتروني
                  </p>
                  <Button variant="outline">
                    الاشتراك الآن
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};