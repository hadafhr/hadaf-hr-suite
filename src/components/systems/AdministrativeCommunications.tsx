import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  ArrowLeft, FileText, Send, Plus, Settings, BarChart3, Eye, Edit, Trash2, 
  Download, Upload, Printer, Search, Filter, Calendar, Clock, Bell,
  User, Briefcase, MapPin, Calendar as CalendarIcon, ThumbsUp, Percent, TrendingDown,
  Code, Heart, Lightbulb, Shield, Zap as ZapIcon, Cpu, Palette, Globe, BarChart, Route,
  GitBranch, Layers, Network, Compass, Map, ArrowUp, ArrowRight, ChevronRight, Trophy, Medal,
  Crosshair, Focus, Radar, Telescope, Binoculars, Gem, Diamond, Rocket, PlayCircle, Save,
  Mail, MailOpen, Archive, Clock4, CheckCircle, XCircle, AlertCircle, Users, 
  Building, Phone, MessageSquare, Stamp, Key, Lock, Folder, FolderOpen, 
  Paperclip, Hash, Tag, BookOpen, FileCheck, UserCheck, UserX
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar, LineChart, Line } from 'recharts';
import { toast } from "sonner";

interface AdministrativeCommunicationsProps {
  onBack?: () => void;
}

interface Correspondence {
  id: string;
  type: 'incoming' | 'outgoing' | 'internal';
  subject: string;
  sender: string;
  recipient: string;
  date: string;
  status: 'new' | 'in_progress' | 'completed' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  attachments: number;
  assignee?: string;
  responseTime?: number;
  content?: string;
  reference?: string;
}

interface Template {
  id: string;
  name: string;
  type: 'letter' | 'memo' | 'notice';
  category: string;
  content: string;
  isActive: boolean;
  usage: number;
}

export const AdministrativeCommunications: React.FC<AdministrativeCommunicationsProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isTemplateDialogOpen, setIsTemplateDialogOpen] = useState(false);
  const [selectedCorrespondence, setSelectedCorrespondence] = useState<Correspondence | null>(null);

  // Mock data for correspondence
  const correspondences: Correspondence[] = [
    {
      id: "1",
      type: "incoming",
      subject: "طلب معلومات حول الموظفين",
      sender: "وزارة الموارد البشرية",
      recipient: "إدارة الموارد البشرية",
      date: "2024-01-15",
      status: "in_progress",
      priority: "high",
      category: "رسمي",
      attachments: 2,
      assignee: "أحمد محمد",
      responseTime: 48,
      reference: "MIN-2024-001"
    },
    {
      id: "2", 
      type: "outgoing",
      subject: "رد على استفسارات الأداء",
      sender: "إدارة الموارد البشرية",
      recipient: "المدير العام",
      date: "2024-01-14",
      status: "completed",
      priority: "medium",
      category: "داخلي",
      attachments: 1,
      responseTime: 24,
      reference: "HR-OUT-2024-001"
    },
    {
      id: "3",
      type: "internal",
      subject: "مذكرة حول تحديث السياسات",
      sender: "إدارة الموارد البشرية",
      recipient: "جميع الأقسام",
      date: "2024-01-13",
      status: "completed",
      priority: "medium",
      category: "مذكرة",
      attachments: 0,
      responseTime: 12,
      reference: "MEMO-2024-001"
    }
  ];

  // Mock data for templates
  const templates: Template[] = [
    {
      id: "1",
      name: "قالب الرسائل الرسمية",
      type: "letter",
      category: "رسمي",
      content: "نموذج للرسائل الحكومية",
      isActive: true,
      usage: 45
    },
    {
      id: "2",
      name: "قالب المذكرات الداخلية",
      type: "memo",
      category: "داخلي",
      content: "نموذج للمذكرات بين الأقسام",
      isActive: true,
      usage: 32
    }
  ];

  // Mock analytics data
  const dashboardMetrics = [
    { name: 'يناير', incoming: 45, outgoing: 32, internal: 28 },
    { name: 'فبراير', incoming: 52, outgoing: 28, internal: 35 },
    { name: 'مارس', incoming: 38, outgoing: 45, internal: 30 },
    { name: 'أبريل', incoming: 63, outgoing: 38, internal: 42 },
    { name: 'مايو', incoming: 48, outgoing: 52, internal: 38 },
    { name: 'يونيو', incoming: 55, outgoing: 35, internal: 45 }
  ];

  const statusDistribution = [
    { name: 'جديد', value: 25, color: '#3b82f6' },
    { name: 'قيد المراجعة', value: 35, color: '#f59e0b' },
    { name: 'مكتمل', value: 30, color: '#10b981' },
    { name: 'مؤرشف', value: 10, color: '#6b7280' }
  ];

  const priorityStats = [
    { priority: 'عاجل', count: 8, color: '#ef4444' },
    { priority: 'عالي', count: 15, color: '#f59e0b' },
    { priority: 'متوسط', count: 25, color: '#3b82f6' },
    { priority: 'منخفض', count: 12, color: '#10b981' }
  ];

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'archived': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'جديد';
      case 'in_progress': return 'قيد المراجعة';
      case 'completed': return 'مكتمل';
      case 'archived': return 'مؤرشف';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'عاجل';
      case 'high': return 'عالي';
      case 'medium': return 'متوسط';
      case 'low': return 'منخفض';
      default: return priority;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'incoming': return <Mail className="h-4 w-4" />;
      case 'outgoing': return <Send className="h-4 w-4" />;
      case 'internal': return <MessageSquare className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  // Action handlers
  const handleExportExcel = () => {
    toast.success("تم تصدير البيانات إلى Excel بنجاح");
  };

  const handleExportPDF = () => {
    toast.success("تم تصدير التقرير إلى PDF بنجاح");
  };

  const handlePrint = () => {
    toast.success("تم إرسال الصفحة للطباعة");
  };

  const handleAddCorrespondence = () => {
    setIsAddDialogOpen(true);
  };

  const handleEditCorrespondence = (correspondence: Correspondence) => {
    setSelectedCorrespondence(correspondence);
    setIsEditDialogOpen(true);
  };

  const handleDeleteCorrespondence = (id: string) => {
    toast.success("تم حذف المراسلة بنجاح");
  };

  const handleViewCorrespondence = (correspondence: Correspondence) => {
    setSelectedCorrespondence(correspondence);
    toast.info("فتح المراسلة للمعاينة");
  };

  const handleArchiveCorrespondence = (id: string) => {
    toast.success("تم أرشفة المراسلة بنجاح");
  };

  const handleUploadDocument = () => {
    toast.success("تم رفع المستند بنجاح");
  };

  const handleDownloadTemplate = (template: Template) => {
    toast.success(`تم تحميل قالب: ${template.name}`);
  };

  // Header component
  const renderHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-br from-background via-muted/50 to-background border-b border-border/40">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--primary)) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, hsl(var(--primary)) 0%, transparent 50%),
                           radial-gradient(circle at 40% 80%, hsl(var(--primary)) 0%, transparent 50%)`,
          backgroundSize: '500px 500px, 400px 400px, 300px 300px',
          animation: 'float 20s ease-in-out infinite'
        }} />
      </div>
      
      <div className="relative px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" onClick={onBack} className="hover:bg-muted/50 transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">المراسلات الإدارية</h1>
                <p className="text-muted-foreground mt-1">إدارة المراسلات الواردة والصادرة والمذكرات الداخلية</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleExportExcel} className="hover:bg-muted/50 transition-colors">
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
            <Button variant="outline" onClick={handleExportPDF} className="hover:bg-muted/50 transition-colors">
              <FileText className="h-4 w-4 ml-2" />
              تصدير PDF  
            </Button>
            <Button variant="outline" onClick={handlePrint} className="hover:bg-muted/50 transition-colors">
              <Printer className="h-4 w-4 ml-2" />
              طباعة
            </Button>
            <Button onClick={handleAddCorrespondence} className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors">
              <Plus className="h-4 w-4 ml-2" />
              إضافة مراسلة
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-l-4 border-l-blue-500 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">المراسلات الواردة</p>
                  <p className="text-3xl font-bold text-foreground">156</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <ArrowUp className="h-3 w-3" />
                    +12% من الشهر الماضي
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-green-500 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">المراسلات الصادرة</p>
                  <p className="text-3xl font-bold text-foreground">89</p>
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <ArrowUp className="h-3 w-3" />
                    +8% من الشهر الماضي
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Send className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">متوسط وقت الرد</p>
                  <p className="text-3xl font-bold text-foreground">2.5</p>
                  <p className="text-xs text-muted-foreground mt-1">يوم</p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">المراسلات المعلقة</p>
                  <p className="text-3xl font-bold text-foreground">23</p>
                  <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                    <AlertCircle className="h-3 w-3" />
                    يتطلب متابعة
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Clock4 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  // Dashboard tab content
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              إحصائيات المراسلات الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardMetrics}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis 
                    dataKey="name" 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="incoming" 
                    stackId="1" 
                    stroke="hsl(var(--primary))" 
                    fill="hsl(var(--primary))" 
                    fillOpacity={0.8}
                    name="واردة"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="outgoing" 
                    stackId="1" 
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.8}
                    name="صادرة"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="internal" 
                    stackId="1" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.8}
                    name="داخلية"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              توزيع حالات المراسلات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={40}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Priority Stats and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-primary" />
              إحصائيات الأولوية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {priorityStats.map((stat, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: stat.color }}
                    />
                    <span className="text-sm font-medium">{stat.priority}</span>
                  </div>
                  <Badge variant="secondary">{stat.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              النشاطات الأخيرة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {correspondences.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full">
                      {getTypeIcon(item.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.subject}</p>
                      <p className="text-xs text-muted-foreground">من: {item.sender}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusText(item.status)}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Correspondence management components
  const renderCorrespondenceList = (type?: 'incoming' | 'outgoing' | 'internal') => {
    const filteredCorrespondences = correspondences.filter(item => 
      (!type || item.type === type) &&
      (filterType === 'all' || item.status === filterType) &&
      (searchTerm === '' || 
       item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.recipient.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
      <div className="space-y-6">
        {/* Search and Filter */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="البحث في المراسلات..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                </div>
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="تصفية حسب الحالة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع الحالات</SelectItem>
                  <SelectItem value="new">جديد</SelectItem>
                  <SelectItem value="in_progress">قيد المراجعة</SelectItem>
                  <SelectItem value="completed">مكتمل</SelectItem>
                  <SelectItem value="archived">مؤرشف</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleUploadDocument} variant="outline">
                <Upload className="h-4 w-4 ml-2" />
                رفع مستند
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Correspondence Grid */}
        <div className="grid grid-cols-1 gap-4">
          {filteredCorrespondences.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="p-2 bg-muted rounded-full">
                      {getTypeIcon(item.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-foreground truncate">{item.subject}</h3>
                        <Badge className={getPriorityColor(item.priority)} variant="outline">
                          {getPriorityText(item.priority)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                        <p><strong>من:</strong> {item.sender}</p>
                        <p><strong>إلى:</strong> {item.recipient}</p>
                        <p><strong>التاريخ:</strong> {item.date}</p>
                        <p><strong>المرجع:</strong> {item.reference}</p>
                        {item.assignee && (
                          <p><strong>المسؤول:</strong> {item.assignee}</p>
                        )}
                        {item.attachments > 0 && (
                          <p className="flex items-center gap-1">
                            <Paperclip className="h-3 w-3" />
                            {item.attachments} مرفق
                          </p>
                        )}
                      </div>
                      <Badge className={getStatusColor(item.status)}>
                        {getStatusText(item.status)}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleViewCorrespondence(item)}
                      className="hover:bg-muted/50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleEditCorrespondence(item)}
                      className="hover:bg-muted/50"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleArchiveCorrespondence(item.id)}
                      className="hover:bg-muted/50"
                    >
                      <Archive className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDeleteCorrespondence(item.id)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  };

  // Templates management
  const renderTemplates = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>قوالب المراسلات</CardTitle>
            <Button onClick={() => setIsTemplateDialogOpen(true)}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة قالب
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <Card key={template.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{template.name}</h3>
                    </div>
                    <Badge variant={template.isActive ? "default" : "secondary"}>
                      {template.isActive ? 'نشط' : 'معطل'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{template.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      استُخدم {template.usage} مرة
                    </span>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDownloadTemplate(template)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  // Reports section
  const renderReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleExportPDF}>
          <CardContent className="p-6 text-center">
            <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تقرير المراسلات الشامل</h3>
            <p className="text-sm text-muted-foreground mb-4">تقرير شامل لجميع المراسلات حسب النوع والحالة</p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 ml-2" />
              تحميل التقرير
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleExportExcel}>
          <CardContent className="p-6 text-center">
            <BarChart className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تقرير الأداء</h3>
            <p className="text-sm text-muted-foreground mb-4">إحصائيات أوقات الرد ومعدلات الإنجاز</p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleExportPDF}>
          <CardContent className="p-6 text-center">
            <Archive className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تقرير الأرشيف</h3>
            <p className="text-sm text-muted-foreground mb-4">المراسلات المؤرشفة والمحفوظة</p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 ml-2" />
              تحميل التقرير
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Settings section
  const renderSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              صلاحيات المستخدمين
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">إنشاء المراسلات</p>
                  <p className="text-sm text-muted-foreground">من يمكنه إنشاء مراسلات جديدة</p>
                </div>
                <Select defaultValue="hr_admin">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">الجميع</SelectItem>
                    <SelectItem value="hr_admin">إدارة الموارد البشرية</SelectItem>
                    <SelectItem value="admin_only">المديرين فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">اعتماد المراسلات</p>
                  <p className="text-sm text-muted-foreground">من يمكنه اعتماد المراسلات الصادرة</p>
                </div>
                <Select defaultValue="managers">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="managers">المديرين</SelectItem>
                    <SelectItem value="hr_head">رئيس الموارد البشرية</SelectItem>
                    <SelectItem value="ceo">المدير العام</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">أرشفة المراسلات</p>
                  <p className="text-sm text-muted-foreground">من يمكنه أرشفة المراسلات</p>
                </div>
                <Select defaultValue="hr_admin">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hr_admin">إدارة الموارد البشرية</SelectItem>
                    <SelectItem value="admin_only">المديرين فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              إعدادات النظام
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">التوقيع الرقمي</p>
                  <p className="text-sm text-muted-foreground">تفعيل التوقيع الرقمي للمراسلات</p>
                </div>
                <Button variant="outline" size="sm">
                  <Stamp className="h-4 w-4 ml-2" />
                  تكوين
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">قوالب المراسلات</p>
                  <p className="text-sm text-muted-foreground">إدارة قوالب الرسائل والمذكرات</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setIsTemplateDialogOpen(true)}>
                  <FileText className="h-4 w-4 ml-2" />
                  إدارة
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">الإشعارات</p>
                  <p className="text-sm text-muted-foreground">إعدادات إشعارات المراسلات الجديدة</p>
                </div>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 ml-2" />
                  تكوين
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">النسخ الاحتياطي</p>
                  <p className="text-sm text-muted-foreground">إعدادات النسخ الاحتياطي للمراسلات</p>
                </div>
                <Button variant="outline" size="sm">
                  <Archive className="h-4 w-4 ml-2" />
                  تكوين
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="container mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="incoming" className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              المراسلات الواردة
            </TabsTrigger>
            <TabsTrigger value="outgoing" className="flex items-center gap-2">
              <Send className="h-4 w-4" />
              المراسلات الصادرة
            </TabsTrigger>
            <TabsTrigger value="internal" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              المذكرات الداخلية
            </TabsTrigger>
            <TabsTrigger value="archive" className="flex items-center gap-2">
              <Archive className="h-4 w-4" />
              الأرشيف
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              التقارير
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              الإعدادات
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="mt-6">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="incoming" className="mt-6">
            {renderCorrespondenceList('incoming')}
          </TabsContent>

          <TabsContent value="outgoing" className="mt-6">
            {renderCorrespondenceList('outgoing')}
          </TabsContent>

          <TabsContent value="internal" className="mt-6">
            {renderCorrespondenceList('internal')}
          </TabsContent>

          <TabsContent value="archive" className="mt-6">
            {renderCorrespondenceList()}
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            {renderReports()}
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Correspondence Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة مراسلة جديدة</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">نوع المراسلة</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="incoming">واردة</SelectItem>
                    <SelectItem value="outgoing">صادرة</SelectItem>
                    <SelectItem value="internal">داخلية</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="priority">الأولوية</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الأولوية" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">عاجل</SelectItem>
                    <SelectItem value="high">عالي</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="low">منخفض</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="subject">موضوع المراسلة</Label>
              <Input id="subject" placeholder="أدخل موضوع المراسلة" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sender">المرسل</Label>
                <Input id="sender" placeholder="اسم المرسل" />
              </div>
              <div>
                <Label htmlFor="recipient">المستقبل</Label>
                <Input id="recipient" placeholder="اسم المستقبل" />
              </div>
            </div>
            <div>
              <Label htmlFor="content">محتوى المراسلة</Label>
              <Textarea id="content" placeholder="اكتب محتوى المراسلة هنا" rows={4} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => {
                setIsAddDialogOpen(false);
                toast.success("تم إضافة المراسلة بنجاح");
              }}>
                حفظ المراسلة
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Template Dialog */}
      <Dialog open={isTemplateDialogOpen} onOpenChange={setIsTemplateDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>إضافة قالب جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="templateName">اسم القالب</Label>
                <Input id="templateName" placeholder="أدخل اسم القالب" />
              </div>
              <div>
                <Label htmlFor="templateType">نوع القالب</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="letter">رسالة</SelectItem>
                    <SelectItem value="memo">مذكرة</SelectItem>
                    <SelectItem value="notice">إشعار</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="templateContent">محتوى القالب</Label>
              <Textarea id="templateContent" placeholder="اكتب محتوى القالب هنا" rows={6} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsTemplateDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => {
                setIsTemplateDialogOpen(false);
                toast.success("تم إضافة القالب بنجاح");
              }}>
                حفظ القالب
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};