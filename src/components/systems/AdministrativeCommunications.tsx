import React, { useState, useRef } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  MessageSquare, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Download, 
  Upload, 
  FileText, 
  Send, 
  Archive, 
  Search, 
  Filter, 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Mail, 
  MailOpen, 
  FileCheck, 
  Settings, 
  BarChart3, 
  Calendar, 
  User, 
  Building, 
  Tag, 
  Eye, 
  Users, 
  Paperclip, 
  Signature,
  Printer
} from 'lucide-react';

interface AdministrativeCommunicationsProps {
  onBack?: () => void;
}

export const AdministrativeCommunications = ({ onBack }: AdministrativeCommunicationsProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data states
  const [incomingCorrespondence, setIncomingCorrespondence] = useState([
    {
      id: 'IC001',
      date: '2024-01-15',
      sender: 'وزارة الموارد البشرية',
      subject: 'تحديث اللوائح التنظيمية للعمل',
      priority: 'عالية',
      status: 'جديد',
      assignedTo: 'أحمد محمد',
      department: 'الموارد البشرية',
      attachments: 2,
      dueDate: '2024-01-20'
    },
    {
      id: 'IC002',
      date: '2024-01-14',
      sender: 'الهيئة العامة للتأمينات',
      subject: 'طلب تحديث بيانات الموظفين',
      priority: 'متوسطة',
      status: 'قيد المراجعة',
      assignedTo: 'سارة أحمد',
      department: 'المالية',
      attachments: 1,
      dueDate: '2024-01-25'
    }
  ]);

  const [outgoingCorrespondence, setOutgoingCorrespondence] = useState([
    {
      id: 'OC001',
      date: '2024-01-16',
      recipient: 'غرفة التجارة الرياض',
      subject: 'طلب شهادة عضوية',
      status: 'معتمد',
      approvedBy: 'مدير عام',
      sentDate: '2024-01-16',
      attachments: 3
    }
  ]);

  const [internalMemos, setInternalMemos] = useState([
    {
      id: 'IM001',
      date: '2024-01-17',
      title: 'تحديث سياسة الإجازات',
      department: 'جميع الأقسام',
      status: 'نشط',
      readBy: 45,
      totalEmployees: 60,
      priority: 'عالية',
      author: 'إدارة الموارد البشرية'
    }
  ]);

  const handleSave = (type: string) => {
    toast({
      title: "تم الحفظ بنجاح",
      description: `تم حفظ ${type} بنجاح`,
    });
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    toast({
      title: "جاري التصدير",
      description: `جاري تصدير البيانات بصيغة ${format.toUpperCase()}`,
    });
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast({
        title: "تم رفع الملف بنجاح",
        description: `تم رفع ${file.name} بنجاح`,
      });
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المراسلات الواردة</p>
                <p className="text-3xl font-bold text-primary">24</p>
                <p className="text-xs text-muted-foreground mt-1">هذا الشهر</p>
              </div>
              <Mail className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المراسلات الصادرة</p>
                <p className="text-3xl font-bold text-green-600">18</p>
                <p className="text-xs text-muted-foreground mt-1">هذا الشهر</p>
              </div>
              <Send className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المذكرات الداخلية</p>
                <p className="text-3xl font-bold text-blue-600">12</p>
                <p className="text-xs text-muted-foreground mt-1">نشطة</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">المعتمدة المعلقة</p>
                <p className="text-3xl font-bold text-orange-600">6</p>
                <p className="text-xs text-muted-foreground mt-1">تحتاج موافقة</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            التنبيهات والتذكيرات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-medium">مراسلة متأخرة</p>
                  <p className="text-sm text-muted-foreground">رد على وزارة الموارد البشرية مستحق منذ 2 أيام</p>
                </div>
              </div>
              <Button size="sm" variant="outline">عرض</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">موافقة مطلوبة</p>
                  <p className="text-sm text-muted-foreground">3 مراسلات صادرة تحتاج موافقة المدير العام</p>
                </div>
              </div>
              <Button size="sm" variant="outline">مراجعة</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderIncomingCorrespondence = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              المراسلات الواردة
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    إضافة مراسلة واردة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>إضافة مراسلة واردة جديدة</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="المرسل" />
                    <Input placeholder="الموضوع" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="الأولوية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="عالية">عالية</SelectItem>
                        <SelectItem value="متوسطة">متوسطة</SelectItem>
                        <SelectItem value="منخفضة">منخفضة</SelectItem>
                      </SelectContent>
                    </Select>
                    <Textarea placeholder="المحتوى..." />
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">إلغاء</Button>
                    <Button onClick={() => handleSave('المراسلة الواردة')}>
                      <Save className="w-4 h-4 mr-2" />
                      حفظ
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={handleUpload}>
                <Upload className="w-4 h-4 mr-2" />
                استيراد
              </Button>
              <Button variant="outline" onClick={() => handleExport('excel')}>
                <Download className="w-4 h-4 mr-2" />
                تصدير Excel
              </Button>
              <Button variant="outline" onClick={() => handleExport('pdf')}>
                <Download className="w-4 h-4 mr-2" />
                تصدير PDF
              </Button>
              <Button variant="outline" onClick={() => window.print()}>
                <Printer className="w-4 h-4 mr-2" />
                طباعة
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>الرقم</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المرسل</TableHead>
                  <TableHead>الموضوع</TableHead>
                  <TableHead>الأولوية</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomingCorrespondence.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.sender}</TableCell>
                    <TableCell className="max-w-xs truncate">{item.subject}</TableCell>
                    <TableCell>
                      <Badge variant={item.priority === 'عالية' ? 'destructive' : 'default'}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{item.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderOutgoingCorrespondence = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5" />
              المراسلات الصادرة
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    إنشاء مراسلة صادرة
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <DialogHeader>
                    <DialogTitle>إنشاء مراسلة صادرة جديدة</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="المستقبل" />
                    <Input placeholder="الموضوع" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="نوع المراسلة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="رسمية">رسمية</SelectItem>
                        <SelectItem value="طلب">طلب</SelectItem>
                        <SelectItem value="إشعار">إشعار</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="القالب" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="قالب1">قالب رسمي</SelectItem>
                        <SelectItem value="قالب2">قالب طلب</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="md:col-span-2">
                      <Textarea placeholder="محتوى المراسلة..." rows={6} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">حفظ كمسودة</Button>
                    <Button onClick={() => handleSave('المراسلة الصادرة')}>
                      <Send className="w-4 h-4 mr-2" />
                      إرسال للاعتماد
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={handleUpload}>
                <Upload className="w-4 h-4 mr-2" />
                استيراد
              </Button>
              <Button variant="outline" onClick={() => handleExport('excel')}>
                <Download className="w-4 h-4 mr-2" />
                تصدير Excel
              </Button>
              <Button variant="outline" onClick={() => handleExport('pdf')}>
                <Download className="w-4 h-4 mr-2" />
                تصدير PDF
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>الرقم</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>المستقبل</TableHead>
                  <TableHead>الموضوع</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>معتمد من</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {outgoingCorrespondence.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.recipient}</TableCell>
                    <TableCell className="max-w-xs truncate">{item.subject}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'معتمد' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.approvedBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInternalMemos = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              المذكرات الداخلية
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    إنشاء مذكرة داخلية
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl">
                  <DialogHeader>
                    <DialogTitle>إنشاء مذكرة داخلية جديدة</DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input placeholder="عنوان المذكرة" />
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="الأولوية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="عالية">عالية</SelectItem>
                        <SelectItem value="متوسطة">متوسطة</SelectItem>
                        <SelectItem value="منخفضة">منخفضة</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="القسم المستهدف" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="جميع الأقسام">جميع الأقسام</SelectItem>
                        <SelectItem value="الموارد البشرية">الموارد البشرية</SelectItem>
                        <SelectItem value="المالية">المالية</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="نوع المذكرة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="سياسة">سياسة</SelectItem>
                        <SelectItem value="إعلان">إعلان</SelectItem>
                        <SelectItem value="تعليمات">تعليمات</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="md:col-span-2">
                      <Textarea placeholder="محتوى المذكرة..." rows={6} />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline">حفظ كمسودة</Button>
                    <Button onClick={() => handleSave('المذكرة الداخلية')}>
                      <Send className="w-4 h-4 mr-2" />
                      نشر المذكرة
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <Button variant="outline" onClick={handleUpload}>
                <Upload className="w-4 h-4 mr-2" />
                استيراد
              </Button>
              <Button variant="outline" onClick={() => handleExport('excel')}>
                <Download className="w-4 h-4 mr-2" />
                تصدير Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>الرقم</TableHead>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>العنوان</TableHead>
                  <TableHead>القسم المستهدف</TableHead>
                  <TableHead>الحالة</TableHead>
                  <TableHead>معدل القراءة</TableHead>
                  <TableHead>الإجراءات</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {internalMemos.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="max-w-xs truncate">{item.title}</TableCell>
                    <TableCell>{item.department}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'نشط' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={(item.readBy / item.totalEmployees) * 100} className="w-16" />
                        <span className="text-sm">{item.readBy}/{item.totalEmployees}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost"><Trash2 className="h-4 w-4" /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderArchiving = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="flex items-center gap-2">
              <Archive className="h-5 w-5" />
              الأرشيف الرقمي
            </CardTitle>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleUpload}>
                <Upload className="w-4 h-4 mr-2" />
                رفع إلى الأرشيف
              </Button>
              <Button variant="outline" onClick={() => handleExport('excel')}>
                <Download className="w-4 h-4 mr-2" />
                تصدير Excel
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="البحث في الأرشيف بالكلمات المفتاحية..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="فلترة حسب الفئة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الفئات</SelectItem>
                <SelectItem value="government">حكومية</SelectItem>
                <SelectItem value="internal">داخلية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-medium text-sm">مراسلات وزارة العمل 2023</h3>
                      <p className="text-xs text-muted-foreground">2023-12-31</p>
                    </div>
                  </div>
                  <Badge variant="outline">حكومية</Badge>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                  </div>
                  <Button size="sm" variant="ghost"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            التقارير والإحصائيات
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">تقرير المراسلات الواردة</h3>
                    <p className="text-sm text-muted-foreground">سجل كامل للمراسلات</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleExport('pdf')}>
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleExport('excel')}>
                    <Download className="h-4 w-4 mr-1" />
                    Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Send className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">تقرير المراسلات الصادرة</h3>
                    <p className="text-sm text-muted-foreground">إحصائيات الإرسال</p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => handleExport('pdf')}>
                    <Download className="h-4 w-4 mr-1" />
                    PDF
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleExport('excel')}>
                    <Download className="h-4 w-4 mr-1" />
                    Excel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            إعدادات المراسلات الإدارية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium mb-4">صلاحيات المستخدمين</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">صلاحيات الإرسال</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">مدراء الأقسام</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">موظفو الموارد البشرية</span>
                  </label>
                </div>
              </div>
              <div className="border rounded-lg p-4">
                <h4 className="font-medium mb-3">صلاحيات الموافقة</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-sm">المدير العام</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">مدير الموارد البشرية</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4">قوالب المراسلات</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>قالب المراسلات الرسمية</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
                </div>
              </div>
              <Button variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                إضافة قالب جديد
              </Button>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-6">
            <Button variant="outline">إلغاء</Button>
            <Button onClick={() => handleSave('الإعدادات')}>
              <Save className="w-4 h-4 mr-2" />
              حفظ الإعدادات
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">المراسلات الإدارية</h1>
          <p className="text-muted-foreground">إدارة شاملة للمراسلات والاتصالات الإدارية</p>
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        className="hidden"
        multiple
        accept=".pdf,.doc,.docx,.jpg,.png"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-6">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="incoming" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            الواردة
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            الصادرة
          </TabsTrigger>
          <TabsTrigger value="memos" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            المذكرات
          </TabsTrigger>
          <TabsTrigger value="archive" className="flex items-center gap-2">
            <Archive className="w-4 h-4" />
            الأرشيف
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            الإعدادات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
        <TabsContent value="incoming">{renderIncomingCorrespondence()}</TabsContent>
        <TabsContent value="outgoing">{renderOutgoingCorrespondence()}</TabsContent>
        <TabsContent value="memos">{renderInternalMemos()}</TabsContent>
        <TabsContent value="archive">{renderArchiving()}</TabsContent>
        <TabsContent value="settings">{renderSettings()}</TabsContent>
        <TabsContent value="reports">{renderReports()}</TabsContent>
      </Tabs>
    </div>
  );
};