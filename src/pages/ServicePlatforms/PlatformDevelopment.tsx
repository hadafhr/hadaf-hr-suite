import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code, Smartphone, Globe, Database, Zap, Plus, GitBranch, Server, Monitor } from 'lucide-react';

const developmentProjects = [
  {
    id: 1,
    name: "منصة إدارة الموارد البشرية",
    description: "تطوير منصة شاملة لإدارة الموارد البشرية",
    technology: "React, Node.js, MongoDB",
    status: "قيد التطوير",
    progress: 75,
    team: 8,
    deadline: "2024-03-15"
  },
  {
    id: 2,
    name: "تطبيق الخدمات الحكومية",
    description: "تطبيق موبايل للخدمات الحكومية الإلكترونية",
    technology: "React Native, Express, PostgreSQL",
    status: "مكتمل",
    progress: 100,
    team: 6,
    deadline: "2024-01-30"
  }
];

const platformStats = [
  { title: "المشاريع النشطة", value: "12", icon: Code, color: "text-blue-600" },
  { title: "التطبيقات المطورة", value: "45", icon: Smartphone, color: "text-green-600" },
  { title: "المواقع الإلكترونية", value: "28", icon: Globe, color: "text-purple-600" },
  { title: "قواعد البيانات", value: "15", icon: Database, color: "text-orange-600" }
];

const technologies = [
  { name: "React.js", category: "Frontend", projects: 15 },
  { name: "Node.js", category: "Backend", projects: 12 },
  { name: "React Native", category: "Mobile", projects: 8 },
  { name: "PostgreSQL", category: "Database", projects: 10 },
  { name: "MongoDB", category: "Database", projects: 7 },
  { name: "AWS", category: "Cloud", projects: 18 }
];

export const PlatformDevelopment: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">تطوير المنصات الإلكترونية</h1>
          <p className="text-muted-foreground mt-2">تطوير وتصميم المنصات والتطبيقات الرقمية</p>
        </div>
        <Button className="bg-primary text-primary-foreground">
          <Plus className="h-4 w-4 mr-2" />
          مشروع جديد
        </Button>
      </div>

      {/* الإحصائيات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {platformStats.map((stat, index) => (
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

      <Tabs defaultValue="projects" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="projects">المشاريع</TabsTrigger>
          <TabsTrigger value="technologies">التقنيات</TabsTrigger>
          <TabsTrigger value="infrastructure">البنية التحتية</TabsTrigger>
          <TabsTrigger value="deployment">النشر والتشغيل</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid gap-4">
            {developmentProjects.map((project) => (
              <Card key={project.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <CardDescription className="mt-2">{project.description}</CardDescription>
                    </div>
                    <Badge variant={project.status === "مكتمل" ? "default" : "secondary"}>
                      {project.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">التقنيات</p>
                        <p className="font-semibold text-sm">{project.technology}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">فريق العمل</p>
                        <p className="font-semibold">{project.team} مطور</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">الموعد النهائي</p>
                        <p className="font-semibold">{project.deadline}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">التقدم</p>
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold">{project.progress}%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button size="sm">
                        <GitBranch className="h-4 w-4 mr-2" />
                        عرض الكود
                      </Button>
                      <Button size="sm" variant="outline">
                        <Monitor className="h-4 w-4 mr-2" />
                        معاينة
                      </Button>
                      <Button size="sm" variant="outline">تقرير التقدم</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="technologies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                التقنيات المستخدمة
              </CardTitle>
              <CardDescription>قائمة التقنيات والأدوات المستخدمة في التطوير</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technologies.map((tech, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{tech.name}</h3>
                      <Badge variant="outline">{tech.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      مستخدم في {tech.projects} مشروع
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="infrastructure" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Server className="h-5 w-5 mr-2" />
                  الخوادم والبنية التحتية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>خادم الإنتاج الرئيسي</span>
                    <Badge variant="default">نشط</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>خادم التطوير</span>
                    <Badge variant="default">نشط</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>خادم قواعد البيانات</span>
                    <Badge variant="default">نشط</Badge>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded">
                    <span>خادم النسخ الاحتياطية</span>
                    <Badge variant="secondary">صيانة</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2" />
                  الأداء والمراقبة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">استخدام وحدة المعالجة</span>
                      <span className="text-sm">45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">استخدام الذاكرة</span>
                      <span className="text-sm">68%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">مساحة التخزين</span>
                      <span className="text-sm">32%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>النشر والتشغيل</CardTitle>
              <CardDescription>إدارة عمليات النشر والتشغيل للمشاريع</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border rounded-lg bg-green-50">
                    <h3 className="font-semibold text-green-700">نشر ناجح</h3>
                    <p className="text-2xl font-bold text-green-600">28</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-yellow-50">
                    <h3 className="font-semibold text-yellow-700">قيد النشر</h3>
                    <p className="text-2xl font-bold text-yellow-600">3</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg bg-red-50">
                    <h3 className="font-semibold text-red-700">فشل النشر</h3>
                    <p className="text-2xl font-bold text-red-600">1</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">آخر عمليات النشر</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>منصة إدارة الموارد البشرية v2.1</span>
                      <Badge variant="default">نجح</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>تطبيق الخدمات الحكومية v1.5</span>
                      <Badge variant="default">نجح</Badge>
                    </div>
                    <div className="flex justify-between items-center p-3 border rounded">
                      <span>موقع الشركة الرسمي v3.0</span>
                      <Badge variant="secondary">قيد النشر</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};