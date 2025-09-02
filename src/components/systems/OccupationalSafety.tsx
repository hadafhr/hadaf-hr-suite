import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  HardHat, 
  Shield, 
  AlertTriangle, 
  FileText, 
  Users, 
  Calendar,
  Clock,
  MapPin,
  Plus,
  Eye,
  Edit,
  Download,
  Search,
  Filter,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Activity,
  Target,
  Settings,
  Bell
} from 'lucide-react';

const OccupationalSafety = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const mockIncidents = [
    {
      id: 'INC001',
      title: 'انزلاق في المختبر',
      type: 'حادث',
      severity: 'متوسط',
      location: 'المختبر الرئيسي',
      date: '2024-01-15',
      reporter: 'أحمد محمد',
      status: 'تحت التحقيق',
      description: 'انزلاق موظف بسبب أرضية مبللة'
    },
    {
      id: 'INC002', 
      title: 'تسرب كيميائي بسيط',
      type: 'شبه حادث',
      severity: 'منخفض',
      location: 'المخزن',
      date: '2024-01-10',
      reporter: 'فاطمة علي',
      status: 'مغلق',
      description: 'تسرب بسيط من عبوة كيميائية'
    }
  ];

  const mockTrainings = [
    {
      id: 'TRN001',
      title: 'السلامة في بيئة العمل',
      type: 'إجباري',
      duration: '4 ساعات',
      instructor: 'د. محمد الأحمد',
      participants: 25,
      date: '2024-02-01',
      status: 'مجدول'
    },
    {
      id: 'TRN002',
      title: 'استخدام معدات الحماية الشخصية',
      type: 'إجباري',
      duration: '2 ساعة',
      instructor: 'أ. سارة محمد',
      participants: 15,
      date: '2024-01-25',
      status: 'مكتمل'
    }
  ];

  const mockInspections = [
    {
      id: 'INS001',
      area: 'المختبرات',
      inspector: 'مهندس السلامة',
      date: '2024-01-20',
      score: 85,
      status: 'مكتمل',
      findings: 3,
      corrective_actions: 1
    },
    {
      id: 'INS002',
      area: 'المكاتب الإدارية', 
      inspector: 'فريق السلامة',
      date: '2024-01-18',
      score: 92,
      status: 'مكتمل',
      findings: 1,
      corrective_actions: 0
    }
  ];

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      'عالي': 'bg-red-100 text-red-800 border-red-200',
      'متوسط': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'منخفض': 'bg-green-100 text-green-800 border-green-200'
    };
    return (
      <Badge className={severityConfig[severity as keyof typeof severityConfig] || 'bg-gray-100 text-gray-800'}>
        {severity}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'مجدول': 'bg-blue-100 text-blue-800 border-blue-200',
      'مكتمل': 'bg-green-100 text-green-800 border-green-200',
      'تحت التحقيق': 'bg-orange-100 text-orange-800 border-orange-200',
      'مغلق': 'bg-gray-100 text-gray-800 border-gray-200'
    };
    return (
      <Badge className={statusConfig[status as keyof typeof statusConfig] || 'bg-gray-100 text-gray-800'}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[#009F87]/10 rounded-lg">
            <HardHat className="h-6 w-6 text-[#009F87]" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#009F87]">نظام السلامة المهنية</h2>
            <p className="text-muted-foreground">إدارة شاملة لسلامة وصحة الموظفين</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 ml-2" />
            تصدير التقارير
          </Button>
          <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
            <Plus className="h-4 w-4 ml-2" />
            إضافة حادث
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="incidents" className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            الحوادث والإبلاغات
          </TabsTrigger>
          <TabsTrigger value="training" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            التدريب والتوعية
          </TabsTrigger>
          <TabsTrigger value="inspections" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            التفتيش والتدقيق
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            الإعدادات
          </TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-l-4 border-l-[#009F87]">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  إجمالي الحوادث
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-[#009F87]">24</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↓ 15%</span> من الشهر الماضي
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  أيام بدون حوادث
                  <CheckCircle className="h-4 w-4 text-green-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">45</div>
                <p className="text-xs text-muted-foreground">
                  الهدف: 60 يوم
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  التدريبات المكتملة
                  <Activity className="h-4 w-4 text-blue-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">156</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">↑ 23%</span> من الشهر الماضي
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-purple-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center justify-between">
                  نسبة الامتثال
                  <Target className="h-4 w-4 text-purple-500" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">94%</div>
                <p className="text-xs text-muted-foreground">
                  الهدف: 95%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Recent Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#009F87]" />
                  اتجاه الحوادث الشهرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  [مخطط اتجاه الحوادث]
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-[#009F87]" />
                  النشاطات الأخيرة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>تم الإبلاغ عن حادث في المختبر</span>
                  <span className="text-muted-foreground mr-auto">منذ ساعتين</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>اكتمل تدريب السلامة للقسم الثاني</span>
                  <span className="text-muted-foreground mr-auto">أمس</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>تم جدولة تفتيش منطقة الإنتاج</span>
                  <span className="text-muted-foreground mr-auto">منذ 3 أيام</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Incidents Tab */}
        <TabsContent value="incidents" className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="البحث في الحوادث..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 w-80"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 ml-2" />
                تصفية
              </Button>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
                  <Plus className="h-4 w-4 ml-2" />
                  إبلاغ عن حادث
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-[#009F87]" />
                    إبلاغ عن حادث جديد
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="incident-title">عنوان الحادث</Label>
                      <Input id="incident-title" placeholder="وصف مختصر للحادث" />
                    </div>
                    <div>
                      <Label htmlFor="incident-type">نوع الحادث</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الحادث" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="accident">حادث</SelectItem>
                          <SelectItem value="near-miss">شبه حادث</SelectItem>
                          <SelectItem value="unsafe-condition">حالة غير آمنة</SelectItem>
                          <SelectItem value="unsafe-behavior">سلوك غير آمن</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="severity">شدة الحادث</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الشدة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">عالي</SelectItem>
                          <SelectItem value="medium">متوسط</SelectItem>
                          <SelectItem value="low">منخفض</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="location">الموقع</Label>
                      <Input id="location" placeholder="موقع الحادث" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">وصف الحادث</Label>
                    <Textarea id="description" placeholder="وصف تفصيلي للحادث والظروف المحيطة" rows={4} />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">إلغاء</Button>
                    <Button className="bg-[#009F87] hover:bg-[#009F87]/90">إرسال التقرير</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {mockIncidents.map((incident) => (
              <Card key={incident.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#009F87]">{incident.title}</h3>
                        {getSeverityBadge(incident.severity)}
                        {getStatusBadge(incident.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <FileText className="h-4 w-4" />
                          {incident.id}
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {incident.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {incident.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {incident.reporter}
                        </div>
                      </div>
                      <p className="text-sm">{incident.description}</p>
                    </div>
                    <div className="flex gap-2 mr-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Training Tab */}
        <TabsContent value="training" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">برامج التدريب والتوعية</h3>
            <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
              <Plus className="h-4 w-4 ml-2" />
              إضافة برنامج تدريبي
            </Button>
          </div>

          <div className="grid gap-4">
            {mockTrainings.map((training) => (
              <Card key={training.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#009F87]">{training.title}</h3>
                        {getStatusBadge(training.status)}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {training.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {training.participants} مشارك
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {training.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {training.instructor}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mr-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Inspections Tab */}
        <TabsContent value="inspections" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">التفتيش والتدقيق</h3>
            <Button className="bg-[#009F87] hover:bg-[#009F87]/90">
              <Plus className="h-4 w-4 ml-2" />
              جدولة تفتيش
            </Button>
          </div>

          <div className="grid gap-4">
            {mockInspections.map((inspection) => (
              <Card key={inspection.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-[#009F87]">{inspection.area}</h3>
                        {getStatusBadge(inspection.status)}
                        <Badge className={inspection.score >= 90 ? 'bg-green-100 text-green-800' : inspection.score >= 70 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>
                          {inspection.score}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {inspection.inspector}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {inspection.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <AlertCircle className="h-4 w-4" />
                          {inspection.findings} ملاحظة
                        </div>
                        <div className="flex items-center gap-1">
                          <CheckCircle className="h-4 w-4" />
                          {inspection.corrective_actions} إجراء تصحيحي
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mr-4">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-[#009F87]" />
                إعدادات النظام
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                هنا يمكن إدارة إعدادات نظام السلامة المهنية، تخصيص التصنيفات، وضبط التنبيهات.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="justify-start">
                  <Shield className="h-4 w-4 ml-2" />
                  إعدادات الأمان
                </Button>
                <Button variant="outline" className="justify-start">
                  <Bell className="h-4 w-4 ml-2" />
                  إعدادات التنبيهات
                </Button>
                <Button variant="outline" className="justify-start">
                  <Users className="h-4 w-4 ml-2" />
                  إدارة المستخدمين
                </Button>
                <Button variant="outline" className="justify-start">
                  <FileText className="h-4 w-4 ml-2" />
                  قوالب التقارير
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OccupationalSafety;