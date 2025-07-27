import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Building2, Users, FileText, Calendar, BarChart3, Plus, Search, Download } from 'lucide-react';

const establishments = [
  {
    id: 1,
    name: "مؤسسة الأعمال الذكية",
    type: "شركة محدودة",
    employees: 45,
    status: "نشط",
    location: "الرياض",
    created: "2023-01-15"
  },
  {
    id: 2,
    name: "شركة التقنية المتطورة",
    type: "مؤسسة فردية",
    employees: 12,
    status: "نشط",
    location: "جدة",
    created: "2023-03-20"
  }
];

const businessStats = [
  { title: "إجمالي المنشآت", value: "15", icon: Building2, color: "text-green-600" },
  { title: "إجمالي الموظفين", value: "342", icon: Users, color: "text-blue-600" },
  { title: "المنشآت النشطة", value: "13", icon: BarChart3, color: "text-purple-600" },
  { title: "التصاريح المعلقة", value: "3", icon: FileText, color: "text-orange-600" }
];

export const BusinessManagement: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">إدارة المنشآت والموظفين</h1>
          <p className="text-muted-foreground mt-2">إدارة شاملة للمنشآت وموظفيها</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          إضافة منشأة جديدة
        </Button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {businessStats.map((stat, index) => (
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

      <Tabs defaultValue="establishments" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="establishments">المنشآت</TabsTrigger>
          <TabsTrigger value="employees">الموظفون</TabsTrigger>
          <TabsTrigger value="licenses">التراخيص</TabsTrigger>
        </TabsList>

        <TabsContent value="establishments" className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex space-x-2 space-x-reverse">
              <Input placeholder="البحث في المنشآت..." className="w-80" />
              <Button variant="outline">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              تصدير البيانات
            </Button>
          </div>

          <div className="grid gap-4">
            {establishments.map((establishment) => (
              <Card key={establishment.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{establishment.name}</CardTitle>
                      <CardDescription>{establishment.type} - {establishment.location}</CardDescription>
                    </div>
                    <Badge variant="secondary">{establishment.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">عدد الموظفين</p>
                      <p className="font-semibold">{establishment.employees}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">تاريخ التأسيس</p>
                      <p className="font-semibold">{establishment.created}</p>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm">عرض</Button>
                      <Button size="sm" variant="outline">تعديل</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الموظفين</CardTitle>
              <CardDescription>عرض وإدارة جميع موظفي المنشآت</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">قريباً - ميزة إدارة الموظفين الشاملة</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="licenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>إدارة التراخيص</CardTitle>
              <CardDescription>متابعة وتجديد تراخيص المنشآت</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">قريباً - نظام إدارة التراخيص المتقدم</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};