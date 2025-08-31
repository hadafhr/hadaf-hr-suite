import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Calendar, Calculator, FileText, Plus, Search, Filter, Download, Users, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PayrollCycle {
  id: string;
  title: string;
  month: string;
  year: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'processing' | 'completed' | 'approved';
  totalEmployees: number;
  totalAmount: number;
  processedBy: string;
  createdAt: string;
}

export const PayrollCyclesManager: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('cycles');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [cycles, setCycles] = useState<PayrollCycle[]>([
    {
      id: '1',
      title: 'راتب يناير 2024',
      month: 'يناير',
      year: 2024,
      startDate: '2024-01-01',
      endDate: '2024-01-31',
      status: 'completed',
      totalEmployees: 150,
      totalAmount: 450000,
      processedBy: 'أحمد محمد',
      createdAt: '2024-01-25'
    },
    {
      id: '2',
      title: 'راتب فبراير 2024',
      month: 'فبراير',
      year: 2024,
      startDate: '2024-02-01',
      endDate: '2024-02-29',
      status: 'approved',
      totalEmployees: 152,
      totalAmount: 456000,
      processedBy: 'سارة أحمد',
      createdAt: '2024-02-28'
    },
    {
      id: '3',
      title: 'راتب مارس 2024',
      month: 'مارس',
      year: 2024,
      startDate: '2024-03-01',
      endDate: '2024-03-31',
      status: 'processing',
      totalEmployees: 155,
      totalAmount: 465000,
      processedBy: 'محمد علي',
      createdAt: '2024-03-25'
    }
  ]);

  const [formData, setFormData] = useState({
    title: '',
    month: '',
    year: new Date().getFullYear(),
    startDate: '',
    endDate: ''
  });

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    processing: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    approved: 'bg-purple-100 text-purple-800'
  };

  const statusLabels = {
    draft: 'مسودة',
    processing: 'قيد المعالجة',
    completed: 'مكتملة',
    approved: 'معتمدة'
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.month || !formData.startDate || !formData.endDate) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const newCycle: PayrollCycle = {
      id: (cycles.length + 1).toString(),
      ...formData,
      status: 'draft',
      totalEmployees: 0,
      totalAmount: 0,
      processedBy: 'المستخدم الحالي',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCycles([...cycles, newCycle]);
    setFormData({ title: '', month: '', year: new Date().getFullYear(), startDate: '', endDate: '' });
    setIsDialogOpen(false);
    
    toast({
      title: "نجح الإنشاء",
      description: "تم إنشاء دورة رواتب جديدة بنجاح"
    });
  };

  const filteredCycles = cycles.filter(cycle => {
    const matchesSearch = cycle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cycle.month.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || cycle.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalCycles: cycles.length,
    completedCycles: cycles.filter(c => c.status === 'completed').length,
    totalAmount: cycles.reduce((sum, cycle) => sum + cycle.totalAmount, 0),
    averageEmployees: Math.round(cycles.reduce((sum, cycle) => sum + cycle.totalEmployees, 0) / cycles.length)
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-blue-900">إدارة دورات الرواتب</CardTitle>
              <p className="text-blue-700 mt-2">نظام شامل لإدارة ومتابعة دورات رواتب الموظفين</p>
            </div>
            <Calendar className="h-12 w-12 text-blue-600" />
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Calculator className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الدورات</p>
                <p className="text-2xl font-bold">{stats.totalCycles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <FileText className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">الدورات المكتملة</p>
                <p className="text-2xl font-bold">{stats.completedCycles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">إجمالي المبلغ</p>
                <p className="text-2xl font-bold">{stats.totalAmount.toLocaleString()} ر.س</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 space-x-reverse">
              <Users className="h-8 w-8 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">متوسط الموظفين</p>
                <p className="text-2xl font-bold">{stats.averageEmployees}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="cycles">دورات الرواتب</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="settings">الإعدادات</TabsTrigger>
        </TabsList>

        <TabsContent value="cycles">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>قائمة دورات الرواتب</CardTitle>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 ml-2" />
                        إضافة دورة جديدة
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md" dir="rtl">
                      <DialogHeader>
                        <DialogTitle>إضافة دورة رواتب جديدة</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">عنوان الدورة</Label>
                          <Input
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                            placeholder="مثل: راتب يناير 2024"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="month">الشهر</Label>
                          <Select onValueChange={(value) => setFormData({...formData, month: value})}>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الشهر" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="يناير">يناير</SelectItem>
                              <SelectItem value="فبراير">فبراير</SelectItem>
                              <SelectItem value="مارس">مارس</SelectItem>
                              <SelectItem value="أبريل">أبريل</SelectItem>
                              <SelectItem value="مايو">مايو</SelectItem>
                              <SelectItem value="يونيو">يونيو</SelectItem>
                              <SelectItem value="يوليو">يوليو</SelectItem>
                              <SelectItem value="أغسطس">أغسطس</SelectItem>
                              <SelectItem value="سبتمبر">سبتمبر</SelectItem>
                              <SelectItem value="أكتوبر">أكتوبر</SelectItem>
                              <SelectItem value="نوفمبر">نوفمبر</SelectItem>
                              <SelectItem value="ديسمبر">ديسمبر</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div>
                          <Label htmlFor="year">السنة</Label>
                          <Input
                            id="year"
                            type="number"
                            value={formData.year}
                            onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="startDate">تاريخ البداية</Label>
                          <Input
                            id="startDate"
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="endDate">تاريخ النهاية</Label>
                          <Input
                            id="endDate"
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                          />
                        </div>
                        
                        <div className="flex space-x-2 space-x-reverse">
                          <Button onClick={handleSubmit} className="flex-1">
                            إنشاء الدورة
                          </Button>
                          <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                            إلغاء
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline">
                    <Download className="h-4 w-4 ml-2" />
                    تصدير
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 space-x-reverse mt-4">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="البحث في دورات الرواتب..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="حالة الدورة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الحالات</SelectItem>
                    <SelectItem value="draft">مسودة</SelectItem>
                    <SelectItem value="processing">قيد المعالجة</SelectItem>
                    <SelectItem value="completed">مكتملة</SelectItem>
                    <SelectItem value="approved">معتمدة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-right">عنوان الدورة</TableHead>
                    <TableHead className="text-right">الفترة</TableHead>
                    <TableHead className="text-right">الحالة</TableHead>
                    <TableHead className="text-right">عدد الموظفين</TableHead>
                    <TableHead className="text-right">إجمالي المبلغ</TableHead>
                    <TableHead className="text-right">معالج بواسطة</TableHead>
                    <TableHead className="text-right">الإجراءات</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCycles.map((cycle) => (
                    <TableRow key={cycle.id}>
                      <TableCell className="font-medium">{cycle.title}</TableCell>
                      <TableCell>{cycle.month} {cycle.year}</TableCell>
                      <TableCell>
                        <Badge className={statusColors[cycle.status]}>
                          {statusLabels[cycle.status]}
                        </Badge>
                      </TableCell>
                      <TableCell>{cycle.totalEmployees}</TableCell>
                      <TableCell>{cycle.totalAmount.toLocaleString()} ر.س</TableCell>
                      <TableCell>{cycle.processedBy}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2 space-x-reverse">
                          <Button variant="outline" size="sm">
                            عرض
                          </Button>
                          {cycle.status === 'draft' && (
                            <Button variant="outline" size="sm">
                              تحرير
                            </Button>
                          )}
                          {cycle.status === 'completed' && (
                            <Button variant="outline" size="sm">
                              اعتماد
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>توزيع الدورات حسب الحالة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(statusLabels).map(([key, label]) => {
                    const count = cycles.filter(c => c.status === key).length;
                    const percentage = (count / cycles.length) * 100;
                    return (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{label}</span>
                          <span>{count} دورة</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إحصائيات المبالغ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>أعلى مبلغ دورة:</span>
                    <span>{Math.max(...cycles.map(c => c.totalAmount)).toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span>أقل مبلغ دورة:</span>
                    <span>{Math.min(...cycles.map(c => c.totalAmount)).toLocaleString()} ر.س</span>
                  </div>
                  <div className="flex justify-between">
                    <span>متوسط المبلغ:</span>
                    <span>{Math.round(stats.totalAmount / cycles.length).toLocaleString()} ر.س</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>إعدادات دورات الرواتب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>تردد الرواتب الافتراضي</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="w-full mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">أسبوعي</SelectItem>
                      <SelectItem value="biweekly">كل أسبوعين</SelectItem>
                      <SelectItem value="monthly">شهري</SelectItem>
                      <SelectItem value="quarterly">ربع سنوي</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>يوم صرف الرواتب</Label>
                  <Input type="number" min="1" max="31" defaultValue="25" className="mt-2" />
                </div>
                
                <div>
                  <Label>تنبيه قبل موعد الصرف (بالأيام)</Label>
                  <Input type="number" min="1" max="30" defaultValue="3" className="mt-2" />
                </div>

                <Button className="w-full">
                  حفظ الإعدادات
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};