import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TicketIcon,
  Plus,
  Search,
  Filter,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Calendar,
  FileText,
  Paperclip,
  Send,
  TrendingUp,
  BarChart3
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ReportsSection } from '@/components/shared/ReportsSection';
import { AIAssistant } from '@/components/shared/AIAssistant';

export const TechnicalSupport: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('tickets');

  // Mock data for tickets
  const tickets = [
    {
      id: 1,
      ticketNumber: 'TK-2024-001',
      title: 'مشكلة في تسجيل الدخول',
      client: 'شركة النور للتقنية',
      category: 'تقني',
      priority: 'عالي',
      status: 'جديد',
      assignedTo: 'أحمد محمد',
      createdDate: '2024-01-15',
      lastUpdate: '2024-01-15 14:30',
      description: 'لا يمكن للموظفين تسجيل الدخول للنظام'
    },
    {
      id: 2,
      ticketNumber: 'TK-2024-002',
      title: 'خطأ في حساب الرواتب',
      client: 'مؤسسة الأمل',
      category: 'حسابي',
      priority: 'حرج',
      status: 'تحت المعالجة',
      assignedTo: 'فاطمة علي',
      createdDate: '2024-01-14',
      lastUpdate: '2024-01-15 10:15',
      description: 'وجود فروقات في احتساب بدل السكن'
    },
    {
      id: 3,
      ticketNumber: 'TK-2024-003',
      title: 'طلب تفعيل ميزة جديدة',
      client: 'شركة المستقبل',
      category: 'طلب ميزة',
      priority: 'متوسط',
      status: 'تم الحل',
      assignedTo: 'خالد أحمد',
      createdDate: '2024-01-13',
      lastUpdate: '2024-01-14 16:45',
      description: 'طلب إضافة تقرير مخصص للحضور'
    }
  ];

  // Mock statistics
  const stats = [
    {
      label: isArabic ? 'تذاكر جديدة' : 'New Tickets',
      value: '23',
      icon: TicketIcon,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      label: isArabic ? 'تحت المعالجة' : 'In Progress',
      value: '45',
      icon: Clock,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      label: isArabic ? 'تم الحل' : 'Resolved',
      value: '187',
      icon: CheckCircle,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      label: isArabic ? 'معدل الاستجابة' : 'Response Rate',
      value: '2.5h',
      icon: TrendingUp,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { className: string }> = {
      'جديد': { className: 'bg-blue-500/10 text-blue-500 border-blue-500/20' },
      'تحت المعالجة': { className: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
      'تم الحل': { className: 'bg-green-500/10 text-green-500 border-green-500/20' },
      'مغلق': { className: 'bg-gray-500/10 text-gray-500 border-gray-500/20' }
    };
    
    const config = statusConfig[status] || statusConfig['جديد'];
    return <Badge className={config.className}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityConfig: Record<string, { className: string }> = {
      'حرج': { className: 'bg-red-500/10 text-red-500 border-red-500/20' },
      'عالي': { className: 'bg-orange-500/10 text-orange-500 border-orange-500/20' },
      'متوسط': { className: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' },
      'منخفض': { className: 'bg-gray-500/10 text-gray-500 border-gray-500/20' }
    };
    
    const config = priorityConfig[priority] || priorityConfig['متوسط'];
    return <Badge className={config.className}>{priority}</Badge>;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 relative overflow-hidden" dir="rtl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              {isArabic ? 'الدعم الفني الداخلي' : 'Internal Technical Support'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isArabic ? 'إدارة تذاكر الدعم والمشاكل التقنية' : 'Manage support tickets and technical issues'}
            </p>
          </div>
          <Button className="bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black">
            <Plus className="h-4 w-4 mr-2" />
            {isArabic ? 'تذكرة جديدة' : 'New Ticket'}
          </Button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="backdrop-blur-xl bg-black/40 border border-border hover:shadow-2xl hover:shadow-accent/20 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor} border border-${stat.color.replace('text-', '')}/30`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-black/40 backdrop-blur-xl border border-border">
            <TabsTrigger
              value="tickets"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-accent data-[state=active]:text-black text-white"
            >
              <TicketIcon className="h-4 w-4 mr-2" />
              {isArabic ? 'التذاكر' : 'Tickets'}
            </TabsTrigger>
            <TabsTrigger
              value="create"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-accent data-[state=active]:text-black text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              {isArabic ? 'تذكرة جديدة' : 'New Ticket'}
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-accent data-[state=active]:to-accent data-[state=active]:text-black text-white"
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              {isArabic ? 'التحليلات' : 'Analytics'}
            </TabsTrigger>
          </TabsList>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <Card className="backdrop-blur-xl bg-black/40 border border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">{isArabic ? 'جميع التذاكر' : 'All Tickets'}</CardTitle>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder={isArabic ? 'البحث عن تذكرة...' : 'Search tickets...'}
                        className="pl-10 w-64 border-border bg-black/20 text-white"
                      />
                    </div>
                    <Button variant="outline" size="sm" className="border-border text-white hover:bg-accent/20">
                      <Filter className="h-4 w-4 mr-2" />
                      {isArabic ? 'تصفية' : 'Filter'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-4 border border-border rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 space-x-reverse mb-2">
                          <h4 className="font-semibold text-white">{ticket.title}</h4>
                          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                            {ticket.ticketNumber}
                          </Badge>
                          {getStatusBadge(ticket.status)}
                          {getPriorityBadge(ticket.priority)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{ticket.description}</p>
                        <div className="flex items-center space-x-4 space-x-reverse text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {ticket.client}
                          </span>
                          <span className="flex items-center">
                            <User className="h-3 w-3 mr-1" />
                            {isArabic ? 'مسند إلى:' : 'Assigned to:'} {ticket.assignedTo}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {ticket.createdDate}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {isArabic ? 'آخر تحديث:' : 'Last update:'} {ticket.lastUpdate}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Button variant="outline" size="sm" className="border-border text-white hover:bg-accent/20">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {isArabic ? 'رد' : 'Reply'}
                        </Button>
                        <Button variant="outline" size="sm" className="border-border text-white hover:bg-accent/20">
                          <FileText className="h-4 w-4 mr-2" />
                          {isArabic ? 'تفاصيل' : 'Details'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Ticket Tab */}
          <TabsContent value="create" className="space-y-6">
            <Card className="backdrop-blur-xl bg-black/40 border border-border">
              <CardHeader>
                <CardTitle className="text-white">{isArabic ? 'إنشاء تذكرة جديدة' : 'Create New Ticket'}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      {isArabic ? 'العميل' : 'Client'}
                    </label>
                    <Input
                      placeholder={isArabic ? 'اسم العميل' : 'Client name'}
                      className="border-border bg-black/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      {isArabic ? 'نوع المشكلة' : 'Issue Type'}
                    </label>
                    <Input
                      placeholder={isArabic ? 'تقني / حسابي / طلب ميزة' : 'Technical / Financial / Feature Request'}
                      className="border-border bg-black/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      {isArabic ? 'الأولوية' : 'Priority'}
                    </label>
                    <Input
                      placeholder={isArabic ? 'حرج / عالي / متوسط / منخفض' : 'Critical / High / Medium / Low'}
                      className="border-border bg-black/20 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-white mb-2 block">
                      {isArabic ? 'القسم المرتبط' : 'Related Department'}
                    </label>
                    <Input
                      placeholder={isArabic ? 'اختر القسم' : 'Select department'}
                      className="border-border bg-black/20 text-white"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    {isArabic ? 'عنوان التذكرة' : 'Ticket Title'}
                  </label>
                  <Input
                    placeholder={isArabic ? 'وصف موجز للمشكلة' : 'Brief description of the issue'}
                    className="border-border bg-black/20 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    {isArabic ? 'تفاصيل المشكلة' : 'Issue Details'}
                  </label>
                  <Textarea
                    placeholder={isArabic ? 'اشرح المشكلة بالتفصيل...' : 'Explain the issue in detail...'}
                    rows={5}
                    className="border-border bg-black/20 text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-white mb-2 block">
                    {isArabic ? 'المرفقات' : 'Attachments'}
                  </label>
                  <Button variant="outline" className="w-full border-border text-white hover:bg-accent/20">
                    <Paperclip className="h-4 w-4 mr-2" />
                    {isArabic ? 'إرفاق ملفات' : 'Attach Files'}
                  </Button>
                </div>
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button variant="outline" className="border-border text-white hover:bg-accent/20">
                    {isArabic ? 'إلغاء' : 'Cancel'}
                  </Button>
                  <Button className="bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black">
                    <Send className="h-4 w-4 mr-2" />
                    {isArabic ? 'إرسال التذكرة' : 'Submit Ticket'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="backdrop-blur-xl bg-black/40 border border-border">
              <CardHeader>
                <CardTitle className="text-white">{isArabic ? 'تحليلات الأداء' : 'Performance Analytics'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 border border-border rounded-lg">
                    <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">94%</p>
                    <p className="text-sm text-muted-foreground">{isArabic ? 'نسبة الحل' : 'Resolution Rate'}</p>
                  </div>
                  <div className="text-center p-6 border border-border rounded-lg">
                    <Clock className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">2.5h</p>
                    <p className="text-sm text-muted-foreground">{isArabic ? 'متوسط وقت الرد' : 'Avg Response Time'}</p>
                  </div>
                  <div className="text-center p-6 border border-border rounded-lg">
                    <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">4.8/5</p>
                    <p className="text-sm text-muted-foreground">{isArabic ? 'تقييم العملاء' : 'Customer Rating'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reports and AI Assistant Sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ReportsSection
            title={isArabic ? 'تقارير الدعم الفني' : 'Support Reports'}
            description={isArabic ? 'تقارير شاملة عن أداء الدعم الفني' : 'Comprehensive reports on support performance'}
          />
          <AIAssistant
            title={isArabic ? 'المساعد الذكي للدعم' : 'Support AI Assistant'}
            placeholder={isArabic ? 'اسأل عن حالة التذاكر والمشاكل...' : 'Ask about ticket status and issues...'}
          />
        </div>
      </div>
    </div>
  );
};