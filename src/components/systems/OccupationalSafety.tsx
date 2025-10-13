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
  AlertTriangle, Activity, Stethoscope, HardHat, BookOpen, ClipboardList, FileCheck,
  UserCheck, UserX, CheckCircle, XCircle, AlertCircle, Timer, Target,
  TrendingUp, Zap, FileImage, Camera, Mic, Video, Image, Paperclip, Flag, Users
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar, LineChart, Line } from 'recharts';
import { toast } from "sonner";

interface OccupationalSafetyProps {
  onBack?: () => void;
}

interface SafetyIncident {
  id: string;
  type: 'injury' | 'near_miss' | 'property_damage' | 'environmental';
  title: string;
  description: string;
  location: string;
  reportedBy: string;
  reportedDate: string;
  incidentDate: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'reported' | 'investigating' | 'resolved' | 'closed';
  investigator?: string;
  correctiveActions?: string[];
  attachments: number;
  daysLost?: number;
}

interface MedicalExam {
  id: string;
  employeeName: string;
  employeeId: string;
  examType: 'periodic' | 'pre_employment' | 'post_incident' | 'return_to_work';
  scheduledDate: string;
  completedDate?: string;
  status: 'scheduled' | 'completed' | 'overdue' | 'cancelled';
  results?: 'fit' | 'fit_with_restrictions' | 'unfit' | 'pending';
  restrictions?: string;
  nextExamDate?: string;
  medicalOfficer?: string;
}

interface SafetyPolicy {
  id: string;
  title: string;
  category: string;
  version: string;
  publishedDate: string;
  lastUpdated: string;
  status: 'draft' | 'published' | 'archived';
  acknowledgments: number;
  totalEmployees: number;
  fileUrl?: string;
  description: string;
}

interface RiskAssessment {
  id: string;
  hazardTitle: string;
  location: string;
  category: string;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  probability: number;
  severity: number;
  riskScore: number;
  controlMeasures: string[];
  assignedTo: string;
  targetDate: string;
  status: 'identified' | 'assessing' | 'controlling' | 'monitored';
  lastReviewed: string;
}

interface SafetyTraining {
  id: string;
  title: string;
  category: string;
  duration: number;
  mandatory: boolean;
  validityPeriod: number;
  completedCount: number;
  totalAssigned: number;
  completionRate: number;
  nextScheduled?: string;
  trainer?: string;
}

export const OccupationalSafety: React.FC<OccupationalSafetyProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isAddIncidentOpen, setIsAddIncidentOpen] = useState(false);
  const [isAddExamOpen, setIsAddExamOpen] = useState(false);
  const [isAddPolicyOpen, setIsAddPolicyOpen] = useState(false);
  const [isAddRiskOpen, setIsAddRiskOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock data for incidents
  const incidents: SafetyIncident[] = [
    {
      id: "1",
      type: "injury",
      title: "إصابة في اليد أثناء التشغيل",
      description: "إصابة طفيفة في اليد اليسرى للعامل أثناء تشغيل المعدة",
      location: "ورشة الإنتاج - الخط الثاني",
      reportedBy: "أحمد محمد",
      reportedDate: "2024-01-15",
      incidentDate: "2024-01-15",
      severity: "medium",
      status: "investigating",
      investigator: "مدير السلامة",
      attachments: 3,
      daysLost: 0
    },
    {
      id: "2",
      type: "near_miss",
      title: "كاد أن يحدث سقوط من الارتفاع",
      description: "عامل كاد أن يسقط من السقالة بسبب عدم ربط حزام الأمان",
      location: "موقع البناء - الطابق الثالث",
      reportedBy: "سارة أحمد",
      reportedDate: "2024-01-14",
      incidentDate: "2024-01-14",
      severity: "high",
      status: "resolved",
      attachments: 1,
      daysLost: 0
    },
    {
      id: "3",
      type: "property_damage",
      title: "تلف في المعدة",
      description: "تلف في معدة الرفع بسبب التحميل الزائد",
      location: "المستودع الرئيسي",
      reportedBy: "محمد علي",
      reportedDate: "2024-01-13",
      incidentDate: "2024-01-13",
      severity: "medium",
      status: "closed",
      attachments: 2,
      daysLost: 0
    }
  ];

  // Mock data for medical exams
  const medicalExams: MedicalExam[] = [
    {
      id: "1",
      employeeName: "أحمد محمد علي",
      employeeId: "EMP001",
      examType: "periodic",
      scheduledDate: "2024-01-20",
      status: "scheduled",
      nextExamDate: "2025-01-20",
      medicalOfficer: "د. فاطمة أحمد"
    },
    {
      id: "2",
      employeeName: "سارة محمد",
      employeeId: "EMP002",
      examType: "pre_employment",
      scheduledDate: "2024-01-10",
      completedDate: "2024-01-10",
      status: "completed",
      results: "fit",
      medicalOfficer: "د. محمد سالم"
    },
    {
      id: "3",
      employeeName: "محمد علي",
      employeeId: "EMP003",
      examType: "periodic",
      scheduledDate: "2024-01-05",
      status: "overdue",
      nextExamDate: "2024-02-05",
      medicalOfficer: "د. فاطمة أحمد"
    }
  ];

  // Mock data for policies
  const policies: SafetyPolicy[] = [
    {
      id: "1",
      title: "دليل السلامة العامة",
      category: "عام",
      version: "2.1",
      publishedDate: "2024-01-01",
      lastUpdated: "2024-01-10",
      status: "published",
      acknowledgments: 45,
      totalEmployees: 50,
      description: "الدليل الشامل لقواعد السلامة في مكان العمل"
    },
    {
      id: "2",
      title: "إجراءات الطوارئ",
      category: "طوارئ",
      version: "1.5",
      publishedDate: "2023-12-15",
      lastUpdated: "2024-01-05",
      status: "published",
      acknowledgments: 48,
      totalEmployees: 50,
      description: "خطة الاستجابة للطوارئ والإخلاء"
    }
  ];

  // Mock data for risk assessments
  const riskAssessments: RiskAssessment[] = [
    {
      id: "1",
      hazardTitle: "مخاطر الكهرباء",
      location: "ورشة الكهرباء",
      category: "كهربائي",
      riskLevel: "high",
      probability: 3,
      severity: 4,
      riskScore: 12,
      controlMeasures: ["فحص دوري للمعدات", "تدريب العمال", "استخدام معدات الوقاية"],
      assignedTo: "مدير الصيانة",
      targetDate: "2024-02-01",
      status: "controlling",
      lastReviewed: "2024-01-10"
    },
    {
      id: "2",
      hazardTitle: "مخاطر الحريق",
      location: "المستودع",
      category: "حريق",
      riskLevel: "medium",
      probability: 2,
      severity: 4,
      riskScore: 8,
      controlMeasures: ["أجهزة الإنذار", "طفايات الحريق", "تدريب الإخلاء"],
      assignedTo: "ضابط السلامة",
      targetDate: "2024-01-30",
      status: "monitored",
      lastReviewed: "2024-01-12"
    }
  ];

  // Mock data for training
  const trainingPrograms: SafetyTraining[] = [
    {
      id: "1",
      title: "السلامة العامة في مكان العمل",
      category: "عام",
      duration: 4,
      mandatory: true,
      validityPeriod: 12,
      completedCount: 42,
      totalAssigned: 50,
      completionRate: 84,
      nextScheduled: "2024-02-01",
      trainer: "د. أحمد محمد"
    },
    {
      id: "2",
      title: "إجراءات الطوارئ والإخلاء",
      category: "طوارئ",
      duration: 2,
      mandatory: true,
      validityPeriod: 6,
      completedCount: 38,
      totalAssigned: 50,
      completionRate: 76,
      nextScheduled: "2024-01-25",
      trainer: "سارة أحمد"
    }
  ];

  // Dashboard metrics data
  const dashboardMetrics = [
    { name: 'يناير', incidents: 5, nearMiss: 8, training: 92, compliance: 85 },
    { name: 'فبراير', incidents: 3, nearMiss: 12, training: 88, compliance: 90 },
    { name: 'مارس', incidents: 7, nearMiss: 6, training: 95, compliance: 88 },
    { name: 'أبريل', incidents: 2, nearMiss: 10, training: 90, compliance: 92 },
    { name: 'مايو', incidents: 4, nearMiss: 9, training: 93, compliance: 89 },
    { name: 'يونيو', incidents: 1, nearMiss: 15, training: 96, compliance: 95 }
  ];

  const incidentTypes = [
    { name: 'إصابات', value: 35, color: '#ef4444' },
    { name: 'كاد أن يحدث', value: 45, color: '#f59e0b' },
    { name: 'أضرار الممتلكات', value: 15, color: '#3b82f6' },
    { name: 'بيئية', value: 5, color: '#10b981' }
  ];

  // Helper functions
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'low': return 'منخفض';
      case 'medium': return 'متوسط';
      case 'high': return 'عالي';
      case 'critical': return 'حرج';
      default: return severity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': case 'reported': case 'identified': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'investigating': case 'assessing': case 'controlling': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'completed': case 'resolved': case 'monitored': return 'bg-green-100 text-green-800 border-green-200';
      case 'overdue': return 'bg-red-100 text-red-800 border-red-200';
      case 'closed': case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string, context?: string) => {
    switch (status) {
      case 'scheduled': return 'مجدولة';
      case 'completed': return 'مكتملة';
      case 'overdue': return 'متأخرة';
      case 'cancelled': return 'ملغية';
      case 'reported': return 'مبلغ عنها';
      case 'investigating': return 'قيد التحقيق';
      case 'resolved': return 'محلولة';
      case 'closed': return 'مغلقة';
      case 'identified': return 'محددة';
      case 'assessing': return 'قيد التقييم';
      case 'controlling': return 'قيد السيطرة';
      case 'monitored': return 'مراقبة';
      default: return status;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'injury': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'near_miss': return <AlertCircle className="h-4 w-4 text-orange-600" />;
      case 'property_damage': return <Shield className="h-4 w-4 text-blue-600" />;
      case 'environmental': return <Globe className="h-4 w-4 text-green-600" />;
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

  const handleAddIncident = () => {
    setIsAddIncidentOpen(true);
  };

  const handleAddExam = () => {
    setIsAddExamOpen(true);
  };

  const handleAddPolicy = () => {
    setIsAddPolicyOpen(true);
  };

  const handleAddRisk = () => {
    setIsAddRiskOpen(true);
  };

  const handleEdit = (item: any) => {
    setSelectedItem(item);
    toast.info("فتح للتعديل");
  };

  const handleDelete = (id: string) => {
    toast.success("تم الحذف بنجاح");
  };

  const handleView = (item: any) => {
    setSelectedItem(item);
    toast.info("فتح للمعاينة");
  };

  const handleUpload = () => {
    toast.success("تم رفع المستند بنجاح");
  };

  const handleDownload = (item: any) => {
    toast.success(`تم تحميل: ${item.title || item.name}`);
  };

  // Header component
  const renderHeader = () => (
    <div className="space-y-6">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">الصحة والسلامة المهنية</h1>
        <p className="text-muted-foreground">إدارة شاملة للسلامة والصحة المهنية في مكان العمل</p>
      </div>
    </div>
  );

  // Dashboard content
  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-primary" />
              اتجاهات السلامة الشهرية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardMetrics}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} />
                  <YAxis tick={{ fontSize: 12 }} axisLine={false} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Area type="monotone" dataKey="incidents" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.8} name="الحوادث" />
                  <Area type="monotone" dataKey="nearMiss" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.8} name="كاد أن يحدث" />
                  <Area type="monotone" dataKey="training" stackId="2" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.8} name="التدريب %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              توزيع أنواع الحوادث
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={incidentTypes}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={40}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {incidentTypes.map((entry, index) => (
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

      {/* Risk Alerts and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              تنبيهات السلامة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <span className="text-sm font-medium text-red-800">خطر عالي</span>
                </div>
                <p className="text-xs text-red-700">3 موظفين متأخرين عن الفحص الطبي</p>
              </div>
              
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">يتطلب متابعة</span>
                </div>
                <p className="text-xs text-yellow-700">حادث بانتظار التحقيق منذ 3 أيام</p>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-800">تدريب</span>
                </div>
                <p className="text-xs text-blue-700">دورة السلامة العامة تبدأ غداً</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              النشاطات الأخيرة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {incidents.slice(0, 4).map((incident) => (
                <div key={incident.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-muted rounded-full">
                      {getTypeIcon(incident.type)}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{incident.title}</p>
                      <p className="text-xs text-muted-foreground">{incident.location}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <Badge className={getSeverityColor(incident.severity)}>
                      {getSeverityText(incident.severity)}
                    </Badge>
                    <p className="text-xs text-muted-foreground mt-1">{incident.incidentDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Incidents tab
  const renderIncidents = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="البحث في الحوادث..."
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
                <SelectItem value="reported">مبلغ عنها</SelectItem>
                <SelectItem value="investigating">قيد التحقيق</SelectItem>
                <SelectItem value="resolved">محلولة</SelectItem>
                <SelectItem value="closed">مغلقة</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleAddIncident}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة حادث
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {incidents.map((incident) => (
          <Card key={incident.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-muted rounded-full">
                    {getTypeIcon(incident.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{incident.title}</h3>
                      <Badge className={getSeverityColor(incident.severity)} variant="outline">
                        {getSeverityText(incident.severity)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{incident.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                      <p><strong>المكان:</strong> {incident.location}</p>
                      <p><strong>المبلغ:</strong> {incident.reportedBy}</p>
                      <p><strong>تاريخ الحادث:</strong> {incident.incidentDate}</p>
                      <p><strong>المحقق:</strong> {incident.investigator || "غير محدد"}</p>
                      {incident.attachments > 0 && (
                        <p className="flex items-center gap-1">
                          <Paperclip className="h-3 w-3" />
                          {incident.attachments} مرفق
                        </p>
                      )}
                      {incident.daysLost !== undefined && (
                        <p><strong>أيام الغياب:</strong> {incident.daysLost}</p>
                      )}
                    </div>
                    <Badge className={getStatusColor(incident.status)}>
                      {getStatusText(incident.status)}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleView(incident)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(incident)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(incident.id)} className="hover:bg-destructive/10 hover:text-destructive">
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

  // Medical Exams tab
  const renderMedicalExams = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">الفحوصات الطبية</h3>
            <Button onClick={handleAddExam}>
              <Plus className="h-4 w-4 ml-2" />
              جدولة فحص
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {medicalExams.map((exam) => (
          <Card key={exam.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-muted rounded-full">
                    <Stethoscope className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{exam.employeeName}</h3>
                      <Badge variant="secondary">{exam.employeeId}</Badge>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                      <p><strong>نوع الفحص:</strong> {exam.examType === 'periodic' ? 'دوري' : exam.examType === 'pre_employment' ? 'قبل التوظيف' : 'أخرى'}</p>
                      <p><strong>التاريخ المجدول:</strong> {exam.scheduledDate}</p>
                      {exam.completedDate && (
                        <p><strong>تاريخ الإنجاز:</strong> {exam.completedDate}</p>
                      )}
                      {exam.results && (
                        <p><strong>النتيجة:</strong> {exam.results === 'fit' ? 'لائق' : exam.results === 'fit_with_restrictions' ? 'لائق مع قيود' : 'غير لائق'}</p>
                      )}
                      {exam.nextExamDate && (
                        <p><strong>الفحص القادم:</strong> {exam.nextExamDate}</p>
                      )}
                      <p><strong>الطبيب:</strong> {exam.medicalOfficer}</p>
                    </div>
                    <Badge className={getStatusColor(exam.status)}>
                      {getStatusText(exam.status)}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleView(exam)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(exam)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(exam.id)} className="hover:bg-destructive/10 hover:text-destructive">
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

  // Policies tab
  const renderPolicies = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">السياسات والإجراءات</h3>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleUpload}>
                <Upload className="h-4 w-4 ml-2" />
                رفع سياسة
              </Button>
              <Button onClick={handleAddPolicy}>
                <Plus className="h-4 w-4 ml-2" />
                إضافة سياسة
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {policies.map((policy) => (
          <Card key={policy.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{policy.title}</h3>
                </div>
                <Badge className={policy.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {policy.status === 'published' ? 'منشور' : 'مسودة'}
                </Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{policy.description}</p>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الإصدار:</span>
                  <span>{policy.version}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">تاريخ النشر:</span>
                  <span>{policy.publishedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الإقرارات:</span>
                  <span>{policy.acknowledgments}/{policy.totalEmployees}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">معدل الإقرار</span>
                  <span className="text-sm font-medium">{Math.round((policy.acknowledgments / policy.totalEmployees) * 100)}%</span>
                </div>
                <Progress value={(policy.acknowledgments / policy.totalEmployees) * 100} className="h-2" />
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleView(policy)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(policy)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm" onClick={() => handleDownload(policy)}>
                  <Download className="h-4 w-4 ml-2" />
                  تحميل
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Risk Management tab
  const renderRiskManagement = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">إدارة المخاطر</h3>
            <Button onClick={handleAddRisk}>
              <Plus className="h-4 w-4 ml-2" />
              إضافة مخاطر
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {riskAssessments.map((risk) => (
          <Card key={risk.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="p-2 bg-muted rounded-full">
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-foreground">{risk.hazardTitle}</h3>
                      <Badge className={getSeverityColor(risk.riskLevel)} variant="outline">
                        {getSeverityText(risk.riskLevel)}
                      </Badge>
                      <Badge variant="secondary">نقاط الخطر: {risk.riskScore}</Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground mb-3">
                      <p><strong>المكان:</strong> {risk.location}</p>
                      <p><strong>الفئة:</strong> {risk.category}</p>
                      <p><strong>المسؤول:</strong> {risk.assignedTo}</p>
                      <p><strong>الموعد المستهدف:</strong> {risk.targetDate}</p>
                      <p><strong>آخر مراجعة:</strong> {risk.lastReviewed}</p>
                      <p><strong>الاحتمالية:</strong> {risk.probability}/5</p>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm font-medium mb-1">إجراءات السيطرة:</p>
                      <ul className="text-sm text-muted-foreground">
                        {risk.controlMeasures.slice(0, 2).map((measure, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-600" />
                            {measure}
                          </li>
                        ))}
                        {risk.controlMeasures.length > 2 && (
                          <li className="text-xs text-muted-foreground mt-1">
                            +{risk.controlMeasures.length - 2} إجراءات أخرى
                          </li>
                        )}
                      </ul>
                    </div>
                    
                    <Badge className={getStatusColor(risk.status)}>
                      {getStatusText(risk.status)}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleView(risk)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(risk)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(risk.id)} className="hover:bg-destructive/10 hover:text-destructive">
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

  // Training tab
  const renderTraining = () => (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">التدريب والتوعية</h3>
            <Button>
              <Plus className="h-4 w-4 ml-2" />
              إضافة تدريب
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {trainingPrograms.map((training) => (
          <Card key={training.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{training.title}</h3>
                </div>
                <Badge variant={training.mandatory ? "default" : "secondary"}>
                  {training.mandatory ? 'إجباري' : 'اختياري'}
                </Badge>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المدة:</span>
                  <span>{training.duration} ساعات</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">صالح لمدة:</span>
                  <span>{training.validityPeriod} شهر</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">المدرب:</span>
                  <span>{training.trainer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">الجلسة القادمة:</span>
                  <span>{training.nextScheduled}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">معدل الإنجاز</span>
                  <span className="text-sm font-medium">{training.completionRate}%</span>
                </div>
                <Progress value={training.completionRate} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>مكتمل: {training.completedCount}</span>
                  <span>إجمالي: {training.totalAssigned}</span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleView(training)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(training)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 ml-2" />
                  المشاركين
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Reports tab
  const renderReports = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleExportPDF}>
          <CardContent className="p-6 text-center">
            <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تقرير الحوادث</h3>
            <p className="text-sm text-muted-foreground mb-4">تقرير شامل لجميع الحوادث والتحقيقات</p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 ml-2" />
              تحميل التقرير
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleExportExcel}>
          <CardContent className="p-6 text-center">
            <Stethoscope className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تقرير الفحوصات الطبية</h3>
            <p className="text-sm text-muted-foreground mb-4">حالة الفحوصات المجدولة والمكتملة</p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleExportPDF}>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تقرير التدريب</h3>
            <p className="text-sm text-muted-foreground mb-4">معدلات الإنجاز والامتثال للتدريب</p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 ml-2" />
              تحميل التقرير
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleExportExcel}>
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تقرير إدارة المخاطر</h3>
            <p className="text-sm text-muted-foreground mb-4">تقييم وحالة المخاطر المحددة</p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleExportPDF}>
          <CardContent className="p-6 text-center">
            <FileCheck className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تقرير الامتثال</h3>
            <p className="text-sm text-muted-foreground mb-4">مستوى الامتثال للسياسات والإجراءات</p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 ml-2" />
              تحميل التقرير
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleExportExcel}>
          <CardContent className="p-6 text-center">
            <BarChart className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">تقرير الأداء الشامل</h3>
            <p className="text-sm text-muted-foreground mb-4">جميع مؤشرات الأداء والإحصائيات</p>
            <Button variant="outline" className="w-full">
              <Download className="h-4 w-4 ml-2" />
              تصدير Excel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  // Settings tab
  const renderSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                  <p className="font-medium">فئات المخاطر</p>
                  <p className="text-sm text-muted-foreground">إدارة فئات وأنواع المخاطر</p>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 ml-2" />
                  تكوين
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">مستويات الخطورة</p>
                  <p className="text-sm text-muted-foreground">تحديد مستويات تقييم المخاطر</p>
                </div>
                <Button variant="outline" size="sm">
                  <AlertTriangle className="h-4 w-4 ml-2" />
                  تكوين
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">إشعارات التنبيه</p>
                  <p className="text-sm text-muted-foreground">تكوين تنبيهات السلامة والإشعارات</p>
                </div>
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 ml-2" />
                  تكوين
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">قوالب التقارير</p>
                  <p className="text-sm text-muted-foreground">إدارة قوالب تقارير السلامة</p>
                </div>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 ml-2" />
                  إدارة
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-primary" />
              صلاحيات المستخدمين
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">ضباط السلامة</p>
                  <p className="text-sm text-muted-foreground">إدارة الحوادث والتحقيقات</p>
                </div>
                <Select defaultValue="safety_officers">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safety_officers">ضباط السلامة</SelectItem>
                    <SelectItem value="hr_managers">مديري الموارد البشرية</SelectItem>
                    <SelectItem value="all_managers">جميع المديرين</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">الطاقم الطبي</p>
                  <p className="text-sm text-muted-foreground">إدارة الفحوصات الطبية</p>
                </div>
                <Select defaultValue="medical_staff">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medical_staff">الطاقم الطبي</SelectItem>
                    <SelectItem value="hr_medical">الموارد البشرية والطبي</SelectItem>
                    <SelectItem value="designated_only">المعينين فقط</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">مدربي السلامة</p>
                  <p className="text-sm text-muted-foreground">إدارة برامج التدريب</p>
                </div>
                <Select defaultValue="trainers">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="trainers">المدربين المعتمدين</SelectItem>
                    <SelectItem value="hr_trainers">الموارد البشرية والمدربين</SelectItem>
                    <SelectItem value="managers">المديرين</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">إدارة التقارير</p>
                  <p className="text-sm text-muted-foreground">إنشاء وتصدير التقارير</p>
                </div>
                <Select defaultValue="authorized_staff">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="authorized_staff">الطاقم المرخص</SelectItem>
                    <SelectItem value="managers_only">المديرين فقط</SelectItem>
                    <SelectItem value="admin_only">المديرين التنفيذيين</SelectItem>
                  </SelectContent>
                </Select>
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
          <TabsList className="grid w-full grid-cols-8 mb-6">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="policies" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              السياسات
            </TabsTrigger>
            <TabsTrigger value="incidents" className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              الحوادث
            </TabsTrigger>
            <TabsTrigger value="medical" className="flex items-center gap-2">
              <Stethoscope className="h-4 w-4" />
              الفحوصات الطبية
            </TabsTrigger>
            <TabsTrigger value="risks" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              إدارة المخاطر
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              التدريب
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
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

          <TabsContent value="policies" className="mt-6">
            {renderPolicies()}
          </TabsContent>

          <TabsContent value="incidents" className="mt-6">
            {renderIncidents()}
          </TabsContent>

          <TabsContent value="medical" className="mt-6">
            {renderMedicalExams()}
          </TabsContent>

          <TabsContent value="risks" className="mt-6">
            {renderRiskManagement()}
          </TabsContent>

          <TabsContent value="training" className="mt-6">
            {renderTraining()}
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            {renderReports()}
          </TabsContent>

          <TabsContent value="settings" className="mt-6">
            {renderSettings()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Add Incident Dialog */}
      <Dialog open={isAddIncidentOpen} onOpenChange={setIsAddIncidentOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>تسجيل حادث جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="incidentType">نوع الحادث</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="injury">إصابة</SelectItem>
                    <SelectItem value="near_miss">كاد أن يحدث</SelectItem>
                    <SelectItem value="property_damage">أضرار الممتلكات</SelectItem>
                    <SelectItem value="environmental">بيئي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="severity">درجة الخطورة</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدرجة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">منخفض</SelectItem>
                    <SelectItem value="medium">متوسط</SelectItem>
                    <SelectItem value="high">عالي</SelectItem>
                    <SelectItem value="critical">حرج</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="title">عنوان الحادث</Label>
              <Input id="title" placeholder="أدخل عنوان الحادث" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">موقع الحادث</Label>
                <Input id="location" placeholder="أدخل موقع الحادث" />
              </div>
              <div>
                <Label htmlFor="incidentDate">تاريخ الحادث</Label>
                <Input id="incidentDate" type="date" />
              </div>
            </div>
            <div>
              <Label htmlFor="description">وصف الحادث</Label>
              <Textarea id="description" placeholder="اكتب وصف تفصيلي للحادث" rows={4} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddIncidentOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => {
                setIsAddIncidentOpen(false);
                toast.success("تم تسجيل الحادث بنجاح");
              }}>
                حفظ الحادث
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Medical Exam Dialog */}
      <Dialog open={isAddExamOpen} onOpenChange={setIsAddExamOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>جدولة فحص طبي</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="employee">الموظف</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الموظف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="emp1">أحمد محمد</SelectItem>
                    <SelectItem value="emp2">سارة أحمد</SelectItem>
                    <SelectItem value="emp3">محمد علي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="examType">نوع الفحص</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر النوع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="periodic">دوري</SelectItem>
                    <SelectItem value="pre_employment">قبل التوظيف</SelectItem>
                    <SelectItem value="post_incident">بعد الحادث</SelectItem>
                    <SelectItem value="return_to_work">العودة للعمل</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scheduledDate">التاريخ المجدول</Label>
                <Input id="scheduledDate" type="date" />
              </div>
              <div>
                <Label htmlFor="medicalOfficer">الطبيب المسؤول</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الطبيب" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="doc1">د. فاطمة أحمد</SelectItem>
                    <SelectItem value="doc2">د. محمد سالم</SelectItem>
                    <SelectItem value="doc3">د. سارة محمد</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddExamOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={() => {
                setIsAddExamOpen(false);
                toast.success("تم جدولة الفحص بنجاح");
              }}>
                حفظ الجدولة
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};