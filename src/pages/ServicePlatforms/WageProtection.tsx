import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, DollarSign, AlertTriangle, CheckCircle, Clock, FileText, Search, Download } from 'lucide-react';

const wageProtectionCases = [
  {
    id: 1,
    employeeName: "أحمد محمد علي",
    company: "شركة التقنية المتقدمة",
    amount: 15000,
    status: "قيد المراجعة",
    submitDate: "2024-01-15",
    type: "راتب متأخر"
  },
  {
    id: 2,
    employeeName: "فاطمة أحمد",
    company: "مؤسسة الأعمال الذكية",
    amount: 8500,
    status: "تم الحل",
    submitDate: "2024-01-10",
    type: "مستحقات نهاية خدمة"
  }
];

const protectionStats = [
  { title: "الحالات النشطة", value: "23", icon: Clock, color: "text-orange-600" },
  { title: "المبلغ المحمي", value: "2.5M ريال", icon: Shield, color: "text-green-600" },
  { title: "الحالات المحلولة", value: "156", icon: CheckCircle, color: "text-blue-600" },
  { title: "التحذيرات", value: "5", icon: AlertTriangle, color: "text-red-600" }
];

export const WageProtection: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">حماية الأجور</h1>
          <p className="text-muted-foreground mt-2">نظام حماية حقوق العمال والأجور</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <FileText className="h-4 w-4 mr-2" />
          تقديم شكوى جديدة
        </Button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {protectionStats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="cases" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="cases">الحالات</TabsTrigger>
          <TabsTrigger value="monitoring">المراقبة</TabsTrigger>
          <TabsTrigger value="reports">التقارير</TabsTrigger>
          <TabsTrigger value="violations">المخالفات</TabsTrigger>
        </TabsList>

        <TabsContent value="cases" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 space-x-reverse">
              <Input placeholder="البحث في الحالات..." className="w-80" />
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تصدير التقرير
            </Button>
          </div>

          <div className="grid gap-4">
            {wageProtectionCases.map((case_item) => (
              <Card key={case_item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{case_item.employeeName}</CardTitle>
                      <CardDescription>{case_item.company}</CardDescription>
                    </div>
                    <Badge variant={case_item.status === "تم الحل" ? "default" : "secondary"}>
                      {case_item.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">المبلغ</p>
                      <p className="font-semibold flex items-center">
                        <DollarSign className="h-4 w-4 mr-1" />
                        {case_item.amount.toLocaleString()} ريال
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">نوع الحالة</p>
                      <p className="font-semibold">{case_item.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ التقديم</p>
                      <p className="font-semibold">{case_item.submitDate}</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm">عرض التفاصيل</Button>
                      <Button size="sm" variant="outline">تحديث الحالة</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                مراقبة الأجور
              </CardTitle>
              <CardDescription>مراقبة مستمرة لضمان دفع الأجور في المواعيد المحددة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg bg-green-50">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-green-700">شركات ملتزمة</h3>
                  <p className="text-2xl font-bold text-green-600">125</p>
                </div>
                <div className="text-center p-4 border rounded-lg bg-yellow-50">
                  <Clock className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-yellow-700">تحت المراقبة</h3>
                  <p className="text-2xl font-bold text-yellow-600">8</p>
                </div>
                <div className="text-center p-4 border rounded-lg bg-red-50">
                  <AlertTriangle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <h3 className="font-semibold text-red-700">مخالفات</h3>
                  <p className="text-2xl font-bold text-red-600">3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>التقارير الشهرية</CardTitle>
                <CardDescription>تقارير شهرية عن حالة حماية الأجور</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    تقرير يناير 2024
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    تقرير ديسمبر 2023
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    تقرير نوفمبر 2023
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>تقارير خاصة</CardTitle>
                <CardDescription>تقارير مخصصة حسب الفترة والمعايير</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Input placeholder="من تاريخ" type="date" />
                  <Input placeholder="إلى تاريخ" type="date" />
                  <Button className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    إنشاء تقرير مخصص
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="violations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2" />
                المخالفات المكتشفة
              </CardTitle>
              <CardDescription>قائمة بالمخالفات المكتشفة والإجراءات المتخذة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded bg-red-50">
                  <div>
                    <span className="font-semibold">شركة البناء السريع</span>
                    <p className="text-sm text-muted-foreground">تأخير في دفع الرواتب - 15 يوم</p>
                  </div>
                  <Badge variant="destructive">مخالفة كبيرة</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded bg-yellow-50">
                  <div>
                    <span className="font-semibold">مؤسسة الخدمات</span>
                    <p className="text-sm text-muted-foreground">نقص في مستحقات نهاية الخدمة</p>
                  </div>
                  <Badge variant="secondary">مخالفة متوسطة</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};