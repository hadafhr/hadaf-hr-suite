import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Receipt, TrendingUp, DollarSign, Calendar, FileText, PlusCircle, Filter, Download, Search, Eye } from 'lucide-react';

interface ExpensesManagementProps {
  onBack: () => void;
}

export const ExpensesManagement: React.FC<ExpensesManagementProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="space-y-6">
      {/* الشريط العلوي */}
      <div className="bg-card/95 backdrop-blur-sm rounded-3xl shadow-soft border border-border/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onBack} className="border-border text-foreground hover:bg-accent">
              <ArrowLeft className="h-4 w-4 ml-2" />
              رجوع
            </Button>
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow">
              <Receipt className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">إدارة المصروفات والنفقات</h1>
              <p className="text-muted-foreground">النظام المتكامل لإدارة ومتابعة جميع المصروفات والنفقات</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="border-border">
              <Download className="h-4 w-4 ml-2" />
              تصدير
            </Button>
            <Button size="sm" className="bg-primary text-primary-foreground">
              <PlusCircle className="h-4 w-4 ml-2" />
              مصروف جديد
            </Button>
          </div>
        </div>

        {/* إحصائيات سريعة */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">إجمالي المصروفات</p>
                  <p className="text-xl font-bold text-primary">₩245,800</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">مصروفات معتمدة</p>
                  <p className="text-xl font-bold text-green-600">₩189,200</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">قيد المراجعة</p>
                  <p className="text-xl font-bold text-orange-600">₩36,400</p>
                </div>
                <Calendar className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">عدد الطلبات</p>
                  <p className="text-xl font-bold text-blue-600">142</p>
                </div>
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* التبويبات */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-4 gap-2 bg-transparent p-0 h-auto w-full">
            <TabsTrigger value="dashboard" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border data-[state=active]:border-primary hover:scale-105 hover:shadow-lg">
              <Receipt className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
              <span className="text-center leading-tight">لوحة التحكم</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border data-[state=active]:border-primary hover:scale-105 hover:shadow-lg">
              <FileText className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
              <span className="text-center leading-tight">طلبات المصروفات</span>
            </TabsTrigger>
            <TabsTrigger value="approvals" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border data-[state=active]:border-primary hover:scale-105 hover:shadow-lg">
              <Eye className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
              <span className="text-center leading-tight">المراجعة والاعتماد</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="group flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg font-medium text-xs transition-all duration-300 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground border border-border data-[state=active]:border-primary hover:scale-105 hover:shadow-lg">
              <TrendingUp className="h-4 w-4 flex-shrink-0 transition-transform group-hover:scale-110" />
              <span className="text-center leading-tight">التقارير والتحليلات</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="space-y-6">
              {/* آخر المصروفات */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Receipt className="h-5 w-5" />
                    آخر المصروفات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { id: 'EXP001', type: 'مواصلات', amount: '150', status: 'معتمد', date: '2024-01-15' },
                      { id: 'EXP002', type: 'وجبات عمل', amount: '85', status: 'قيد المراجعة', date: '2024-01-14' },
                      { id: 'EXP003', type: 'مستلزمات مكتبية', amount: '220', status: 'معتمد', date: '2024-01-13' },
                      { id: 'EXP004', type: 'اتصالات', amount: '95', status: 'مرفوض', date: '2024-01-12' }
                    ].map((expense) => (
                      <div key={expense.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Receipt className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{expense.type}</p>
                            <p className="text-sm text-muted-foreground">{expense.id}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">₩{expense.amount}</p>
                          <Badge variant={expense.status === 'معتمد' ? 'default' : expense.status === 'قيد المراجعة' ? 'secondary' : 'destructive'}>
                            {expense.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>طلبات المصروفات</CardTitle>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Filter className="h-4 w-4 ml-2" />
                    تصفية
                  </Button>
                  <Button size="sm" variant="outline">
                    <Search className="h-4 w-4 ml-2" />
                    بحث
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <Receipt className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>جاري تطوير واجهة طلبات المصروفات</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle>المراجعة والاعتماد</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>جاري تطوير واجهة المراجعة والاعتماد</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>التقارير والتحليلات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center text-muted-foreground py-8">
                  <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>جاري تطوير واجهة التقارير والتحليلات</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};