import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Users, Target, BookOpen } from 'lucide-react';

interface OrganizationalDevelopmentProps {
  onBack: () => void;
}

const OrganizationalDevelopment = ({ onBack }: OrganizationalDevelopmentProps) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleDevelopmentProgram = () => {
    alert('فتح برنامج التطوير التنظيمي الجديد');
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <h1 className="text-3xl font-bold text-primary">التطوير التنظيمي والتغيير</h1>
        </div>
        <Button 
          className="gap-2"
          onClick={() => handleDevelopmentProgram()}
        >
          <Target className="w-4 w-4" />
          برنامج تطوير
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="programs">البرامج</TabsTrigger>
          <TabsTrigger value="change">إدارة التغيير</TabsTrigger>
          <TabsTrigger value="culture">الثقافة التنظيمية</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  مؤشرات الأداء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>معدل النمو التنظيمي</span>
                    <Badge variant="outline">85%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>رضا الموظفين</span>
                    <Badge variant="outline">78%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>كفاءة العمليات</span>
                    <Badge variant="outline">92%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  الموظفون
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>إجمالي الموظفين</span>
                    <Badge>248</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>في برامج التطوير</span>
                    <Badge variant="secondary">156</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>معدل الترقيات</span>
                    <Badge variant="outline">12%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  الأهداف الاستراتيجية
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>الأهداف المكتملة</span>
                    <Badge variant="default">67%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>قيد التنفيذ</span>
                    <Badge variant="secondary">23%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>مؤجلة</span>
                    <Badge variant="outline">10%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>برامج التطوير النشطة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">برنامج تطوير القيادات</h4>
                  <p className="text-sm text-muted-foreground mb-3">برنامج شامل لتطوير مهارات القيادة والإدارة</p>
                  <div className="flex items-center justify-between">
                    <Badge>25 مشارك</Badge>
                    <Button size="sm" variant="outline">عرض التفاصيل</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">برنامج التحول الرقمي</h4>
                  <p className="text-sm text-muted-foreground mb-3">تطوير المهارات الرقمية والتقنية للموظفين</p>
                  <div className="flex items-center justify-between">
                    <Badge>42 مشارك</Badge>
                    <Button size="sm" variant="outline">عرض التفاصيل</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">برنامج تطوير المواهب</h4>
                  <p className="text-sm text-muted-foreground mb-3">تنمية وتطوير المواهب الواعدة في المؤسسة</p>
                  <div className="flex items-center justify-between">
                    <Badge>18 مشارك</Badge>
                    <Button size="sm" variant="outline">عرض التفاصيل</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="change" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مبادرات إدارة التغيير</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">تحديث نظام إدارة الموارد البشرية</h4>
                  <p className="text-sm text-muted-foreground mb-3">ترقية شاملة لنظام الموارد البشرية</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="default">قيد التنفيذ</Badge>
                    <Button size="sm" variant="outline">متابعة</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">إعادة هيكلة الأقسام</h4>
                  <p className="text-sm text-muted-foreground mb-3">تحسين الهيكل التنظيمي للشركة</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">مخطط</Badge>
                    <Button size="sm" variant="outline">عرض الخطة</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">تطبيق نظام العمل المرن</h4>
                  <p className="text-sm text-muted-foreground mb-3">تنفيذ سياسات العمل المرن والهجين</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">مكتمل</Badge>
                    <Button size="sm" variant="outline">تقرير النتائج</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="culture" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>مبادرات الثقافة التنظيمية</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">برنامج القيم المؤسسية</h4>
                  <p className="text-sm text-muted-foreground mb-3">تعزيز وترسيخ قيم الشركة بين الموظفين</p>
                  <div className="flex items-center justify-between">
                    <Badge>156 مشارك</Badge>
                    <Button size="sm" variant="outline">عرض التقدم</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">مبادرة التواصل الداخلي</h4>
                  <p className="text-sm text-muted-foreground mb-3">تحسين قنوات التواصل بين الإدارات</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="default">نشط</Badge>
                    <Button size="sm" variant="outline">المزيد</Button>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">برنامج الابتكار والإبداع</h4>
                  <p className="text-sm text-muted-foreground mb-3">تشجيع ثقافة الابتكار والتفكير الإبداعي</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">23 فكرة</Badge>
                    <Button size="sm" variant="outline">عرض الأفكار</Button>
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

export default OrganizationalDevelopment;