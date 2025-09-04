import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  ArrowLeft, Users, Briefcase, FileText, AlertTriangle, CheckCircle2, Clock,
  Download, Plus, Search, Filter, Calendar, Building, Award, Target, TrendingUp,
  BarChart3, PieChart, Activity, Globe, Eye, Settings, Bell, UserPlus, Phone,
  Mail, Star, Upload, Send, MessageSquare, Video, FileUser, BrainCircuit,
  CircleCheck, X, Copy, ExternalLink, Timer, MapPin, DollarSign, Edit, Trash2,
  Share, User, CalendarIcon, ChartBar
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, LineChart, Line, BarChart, Bar } from 'recharts';

interface ComprehensiveRecruitmentHiringProps {
  onBack: () => void;
}

export const ComprehensiveRecruitmentHiring: React.FC<ComprehensiveRecruitmentHiringProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Mock Data
  const stats = {
    totalApplications: 180,
    activePositions: 8,
    scheduledInterviews: 12,
    pendingOffers: 4,
    avgTimeToHire: 18,
    qualityScore: 92
  };

  const hiringFunnelData = [
    { stage: 'الطلبات', count: 180, percentage: 100 },
    { stage: 'الفحص', count: 120, percentage: 67 },
    { stage: 'المقابلات', count: 65, percentage: 36 },
    { stage: 'العروض', count: 25, percentage: 14 },
    { stage: 'التوظيف', count: 18, percentage: 10 }
  ];

  const renderHeader = () => (
    <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="relative p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost" 
              size="sm"
              onClick={onBack}
              className="hover:bg-primary/10"
            >
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة
            </Button>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-1">
                  <FileText className="h-8 w-8 text-primary" />
                  <Search className="h-5 w-5 text-primary/70" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  التوظيف والتعيين - نظام ATS متكامل
                </h1>
                <p className="text-muted-foreground text-lg mt-1">
                  نظام تتبع المتقدمين المتكامل - من التقديم إلى أول يوم عمل
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 ml-2" />
              تصدير التقارير
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 ml-2" />
              وظيفة جديدة
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">إجمالي الطلبات</p>
                <p className="text-2xl font-bold text-primary">{stats.totalApplications}</p>
              </div>
              <FileUser className="h-8 w-8 text-primary/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">الوظائف النشطة</p>
                <p className="text-2xl font-bold text-orange-600">{stats.activePositions}</p>
              </div>
              <Briefcase className="h-8 w-8 text-orange-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">مقابلات مجدولة</p>
                <p className="text-2xl font-bold text-emerald-600">{stats.scheduledInterviews}</p>
              </div>
              <Calendar className="h-8 w-8 text-emerald-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">عروض معلقة</p>
                <p className="text-2xl font-bold text-blue-600">{stats.pendingOffers}</p>
              </div>
              <Mail className="h-8 w-8 text-blue-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">متوسط التوظيف (يوم)</p>
                <p className="text-2xl font-bold text-purple-600">{stats.avgTimeToHire}</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500/60" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">نقاط الجودة</p>
                <p className="text-2xl font-bold text-green-600">{stats.qualityScore}%</p>
              </div>
              <Award className="h-8 w-8 text-green-500/60" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              قمع التوظيف (Hiring Funnel)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hiringFunnelData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="stage" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Timer className="h-5 w-5" />
              متوسط وقت التوظيف
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{stats.avgTimeToHire}</div>
                <div className="text-muted-foreground">يوم متوسط التوظيف</div>
              </div>
              <Progress value={75} className="w-full" />
              <div className="text-sm text-muted-foreground text-center">
                تحسن بنسبة 25% عن الشهر الماضي
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-background">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BrainCircuit className="h-5 w-5 text-primary" />
            رؤى الذكاء الاصطناعي للتوظيف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span className="text-sm font-semibold text-emerald-800">تحسن ملحوظ</span>
              </div>
              <p className="text-sm text-emerald-700">
                جودة المرشحين تحسنت بنسبة 18% مقارنة بالربع الماضي
              </p>
            </div>
            <div className="p-4 rounded-lg bg-orange-50 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-800">تحسين مطلوب</span>
              </div>
              <p className="text-sm text-orange-700">
                ينصح بتسريع عملية الفحص الأولي لتقليل وقت الاستجابة
              </p>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-semibold text-blue-800">توقعات إيجابية</span>
              </div>
              <p className="text-sm text-blue-700">
                متوقع تحقيق 95% من أهداف التوظيف لهذا الربع
              </p>
            </div>
          </div>
        </CardContent>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 lg:w-auto">
            <TabsTrigger value="dashboard" className="text-sm">
              <BarChart3 className="h-4 w-4 ml-2" />
              لوحة التحكم
            </TabsTrigger>
            <TabsTrigger value="career-page" className="text-sm">
              <Globe className="h-4 w-4 ml-2" />
              صفحة الوظائف
            </TabsTrigger>
            <TabsTrigger value="jobs" className="text-sm">
              <Briefcase className="h-4 w-4 ml-2" />
              إدارة الوظائف
            </TabsTrigger>
            <TabsTrigger value="candidates" className="text-sm">
              <Users className="h-4 w-4 ml-2" />
              رحلة المرشح
            </TabsTrigger>
            <TabsTrigger value="interviews" className="text-sm">
              <Video className="h-4 w-4 ml-2" />
              المقابلات
            </TabsTrigger>
            <TabsTrigger value="approvals" className="text-sm">
              <CheckCircle2 className="h-4 w-4 ml-2" />
              الموافقات
            </TabsTrigger>
            <TabsTrigger value="reports" className="text-sm">
              <FileText className="h-4 w-4 ml-2" />
              التقارير
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            {renderDashboard()}
          </TabsContent>

          <TabsContent value="career-page">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  صفحة الوظائف الخارجية (Career Page)
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">قيد التطوير</h3>
                <p className="text-muted-foreground">سيتم إضافة صفحة الوظائف الخارجية قريباً</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  إدارة الوظائف
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">قيد التطوير</h3>
                <p className="text-muted-foreground">سيتم إضافة نظام إدارة الوظائف قريباً</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="candidates">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  رحلة المرشح
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">قيد التطوير</h3>
                <p className="text-muted-foreground">سيتم إضافة نظام تتبع المرشحين قريباً</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interviews">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Video className="h-5 w-5" />
                  المقابلات والتقييمات
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">قيد التطوير</h3>
                <p className="text-muted-foreground">سيتم إضافة نظام المقابلات قريباً</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="approvals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  الموافقات والتعيين
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <CheckCircle2 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">قيد التطوير</h3>
                <p className="text-muted-foreground">سيتم إضافة نظام الموافقات قريباً</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartBar className="h-5 w-5" />
                  التقارير والتحليلات
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">قيد التطوير</h3>
                <p className="text-muted-foreground">سيتم إضافة التقارير التفصيلية قريباً</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};