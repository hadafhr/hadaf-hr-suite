import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AlertCircle, Shield, FileText, Scale,
  Eye, Clock, CheckCircle, XCircle, AlertTriangle
} from 'lucide-react';

export function DisciplinaryActionsManagement() {
  // بيانات تجريبية للمخالفات
  const violations = [
    {
      id: '1',
      code: 'ATT001',
      title: 'التأخير عن العمل',
      severity: 'متوسط',
      count: 2,
      lastDate: '2024-01-10',
      status: 'إنذار شفهي',
      color: 'bg-yellow-500'
    },
    {
      id: '2', 
      code: 'BEH001',
      title: 'عدم الالتزام بقواعد العمل',
      severity: 'عالي',
      count: 1,
      lastDate: '2024-01-05',
      status: 'إنذار كتابي',
      color: 'bg-red-500'
    }
  ];

  const disciplinaryHistory = [
    {
      id: '1',
      date: '2024-01-10',
      violation: 'التأخير عن العمل - 15 دقيقة',
      action: 'إنذار شفهي',
      status: 'مفعل',
      severity: 'متوسط'
    },
    {
      id: '2',
      date: '2024-01-05', 
      violation: 'عدم الالتزام بالزي الرسمي',
      action: 'إنذار كتابي',
      status: 'مفعل',
      severity: 'منخفض'
    }
  ];

  const getSeverityBadge = (severity: string) => {
    const config = {
      'منخفض': { variant: 'secondary' as const, color: 'text-green-600' },
      'متوسط': { variant: 'destructive' as const, color: 'text-yellow-600' },
      'عالي': { variant: 'destructive' as const, color: 'text-red-600' }
    };
    
    return <Badge variant={config[severity as keyof typeof config]?.variant || 'secondary'}>
      {severity}
    </Badge>;
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            الإجراءات التأديبية
          </CardTitle>
        </CardHeader>
        <CardContent>
          {violations.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {violations.map((violation) => (
                <div key={violation.id} className="p-4 border border-orange-200 bg-orange-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${violation.color}`}></div>
                      <h4 className="font-medium">{violation.title}</h4>
                    </div>
                    {getSeverityBadge(violation.severity)}
                  </div>
                  <div className="space-y-1 text-sm">
                    <p><span className="text-gray-600">الرقم:</span> {violation.code}</p>
                    <p><span className="text-gray-600">عدد المرات:</span> {violation.count}</p>
                    <p><span className="text-gray-600">آخر مخالفة:</span> {violation.lastDate}</p>
                    <p><span className="text-gray-600">الإجراء:</span> {violation.status}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-700 mb-2">سجل نظيف</h3>
              <p className="text-gray-600">لا توجد مخالفات أو إجراءات تأديبية مسجلة</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="current" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">المخالفات الحالية</TabsTrigger>
          <TabsTrigger value="history">السجل التأديبي</TabsTrigger>
          <TabsTrigger value="policies">اللوائح والسياسات</TabsTrigger>
        </TabsList>

        {/* Current Violations */}
        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle>المخالفات والإجراءات الحالية</CardTitle>
            </CardHeader>
            <CardContent>
              {violations.length > 0 ? (
                <div className="space-y-4">
                  {violations.map((violation) => (
                    <div key={violation.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <AlertTriangle className="h-5 w-5 text-orange-500" />
                          <div>
                            <h4 className="font-medium">{violation.title}</h4>
                            <p className="text-sm text-gray-600">كود: {violation.code}</p>
                          </div>
                        </div>
                        {getSeverityBadge(violation.severity)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">عدد المرات</p>
                          <p className="font-bold text-red-600">{violation.count}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">آخر مخالفة</p>
                          <p className="font-medium">{violation.lastDate}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">الإجراء المتخذ</p>
                          <p className="font-medium">{violation.status}</p>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            التفاصيل
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <p className="text-gray-500">لا توجد مخالفات حالية</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* History */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                السجل التأديبي الكامل
              </CardTitle>
            </CardHeader>
            <CardContent>
              {disciplinaryHistory.length > 0 ? (
                <div className="space-y-4">
                  {disciplinaryHistory.map((record) => (
                    <div key={record.id} className="p-4 bg-gray-50 rounded-lg border-r-4 border-orange-400">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">{record.date}</span>
                        {getSeverityBadge(record.severity)}
                      </div>
                      <h4 className="font-medium mb-1">{record.violation}</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">الإجراء: {record.action}</span>
                        <Badge variant="outline" className="text-xs">
                          {record.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">لا يوجد سجل تأديبي</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies */}
        <TabsContent value="policies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5" />
                اللوائح والسياسات التأديبية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-600" />
                    قواعد الانضباط في العمل
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• الالتزام بمواعيد العمل الرسمية (8:00 ص - 5:00 م)</li>
                    <li>• ارتداء الزي الرسمي المعتمد من الشركة</li>
                    <li>• احترام الزملاء والرؤساء في العمل</li>
                    <li>• الحفاظ على ممتلكات الشركة</li>
                    <li>• عدم استخدام الهاتف الشخصي أثناء ساعات العمل</li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600" />
                    أنواع المخالفات والعقوبات
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium text-yellow-700">مخالفات بسيطة:</p>
                      <p className="text-gray-600">التأخير، عدم الالتزام بالزي → إنذار شفهي</p>
                    </div>
                    <div>
                      <p className="font-medium text-orange-700">مخالفات متوسطة:</p>
                      <p className="text-gray-600">التأخير المتكرر، الإهمال → إنذار كتابي أو خصم</p>
                    </div>
                    <div>
                      <p className="font-medium text-red-700">مخالفات جسيمة:</p>
                      <p className="text-gray-600">عدم الاحترام، الغياب بدون عذر → فصل أو إيقاف</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-green-600" />
                    حقوق الموظف
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>• حق الاعتراض على أي إجراء تأديبي خلال 15 يوم</li>
                    <li>• حق طلب مراجعة القرار من لجنة التظلمات</li>
                    <li>• حق الحصول على نسخة من محضر المخالفة</li>
                    <li>• حق التمثيل القانوني في القضايا الجسيمة</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}