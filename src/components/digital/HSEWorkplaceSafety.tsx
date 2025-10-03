import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  FileText,
  Users,
  TrendingDown,
  Calendar,
  Plus,
  Download,
  Filter,
  BarChart3,
  Clock,
  AlertCircle,
  Target,
  BookOpen
} from 'lucide-react';

export const HSEWorkplaceSafety: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    safetyScore: 94,
    incidents: 3,
    inspections: 45,
    trainedEmployees: 485,
    zeroAccidentDays: 127,
    complianceRate: 98
  };

  const incidents = [
    {
      id: 1,
      title: 'إصابة طفيفة - قسم الإنتاج',
      date: '2024-11-28',
      severity: 'low',
      status: 'resolved',
      department: 'الإنتاج',
      reporter: 'أحمد السعيد'
    },
    {
      id: 2,
      title: 'كاد أن يكون - قسم المخازن',
      date: '2024-11-15',
      severity: 'medium',
      status: 'under-investigation',
      department: 'المخازن',
      reporter: 'سارة محمد'
    },
    {
      id: 3,
      title: 'انسكاب مواد كيميائية - المختبر',
      date: '2024-10-22',
      severity: 'high',
      status: 'resolved',
      department: 'المختبر',
      reporter: 'خالد أحمد'
    }
  ];

  return (
    <div className="space-y-6 p-6" dir="rtl">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              الصحة والسلامة المهنية (HSE)
            </h2>
            <p className="text-muted-foreground mt-2">نظام متكامل لإدارة الصحة والسلامة في بيئة العمل</p>
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
              تقرير حادث
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">درجة السلامة</p>
                  <p className="text-2xl font-bold text-foreground">{stats.safetyScore}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الحوادث (شهر)</p>
                  <p className="text-2xl font-bold text-green-600">{stats.incidents}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <TrendingDown className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">التفتيشات</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.inspections}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مدربون</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.trainedEmployees}</p>
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
                  <p className="text-sm text-muted-foreground">أيام آمنة</p>
                  <p className="text-2xl font-bold text-green-600">{stats.zeroAccidentDays}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/50 transition-all">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الامتثال</p>
                  <p className="text-2xl font-bold text-foreground">{stats.complianceRate}%</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Target className="h-6 w-6 text-primary" />
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
          <TabsTrigger value="incidents" className="flex flex-col gap-1 py-3">
            <AlertTriangle className="h-4 w-4" />
            <span className="text-xs">الحوادث</span>
          </TabsTrigger>
          <TabsTrigger value="inspections" className="flex flex-col gap-1 py-3">
            <CheckCircle className="h-4 w-4" />
            <span className="text-xs">التفتيشات</span>
          </TabsTrigger>
          <TabsTrigger value="training" className="flex flex-col gap-1 py-3">
            <BookOpen className="h-4 w-4" />
            <span className="text-xs">التدريب</span>
          </TabsTrigger>
          <TabsTrigger value="equipment" className="flex flex-col gap-1 py-3">
            <Shield className="h-4 w-4" />
            <span className="text-xs">المعدات</span>
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex flex-col gap-1 py-3">
            <FileText className="h-4 w-4" />
            <span className="text-xs">الامتثال</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">مؤشرات الأداء الرئيسية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { metric: 'معدل تكرار الإصابات (IFR)', value: 0.8, target: 1.0, color: 'bg-green-600' },
                    { metric: 'معدل شدة الإصابات (ISR)', value: 12, target: 15, color: 'bg-green-600' },
                    { metric: 'الحوادث القابلة للتسجيل', value: 2, target: 5, color: 'bg-green-600' },
                    { metric: 'أيام العمل الضائعة', value: 8, target: 20, color: 'bg-green-600' }
                  ].map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-foreground">{item.metric}</span>
                        <span className="text-muted-foreground">{item.value} / {item.target}</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full ${item.color}`} style={{ width: `${(item.value / item.target) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">التنبيهات الحالية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'تحذير', message: 'موعد تجديد طفايات الحريق', priority: 'medium', time: 'خلال 5 أيام' },
                    { type: 'معلومة', message: 'تدريب إخلاء طارئ مجدول', priority: 'low', time: 'الأسبوع القادم' },
                    { type: 'عاجل', message: 'فحص معدات السلامة المستحقة', priority: 'high', time: 'غداً' }
                  ].map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        alert.priority === 'high' ? 'bg-red-600' :
                        alert.priority === 'medium' ? 'bg-yellow-600' : 'bg-blue-600'
                      }`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">{alert.type}</Badge>
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                        <p className="text-sm text-foreground">{alert.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          {incidents.map((incident) => (
            <Card key={incident.id} className="border-border/50 hover:border-primary/50 transition-all">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      incident.severity === 'high' ? 'bg-red-500/10' :
                      incident.severity === 'medium' ? 'bg-yellow-500/10' : 'bg-blue-500/10'
                    }`}>
                      <AlertTriangle className={`h-7 w-7 ${
                        incident.severity === 'high' ? 'text-red-600' :
                        incident.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-bold text-foreground">{incident.title}</h3>
                        <Badge className={
                          incident.status === 'resolved' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                          incident.status === 'under-investigation' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                          'bg-red-500/10 text-red-600 border-red-500/20'
                        }>
                          {incident.status === 'resolved' ? 'محلول' :
                           incident.status === 'under-investigation' ? 'قيد التحقيق' : 'جديد'}
                        </Badge>
                        <Badge variant="outline">{
                          incident.severity === 'high' ? 'خطورة عالية' :
                          incident.severity === 'medium' ? 'خطورة متوسطة' : 'خطورة منخفضة'
                        }</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {incident.date}
                        </span>
                        <span>•</span>
                        <span>{incident.department}</span>
                        <span>•</span>
                        <span>المبلّغ: {incident.reporter}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">التفاصيل</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="inspections" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">جدول التفتيشات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { area: 'مخرج الطوارئ - المبنى الرئيسي', date: '2024-12-10', inspector: 'محمد علي', status: 'scheduled' },
                  { area: 'معدات الإطفاء - الطابق الثاني', date: '2024-12-08', inspector: 'فاطمة أحمد', status: 'completed' },
                  { area: 'أنظمة التهوية - المخازن', date: '2024-12-12', inspector: 'أحمد السعيد', status: 'scheduled' },
                  { area: 'معدات الوقاية الشخصية', date: '2024-12-05', inspector: 'سارة محمد', status: 'completed' }
                ].map((inspection, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground mb-1">{inspection.area}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {inspection.date}
                        </span>
                        <span>•</span>
                        <span>المفتش: {inspection.inspector}</span>
                      </div>
                    </div>
                    <Badge className={
                      inspection.status === 'completed' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                      'bg-blue-500/10 text-blue-600 border-blue-500/20'
                    }>
                      {inspection.status === 'completed' ? 'مكتمل' : 'مجدول'}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">البرامج التدريبية النشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'الإسعافات الأولية', participants: 45, completion: 78, nextSession: '2024-12-15' },
                    { name: 'مكافحة الحرائق', participants: 32, completion: 92, nextSession: '2024-12-20' },
                    { name: 'السلامة الكيميائية', participants: 28, completion: 65, nextSession: '2024-12-18' }
                  ].map((training, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-foreground">{training.name}</h4>
                        <Badge variant="outline">{training.participants} مشارك</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">نسبة الإنجاز</span>
                          <span className="font-medium">{training.completion}%</span>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary" style={{ width: `${training.completion}%` }} />
                        </div>
                        <p className="text-xs text-muted-foreground">الجلسة القادمة: {training.nextSession}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">الشهادات والتراخيص</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { cert: 'شهادة الإسعافات الأولية', employees: 120, expiry: '2025-06-30', status: 'valid' },
                    { cert: 'رخصة مكافحة الحرائق', employees: 85, expiry: '2025-03-15', status: 'valid' },
                    { cert: 'شهادة السلامة الصناعية', employees: 95, expiry: '2024-12-31', status: 'expiring-soon' },
                    { cert: 'تدريب الإخلاء الطارئ', employees: 150, expiry: '2025-01-20', status: 'valid' }
                  ].map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">{cert.cert}</p>
                        <p className="text-xs text-muted-foreground">{cert.employees} موظف • تنتهي: {cert.expiry}</p>
                      </div>
                      <Badge className={
                        cert.status === 'valid' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                        cert.status === 'expiring-soon' ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20' :
                        'bg-red-500/10 text-red-600 border-red-500/20'
                      }>
                        {cert.status === 'valid' ? 'ساري' : cert.status === 'expiring-soon' ? 'ينتهي قريباً' : 'منتهي'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="equipment" className="space-y-4">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base">معدات السلامة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { name: 'طفايات الحريق', total: 45, functional: 43, maintenance: 2, nextCheck: '2024-12-15' },
                  { name: 'كاشفات الدخان', total: 120, functional: 118, maintenance: 2, nextCheck: '2024-12-20' },
                  { name: 'معدات الإطفاء التلقائي', total: 25, functional: 25, maintenance: 0, nextCheck: '2025-01-10' },
                  { name: 'أجهزة الإنذار', total: 85, functional: 84, maintenance: 1, nextCheck: '2024-12-18' }
                ].map((equipment, index) => (
                  <div key={index} className="p-4 bg-muted/30 rounded-lg">
                    <h4 className="font-medium text-foreground mb-3">{equipment.name}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">إجمالي المعدات</span>
                        <span className="font-medium">{equipment.total}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">في حالة جيدة</span>
                        <span className="font-medium text-green-600">{equipment.functional}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">تحت الصيانة</span>
                        <span className="font-medium text-orange-600">{equipment.maintenance}</span>
                      </div>
                      <div className="pt-2 border-t border-border/50">
                        <p className="text-xs text-muted-foreground">الفحص القادم: {equipment.nextCheck}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card className="border-border/50 bg-gradient-to-r from-green-500/5 to-blue-500/5">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-7 w-7 text-green-600" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-1">الامتثال التام</h3>
                  <p className="text-sm text-muted-foreground">المنشأة متوافقة مع جميع معايير السلامة السعودية</p>
                </div>
                <Badge className="bg-green-500/10 text-green-600 border-green-500/20 ml-auto">
                  98% امتثال
                </Badge>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">المعايير والقوانين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { standard: 'نظام الدفاع المدني السعودي', status: 'compliant', lastAudit: '2024-10-15' },
                    { standard: 'لائحة السلامة والصحة المهنية', status: 'compliant', lastAudit: '2024-11-20' },
                    { standard: 'معايير OSHA', status: 'compliant', lastAudit: '2024-09-30' },
                    { standard: 'ISO 45001', status: 'in-progress', lastAudit: '2024-11-01' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground mb-1">{item.standard}</p>
                        <p className="text-xs text-muted-foreground">آخر مراجعة: {item.lastAudit}</p>
                      </div>
                      <Badge className={
                        item.status === 'compliant' ? 'bg-green-500/10 text-green-600 border-green-500/20' :
                        'bg-blue-500/10 text-blue-600 border-blue-500/20'
                      }>
                        {item.status === 'compliant' ? 'متوافق' : 'قيد التنفيذ'}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-base">تقارير الامتثال</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { report: 'تقرير الامتثال السنوي 2024', date: '2024-11-30', size: '3.2 MB', status: 'جديد' },
                    { report: 'تقرير التفتيش الربع سنوي Q4', date: '2024-11-15', size: '1.8 MB', status: null },
                    { report: 'تقرير معايير السلامة', date: '2024-10-20', size: '2.1 MB', status: null }
                  ].map((report, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-sm font-medium text-foreground">{report.report}</p>
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
