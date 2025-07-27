import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Target, Users, TrendingUp, Lightbulb, Plus, Calendar, Award } from 'lucide-react';

const developmentPrograms = [
  {
    id: 1,
    title: "برنامج القيادة الاستراتيجية",
    description: "تطوير مهارات القيادة والإدارة الاستراتيجية",
    duration: "3 أشهر",
    participants: 25,
    status: "جاري",
    category: "قيادة"
  },
  {
    id: 2,
    title: "تحسين العمليات التشغيلية",
    description: "تطوير وتحسين العمليات الداخلية للمؤسسة",
    duration: "6 أسابيع",
    participants: 15,
    status: "مكتمل",
    category: "عمليات"
  }
];

const organizationalStats = [
  { title: "البرامج النشطة", value: "8", icon: Target, color: "text-green-600" },
  { title: "المشاركين", value: "156", icon: Users, color: "text-blue-600" },
  { title: "معدل التحسن", value: "85%", icon: TrendingUp, color: "text-purple-600" },
  { title: "المبادرات المكتملة", value: "12", icon: Award, color: "text-orange-600" }
];

export const OrganizationalDevelopment: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">التطوير والتنظيم المؤسسي</h1>
          <p className="text-muted-foreground mt-2">تطوير وتحسين الهيكل التنظيمي والعمليات</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          إضافة برنامج تطوير
        </Button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {organizationalStats.map((stat, index) => (
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

      <Tabs defaultValue="programs" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="programs">البرامج</TabsTrigger>
          <TabsTrigger value="structure">الهيكل التنظيمي</TabsTrigger>
          <TabsTrigger value="processes">العمليات</TabsTrigger>
          <TabsTrigger value="culture">الثقافة المؤسسية</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          <div className="grid gap-4">
            {developmentPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                      <CardDescription className="mt-2">{program.description}</CardDescription>
                    </div>
                    <Badge variant={program.status === "جاري" ? "default" : "secondary"}>
                      {program.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">المدة</p>
                      <p className="font-semibold">{program.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المشاركين</p>
                      <p className="font-semibold">{program.participants}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الفئة</p>
                      <p className="font-semibold">{program.category}</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm">عرض التفاصيل</Button>
                      <Button size="sm" variant="outline">تقرير</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="structure" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                الهيكل التنظيمي
              </CardTitle>
              <CardDescription>تصميم وتطوير الهيكل التنظيمي للمؤسسة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold">الإدارة العليا</h3>
                  <p className="text-sm text-muted-foreground">5 مناصب</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold">الإدارة الوسطى</h3>
                  <p className="text-sm text-muted-foreground">12 منصب</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <h3 className="font-semibold">الموظفين التنفيذيين</h3>
                  <p className="text-sm text-muted-foreground">89 موظف</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="processes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                تحسين العمليات
              </CardTitle>
              <CardDescription>تطوير وتحسين العمليات التشغيلية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded">
                  <span>عملية التوظيف</span>
                  <Badge>تم التحسين</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <span>إدارة المشاريع</span>
                  <Badge variant="secondary">قيد التطوير</Badge>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <span>خدمة العملاء</span>
                  <Badge>تم التحسين</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="culture" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lightbulb className="h-5 w-5 mr-2" />
                الثقافة المؤسسية
              </CardTitle>
              <CardDescription>تطوير وتعزيز الثقافة والقيم المؤسسية</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-semibold">القيم الأساسية</h4>
                  <ul className="text-sm space-y-1">
                    <li>• الشفافية والنزاهة</li>
                    <li>• التميز في الأداء</li>
                    <li>• العمل الجماعي</li>
                    <li>• التحسين المستمر</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">المبادرات الثقافية</h4>
                  <ul className="text-sm space-y-1">
                    <li>• برنامج الموظف المثالي</li>
                    <li>• ورش العمل الجماعية</li>
                    <li>• فعاليات التطوير</li>
                    <li>• برامج التقدير</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};