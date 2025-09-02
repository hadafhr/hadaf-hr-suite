import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Settings, Heart, Clock, Star, Users, TrendingUp, Award, Brain, 
         Activity, Shield, MessageCircle, Calendar, Gift, Target, BarChart3, 
         Plus, Edit, Eye, Download, Filter, Search, Zap, Smile, CheckCircle, 
         AlertCircle, Trophy, Headphones, PhoneCall, FileText, Camera, Map, 
         Timer, Coffee, Dumbbell, Gamepad2, Book, Music } from 'lucide-react';

interface QualityOfLifeSystemProps {
  onBack?: () => void;
}

export const QualityOfLifeSystem: React.FC<QualityOfLifeSystemProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedInitiative, setSelectedInitiative] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 p-6" dir="rtl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="hover:bg-primary/10 border-primary/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Heart className="h-8 w-8 text-primary" />
              جودة الحياة
            </h1>
            <p className="text-muted-foreground mt-1">نظام إدارة جودة الحياة الوظيفية المتطور والذكي</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => console.log('AI Assistant')}>
            <Brain className="h-4 w-4" />
            المساعد الذكي
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => console.log('Settings')}>
            <Settings className="h-4 w-4" />
            الإعدادات
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="initiatives" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            المبادرات
          </TabsTrigger>
          <TabsTrigger value="support" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            الدعم النفسي
          </TabsTrigger>
          <TabsTrigger value="health" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            الصحة البدنية
          </TabsTrigger>
          <TabsTrigger value="balance" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            التوازن
          </TabsTrigger>
          <TabsTrigger value="rewards" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            المكافآت
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">نسبة رضا الموظفين</CardTitle>
                <Smile className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">87%</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={87} className="flex-1" />
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +5%
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/20 hover:border-secondary/40 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المبادرات النشطة</CardTitle>
                <Target className="h-4 w-4 text-secondary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-secondary">24</div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="text-sm text-muted-foreground">
                    12 رياضية، 8 ثقافية، 4 اجتماعية
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">نسبة المشاركة</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">72%</div>
                <div className="flex items-center gap-2 mt-2">
                  <Progress value={72} className="flex-1" />
                  <span className="text-sm text-muted-foreground">432 موظف</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:border-purple-400 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">النقاط المكتسبة</CardTitle>
                <Trophy className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">18,450</div>
                <div className="text-sm text-muted-foreground mt-1">
                  هذا الشهر: +2,340 نقطة
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  نظرة عامة على الأنشطة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Dumbbell className="h-4 w-4 text-blue-600" />
                      <span>الأنشطة الرياضية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20" />
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Book className="h-4 w-4 text-green-600" />
                      <span>الأنشطة الثقافية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={72} className="w-20" />
                      <span className="text-sm font-medium">72%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Heart className="h-4 w-4 text-red-600" />
                      <span>الأنشطة الاجتماعية</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={68} className="w-20" />
                      <span className="text-sm font-medium">68%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-600" />
                      <span>الدعم النفسي</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={45} className="w-20" />
                      <span className="text-sm font-medium">45%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-orange-600" />
                  التنبيهات والتوصيات الذكية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">توصية ذكية</span>
                    </div>
                    <p className="text-sm text-blue-700">
                      زيادة برامج الصحة البدنية بنسبة 15% لتحسين المشاركة
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">تنبيه</span>
                    </div>
                    <p className="text-sm text-yellow-700">
                      انخفاض في استخدام خدمات الدعم النفسي هذا الشهر
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">إنجاز</span>
                    </div>
                    <p className="text-sm text-green-700">
                      تم تجاوز هدف المشاركة الشهرية بنسبة 12%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                الأنشطة الأخيرة
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => console.log('View All Activities')}>
                <Eye className="h-4 w-4 mr-2" />
                عرض الكل
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { icon: Dumbbell, title: "تحدي 10,000 خطوة", participants: 156, type: "رياضي", status: "active" },
                  { icon: Book, title: "ورشة إدارة الوقت", participants: 89, type: "ثقافي", status: "completed" },
                  { icon: Coffee, title: "جلسة استراحة ذهنية", participants: 67, type: "استرخاء", status: "active" },
                  { icon: Heart, title: "برنامج الدعم الأسري", participants: 43, type: "اجتماعي", status: "active" }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                    <div className="flex items-center gap-3">
                      <activity.icon className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">{activity.title}</h4>
                        <p className="text-sm text-muted-foreground">{activity.participants} مشارك • {activity.type}</p>
                      </div>
                    </div>
                    <Badge variant={activity.status === 'active' ? 'default' : 'secondary'}>
                      {activity.status === 'active' ? 'نشط' : 'مكتمل'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Quality of Life Initiatives Tab */}
        <TabsContent value="initiatives" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">إدارة مبادرات جودة الحياة</h2>
            <div className="flex gap-2">
              <Button className="gap-2" onClick={() => console.log('Add Initiative')}>
                <Plus className="h-4 w-4" />
                إضافة مبادرة جديدة
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => console.log('Generate Report')}>
                <FileText className="h-4 w-4" />
                تقرير المبادرات
              </Button>
            </div>
          </div>

          {/* Initiative Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-blue-200 hover:border-blue-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Dumbbell className="h-5 w-5" />
                  البرامج الرياضية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>المبادرات النشطة</span>
                    <Badge variant="secondary">12</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>إجمالي المشاركين</span>
                    <span className="font-medium">287</span>
                  </div>
                  <Progress value={85} className="mt-2" />
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => console.log('View Sports Programs')}>
                      <Eye className="h-3 w-3 mr-1" />
                      عرض
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => console.log('Edit Sports Programs')}>
                      <Edit className="h-3 w-3 mr-1" />
                      تعديل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-green-200 hover:border-green-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <Book className="h-5 w-5" />
                  البرامج الثقافية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>المبادرات النشطة</span>
                    <Badge variant="secondary">8</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>إجمالي المشاركين</span>
                    <span className="font-medium">195</span>
                  </div>
                  <Progress value={72} className="mt-2" />
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => console.log('View Cultural Programs')}>
                      <Eye className="h-3 w-3 mr-1" />
                      عرض
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => console.log('Edit Cultural Programs')}>
                      <Edit className="h-3 w-3 mr-1" />
                      تعديل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-lg transition-all duration-300 border-purple-200 hover:border-purple-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Heart className="h-5 w-5" />
                  البرامج الاجتماعية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>المبادرات النشطة</span>
                    <Badge variant="secondary">4</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>إجمالي المشاركين</span>
                    <span className="font-medium">156</span>
                  </div>
                  <Progress value={68} className="mt-2" />
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={() => console.log('View Social Programs')}>
                      <Eye className="h-3 w-3 mr-1" />
                      عرض
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => console.log('Edit Social Programs')}>
                      <Edit className="h-3 w-3 mr-1" />
                      تعديل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Active Initiatives List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>المبادرات النشطة</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => console.log('Filter Initiatives')}>
                  <Filter className="h-4 w-4 mr-2" />
                  تصفية
                </Button>
                <Button variant="outline" size="sm" onClick={() => console.log('Search Initiatives')}>
                  <Search className="h-4 w-4 mr-2" />
                  بحث
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    name: "تحدي اللياقة الشهري", 
                    category: "رياضي", 
                    participants: 156, 
                    startDate: "2024-01-01", 
                    endDate: "2024-01-31",
                    status: "active",
                    satisfaction: 92
                  },
                  { 
                    name: "ورشة التطوير الذاتي", 
                    category: "ثقافي", 
                    participants: 89, 
                    startDate: "2024-01-15", 
                    endDate: "2024-02-15",
                    status: "active",
                    satisfaction: 88
                  },
                  { 
                    name: "برنامج الدعم الأسري", 
                    category: "اجتماعي", 
                    participants: 43, 
                    startDate: "2024-01-01", 
                    endDate: "2024-12-31",
                    status: "active",
                    satisfaction: 95
                  }
                ].map((initiative, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{initiative.name}</h4>
                          <Badge variant="outline">{initiative.category}</Badge>
                          <Badge variant={initiative.status === 'active' ? 'default' : 'secondary'}>
                            {initiative.status === 'active' ? 'نشط' : 'مكتمل'}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span>المشاركون: {initiative.participants}</span>
                          <span>من {initiative.startDate} إلى {initiative.endDate}</span>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 text-yellow-500" />
                            <span>الرضا: {initiative.satisfaction}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => console.log('View Initiative', initiative.name)}>
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => console.log('Edit Initiative', initiative.name)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => console.log('Download Report', initiative.name)}>
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Psychological Support Tab */}
        <TabsContent value="support" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">الدعم النفسي والاجتماعي</h2>
            <div className="flex gap-2">
              <Button className="gap-2" onClick={() => console.log('Add Support Service')}>
                <Plus className="h-4 w-4" />
                إضافة خدمة دعم
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => console.log('Support Analytics')}>
                <BarChart3 className="h-4 w-4" />
                تحليلات الدعم
              </Button>
            </div>
          </div>

          {/* Support Services */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-blue-200 hover:border-blue-400 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <MessageCircle className="h-5 w-5" />
                  الاستشارات النفسية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">الجلسات المتاحة</span>
                    <Badge variant="secondary">24/7</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">المستشارون</span>
                    <span className="font-medium">8 متخصصين</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">معدل الاستجابة</span>
                    <span className="font-medium text-green-600">&lt; 30 دقيقة</span>
                  </div>
                  <Button className="w-full gap-2" onClick={() => console.log('Book Consultation')}>
                    <Calendar className="h-4 w-4" />
                    حجز استشارة
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:border-green-400 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <PhoneCall className="h-5 w-5" />
                  خط الدعم المباشر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">وقت التشغيل</span>
                    <Badge variant="secondary">24/7</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">اللغات المتاحة</span>
                    <span className="font-medium">العربية، الإنجليزية</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">السرية</span>
                    <span className="font-medium text-blue-600">مضمونة 100%</span>
                  </div>
                  <Button className="w-full gap-2" onClick={() => console.log('Call Support')}>
                    <PhoneCall className="h-4 w-4" />
                    اتصال مباشر
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:border-purple-400 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Headphones className="h-5 w-5" />
                  جلسات الاسترخاء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">أنواع الجلسات</span>
                    <Badge variant="secondary">6 أنواع</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">المدة</span>
                    <span className="font-medium">15-60 دقيقة</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">التقييم</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="font-medium">4.8/5</span>
                    </div>
                  </div>
                  <Button className="w-full gap-2" onClick={() => console.log('Start Relaxation')}>
                    <Music className="h-4 w-4" />
                    بدء جلسة استرخاء
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  إحصائيات الدعم النفسي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>الاستشارات هذا الشهر</span>
                    <div className="flex items-center gap-2">
                      <Progress value={68} className="w-20" />
                      <span className="font-medium">127</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>جلسات الاسترخاء</span>
                    <div className="flex items-center gap-2">
                      <Progress value={82} className="w-20" />
                      <span className="font-medium">234</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>المكالمات الطارئة</span>
                    <div className="flex items-center gap-2">
                      <Progress value={15} className="w-20" />
                      <span className="font-medium">23</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>معدل الرضا</span>
                    <div className="flex items-center gap-2">
                      <Progress value={94} className="w-20" />
                      <span className="font-medium">94%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  التقارير الإجمالية (مجهولة المصدر)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">الضغوط الأكثر شيوعاً</span>
                    </div>
                    <p className="text-sm text-blue-700">ضغط العمل (35%)، التوازن الأسري (28%)، القلق المهني (22%)</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">التحسن الملحوظ</span>
                    </div>
                    <p className="text-sm text-green-700">انخفاض مستوى التوتر بنسبة 23% بعد 3 جلسات في المتوسط</p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-800">التوصيات</span>
                    </div>
                    <p className="text-sm text-purple-700">زيادة ورش إدارة الضغوط وتعزيز برامج التوازن</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Physical Health Tab */}
        <TabsContent value="health" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">برامج الصحة البدنية</h2>
            <div className="flex gap-2">
              <Button className="gap-2" onClick={() => console.log('Add Health Program')}>
                <Plus className="h-4 w-4" />
                إضافة برنامج صحي
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => console.log('Sync Health Devices')}>
                <Activity className="h-4 w-4" />
                مزامنة الأجهزة
              </Button>
            </div>
          </div>

          {/* Health Challenges */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-green-200 hover:border-green-400 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <Target className="h-5 w-5" />
                  تحدي 10,000 خطوة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">المشاركون</span>
                    <Badge variant="secondary">156 موظف</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">معدل الإنجاز</span>
                    <span className="font-medium text-green-600">78%</span>
                  </div>
                  <Progress value={78} className="mt-2" />
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>بدء: 1 يناير</span>
                    <span>انتهاء: 31 يناير</span>
                  </div>
                  <Button className="w-full gap-2" onClick={() => console.log('Join Challenge')}>
                    <Dumbbell className="h-4 w-4" />
                    انضمام للتحدي
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Activity className="h-5 w-5" />
                  برنامج اللياقة اليومي
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">التمارين المتاحة</span>
                    <Badge variant="secondary">25 تمرين</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">المستوى</span>
                    <span className="font-medium">مبتدئ إلى متقدم</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">المدة</span>
                    <span className="font-medium">15-45 دقيقة</span>
                  </div>
                  <Button className="w-full gap-2" onClick={() => console.log('Start Workout')}>
                    <Timer className="h-4 w-4" />
                    بدء التمرين
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:border-purple-400 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Heart className="h-5 w-5" />
                  تتبع الصحة العامة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">الأجهزة المدعومة</span>
                    <Badge variant="secondary">Apple, Google, Fitbit</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">المؤشرات</span>
                    <span className="font-medium">نبض، نوم، سعرات</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">التزامنة</span>
                    <span className="font-medium text-green-600">مفعلة</span>
                  </div>
                  <Button className="w-full gap-2" onClick={() => console.log('View Health Data')}>
                    <BarChart3 className="h-4 w-4" />
                    عرض البيانات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Health Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  الإحصائيات الصحية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>متوسط الخطوات اليومية</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20" />
                      <span className="font-medium">8,500</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>معدل النشاط الأسبوعي</span>
                    <div className="flex items-center gap-2">
                      <Progress value={72} className="w-20" />
                      <span className="font-medium">4.3 أيام</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>السعرات المحروقة</span>
                    <div className="flex items-center gap-2">
                      <Progress value={68} className="w-20" />
                      <span className="font-medium">1,850</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>جودة النوم</span>
                    <div className="flex items-center gap-2">
                      <Progress value={82} className="w-20" />
                      <span className="font-medium">7.2 ساعات</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  الإنجازات والمكافآت
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "محقق هدف الخطوات", points: 50, achieved: true },
                    { title: "أسبوع نشط", points: 100, achieved: true },
                    { title: "تحدي شهري", points: 200, achieved: false },
                    { title: "رياضي الشهر", points: 500, achieved: false }
                  ].map((achievement, index) => (
                    <div key={index} className={`flex items-center justify-between p-3 rounded-lg ${
                      achievement.achieved ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <div className="flex items-center gap-3">
                        <Trophy className={`h-4 w-4 ${achievement.achieved ? 'text-green-600' : 'text-gray-400'}`} />
                        <span className={achievement.achieved ? 'font-medium' : 'text-muted-foreground'}>
                          {achievement.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">{achievement.points} نقطة</span>
                        {achievement.achieved && <CheckCircle className="h-4 w-4 text-green-600" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Work-Life Balance Tab */}
        <TabsContent value="balance" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">التوازن بين العمل والحياة</h2>
            <div className="flex gap-2">
              <Button className="gap-2" onClick={() => console.log('Request Flexible Work')}>
                <Plus className="h-4 w-4" />
                طلب مرونة عمل
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => console.log('Balance Analytics')}>
                <BarChart3 className="h-4 w-4" />
                تحليلات التوازن
              </Button>
            </div>
          </div>

          {/* Balance Programs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-blue-200 hover:border-blue-400 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-600">
                  <Clock className="h-5 w-5" />
                  مرونة أوقات العمل
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">المشاركون</span>
                    <Badge variant="secondary">89 موظف</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">نوع المرونة</span>
                    <span className="font-medium">دوام مرن، عمل هجين</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">معدل الرضا</span>
                    <span className="font-medium text-green-600">96%</span>
                  </div>
                  <Button className="w-full gap-2" onClick={() => console.log('Apply Flexible Hours')}>
                    <Calendar className="h-4 w-4" />
                    تقديم طلب
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:border-green-400 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-600">
                  <Map className="h-5 w-5" />
                  العمل عن بُعد
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">المؤهلون</span>
                    <Badge variant="secondary">156 موظف</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">الأيام المتاحة</span>
                    <span className="font-medium">3 أيام/أسبوع</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">الإنتاجية</span>
                    <span className="font-medium text-green-600">+12%</span>
                  </div>
                  <Button className="w-full gap-2" onClick={() => console.log('Request Remote Work')}>
                    <Coffee className="h-4 w-4" />
                    طلب عمل عن بُعد
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:border-purple-400 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-600">
                  <Heart className="h-5 w-5" />
                  الدعم الأسري
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">البرامج المتاحة</span>
                    <Badge variant="secondary">8 برامج</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">الخدمات</span>
                    <span className="font-medium">حضانة، استشارات</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">المستفيدون</span>
                    <span className="font-medium">67 عائلة</span>
                  </div>
                  <Button className="w-full gap-2" onClick={() => console.log('View Family Support')}>
                    <Users className="h-4 w-4" />
                    عرض الخدمات
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Balance Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  مؤشرات التوازن
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>مؤشر التوازن العام</span>
                    <div className="flex items-center gap-2">
                      <Progress value={84} className="w-20" />
                      <span className="font-medium">84%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>ساعات العمل الإضافية</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-20" />
                      <span className="font-medium text-green-600">-25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>رضا الموظفين</span>
                    <div className="flex items-center gap-2">
                      <Progress value={91} className="w-20" />
                      <span className="font-medium">91%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>معدل الاحتفاظ</span>
                    <div className="flex items-center gap-2">
                      <Progress value={96} className="w-20" />
                      <span className="font-medium">96%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  تأثير برامج التوازن
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">تحسن الإنتاجية</span>
                    </div>
                    <p className="text-sm text-green-700">زيادة الإنتاجية بنسبة 15% مع برامج المرونة</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800">تحسن الصحة النفسية</span>
                    </div>
                    <p className="text-sm text-blue-700">انخفاض مستوى التوتر بنسبة 28%</p>
                  </div>
                  <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-800">تحسن العلاقات الأسرية</span>
                    </div>
                    <p className="text-sm text-purple-700">92% من الموظفين يقضون وقتاً أكثر مع العائلة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Rewards Tab */}
        <TabsContent value="rewards" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">المكافآت والتحفيز</h2>
            <div className="flex gap-2">
              <Button className="gap-2" onClick={() => console.log('Add Reward')}>
                <Plus className="h-4 w-4" />
                إضافة مكافأة
              </Button>
              <Button variant="outline" className="gap-2" onClick={() => console.log('Rewards Report')}>
                <FileText className="h-4 w-4" />
                تقرير المكافآت
              </Button>
            </div>
          </div>

          {/* Points Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="border-yellow-200 hover:border-yellow-400 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">نقاطك الحالية</CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">2,450</div>
                <p className="text-xs text-muted-foreground">
                  +340 هذا الأسبوع
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200 hover:border-blue-400 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المرتبة</CardTitle>
                <Trophy className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">#12</div>
                <p className="text-xs text-muted-foreground">
                  من أصل 600 موظف
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:border-green-400 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المكافآت المستبدلة</CardTitle>
                <Gift className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">8</div>
                <p className="text-xs text-muted-foreground">
                  هذا العام
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 hover:border-purple-400 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">المستوى</CardTitle>
                <Award className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">الذهبي</div>
                <p className="text-xs text-muted-foreground">
                  550 نقطة للمستوى التالي
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Available Rewards */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                المكافآت المتاحة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { 
                    name: "قسيمة تسوق 100 ريال", 
                    points: 500, 
                    category: "تسوق", 
                    available: true,
                    description: "قسيمة تسوق من المتاجر الشريكة"
                  },
                  { 
                    name: "يوم إجازة إضافي", 
                    points: 800, 
                    category: "إجازة", 
                    available: true,
                    description: "يوم إجازة مدفوع إضافي"
                  },
                  { 
                    name: "وجبة مجانية للفريق", 
                    points: 600, 
                    category: "طعام", 
                    available: true,
                    description: "وجبة مجانية لك ولفريقك"
                  },
                  { 
                    name: "دورة تدريبية مدفوعة", 
                    points: 1200, 
                    category: "تدريب", 
                    available: false,
                    description: "دورة تدريبية في مجال اختصاصك"
                  },
                  { 
                    name: "تذكرة سينما", 
                    points: 200, 
                    category: "ترفيه", 
                    available: true,
                    description: "تذكرة سينما لأحدث الأفلام"
                  },
                  { 
                    name: "جهاز رياضي", 
                    points: 2000, 
                    category: "صحة", 
                    available: false,
                    description: "جهاز رياضي منزلي"
                  }
                ].map((reward, index) => (
                  <div key={index} className={`p-4 border rounded-lg ${
                    reward.available ? 'hover:shadow-md transition-shadow' : 'opacity-50'
                  }`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{reward.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{reward.description}</p>
                        <Badge variant="outline" className="text-xs">{reward.category}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{reward.points} نقطة</span>
                      </div>
                      <Button 
                        size="sm" 
                        disabled={!reward.available}
                        onClick={() => console.log('Redeem Reward', reward.name)}
                      >
                        {reward.available ? 'استبدال' : 'غير متاح'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Leaderboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  لوحة المتصدرين
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "أحمد محمد", points: 4850, rank: 1, department: "تقنية المعلومات" },
                    { name: "فاطمة عبدالله", points: 4320, rank: 2, department: "التسويق" },
                    { name: "محمد خليدي", points: 3960, rank: 3, department: "المبيعات" },
                    { name: "نورا سالم", points: 3650, rank: 4, department: "الموارد البشرية" },
                    { name: "سارة المطيري", points: 3420, rank: 5, department: "المالية" }
                  ].map((employee, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          employee.rank === 1 ? 'bg-yellow-100 text-yellow-800' :
                          employee.rank === 2 ? 'bg-gray-100 text-gray-800' :
                          employee.rank === 3 ? 'bg-orange-100 text-orange-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {employee.rank}
                        </div>
                        <div>
                          <h4 className="font-medium">{employee.name}</h4>
                          <p className="text-sm text-muted-foreground">{employee.department}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-medium">{employee.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  طرق كسب النقاط
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { activity: "المشاركة في الأنشطة الرياضية", points: "50-200", frequency: "يومي" },
                    { activity: "حضور ورش التطوير", points: "100-300", frequency: "أسبوعي" },
                    { activity: "المشاركة في المبادرات الاجتماعية", points: "150-400", frequency: "شهري" },
                    { activity: "تحقيق أهداف الأداء", points: "200-500", frequency: "شهري" },
                    { activity: "مساعدة الزملاء", points: "25-100", frequency: "يومي" },
                    { activity: "تقديم اقتراحات تحسين", points: "300-800", frequency: "عند الحاجة" }
                  ].map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{method.activity}</h4>
                        <p className="text-xs text-muted-foreground">{method.frequency}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500" />
                        <span className="text-sm font-medium">{method.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};