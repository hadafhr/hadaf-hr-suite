import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Mail,
  FileText,
  Send,
  Inbox,
  Archive,
  Search,
  Plus,
  Eye,
  Edit,
  Download,
  Upload,
  Clock,
  CheckCircle,
  AlertTriangle,
  Users,
  Calendar,
  BarChart3,
  Bot,
  Filter,
  Settings,
  FileUp,
  Paperclip,
  MessageSquare,
  Target,
  TrendingUp,
  Activity,
  Zap,
  Globe,
  Building,
  UserCheck,
  AlertCircle,
  ChevronRight,
  Star,
  Flag,
  ArrowLeft
} from 'lucide-react';

interface Correspondence {
  id: string;
  number: string;
  subject: string;
  type: 'outgoing' | 'incoming' | 'internal';
  status: 'draft' | 'pending' | 'approved' | 'sent' | 'received' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  sender: string;
  recipient: string;
  department: string;
  date: string;
  dueDate?: string;
  attachments: number;
  approvals: Array<{
    stage: string;
    approver: string;
    status: 'pending' | 'approved' | 'rejected';
    date?: string;
    notes?: string;
  }>;
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  status: 'scheduled' | 'completed' | 'cancelled';
  minutesUploaded: boolean;
}

interface AdministrativeCommunicationsProps {
  onBack?: () => void;
}

export const AdministrativeCommunications: React.FC<AdministrativeCommunicationsProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [isNewCorrespondenceOpen, setIsNewCorrespondenceOpen] = useState(false);
  const [selectedCorrespondence, setSelectedCorrespondence] = useState<Correspondence | null>(null);

  // Mock data
  const correspondences: Correspondence[] = [
    {
      id: '1',
      number: 'OUT-2024-001',
      subject: 'طلب موافقة على برنامج تدريبي',
      type: 'outgoing',
      status: 'approved',
      priority: 'high',
      sender: 'إدارة التدريب',
      recipient: 'الإدارة العامة',
      department: 'التدريب والتطوير',
      date: '2024-01-15',
      dueDate: '2024-01-20',
      attachments: 3,
      approvals: [
        { stage: 'مدير القسم', approver: 'أحمد محمد', status: 'approved', date: '2024-01-15' },
        { stage: 'مدير الاتصالات', approver: 'سارة أحمد', status: 'approved', date: '2024-01-16' },
        { stage: 'المدير العام', approver: 'محمد علي', status: 'pending' }
      ]
    },
    {
      id: '2',
      number: 'IN-2024-045',
      subject: 'استفسار حول اللوائح الجديدة',
      type: 'incoming',
      status: 'in-progress',
      priority: 'medium',
      sender: 'الموارد البشرية الخارجية',
      recipient: 'إدارة الشؤون القانونية',
      department: 'الشؤون القانونية',
      date: '2024-01-14',
      dueDate: '2024-01-19',
      attachments: 1,
      approvals: [
        { stage: 'قسم الاتصالات', approver: 'فاطمة سالم', status: 'approved', date: '2024-01-14' },
        { stage: 'الإدارة المختصة', approver: 'خالد أحمد', status: 'pending' }
      ]
    },
    {
      id: '3',
      number: 'INT-2024-012',
      subject: 'تعميم بخصوص إجراءات الأمان الجديدة',
      type: 'internal',
      status: 'sent',
      priority: 'urgent',
      sender: 'إدارة الأمن',
      recipient: 'جميع الموظفين',
      department: 'الأمن والسلامة',
      date: '2024-01-13',
      attachments: 2,
      approvals: [
        { stage: 'مسؤول الاتصالات', approver: 'نورا خالد', status: 'approved', date: '2024-01-13' },
        { stage: 'مدير الموارد البشرية', approver: 'عبدالله محمد', status: 'approved', date: '2024-01-13' }
      ]
    }
  ];

  const meetings: Meeting[] = [
    {
      id: '1',
      title: 'اجتماع مجلس الإدارة الشهري',
      date: '2024-01-15',
      time: '10:00',
      attendees: 12,
      status: 'completed',
      minutesUploaded: true
    },
    {
      id: '2',
      title: 'اجتماع لجنة التدريب',
      date: '2024-01-16',
      time: '14:00',
      attendees: 8,
      status: 'scheduled',
      minutesUploaded: false
    }
  ];

  const stats = {
    totalCorrespondences: 156,
    outgoing: 89,
    incoming: 45,
    internal: 22,
    pending: 23,
    completed: 133,
    avgProcessingTime: 3.2,
    completionRate: 85
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'draft': 'bg-gray-100 text-gray-800',
      'pending': 'bg-yellow-100 text-yellow-800',
      'approved': 'bg-blue-100 text-blue-800',
      'sent': 'bg-green-100 text-green-800',
      'received': 'bg-blue-100 text-blue-800',
      'in-progress': 'bg-orange-100 text-orange-800',
      'completed': 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'low': 'text-green-600',
      'medium': 'text-yellow-600',
      'high': 'text-orange-600',
      'urgent': 'text-red-600'
    };
    return colors[priority as keyof typeof colors] || 'text-gray-600';
  };

  const handleCreateNew = () => {
    setIsNewCorrespondenceOpen(true);
    toast({
      title: "إنشاء مراسلة جديدة",
      description: "فتح نموذج إنشاء المراسلة..."
    });
  };

  const handleViewCorrespondence = (correspondence: Correspondence) => {
    setSelectedCorrespondence(correspondence);
    toast({
      title: "عرض المراسلة",
      description: `عرض تفاصيل المراسلة: ${correspondence.number}`
    });
  };

  const handleAIAssist = () => {
    toast({
      title: "مساعد الذكاء الاصطناعي",
      description: "جاري تحليل النص واقتراح التحسينات..."
    });
  };

  const handleArchive = () => {
    toast({
      title: "تم الأرشفة",
      description: "تم أرشفة المراسلة بنجاح"
    });
  };

  const handleExport = () => {
    toast({
      title: "تصدير التقرير",
      description: "جاري تصدير التقرير..."
    });
  };

  const handleSendCorrespondence = () => {
    toast({
      title: "إرسال المراسلة",
      description: "تم إرسال المراسلة للموافقة بنجاح"
    });
  };

  const handleUploadMinutes = () => {
    toast({
      title: "رفع المحضر",
      description: "تم رفع محضر الاجتماع بنجاح"
    });
  };

  // Dashboard Tab
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">إجمالي المراسلات</p>
                <p className="text-2xl font-bold text-[#009F87]">{stats.totalCorrespondences}</p>
                <p className="text-xs text-green-600 mt-1">+12% من الشهر الماضي</p>
              </div>
              <Mail className="h-8 w-8 text-[#009F87]" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">قيد المعالجة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.pending}</p>
                <p className="text-xs text-orange-600 mt-1">يحتاج متابعة</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">نسبة الإنجاز</p>
                <p className="text-2xl font-bold text-green-600">{stats.completionRate}%</p>
                <Progress value={stats.completionRate} className="mt-2 h-2" />
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">متوسط زمن المعالجة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.avgProcessingTime} أيام</p>
                <p className="text-xs text-blue-600 mt-1">تحسن بـ 15%</p>
              </div>
              <Activity className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              توزيع المراسلات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-[#009F87] rounded-full"></div>
                  <span>صادرة</span>
                </div>
                <span className="font-medium">{stats.outgoing}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>واردة</span>
                </div>
                <span className="font-medium">{stats.incoming}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span>داخلية</span>
                </div>
                <span className="font-medium">{stats.internal}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              الأداء الشهري
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-[#009F87] mb-2">95%</div>
                <p className="text-sm text-muted-foreground">معدل الاستجابة في الوقت المحدد</p>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span>مراسلات عاجلة</span>
                <span className="font-medium text-red-600">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>متأخرة عن الموعد</span>
                <span className="font-medium text-orange-600">3</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            النشاطات الأخيرة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {correspondences.slice(0, 5).map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => handleViewCorrespondence(item)}>
                <div className="p-2 rounded-full bg-[#009F87]/10">
                  <Mail className="h-4 w-4 text-[#009F87]" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{item.subject}</p>
                  <p className="text-sm text-muted-foreground">{item.sender} • {item.date}</p>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {item.status === 'approved' ? 'معتمد' :
                   item.status === 'pending' ? 'معلق' :
                   item.status === 'in-progress' ? 'قيد المعالجة' :
                   item.status === 'sent' ? 'مُرسل' : item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Outgoing Correspondences Tab
  const renderOutgoing = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">المراسلات الصادرة</h2>
        <Button onClick={handleCreateNew} className="bg-[#009F87] hover:bg-[#009F87]/90">
          <Plus className="h-4 w-4 ml-2" />
          إنشاء مراسلة جديدة
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <Input
                placeholder="البحث في المراسلات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Button variant="outline" size="icon" onClick={handleAIAssist}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="نوع المراسلة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="outgoing">صادرة</SelectItem>
                  <SelectItem value="incoming">واردة</SelectItem>
                  <SelectItem value="internal">داخلية</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={handleExport}>
                <Download className="h-4 w-4 ml-2" />
                تصدير
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الرقم</TableHead>
                <TableHead>الموضوع</TableHead>
                <TableHead>المرسل إليه</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الأولوية</TableHead>
                <TableHead>المرفقات</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {correspondences.filter(c => c.type === 'outgoing').map((correspondence) => (
                <TableRow key={correspondence.id}>
                  <TableCell className="font-medium">{correspondence.number}</TableCell>
                  <TableCell>{correspondence.subject}</TableCell>
                  <TableCell>{correspondence.recipient}</TableCell>
                  <TableCell>{correspondence.date}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(correspondence.status)}>
                      {correspondence.status === 'approved' ? 'معتمد' :
                       correspondence.status === 'pending' ? 'معلق' :
                       correspondence.status === 'sent' ? 'مُرسل' : correspondence.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Flag className={`h-4 w-4 ${getPriorityColor(correspondence.priority)}`} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Paperclip className="h-4 w-4" />
                      {correspondence.attachments}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewCorrespondence(correspondence)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toast({ title: "تعديل", description: "فتح محرر المراسلة..." })}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={handleArchive}>
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Incoming Correspondences Tab
  const renderIncoming = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">المراسلات الواردة</h2>
        <Button className="bg-[#009F87] hover:bg-[#009F87]/90" onClick={() => toast({ title: "تسجيل مراسلة", description: "فتح نموذج التسجيل..." })}>
          <Upload className="h-4 w-4 ml-2" />
          تسجيل مراسلة واردة
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الرقم</TableHead>
                <TableHead>الموضوع</TableHead>
                <TableHead>المرسل</TableHead>
                <TableHead>الإدارة المعنية</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>موعد الرد</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {correspondences.filter(c => c.type === 'incoming').map((correspondence) => (
                <TableRow key={correspondence.id}>
                  <TableCell className="font-medium">{correspondence.number}</TableCell>
                  <TableCell>{correspondence.subject}</TableCell>
                  <TableCell>{correspondence.sender}</TableCell>
                  <TableCell>{correspondence.department}</TableCell>
                  <TableCell>{correspondence.date}</TableCell>
                  <TableCell className="text-orange-600">{correspondence.dueDate}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(correspondence.status)}>
                      {correspondence.status === 'in-progress' ? 'قيد المعالجة' :
                       correspondence.status === 'completed' ? 'مكتمل' : correspondence.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewCorrespondence(correspondence)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => toast({ title: "تعيين مسؤول", description: "تم تعيين مسؤول المتابعة" })}>
                        <UserCheck className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );

  // Archive Tab
  const renderArchive = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">الأرشيف الإلكتروني</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast({ title: "تصفية متقدمة", description: "فتح خيارات التصفية..." })}>
            <Filter className="h-4 w-4 ml-2" />
            تصفية متقدمة
          </Button>
          <Button variant="outline" onClick={handleAIAssist}>
            <Bot className="h-4 w-4 ml-2" />
            البحث الذكي
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex gap-4">
            <Input
              placeholder="البحث الذكي في الأرشيف..."
              className="flex-1"
            />
            <Button className="bg-[#009F87] hover:bg-[#009F87]/90" onClick={handleAIAssist}>
              <Search className="h-4 w-4 ml-2" />
              بحث متقدم
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Archive className="h-8 w-8 text-[#009F87]" />
                <div>
                  <p className="text-2xl font-bold">1,245</p>
                  <p className="text-sm text-muted-foreground">مراسلة مؤرشفة</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">3.2 GB</p>
                  <p className="text-sm text-muted-foreground">حجم الأرشيف</p>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Zap className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">&lt; 1 ثانية</p>
                  <p className="text-sm text-muted-foreground">سرعة البحث</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-4">
            {correspondences.map((correspondence) => (
              <Card key={correspondence.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleViewCorrespondence(correspondence)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-full bg-[#009F87]/10">
                      <FileText className="h-5 w-5 text-[#009F87]" />
                    </div>
                    <div>
                      <h3 className="font-medium">{correspondence.subject}</h3>
                      <p className="text-sm text-muted-foreground">
                        {correspondence.number} • {correspondence.date} • {correspondence.sender}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{correspondence.type === 'outgoing' ? 'صادرة' : correspondence.type === 'incoming' ? 'واردة' : 'داخلية'}</Badge>
                    <Button variant="ghost" size="sm" onClick={() => toast({ title: "تحميل", description: "جاري تحميل المراسلة..." })}>
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Meetings Tab
  const renderMeetings = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">إدارة الاجتماعات</h2>
        <Button className="bg-[#009F87] hover:bg-[#009F87]/90" onClick={() => toast({ title: "اجتماع جديد", description: "فتح نموذج إضافة الاجتماع..." })}>
          <Plus className="h-4 w-4 ml-2" />
          إضافة اجتماع جديد
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>الاجتماعات القادمة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meetings.map((meeting) => (
                <div key={meeting.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-[#009F87]" />
                    <div>
                      <h3 className="font-medium">{meeting.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {meeting.date} • {meeting.time} • {meeting.attendees} مشارك
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={meeting.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                      {meeting.status === 'completed' ? 'مكتمل' : 'مجدول'}
                    </Badge>
                    {meeting.minutesUploaded && (
                      <Badge variant="outline">
                        <FileText className="h-3 w-3 ml-1" />
                        محضر
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>رفع محاضر الاجتماعات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#009F87] transition-colors">
              <FileUp className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-sm text-muted-foreground mb-4">اسحب وأفلت ملف المحضر أو</p>
              <Button variant="outline" onClick={() => toast({ title: "اختيار ملف", description: "فتح مستعرض الملفات..." })}>
                اختر ملف
              </Button>
            </div>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="اختر الاجتماع" />
              </SelectTrigger>
              <SelectContent>
                {meetings.map((meeting) => (
                  <SelectItem key={meeting.id} value={meeting.id}>
                    {meeting.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button className="w-full bg-[#009F87] hover:bg-[#009F87]/90" onClick={handleUploadMinutes}>
              رفع المحضر
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // AI Assistant Tab
  const renderAI = () => (
    <div className="space-y-6">
      <Card className="border-l-4 border-l-[#009F87]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-6 w-6 text-[#009F87]" />
            مساعد الذكاء الاصطناعي للاتصالات الإدارية
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={handleAIAssist}>
              <div className="text-center space-y-2">
                <FileText className="h-8 w-8 mx-auto text-[#009F87]" />
                <h3 className="font-medium">صياغة تلقائية</h3>
                <p className="text-sm text-muted-foreground">اقتراح صياغة الخطابات الرسمية</p>
              </div>
            </Card>
            
            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={handleAIAssist}>
              <div className="text-center space-y-2">
                <Target className="h-8 w-8 mx-auto text-blue-600" />
                <h3 className="font-medium">تصنيف ذكي</h3>
                <p className="text-sm text-muted-foreground">تحليل وتصنيف المحتوى تلقائياً</p>
              </div>
            </Card>

            <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={handleAIAssist}>
              <div className="text-center space-y-2">
                <AlertCircle className="h-8 w-8 mx-auto text-orange-600" />
                <h3 className="font-medium">تنبيهات ذكية</h3>
                <p className="text-sm text-muted-foreground">تنبيهات المتابعة والمواعيد</p>
              </div>
            </Card>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">المساعد التفاعلي</h3>
            <div className="bg-gray-50 rounded-lg p-4 min-h-[300px]">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-[#009F87] text-white">AI</AvatarFallback>
                  </Avatar>
                  <div className="bg-white p-3 rounded-lg shadow-sm flex-1">
                    <p>مرحباً! كيف يمكنني مساعدتك في إدارة الاتصالات الإدارية اليوم؟</p>
                    <p className="text-sm text-muted-foreground mt-2">يمكنني مساعدتك في:</p>
                    <ul className="text-sm text-muted-foreground mt-1 list-disc list-inside">
                      <li>صياغة الخطابات الرسمية</li>
                      <li>تصنيف المراسلات</li>
                      <li>البحث في الأرشيف</li>
                      <li>إنشاء التقارير</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Input placeholder="اكتب سؤالك هنا..." className="flex-1" />
              <Button className="bg-[#009F87] hover:bg-[#009F87]/90" onClick={handleAIAssist}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#009F87]/5 via-background to-[#009F87]/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={onBack}
            className="hover:bg-[#009F87]/10 border-[#009F87]/20"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#009F87]/10 rounded-lg">
              <MessageSquare className="h-8 w-8 text-[#009F87]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[#009F87]">نظام الاتصالات الإدارية</h1>
              <p className="text-muted-foreground">إدارة شاملة للمراسلات والاتصالات مع الذكاء الاصطناعي</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => toast({ title: "الإعدادات", description: "فتح إعدادات النظام..." })}>
            <Settings className="h-4 w-4 ml-2" />
            الإعدادات
          </Button>
          <Button className="bg-[#009F87] hover:bg-[#009F87]/90" onClick={handleAIAssist}>
            <Bot className="h-4 w-4 ml-2" />
            مساعد AI
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6 mb-8">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            لوحة التحكم
          </TabsTrigger>
          <TabsTrigger value="outgoing" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            صادرة
          </TabsTrigger>
          <TabsTrigger value="incoming" className="flex items-center gap-2">
            <Inbox className="h-4 w-4" />
            واردة
          </TabsTrigger>
          <TabsTrigger value="archive" className="flex items-center gap-2">
            <Archive className="h-4 w-4" />
            الأرشيف
          </TabsTrigger>
          <TabsTrigger value="meetings" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            الاجتماعات
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            الذكاء الاصطناعي
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">{renderDashboard()}</TabsContent>
        <TabsContent value="outgoing">{renderOutgoing()}</TabsContent>
        <TabsContent value="incoming">{renderIncoming()}</TabsContent>
        <TabsContent value="archive">{renderArchive()}</TabsContent>
        <TabsContent value="meetings">{renderMeetings()}</TabsContent>
        <TabsContent value="ai">{renderAI()}</TabsContent>
      </Tabs>

      {/* New Correspondence Dialog */}
      <Dialog open={isNewCorrespondenceOpen} onOpenChange={setIsNewCorrespondenceOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>إنشاء مراسلة جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">نوع المراسلة</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outgoing">صادرة</SelectItem>
                    <SelectItem value="internal">داخلية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">الأولوية</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفضة</SelectItem>
                    <SelectItem value="medium">متوسطة</SelectItem>
                    <SelectItem value="high">عالية</SelectItem>
                    <SelectItem value="urgent">عاجلة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">الموضوع</label>
              <Input placeholder="أدخل موضوع المراسلة" />
            </div>
            
            <div>
              <label className="text-sm font-medium mb-2 block">المحتوى</label>
              <Textarea 
                placeholder="اكتب محتوى المراسلة هنا..."
                className="min-h-[200px]"
              />
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm" onClick={handleAIAssist}>
                  <Bot className="h-4 w-4 ml-1" />
                  مساعدة AI
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast({ title: "نموذج جاهز", description: "تحميل نموذج جاهز..." })}>
                  <FileText className="h-4 w-4 ml-1" />
                  نموذج جاهز
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">المرفقات</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-[#009F87] transition-colors">
                <Paperclip className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-muted-foreground">اسحب الملفات هنا أو</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => toast({ title: "اختيار ملفات", description: "فتح مستعرض الملفات..." })}>
                  اختر ملفات
                </Button>
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewCorrespondenceOpen(false)}>
                إلغاء
              </Button>
              <Button variant="outline" onClick={() => toast({ title: "حفظ مسودة", description: "تم حفظ المراسلة كمسودة" })}>
                حفظ كمسودة
              </Button>
              <Button className="bg-[#009F87] hover:bg-[#009F87]/90" onClick={handleSendCorrespondence}>
                إرسال للموافقة
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Correspondence Dialog */}
      {selectedCorrespondence && (
        <Dialog open={!!selectedCorrespondence} onOpenChange={() => setSelectedCorrespondence(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>تفاصيل المراسلة: {selectedCorrespondence.number}</span>
                <Badge className={getStatusColor(selectedCorrespondence.status)}>
                  {selectedCorrespondence.status === 'approved' ? 'معتمد' :
                   selectedCorrespondence.status === 'pending' ? 'معلق' :
                   selectedCorrespondence.status === 'in-progress' ? 'قيد المعالجة' : selectedCorrespondence.status}
                </Badge>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">الموضوع</label>
                  <p className="font-medium">{selectedCorrespondence.subject}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">النوع</label>
                  <p>{selectedCorrespondence.type === 'outgoing' ? 'صادرة' : selectedCorrespondence.type === 'incoming' ? 'واردة' : 'داخلية'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">المرسل</label>
                  <p>{selectedCorrespondence.sender}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">المستقبل</label>
                  <p>{selectedCorrespondence.recipient}</p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-lg font-medium mb-4">سلسلة الموافقات</h3>
                <div className="space-y-3">
                  {selectedCorrespondence.approvals.map((approval, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                      <div className="flex-shrink-0">
                        {approval.status === 'approved' ? (
                          <CheckCircle className="h-6 w-6 text-green-600" />
                        ) : approval.status === 'rejected' ? (
                          <AlertTriangle className="h-6 w-6 text-red-600" />
                        ) : (
                          <Clock className="h-6 w-6 text-orange-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">{approval.stage}</p>
                          <Badge variant="outline" className={
                            approval.status === 'approved' ? 'border-green-200 text-green-700' :
                            approval.status === 'rejected' ? 'border-red-200 text-red-700' :
                            'border-orange-200 text-orange-700'
                          }>
                            {approval.status === 'approved' ? 'معتمد' :
                             approval.status === 'rejected' ? 'مرفوض' : 'معلق'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{approval.approver}</p>
                        {approval.date && (
                          <p className="text-xs text-muted-foreground">{approval.date}</p>
                        )}
                      </div>
                      {index < selectedCorrespondence.approvals.length - 1 && (
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => toast({ title: "تحميل PDF", description: "جاري تحميل المراسلة..." })}>
                  <Download className="h-4 w-4 ml-2" />
                  تحميل PDF
                </Button>
                <Button variant="outline" onClick={() => toast({ title: "تعديل", description: "فتح محرر المراسلة..." })}>
                  <Edit className="h-4 w-4 ml-2" />
                  تعديل
                </Button>
                <Button className="bg-[#009F87] hover:bg-[#009F87]/90" onClick={handleSendCorrespondence}>
                  <Send className="h-4 w-4 ml-2" />
                  إرسال
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};