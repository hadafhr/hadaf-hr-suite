import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { WageProtectionDashboard } from '@/components/wageProtection/WageProtectionDashboard';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertTriangle, 
  Users, 
  DollarSign,
  Calendar,
  Brain,
  Download,
  Settings,
  BarChart3,
  Clock,
  Shield
} from 'lucide-react';

// Mock data for demonstration
const mockEmployees = [
  {
    id: 1,
    name: "أحمد محمد علي",
    position: "مطور برمجيات",
    basicSalary: 8000,
    allowances: 1500,
    deductions: 800,
    netSalary: 8700,
    iban: "SA1234567890123456789012",
    bank: "البنك الأهلي السعودي",
    status: "مباشر",
    lastProcessed: "2024-01-15"
  },
  {
    id: 2,
    name: "فاطمة أحمد السعيد",
    position: "محاسبة",
    basicSalary: 6500,
    allowances: 1000,
    deductions: 650,
    netSalary: 6850,
    iban: "SA9876543210987654321098",
    bank: "بنك الراجحي",
    status: "مباشر",
    lastProcessed: "2024-01-15"
  },
  {
    id: 3,
    name: "محمد عبدالله الحارثي",
    position: "مهندس",
    basicSalary: 9000,
    allowances: 2000,
    deductions: 900,
    netSalary: 10100,
    iban: "SA5555666677778888999900",
    bank: "البنك السعودي للاستثمار",
    status: "منقطع",
    lastProcessed: "2024-01-10"
  }
];

const complianceMetrics = {
  overall: 95,
  onTime: 88,
  dataAccuracy: 98,
  employeeCoverage: 92
};

const aiInsights = [
  {
    type: "warning",
    message: "3 موظفين لم يتم رفع رواتبهم - تحقق من الوضع الوظيفي",
    severity: "high",
    recommendation: "مراجعة حالة الموظفين المنقطعين وتحديث البيانات"
  },
  {
    type: "info", 
    message: "معدل الامتثال الشهري 95% - أداء ممتاز",
    severity: "low",
    recommendation: "الحفاظ على المستوى الحالي"
  },
  {
    type: "warning",
    message: "خصم بنسبة أعلى من المسموح لموظف واحد",
    severity: "medium",
    recommendation: "مراجعة سياسة الخصومات والتأكد من الامتثال"
  }
];

export const WageProtectionPlatform: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('2024-01');
  const [wpsFileStatus, setWpsFileStatus] = useState('ready');
  const [autoGeneration, setAutoGeneration] = useState(true);

  const handleGenerateWPS = () => {
    setWpsFileStatus('generating');
    // Simulate WPS file generation
    setTimeout(() => {
      setWpsFileStatus('completed');
    }, 2000);
  };

  const handleUploadToMudad = () => {
    setWpsFileStatus('uploading');
    // Simulate upload to Mudad
    setTimeout(() => {
      setWpsFileStatus('uploaded');
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مباشر': return 'bg-green-100 text-green-800';
      case 'منقطع': return 'bg-red-100 text-red-800';
      case 'مفصول': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary" />
              منصة حماية الأجور الذكية
            </h1>
            <p className="text-muted-foreground mt-2">
              متوافقة 100% مع منصة مدد - مدعومة بالذكاء الاصطناعي
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Settings className="w-4 h-4" />
              الإعدادات
            </Button>
            <Button className="gap-2">
              <Download className="w-4 h-4" />
              تقرير شامل
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">معدل الامتثال</p>
                  <p className="text-2xl font-bold text-green-600">{complianceMetrics.overall}%</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">الموظفين المشمولين</p>
                  <p className="text-2xl font-bold">{mockEmployees.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي الرواتب</p>
                  <p className="text-2xl font-bold">
                    {mockEmployees.reduce((sum, emp) => sum + emp.netSalary, 0).toLocaleString()} ريال
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">آخر رفع لمدد</p>
                  <p className="text-2xl font-bold">15 يناير</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Insights Alert */}
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <Brain className="w-5 h-5" />
              تحليل الذكاء الاصطناعي
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {aiInsights.map((insight, index) => (
                <Alert key={index} className={`border-l-4 ${
                  insight.severity === 'high' ? 'border-l-red-500' :
                  insight.severity === 'medium' ? 'border-l-orange-500' : 'border-l-blue-500'
                }`}>
                  <AlertTriangle className="w-4 h-4" />
                  <AlertDescription>
                    <p className="font-medium">{insight.message}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      التوصية: {insight.recommendation}
                    </p>
                  </AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="employees" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="employees">إدارة الموظفين</TabsTrigger>
            <TabsTrigger value="wps">ملف حماية الأجور</TabsTrigger>
            <TabsTrigger value="compliance">مراقبة الامتثال</TabsTrigger>
            <TabsTrigger value="reports">التقارير</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Employees Management */}
          <TabsContent value="employees" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>بيانات الموظفين والرواتب</CardTitle>
                <CardDescription>
                  إدارة شاملة لبيانات الموظفين ومعلومات الرواتب
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEmployees.map((employee) => (
                    <div key={employee.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold">{employee.name}</h3>
                          <p className="text-sm text-muted-foreground">{employee.position}</p>
                        </div>
                        <Badge className={getStatusColor(employee.status)}>
                          {employee.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">الراتب الأساسي</p>
                          <p className="font-medium">{employee.basicSalary.toLocaleString()} ريال</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">البدلات</p>
                          <p className="font-medium">{employee.allowances.toLocaleString()} ريال</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">الخصومات</p>
                          <p className="font-medium">{employee.deductions.toLocaleString()} ريال</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">صافي الراتب</p>
                          <p className="font-medium text-green-600">{employee.netSalary.toLocaleString()} ريال</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">رقم الآيبان</p>
                          <p className="font-medium">{employee.iban}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">البنك</p>
                          <p className="font-medium">{employee.bank}</p>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">تعديل</Button>
                        <Button size="sm" variant="outline">عرض التفاصيل</Button>
                        <Button size="sm" variant="outline">سجل الرواتب</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* WPS File Management */}
          <TabsContent value="wps" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إعداد ملف حماية الأجور (WPS)</CardTitle>
                <CardDescription>
                  توليد ورفع ملف حماية الأجور لمنصة مدد
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Month Selection */}
                <div className="flex items-center gap-4">
                  <label className="font-medium">الشهر:</label>
                  <select 
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border rounded px-3 py-2"
                  >
                    <option value="2024-01">يناير 2024</option>
                    <option value="2023-12">ديسمبر 2023</option>
                    <option value="2023-11">نوفمبر 2023</option>
                  </select>
                </div>

                {/* WPS File Status */}
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">حالة ملف WPS</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span>التحقق من البيانات</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>توليد الملف</span>
                      {wpsFileStatus === 'completed' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : wpsFileStatus === 'generating' ? (
                        <Clock className="w-5 h-5 text-orange-500 animate-spin" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span>الرفع لمنصة مدد</span>
                      {wpsFileStatus === 'uploaded' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : wpsFileStatus === 'uploading' ? (
                        <Clock className="w-5 h-5 text-orange-500 animate-spin" />
                      ) : (
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    onClick={handleGenerateWPS}
                    disabled={wpsFileStatus === 'generating'}
                    className="gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    توليد ملف WPS
                  </Button>
                  
                  <Button 
                    onClick={handleUploadToMudad}
                    disabled={wpsFileStatus !== 'completed'}
                    variant="outline"
                    className="gap-2"
                  >
                    <Upload className="w-4 h-4" />
                    رفع لمنصة مدد
                  </Button>

                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    تحميل الملف
                  </Button>
                </div>

                {/* Validation Results */}
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-green-800 mb-2">نتائج التحقق</h4>
                    <ul className="text-sm space-y-1 text-green-700">
                      <li>✓ جميع أرقام الآيبان صحيحة</li>
                      <li>✓ أسماء البنوك متطابقة</li>
                      <li>✓ الرواتب متوافقة مع العقود</li>
                      <li>✓ حالات الموظفين محدثة</li>
                    </ul>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Compliance Monitoring */}
          <TabsContent value="compliance" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>مؤشرات الامتثال</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>الامتثال العام</span>
                      <span>{complianceMetrics.overall}%</span>
                    </div>
                    <Progress value={complianceMetrics.overall} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span>الرفع في الوقت المحدد</span>
                      <span>{complianceMetrics.onTime}%</span>
                    </div>
                    <Progress value={complianceMetrics.onTime} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span>دقة البيانات</span>
                      <span>{complianceMetrics.dataAccuracy}%</span>
                    </div>
                    <Progress value={complianceMetrics.dataAccuracy} className="h-2" />
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span>تغطية الموظفين</span>
                      <span>{complianceMetrics.employeeCoverage}%</span>
                    </div>
                    <Progress value={complianceMetrics.employeeCoverage} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>سجل الرفع الأخير</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>تاريخ الرفع</span>
                      <span>15 يناير 2024</span>
                    </div>
                    <div className="flex justify-between">
                      <span>عدد الموظفين</span>
                      <span>{mockEmployees.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>حالة الملف</span>
                      <Badge className="bg-green-100 text-green-800">مقبول</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>رقم المرجع</span>
                      <span>WPS-2024-001-001</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="space-y-4">
            <WageProtectionDashboard />
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات المنصة</CardTitle>
                <CardDescription>
                  تخصيص إعدادات حماية الأجور والتكامل مع مدد
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">التوليد التلقائي لملف WPS</h4>
                      <p className="text-sm text-muted-foreground">
                        توليد تلقائي في اليوم 25 من كل شهر
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      {autoGeneration ? 'مفعل' : 'معطل'}
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">الرفع التلقائي لمنصة مدد</h4>
                      <p className="text-sm text-muted-foreground">
                        رفع تلقائي بعد التحقق من البيانات
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      معطل
                    </Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">إشعارات الذكاء الاصطناعي</h4>
                      <p className="text-sm text-muted-foreground">
                        تلقي تنبيهات وتوصيات ذكية
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      مفعل
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};