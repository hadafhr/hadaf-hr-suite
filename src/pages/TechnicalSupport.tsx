import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Server,
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
  BarChart3,
  Eye,
  ArrowLeft,
  Crown,
  LogOut,
  ChevronDown,
  Settings
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ReportsSection } from '@/components/shared/ReportsSection';
import { AIAssistant } from '@/components/shared/AIAssistant';
import { toast } from 'sonner';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import headerLogo from '@/assets/header-logo.png';
import contentLogo from '@/assets/content-logo.png';

export const TechnicalSupport: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState('tickets');
  const [isNewTicketDialogOpen, setIsNewTicketDialogOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [isTicketDetailsDialogOpen, setIsTicketDetailsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newComment, setNewComment] = useState('');

  const handleLogout = async () => {
    await signOut();
    navigate('/unified-login');
  };

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
      icon: AlertCircle,
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

  const handleCreateTicket = () => {
    toast.success(isArabic ? 'تم إنشاء التذكرة بنجاح' : 'Ticket created successfully');
    setIsNewTicketDialogOpen(false);
  };

  const handleViewTicket = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsTicketDetailsDialogOpen(true);
  };

  const handleUpdateStatus = (status: string) => {
    toast.success(isArabic ? 'تم تحديث حالة التذكرة' : 'Ticket status updated');
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    toast.success(isArabic ? 'تم إضافة التعليق' : 'Comment added');
    setNewComment('');
  };

  const handleSubmitTicket = () => {
    toast.success(isArabic ? 'تم إرسال التذكرة بنجاح' : 'Ticket submitted successfully');
    setActiveTab('tickets');
  };

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
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-black text-white relative overflow-hidden font-arabic" dir="rtl">
      {/* Enhanced Animated Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/15 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent/5 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div 
            className="w-full h-full bg-repeat animate-pulse"
            style={{
              backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="dot" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#b1a086" stop-opacity="0.6"/><stop offset="100%" stop-color="#b1a086" stop-opacity="0"/></radialGradient></defs><circle cx="40" cy="40" r="2" fill="url(#dot)"/></svg>')}")`,
              backgroundSize: '80px 80px'
            }}
          ></div>
        </div>
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/15 rounded-full blur-3xl animate-bounce"></div>
      </div>
      
      {/* Professional Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-black/95 backdrop-blur-xl shadow-xl">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-accent/5 pointer-events-none"></div>
        
        <div className="container mx-auto px-6 h-20">
          <div className="flex items-center justify-between h-full relative z-10">
            {/* Right Section - Logo & Title */}
            <div className="flex items-center gap-6">
              <img 
                src={headerLogo} 
                alt="Buod HR" 
                className="h-56 w-auto object-contain filter brightness-110 transition-transform hover:scale-105" 
              />
              <div className="hidden md:flex flex-col">
                <h1 className="text-xl font-bold text-white">
                  {isArabic ? 'الدعم الفني الداخلي' : 'Internal Technical Support'}
                </h1>
                <p className="text-xs text-muted-foreground">
                  {isArabic ? 'إدارة تذاكر الدعم والمشاكل التقنية' : 'Manage Support Tickets & Technical Issues'}
                </p>
              </div>
            </div>

            {/* Left Section - Actions */}
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/admin-dashboard')}
                className="hidden sm:flex items-center gap-2 border-border hover:bg-accent/20 hover:border-accent/50 transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden lg:inline">{isArabic ? 'لوحة التحكم' : 'Dashboard'}</span>
              </Button>

              {/* Language Switcher */}
              <LanguageSwitcher />

              {/* Profile Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="flex items-center gap-2 hover:bg-accent/20 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center shadow-lg">
                      <Crown className="h-4 w-4 text-black" />
                    </div>
                    <ChevronDown className="h-3 w-3 hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="w-48 bg-black/95 backdrop-blur-xl border-border shadow-2xl"
                >
                  <DropdownMenuItem className="hover:bg-accent/20 cursor-pointer">
                    <User className="h-4 w-4 mr-2" />
                    {isArabic ? 'الملف الشخصي' : 'Profile'}
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-accent/20 cursor-pointer">
                    <Settings className="h-4 w-4 mr-2" />
                    {isArabic ? 'الإعدادات' : 'Settings'}
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-border" />
                  <DropdownMenuItem 
                    onClick={handleLogout} 
                    className="hover:bg-destructive/20 text-destructive cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isArabic ? 'تسجيل الخروج' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Main Content */}
      <main className="relative z-10 flex-1 overflow-x-hidden overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* Content Logo */}
          <div className="flex justify-center mb-8">
            <img src={contentLogo} alt="Logo" className="h-32 w-32 object-contain" />
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
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
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
              <FileText className="h-4 w-4 mr-2" />
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={isArabic ? 'البحث عن تذكرة...' : 'Search tickets...'}
                        className="pl-10 w-64 border-border bg-black/20 text-white"
                      />
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-border text-white hover:bg-accent/20"
                      onClick={() => toast.info(isArabic ? 'ميزة التصفية قريباً' : 'Filter feature coming soon')}
                    >
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
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-border text-white hover:bg-accent/20"
                          onClick={() => handleViewTicket(ticket)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          {isArabic ? 'عرض' : 'View'}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-border text-white hover:bg-accent/20"
                          onClick={() => toast.info(isArabic ? 'فتح محادثة التذكرة' : 'Opening ticket conversation')}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {isArabic ? 'رد' : 'Reply'}
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
                    <Label className="text-white">{isArabic ? 'العميل' : 'Client'}</Label>
                    <Input
                      placeholder={isArabic ? 'اسم العميل' : 'Client name'}
                      className="border-border bg-black/20 text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">{isArabic ? 'نوع المشكلة' : 'Issue Type'}</Label>
                    <Select>
                      <SelectTrigger className="border-border bg-black/20 text-white">
                        <SelectValue placeholder={isArabic ? 'اختر النوع' : 'Select type'} />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-border text-white">
                        <SelectItem value="technical">{isArabic ? 'تقني' : 'Technical'}</SelectItem>
                        <SelectItem value="financial">{isArabic ? 'حسابي' : 'Financial'}</SelectItem>
                        <SelectItem value="feature">{isArabic ? 'طلب ميزة' : 'Feature Request'}</SelectItem>
                        <SelectItem value="other">{isArabic ? 'أخرى' : 'Other'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white">{isArabic ? 'الأولوية' : 'Priority'}</Label>
                    <Select>
                      <SelectTrigger className="border-border bg-black/20 text-white">
                        <SelectValue placeholder={isArabic ? 'اختر الأولوية' : 'Select priority'} />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-border text-white">
                        <SelectItem value="critical">{isArabic ? 'حرج' : 'Critical'}</SelectItem>
                        <SelectItem value="high">{isArabic ? 'عالي' : 'High'}</SelectItem>
                        <SelectItem value="medium">{isArabic ? 'متوسط' : 'Medium'}</SelectItem>
                        <SelectItem value="low">{isArabic ? 'منخفض' : 'Low'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white">{isArabic ? 'القسم المرتبط' : 'Related Department'}</Label>
                    <Select>
                      <SelectTrigger className="border-border bg-black/20 text-white">
                        <SelectValue placeholder={isArabic ? 'اختر القسم' : 'Select department'} />
                      </SelectTrigger>
                      <SelectContent className="bg-black/95 border-border text-white">
                        <SelectItem value="dashboard">{isArabic ? 'لوحة التحكم' : 'Dashboard'}</SelectItem>
                        <SelectItem value="clients">{isArabic ? 'العملاء' : 'Clients'}</SelectItem>
                        <SelectItem value="system">{isArabic ? 'إدارة النظام' : 'System'}</SelectItem>
                        <SelectItem value="reports">{isArabic ? 'التقارير' : 'Reports'}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label className="text-white">{isArabic ? 'عنوان التذكرة' : 'Ticket Title'}</Label>
                  <Input
                    placeholder={isArabic ? 'وصف موجز للمشكلة' : 'Brief description of the issue'}
                    className="border-border bg-black/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">{isArabic ? 'تفاصيل المشكلة' : 'Issue Details'}</Label>
                  <Textarea
                    placeholder={isArabic ? 'اشرح المشكلة بالتفصيل...' : 'Explain the issue in detail...'}
                    rows={5}
                    className="border-border bg-black/20 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white">{isArabic ? 'المرفقات' : 'Attachments'}</Label>
                  <Button 
                    variant="outline" 
                    className="w-full border-border text-white hover:bg-accent/20"
                    onClick={() => toast.info(isArabic ? 'ميزة رفع الملفات قريباً' : 'File upload feature coming soon')}
                  >
                    <Paperclip className="h-4 w-4 mr-2" />
                    {isArabic ? 'إرفاق ملفات' : 'Attach Files'}
                  </Button>
                </div>
                <div className="flex justify-end space-x-2 space-x-reverse">
                  <Button 
                    variant="outline" 
                    className="border-border text-white hover:bg-accent/20"
                    onClick={() => setActiveTab('tickets')}
                  >
                    {isArabic ? 'إلغاء' : 'Cancel'}
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-accent to-accent hover:from-accent/90 hover:to-accent/90 text-black"
                    onClick={handleSubmitTicket}
                  >
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
                    <p className="text-sm text-muted-foreground">{isArabic ? 'متوسط وقت الرد' : 'Average Response Time'}</p>
                  </div>
                  <div className="text-center p-6 border border-border rounded-lg">
                    <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-white">255</p>
                    <p className="text-sm text-muted-foreground">{isArabic ? 'تذاكر محلولة' : 'Resolved Tickets'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Reports and AI Assistant Sections */}
        <div className="grid lg:grid-cols-2 gap-6">
          <ReportsSection
            title={isArabic ? 'تقارير الدعم الفني' : 'Technical Support Reports'}
            description={isArabic ? 'تقارير تفصيلية عن التذاكر والأداء' : 'Detailed reports on tickets and performance'}
          />
          <AIAssistant
            title={isArabic ? 'المساعد الذكي للدعم الفني' : 'Technical Support AI Assistant'}
            placeholder={isArabic ? 'اسأل عن التذاكر والمشاكل...' : 'Ask about tickets and issues...'}
          />
        </div>
        </div>
      </main>

      {/* Ticket Details Dialog */}
      <Dialog open={isTicketDetailsDialogOpen} onOpenChange={setIsTicketDetailsDialogOpen}>
        <DialogContent className="bg-black/95 border-border text-white max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isArabic ? 'تفاصيل التذكرة' : 'Ticket Details'}</DialogTitle>
          </DialogHeader>
          {selectedTicket && (
            <div className="space-y-6">
              {/* Ticket Header */}
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{selectedTicket.title}</h3>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
                      {selectedTicket.ticketNumber}
                    </Badge>
                    {getStatusBadge(selectedTicket.status)}
                    {getPriorityBadge(selectedTicket.priority)}
                  </div>
                </div>
                <div className="flex space-x-2 space-x-reverse">
                  <Select onValueChange={handleUpdateStatus}>
                    <SelectTrigger className="bg-black/20 border-border text-white w-48">
                      <SelectValue placeholder={isArabic ? 'تغيير الحالة' : 'Change Status'} />
                    </SelectTrigger>
                    <SelectContent className="bg-black/95 border-border text-white">
                      <SelectItem value="new">{isArabic ? 'جديد' : 'New'}</SelectItem>
                      <SelectItem value="in_progress">{isArabic ? 'تحت المعالجة' : 'In Progress'}</SelectItem>
                      <SelectItem value="resolved">{isArabic ? 'تم الحل' : 'Resolved'}</SelectItem>
                      <SelectItem value="closed">{isArabic ? 'مغلق' : 'Closed'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Ticket Info */}
              <div className="grid grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-black/20">
                <div>
                  <p className="text-sm text-muted-foreground">{isArabic ? 'العميل' : 'Client'}</p>
                  <p className="text-white">{selectedTicket.client}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isArabic ? 'النوع' : 'Category'}</p>
                  <p className="text-white">{selectedTicket.category}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isArabic ? 'التاريخ' : 'Date'}</p>
                  <p className="text-white">{selectedTicket.createdDate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{isArabic ? 'المسؤول' : 'Assigned To'}</p>
                  <p className="text-white">{selectedTicket.assignedTo}</p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="font-semibold">{isArabic ? 'الوصف' : 'Description'}</h4>
                <p className="text-muted-foreground p-4 border border-border rounded-lg bg-black/20">
                  {selectedTicket.description}
                </p>
              </div>

              {/* Comments Section */}
              <div className="space-y-4">
                <h4 className="font-semibold">{isArabic ? 'التعليقات والتحديثات' : 'Comments & Updates'}</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {/* Sample Comment */}
                  <div className="p-3 border border-border rounded-lg bg-black/20">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-sm">{selectedTicket.assignedTo}</p>
                      <p className="text-xs text-muted-foreground">{selectedTicket.lastUpdate}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{isArabic ? 'جاري العمل على حل المشكلة' : 'Working on resolving the issue'}</p>
                  </div>
                </div>

                {/* Add Comment */}
                <div className="flex items-end space-x-2 space-x-reverse">
                  <div className="flex-1">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={isArabic ? 'أضف تعليق أو تحديث...' : 'Add a comment or update...'}
                      className="bg-black/20 border-border text-white"
                    />
                  </div>
                  <Button onClick={handleAddComment} className="bg-gradient-to-r from-accent to-accent text-black">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTicketDetailsDialogOpen(false)} className="border-border text-white">
              {isArabic ? 'إغلاق' : 'Close'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
