import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Users, Clock, ArrowLeft, BarChart3, FileText, 
  Download, Upload, AlertCircle, CheckCircle, TrendingUp,
  Building2, Award, Calendar, DollarSign, Target, PieChart
} from 'lucide-react';

interface TrainingDisclosureSystemProps {
  onBack?: () => void;
}

export const TrainingDisclosureSystem: React.FC<TrainingDisclosureSystemProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data
  const stats = {
    totalPrograms: 24,
    totalTrainees: 156,
    saudiTrainees: 98,
    nonSaudiTrainees: 58,
    totalHours: 1840,
    totalCost: 485000,
    avgHoursPerEmployee: 11.8,
    budgetPercentage: 3.2,
    completionRate: 87.5
  };

  return (
    <div className="min-h-screen bg-background p-6" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="flex items-center justify-between mb-12 p-6 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-border animate-fade-in">
          <div className="flex items-center gap-6">
            {onBack && (
              <Button variant="outline" size="sm" onClick={onBack} className="border-border hover:bg-accent hover:border-accent hover:text-accent-foreground transition-all duration-300">
                <ArrowLeft className="h-4 w-4 ml-2" />
                رجوع
              </Button>
            )}
            <div className="h-8 w-px bg-border"></div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                <div className="relative z-10 group-hover:scale-110 transition-transform text-white">
                  <FileText className="h-12 w-12" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  نظام الإفصاح عن بيانات التدريب
                </h1>
                <p className="text-muted-foreground text-lg">
                  متوافق مع متطلبات وزارة الموارد البشرية ومنصة قوى
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/10 px-4 py-2 text-sm font-medium">
              <CheckCircle className="h-4 w-4 ml-2" />
              جاهز للإفصاح 2024
            </Badge>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-l-4 border-l-primary text-foreground shadow-2xl backdrop-blur-xl hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-primary/20 rounded-xl">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm mb-1">إجمالي البرامج</p>
                  <p className="text-3xl font-bold">{stats.totalPrograms}</p>
                  <p className="text-muted-foreground text-xs mt-1">برنامج تدريبي</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-l-4 border-l-success text-foreground shadow-2xl backdrop-blur-xl hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-success/20 rounded-xl">
                  <Users className="w-8 h-8 text-success" />
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm mb-1">إجمالي المتدربين</p>
                  <p className="text-3xl font-bold">{stats.totalTrainees}</p>
                  <p className="text-muted-foreground text-xs mt-1">سعودي: {stats.saudiTrainees} | غير سعودي: {stats.nonSaudiTrainees}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-l-4 border-l-accent text-foreground shadow-2xl backdrop-blur-xl hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-accent/20 rounded-xl">
                  <Clock className="w-8 h-8 text-accent" />
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm mb-1">ساعات التدريب</p>
                  <p className="text-3xl font-bold">{stats.totalHours}</p>
                  <p className="text-muted-foreground text-xs mt-1">معدل: {stats.avgHoursPerEmployee} ساعة/موظف</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-l-4 border-l-warning text-foreground shadow-2xl backdrop-blur-xl hover:shadow-glow transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-warning/20 rounded-xl">
                  <DollarSign className="w-8 h-8 text-warning" />
                </div>
                <div className="text-right">
                  <p className="text-muted-foreground text-sm mb-1">ميزانية التدريب</p>
                  <p className="text-3xl font-bold">﷼{stats.totalCost.toLocaleString()}</p>
                  <p className="text-muted-foreground text-xs mt-1">{stats.budgetPercentage}% من الرواتب</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="bg-card backdrop-blur shadow-xl border-border">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-5 bg-primary/10 p-2 rounded-none h-auto border-b border-border">
                <TabsTrigger 
                  value="dashboard" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
                >
                  <BarChart3 className="w-5 h-5" />
                  <span className="font-medium">لوحة التحكم</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="programs" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
                >
                  <BookOpen className="w-5 h-5" />
                  <span className="font-medium">البرامج التدريبية</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="providers" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
                >
                  <Building2 className="w-5 h-5" />
                  <span className="font-medium">جهات التدريب</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="disclosure" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
                >
                  <FileText className="w-5 h-5" />
                  <span className="font-medium">تقرير الإفصاح</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="analytics" 
                  className="flex items-center gap-2 py-4 px-6 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-xl transition-all"
                >
                  <PieChart className="w-5 h-5" />
                  <span className="font-medium">التحليلات</span>
                </TabsTrigger>
              </TabsList>

              {/* Dashboard Tab */}
              <TabsContent value="dashboard" className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <TrendingUp className="w-5 h-5 text-success" />
                        نظرة عامة على الأداء
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-success/10 rounded-xl border border-success/20">
                        <span className="text-sm font-medium">معدل الإنجاز</span>
                        <span className="text-2xl font-bold text-success">{stats.completionRate}%</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-accent/10 rounded-xl border border-accent/20">
                        <span className="text-sm font-medium">نسبة السعودة في التدريب</span>
                        <span className="text-2xl font-bold text-accent">{((stats.saudiTrainees / stats.totalTrainees) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex justify-between items-center p-4 bg-primary/10 rounded-xl border border-primary/20">
                        <span className="text-sm font-medium">متوسط التكلفة لكل متدرب</span>
                        <span className="text-2xl font-bold text-primary">﷼{Math.round(stats.totalCost / stats.totalTrainees).toLocaleString()}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <AlertCircle className="w-5 h-5 text-warning" />
                        إشعارات هامة
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="p-4 bg-warning/10 rounded-xl border border-warning/20">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-5 h-5 text-warning mt-1" />
                          <div>
                            <p className="font-medium text-sm">موعد الإفصاح السنوي</p>
                            <p className="text-xs text-muted-foreground">المتبقي: 45 يوم - الموعد: 31 ديسمبر 2024</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-success/10 rounded-xl border border-success/20">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-success mt-1" />
                          <div>
                            <p className="font-medium text-sm">البيانات مكتملة</p>
                            <p className="text-xs text-muted-foreground">جميع الحقول الإلزامية مكتملة</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 bg-accent/10 rounded-xl border border-accent/20">
                        <div className="flex items-start gap-3">
                          <Target className="w-5 h-5 text-accent mt-1" />
                          <div>
                            <p className="font-medium text-sm">هدف الساعات التدريبية</p>
                            <p className="text-xs text-muted-foreground">تم تحقيق 92% من الهدف السنوي</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Quick Actions */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground">إجراءات سريعة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button 
                        onClick={() => setActiveTab('programs')}
                        variant="outline"
                        className="h-24 flex flex-col gap-2 border-border hover:border-primary hover:bg-primary/10"
                      >
                        <BookOpen className="w-6 h-6" />
                        <span className="text-sm">إضافة برنامج تدريبي</span>
                      </Button>
                      <Button 
                        onClick={() => setActiveTab('providers')}
                        variant="outline"
                        className="h-24 flex flex-col gap-2 border-border hover:border-primary hover:bg-primary/10"
                      >
                        <Building2 className="w-6 h-6" />
                        <span className="text-sm">إدارة جهات التدريب</span>
                      </Button>
                      <Button 
                        onClick={() => setActiveTab('disclosure')}
                        variant="outline"
                        className="h-24 flex flex-col gap-2 border-border hover:border-primary hover:bg-primary/10"
                      >
                        <FileText className="w-6 h-6" />
                        <span className="text-sm">توليد تقرير الإفصاح</span>
                      </Button>
                      <Button 
                        variant="outline"
                        className="h-24 flex flex-col gap-2 border-border hover:border-success hover:bg-success/10"
                      >
                        <Upload className="w-6 h-6" />
                        <span className="text-sm">استيراد من Excel</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Programs Tab */}
              <TabsContent value="programs" className="p-6 space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">البرامج التدريبية</h2>
                  <Button className="gap-2 bg-gradient-to-r from-[#3CB593] to-[#2da574] text-white">
                    <BookOpen className="w-4 h-4" />
                    إضافة برنامج جديد
                  </Button>
                </div>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="text-center py-12 text-muted-foreground">
                      <BookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">لا توجد برامج تدريبية مسجلة حالياً</p>
                      <p className="text-sm">ابدأ بإضافة برنامجك التدريبي الأول</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Providers Tab */}
              <TabsContent value="providers" className="p-6 space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">جهات التدريب المعتمدة</h2>
                  <Button className="gap-2 bg-gradient-to-r from-[#3CB593] to-[#2da574] text-white">
                    <Building2 className="w-4 h-4" />
                    إضافة جهة تدريب
                  </Button>
                </div>

                <Card className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="text-center py-12 text-muted-foreground">
                      <Building2 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">لا توجد جهات تدريب مسجلة</p>
                      <p className="text-sm">أضف جهات التدريب المعتمدة</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Disclosure Tab */}
              <TabsContent value="disclosure" className="p-6 space-y-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-foreground">تقرير الإفصاح السنوي</h2>
                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      تصدير Excel
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Download className="w-4 h-4" />
                      تصدير PDF
                    </Button>
                    <Button className="gap-2 bg-gradient-to-r from-[#3CB593] to-[#2da574] text-white">
                      <FileText className="w-4 h-4" />
                      توليد التقرير
                    </Button>
                  </div>
                </div>

                {/* Report Summary */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      ملخص تقرير الإفصاح 2024
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-primary/10 rounded-xl border border-primary/20">
                        <p className="text-3xl font-bold text-primary">{stats.totalPrograms}</p>
                        <p className="text-sm text-muted-foreground mt-1">عدد البرامج التدريبية</p>
                      </div>
                      <div className="text-center p-4 bg-success/10 rounded-xl border border-success/20">
                        <p className="text-3xl font-bold text-success">{stats.totalTrainees}</p>
                        <p className="text-sm text-muted-foreground mt-1">إجمالي المتدربين</p>
                      </div>
                      <div className="text-center p-4 bg-accent/10 rounded-xl border border-accent/20">
                        <p className="text-3xl font-bold text-accent">{stats.totalHours}</p>
                        <p className="text-sm text-muted-foreground mt-1">إجمالي ساعات التدريب</p>
                      </div>
                      <div className="text-center p-4 bg-warning/10 rounded-xl border border-warning/20">
                        <p className="text-3xl font-bold text-warning">﷼{stats.totalCost.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground mt-1">إجمالي المصروفات</p>
                      </div>
                    </div>

                    <div className="mt-6 p-6 bg-success/5 rounded-xl border border-success/20">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-6 h-6 text-success" />
                        <h3 className="text-lg font-bold text-foreground">حالة الإفصاح</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">متوسط الساعات لكل موظف:</span>
                          <span className="font-bold">{stats.avgHoursPerEmployee} ساعة</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">نسبة ميزانية التدريب:</span>
                          <span className="font-bold">{stats.budgetPercentage}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">عدد المتدربين السعوديين:</span>
                          <span className="font-bold text-success">{stats.saudiTrainees}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">عدد المتدربين غير السعوديين:</span>
                          <span className="font-bold">{stats.nonSaudiTrainees}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Compliance Checklist */}
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-2">
                      <Award className="w-5 h-5" />
                      قائمة التحقق من الامتثال
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { text: 'تسجيل جميع البرامج التدريبية', status: 'completed' },
                        { text: 'إدخال بيانات المتدربين (سعوديون/غير سعوديون)', status: 'completed' },
                        { text: 'تسجيل جهات التدريب المعتمدة', status: 'completed' },
                        { text: 'إدخال التكاليف والميزانية', status: 'completed' },
                        { text: 'رفع المرفقات (فواتير - شهادات)', status: 'pending' },
                        { text: 'مراجعة البيانات والتحقق منها', status: 'pending' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                          <span className="text-sm">{item.text}</span>
                          {item.status === 'completed' ? (
                            <Badge variant="outline" className="bg-success/20 text-success border-success">
                              <CheckCircle className="w-3 h-3 ml-1" />
                              مكتمل
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-warning/20 text-warning border-warning">
                              <Clock className="w-3 h-3 ml-1" />
                              قيد الإنجاز
                            </Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="p-6 space-y-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">التحليلات والرسوم البيانية</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">توزيع البرامج حسب النوع</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-64 flex items-center justify-center text-muted-foreground">
                        <PieChart className="w-16 h-16 opacity-50" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">توزيع المتدربين حسب الجنسية</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">سعوديون</span>
                            <span className="text-sm font-bold text-success">{stats.saudiTrainees} ({((stats.saudiTrainees / stats.totalTrainees) * 100).toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-border rounded-full h-3">
                            <div 
                              className="bg-success h-3 rounded-full transition-all" 
                              style={{ width: `${(stats.saudiTrainees / stats.totalTrainees) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-sm">غير سعوديون</span>
                            <span className="text-sm font-bold text-accent">{stats.nonSaudiTrainees} ({((stats.nonSaudiTrainees / stats.totalTrainees) * 100).toFixed(0)}%)</span>
                          </div>
                          <div className="w-full bg-border rounded-full h-3">
                            <div 
                              className="bg-accent h-3 rounded-full transition-all" 
                              style={{ width: `${(stats.nonSaudiTrainees / stats.totalTrainees) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
