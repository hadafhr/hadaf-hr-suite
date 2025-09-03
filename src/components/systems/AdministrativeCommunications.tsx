import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, 
  MessageSquare, 
  Mail, 
  Send, 
  FileText, 
  Archive, 
  BarChart3, 
  Settings,
  Download,
  Plus,
  Search,
  Filter,
  Calendar,
  Building,
  Eye,
  Edit,
  Trash2,
  Save,
  Upload,
  Printer,
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle2,
  User,
  Users,
  Paperclip,
  Signature,
  Target,
  TrendingUp,
  Activity,
  Zap,
  Globe,
  Sparkles,
  Crown,
  Tag,
  FileCheck,
  MailOpen
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Cell, Pie } from 'recharts';

interface AdministrativeCommunicationsProps {
  onBack: () => void;
}

interface Correspondence {
  id: string;
  transactionNumber: string;
  date: string;
  sender?: string;
  recipient?: string;
  subject: string;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  status: string;
  assignedTo?: string;
  department: string;
  attachments: number;
  dueDate?: string;
  approvedBy?: string;
  sentDate?: string;
  content?: string;
  aiSummary?: string;
  category?: 'Legal' | 'HR' | 'Finance' | 'General';
}

interface InternalMemo {
  id: string;
  transactionNumber: string;
  date: string;
  title: string;
  department: string;
  status: string;
  readBy: number;
  totalEmployees: number;
  priority: 'عالية' | 'متوسطة' | 'منخفضة';
  author: string;
  content?: string;
  aiSummary?: string;
}

export const AdministrativeCommunications: React.FC<AdministrativeCommunicationsProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate unique transaction numbers
  const generateTransactionNumber = (type: 'IN' | 'OUT' | 'MEMO'): string => {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 9999) + 1;
    return `${type}-${year}-${String(randomNum).padStart(4, '0')}`;
  };

  // Mock data for demonstration
  const incomingCorrespondence: Correspondence[] = [
    {
      id: '1',
      transactionNumber: 'IN-2024-0001',
      date: '2024-01-15',
      sender: 'وزارة الموارد البشرية والتنمية الاجتماعية',
      subject: 'تحديث اللوائح التنظيمية للعمل وفقاً للتعديلات الجديدة',
      priority: 'عالية',
      status: 'جديد',
      assignedTo: 'أحمد محمد الخالدي',
      department: 'الموارد البشرية',
      attachments: 2,
      dueDate: '2024-01-25',
      content: 'يسرنا إعلامكم بالتحديثات الجديدة على اللوائح التنظيمية...',
      aiSummary: 'تحديث اللوائح - مطلوب تطبيق التعديلات خلال 10 أيام',
      category: 'HR'
    },
    {
      id: '2',
      transactionNumber: 'IN-2024-0002',
      date: '2024-01-18',
      sender: 'الهيئة العامة للتأمينات الاجتماعية',
      subject: 'طلب تحديث بيانات الموظفين المؤمن عليهم',
      priority: 'متوسطة',
      status: 'قيد المراجعة',
      assignedTo: 'سارة أحمد المطيري',
      department: 'المالية',
      attachments: 1,
      dueDate: '2024-02-01',
      category: 'Finance'
    },
    {
      id: '3',
      transactionNumber: 'IN-2024-0003',
      date: '2024-01-20',
      sender: 'المحكمة العمالية',
      subject: 'استدعاء قضية عمالية رقم 2024/45',
      priority: 'عالية',
      status: 'معلق',
      assignedTo: 'محمد سعد القحطاني',
      department: 'الشئون القانونية',
      attachments: 3,
      dueDate: '2024-01-28',
      category: 'Legal'
    }
  ];

  const outgoingCorrespondence: Correspondence[] = [
    {
      id: '1',
      transactionNumber: 'OUT-2024-0001',
      date: '2024-01-16',
      recipient: 'غرفة التجارة والصناعة بالرياض',
      subject: 'طلب شهادة عضوية مؤسسة تجارية',
      priority: 'متوسطة',
      status: 'معتمد',
      department: 'الإدارة العامة',
      attachments: 3,
      approvedBy: 'المدير العام',
      sentDate: '2024-01-16',
      category: 'General'
    },
    {
      id: '2',
      transactionNumber: 'OUT-2024-0002',
      date: '2024-01-19',
      recipient: 'وزارة التجارة والاستثمار',
      subject: 'إشعار تغيير عنوان المؤسسة الرئيسي',
      priority: 'عالية',
      status: 'مرسل',
      department: 'الشئون القانونية',
      attachments: 2,
      approvedBy: 'المدير التنفيذي',
      sentDate: '2024-01-19',
      category: 'Legal'
    }
  ];

  const internalMemos: InternalMemo[] = [
    {
      id: '1',
      transactionNumber: 'MEMO-2024-0001',
      date: '2024-01-17',
      title: 'تحديث سياسة الإجازات للعام 2024',
      department: 'جميع الأقسام',
      status: 'نشط',
      readBy: 45,
      totalEmployees: 60,
      priority: 'عالية',
      author: 'إدارة الموارد البشرية',
      content: 'نود إعلامكم بالتحديثات الجديدة على سياسة الإجازات...',
      aiSummary: 'تحديث سياسة الإجازات - تطبيق فوري - معدل قراءة 75%'
    },
    {
      id: '2',
      transactionNumber: 'MEMO-2024-0002',
      date: '2024-01-20',
      title: 'إجراءات السلامة المهنية الجديدة',
      department: 'الإنتاج والعمليات',
      status: 'مراجعة',
      readBy: 28,
      totalEmployees: 35,
      priority: 'عالية',
      author: 'قسم السلامة المهنية',
      aiSummary: 'إجراءات السلامة الجديدة - تدريب مطلوب - معدل قراءة 80%'
    }
  ];

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

      {/* AI Integration Dashboard */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Analytics &amp; Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">تصنيف المراسلات التلقائي</h4>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'قانونية', value: 35 },
                      { name: 'مالية', value: 25 },
                      { name: 'موارد بشرية', value: 30 },
                      { name: 'عامة', value: 10 }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    <Cell fill="#0066cc" />
                    <Cell fill="#00cc66" />
                    <Cell fill="#cc6600" />
                    <Cell fill="#6600cc" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h4 className="font-medium mb-3">أوقات الاستجابة</h4>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={[
                  { day: 'السبت', time: 4.2 },
                  { day: 'الأحد', time: 3.8 },
                  { day: 'الاثنين', time: 2.1 },
                  { day: 'الثلاثاء', time: 1.9 },
                  { day: 'الأربعاء', time: 2.8 },
                  { day: 'الخميس', time: 3.2 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="time" stroke="#0066cc" fill="#0066cc" fillOpacity={0.3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">AI Smart Queries</h4>
            <div className="flex gap-2">
              <Input placeholder="مثال: أظهر جميع المراسلات من وزارة العمل في 2024" className="flex-1" />
              <Button>
                <Search className="w-4 h-4 mr-2" />
                بحث ذكي
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            مؤشرات الأداء
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">96%</div>
              <p className="text-sm text-muted-foreground">معدل الاستجابة في الوقت</p>
              <Progress value={96} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">2.3 أيام</div>
              <p className="text-sm text-muted-foreground">متوسط وقت الاستجابة</p>
              <Progress value={77} className="mt-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">94%</div>
              <p className="text-sm text-muted-foreground">معدل رضا المراسلين</p>
              <Progress value={94} className="mt-2" />
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
                    <div>
                      <Label htmlFor="sender">المرسل *</Label>
                      <Input id="sender" placeholder="اسم المرسل أو الجهة" />
                    </div>
                    <div>
                      <Label htmlFor="transaction">رقم المعاملة التلقائي</Label>
                      <Input id="transaction" value={generateTransactionNumber('IN')} disabled />
                    </div>
                    <div>
                      <Label htmlFor="subject">الموضوع *</Label>
                      <Input id="subject" placeholder="موضوع المراسلة" />
                    </div>
                    <div>
                      <Label htmlFor="priority">الأولوية</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الأولوية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="عالية">عالية</SelectItem>
                          <SelectItem value="متوسطة">متوسطة</SelectItem>
                          <SelectItem value="منخفضة">منخفضة</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="department">القسم المختص</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر القسم" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hr">الموارد البشرية</SelectItem>
                          <SelectItem value="finance">المالية</SelectItem>
                          <SelectItem value="legal">الشئون القانونية</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="dueDate">تاريخ الاستحقاق</Label>
                      <Input id="dueDate" type="date" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="content">المحتوى</Label>
                      <Textarea id="content" placeholder="محتوى المراسلة..." rows={4} />
                    </div>
                    <div className="md:col-span-2">
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4">
                        <div className="text-center">
                          <Paperclip className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">اسحب الملفات هنا أو</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            اختر الملفات
                          </Button>
                        </div>
                      </div>
                    </div>
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
                    <TableCell className="font-medium">{item.transactionNumber}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.sender}</TableCell>
                    <TableCell className="max-w-xs truncate" title={item.subject}>{item.subject}</TableCell>
                    <TableCell>
                      <Badge variant={item.priority === 'عالية' ? 'destructive' : item.priority === 'متوسطة' ? 'default' : 'secondary'}>
                        {item.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'معلق' ? 'destructive' : item.status === 'قيد المراجعة' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" title="عرض">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="تحرير">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="حذف">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="تحليل AI">
                          <Sparkles className="h-4 w-4" />
                        </Button>
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
                    <div>
                      <Label htmlFor="recipient">المستقبل *</Label>
                      <Input id="recipient" placeholder="اسم المستقبل أو الجهة" />
                    </div>
                    <div>
                      <Label htmlFor="outTransaction">رقم المعاملة التلقائي</Label>
                      <Input id="outTransaction" value={generateTransactionNumber('OUT')} disabled />
                    </div>
                    <div>
                      <Label htmlFor="outSubject">الموضوع *</Label>
                      <Input id="outSubject" placeholder="موضوع المراسلة" />
                    </div>
                    <div>
                      <Label htmlFor="letterType">نوع المراسلة</Label>
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
                    </div>
                    <div>
                      <Label htmlFor="template">القالب</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="القالب" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="قالب1">قالب رسمي</SelectItem>
                          <SelectItem value="قالب2">قالب طلب</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="outPriority">الأولوية</Label>
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
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="outContent">محتوى المراسلة</Label>
                      <Textarea id="outContent" placeholder="محتوى المراسلة..." rows={6} />
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
                    <TableCell className="font-medium">{item.transactionNumber}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>{item.recipient}</TableCell>
                    <TableCell className="max-w-xs truncate" title={item.subject}>{item.subject}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'معتمد' ? 'default' : item.status === 'مرسل' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.approvedBy}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="ghost" title="عرض">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="تحرير">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="طباعة">
                          <Printer className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="توقيع رقمي">
                          <Signature className="h-4 w-4" />
                        </Button>
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
                    <div>
                      <Label htmlFor="memoTitle">عنوان المذكرة *</Label>
                      <Input id="memoTitle" placeholder="عنوان المذكرة" />
                    </div>
                    <div>
                      <Label htmlFor="memoTransaction">رقم المعاملة التلقائي</Label>
                      <Input id="memoTransaction" value={generateTransactionNumber('MEMO')} disabled />
                    </div>
                    <div>
                      <Label htmlFor="memoPriority">الأولوية</Label>
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
                    </div>
                    <div>
                      <Label htmlFor="targetDepartment">القسم المستهدف</Label>
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
                    </div>
                    <div>
                      <Label htmlFor="memoType">نوع المذكرة</Label>
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
                    </div>
                    <div>
                      <Label htmlFor="effectiveDate">تاريخ السريان</Label>
                      <Input id="effectiveDate" type="date" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="memoContent">محتوى المذكرة</Label>
                      <Textarea id="memoContent" placeholder="محتوى المذكرة..." rows={6} />
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
                    <TableCell className="font-medium">{item.transactionNumber}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell className="max-w-xs truncate" title={item.title}>{item.title}</TableCell>
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
                        <Button size="sm" variant="ghost" title="عرض">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="تحرير">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="إشعار">
                          <Bell className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost" title="AI تحليل">
                          <Sparkles className="h-4 w-4" />
                        </Button>
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
                  placeholder="البحث في الأرشيف بالكلمات المفتاحية أو رقم المعاملة..."
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
                <SelectItem value="incoming">واردة</SelectItem>
                <SelectItem value="outgoing">صادرة</SelectItem>
                <SelectItem value="memos">مذكرات داخلية</SelectItem>
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
                      <h3 className="font-medium text-sm">IN-2023-0245</h3>
                      <p className="text-xs text-muted-foreground">2023-12-31</p>
                    </div>
                  </div>
                  <Badge variant="outline">واردة</Badge>
                </div>
                <p className="text-sm mb-3">مراسلات وزارة العمل والتنمية الاجتماعية</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                  </div>
                  <Button size="sm" variant="ghost"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Send className="h-8 w-8 text-green-600" />
                    <div>
                      <h3 className="font-medium text-sm">OUT-2023-0156</h3>
                      <p className="text-xs text-muted-foreground">2023-12-28</p>
                    </div>
                  </div>
                  <Badge variant="outline">صادرة</Badge>
                </div>
                <p className="text-sm mb-3">طلب شهادة إتمام المشروع</p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                    <Button size="sm" variant="ghost"><Download className="h-4 w-4" /></Button>
                  </div>
                  <Button size="sm" variant="ghost"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-8 w-8 text-blue-600" />
                    <div>
                      <h3 className="font-medium text-sm">MEMO-2023-0089</h3>
                      <p className="text-xs text-muted-foreground">2023-12-25</p>
                    </div>
                  </div>
                  <Badge variant="outline">مذكرة</Badge>
                </div>
                <p className="text-sm mb-3">سياسة العمل من المنزل المحدثة</p>
                <div className="flex justify-between items-center">
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
                    <p className="text-sm text-muted-foreground">سجل كامل للمراسلات الواردة</p>
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
                    <p className="text-sm text-muted-foreground">إحصائيات الإرسال والموافقات</p>
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
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <FileText className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">تقرير المذكرات الداخلية</h3>
                    <p className="text-sm text-muted-foreground">إحصائيات القراءة والتفاعل</p>
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
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">تقرير أوقات الاستجابة</h3>
                    <p className="text-sm text-muted-foreground">تحليل فترات الرد والمعالجة</p>
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
                  <div className="p-2 bg-teal-100 rounded-lg">
                    <Activity className="h-6 w-6 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">تقرير الأداء الشامل</h3>
                    <p className="text-sm text-muted-foreground">مؤشرات الأداء العامة</p>
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
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Sparkles className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">تقرير تحليلات AI</h3>
                    <p className="text-sm text-muted-foreground">تصنيفات وتوصيات ذكية</p>
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
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">موظفو الشئون القانونية</span>
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
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">المدير المالي</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium mb-4">قوالب المراسلات</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <span className="font-medium">قالب المراسلات الرسمية</span>
                  <p className="text-sm text-muted-foreground">قالب للمراسلات الحكومية والرسمية</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                  <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <span className="font-medium">قالب الطلبات</span>
                  <p className="text-sm text-muted-foreground">قالب لطلبات الخدمات والشهادات</p>
                </div>
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

          <Separator />

          <div>
            <h3 className="font-medium mb-4">إعدادات سير العمل</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">تفعيل الموافقة التلقائية</span>
                  <p className="text-sm text-muted-foreground">للمراسلات ذات الأولوية المنخفضة</p>
                </div>
                <input type="checkbox" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">إشعارات البريد الإلكتروني</span>
                  <p className="text-sm text-muted-foreground">للمراسلات الجديدة والمعلقة</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium">الأرشفة التلقائية</span>
                  <p className="text-sm text-muted-foreground">أرشفة المراسلات المكتملة بعد 30 يوم</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
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
          <p className="text-muted-foreground">إدارة شاملة للمراسلات والاتصالات الإدارية مع تقنيات الذكاء الاصطناعي</p>
        </div>
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          العودة
        </Button>
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
      </Tabs>
    </div>
  );
};