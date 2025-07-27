import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Users, HandHeart, Gift, Target, Plus, Search, TrendingUp, Calendar } from 'lucide-react';

const nonprofitPrograms = [
  {
    id: 1,
    name: "برنامج كفالة الأيتام",
    description: "برنامج لكفالة ورعاية الأيتام وتوفير احتياجاتهم",
    beneficiaries: 150,
    budget: 500000,
    status: "نشط",
    category: "رعاية اجتماعية",
    startDate: "2023-06-01"
  },
  {
    id: 2,
    name: "مبادرة التعليم للجميع",
    description: "توفير فرص التعليم للأطفال المحتاجين",
    beneficiaries: 200,
    budget: 750000,
    status: "نشط",
    category: "تعليم",
    startDate: "2023-09-01"
  }
];

const nonprofitStats = [
  { title: "البرامج النشطة", value: "25", icon: Target, color: "text-green-600" },
  { title: "المستفيدين", value: "1,250", icon: Users, color: "text-blue-600" },
  { title: "المتطوعين", value: "450", icon: HandHeart, color: "text-purple-600" },
  { title: "التبرعات الشهرية", value: "2.8M ريال", icon: Gift, color: "text-orange-600" }
];

const volunteers = [
  {
    id: 1,
    name: "سارة أحمد",
    skills: "تعليم، ترجمة",
    hoursContributed: 120,
    programs: 3,
    status: "نشط"
  },
  {
    id: 2,
    name: "محمد علي",
    skills: "طب، إسعافات أولية",
    hoursContributed: 85,
    programs: 2,
    status: "نشط"
  }
];

export const NonProfitServices: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">خدمات القطاع غير الربحي</h1>
          <p className="text-muted-foreground mt-2">إدارة وتنظيم البرامج والخدمات الخيرية</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          برنامج جديد
        </Button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nonprofitStats.map((stat, index) => (
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
          <TabsTrigger value="volunteers">المتطوعين</TabsTrigger>
          <TabsTrigger value="donations">التبرعات</TabsTrigger>
          <TabsTrigger value="impact">الأثر</TabsTrigger>
        </TabsList>

        <TabsContent value="programs" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 space-x-reverse">
              <Input placeholder="البحث في البرامج..." className="w-80" />
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4">
            {nonprofitPrograms.map((program) => (
              <Card key={program.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-red-500" />
                        {program.name}
                      </CardTitle>
                      <CardDescription className="mt-2">{program.description}</CardDescription>
                    </div>
                    <Badge variant="default">{program.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">المستفيدين</p>
                      <p className="font-semibold flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        {program.beneficiaries}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الميزانية</p>
                      <p className="font-semibold">{program.budget.toLocaleString()} ريال</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الفئة</p>
                      <p className="font-semibold">{program.category}</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm">عرض التفاصيل</Button>
                      <Button size="sm" variant="outline">تقرير الأثر</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="volunteers" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">إدارة المتطوعين</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              إضافة متطوع
            </Button>
          </div>

          <div className="grid gap-4">
            {volunteers.map((volunteer) => (
              <Card key={volunteer.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg flex items-center">
                        <HandHeart className="h-5 w-5 mr-2 text-purple-500" />
                        {volunteer.name}
                      </CardTitle>
                      <CardDescription>المهارات: {volunteer.skills}</CardDescription>
                    </div>
                    <Badge variant="default">{volunteer.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">ساعات المساهمة</p>
                      <p className="font-semibold">{volunteer.hoursContributed} ساعة</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">البرامج المشارك فيها</p>
                      <p className="font-semibold">{volunteer.programs} برنامج</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm">عرض الملف</Button>
                      <Button size="sm" variant="outline">إرسال مهمة</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="donations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Gift className="h-5 w-5 mr-2" />
                  التبرعات الشهرية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-green-600">2,850,000 ريال</p>
                    <p className="text-sm text-muted-foreground">إجمالي التبرعات هذا الشهر</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">تبرعات نقدية</span>
                      <span className="text-sm font-semibold">2,100,000 ريال</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">تبرعات عينية</span>
                      <span className="text-sm font-semibold">750,000 ريال</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>أهم المتبرعين</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>مؤسسة الخير</span>
                    <span className="font-semibold">500,000 ريال</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>شركة البناء الحديث</span>
                    <span className="font-semibold">300,000 ريال</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>متبرع مجهول</span>
                    <span className="font-semibold">250,000 ريال</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  مؤشرات الأثر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">تحسن الأوضاع التعليمية</span>
                      <span className="text-sm">92%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">تحسن الأوضاع الصحية</span>
                      <span className="text-sm">87%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">الاستقرار الاجتماعي</span>
                      <span className="text-sm">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  الأحداث القادمة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <h4 className="font-semibold">حملة توزيع الحقائب المدرسية</h4>
                    <p className="text-sm text-muted-foreground">15 فبراير 2024</p>
                  </div>
                  <div className="border-l-4 border-green-500 pl-3">
                    <h4 className="font-semibold">يوم التطوع المجتمعي</h4>
                    <p className="text-sm text-muted-foreground">22 فبراير 2024</p>
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <h4 className="font-semibold">معرض الأعمال الخيرية</h4>
                    <p className="text-sm text-muted-foreground">1 مارس 2024</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};