import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  MessageSquare, AlertCircle, CheckCircle, Clock, 
  FileText, Users, TrendingUp, Star, Filter,
  Plus, Eye, Edit, Trash2, Search
} from 'lucide-react';

interface ComplaintsManagementProps {
  onBack: () => void;
}

const ComplaintsManagement = ({ onBack }: ComplaintsManagementProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNewComplaint, setShowNewComplaint] = useState(false);

  const complaintsMetrics = [
    {
      title: 'إجمالي الشكاوى',
      value: '247',
      change: '+12',
      trend: 'up',
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'text-blue-600'
    },
    {
      title: 'قيد المراجعة',
      value: '45',
      change: '+8',
      trend: 'up',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-yellow-600'
    },
    {
      title: 'تم الحل',
      value: '189',
      change: '+15',
      trend: 'up',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-green-600'
    },
    {
      title: 'متوسط وقت الحل',
      value: '3.2 يوم',
      change: '-0.5 يوم',
      trend: 'down',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-purple-600'
    }
  ];

  const complaints = [
    {
      id: 'COMP-2024-001',
      title: 'تأخير في صرف الراتب',
      description: 'لم يتم صرف راتب شهر يناير في الموعد المحدد',
      submittedBy: 'أحمد محمد العلي',
      department: 'المالية',
      category: 'رواتب ومكافآت',
      priority: 'عالية',
      status: 'قيد المراجعة',
      submittedDate: '2024-01-20',
      assignedTo: 'سارا أحمد',
      expectedResolution: '2024-01-25',
      attachments: ['كشف_راتب.pdf']
    },
    {
      id: 'COMP-2024-002',
      title: 'مشكلة في نظام الحضور',
      description: 'النظام لا يسجل الحضور بشكل صحيح',
      submittedBy: 'فاطمة عبدالله',
      department: 'تقنية المعلومات',
      category: 'أنظمة وتقنية',
      priority: 'متوسطة',
      status: 'تم الحل',
      submittedDate: '2024-01-18',
      assignedTo: 'محمد السالم',
      expectedResolution: '2024-01-22',
      attachments: []
    },
    {
      id: 'COMP-2024-003',
      title: 'بيئة عمل غير صحية',
      description: 'مشكلة في التكييف والتهوية في الطابق الثاني',
      submittedBy: 'خالد أحمد',
      department: 'الخدمات الإدارية',
      category: 'بيئة العمل',
      priority: 'عالية',
      status: 'جديدة',
      submittedDate: '2024-01-22',
      assignedTo: 'نورا المطيري',
      expectedResolution: '2024-01-30',
      attachments: ['صور_المكتب.jpg']
    }
  ];

  const complaintCategories = [
    { id: 'salary', name: 'رواتب ومكافآت', count: 45, color: 'bg-blue-100 text-blue-800' },
    { id: 'workplace', name: 'بيئة العمل', count: 38, color: 'bg-green-100 text-green-800' },
    { id: 'systems', name: 'أنظمة وتقنية', count: 29, color: 'bg-purple-100 text-purple-800' },
    { id: 'management', name: 'إدارة ومشرفين', count: 22, color: 'bg-yellow-100 text-yellow-800' },
    { id: 'hr', name: 'موارد بشرية', count: 18, color: 'bg-red-100 text-red-800' },
    { id: 'other', name: 'أخرى', count: 12, color: 'bg-gray-100 text-gray-800' }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'جديدة': 'bg-blue-100 text-blue-800',
      'قيد المراجعة': 'bg-yellow-100 text-yellow-800',
      'تم الحل': 'bg-green-100 text-green-800',
      'مرفوضة': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'عالية': 'bg-red-100 text-red-800',
      'متوسطة': 'bg-yellow-100 text-yellow-800',
      'منخفضة': 'bg-green-100 text-green-800'
    };
    return colors[priority] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="p-6 space-y-6 bg-gradient-to-br from-background via-background/95 to-primary/5 min-h-screen">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={onBack}>←</Button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              إدارة الشكاوى والتظلمات
            </h1>
            <p className="text-muted-foreground">
              نظام شامل لإدارة ومتابعة شكاوى الموظفين
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="w-4 h-4" />
            فلترة
          </Button>
          <Button 
            className="gap-2 bg-gradient-to-r from-primary to-primary/80"
            onClick={() => setShowNewComplaint(true)}
          >
            <Plus className="w-4 h-4" />
            شكوى جديدة
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {complaintsMetrics.map((metric, index) => (
          <Card key={index} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-primary">{metric.value}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                    metric.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    <TrendingUp className={`w-3 h-3 ${metric.trend === 'down' ? 'rotate-180' : ''}`} />
                    {metric.change}
                  </div>
                  <div className={`mt-2 ${metric.color}`}>
                    {metric.icon}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-muted/30">
          <TabsTrigger value="overview" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            نظرة عامة
          </TabsTrigger>
          <TabsTrigger value="complaints" className="gap-2">
            <FileText className="w-4 h-4" />
            جميع الشكاوى
          </TabsTrigger>
          <TabsTrigger value="categories" className="gap-2">
            <Users className="w-4 h-4" />
            تصنيف الشكاوى
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <TrendingUp className="w-4 h-4" />
            التحليلات
          </TabsTrigger>
          <TabsTrigger value="reports" className="gap-2">
            <Star className="w-4 h-4" />
            التقارير
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  إحصائيات الأداء
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'معدل حل الشكاوى', value: 89, target: 90 },
                    { label: 'رضا العملاء', value: 92, target: 85 },
                    { label: 'الاستجابة السريعة', value: 78, target: 80 },
                    { label: 'الشكاوى المتكررة', value: 15, target: 10 }
                  ].map((metric, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{metric.label}</span>
                        <span className="font-medium">{metric.value}% / {metric.target}%</span>
                      </div>
                      <Progress value={metric.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  الشكاوى الأحدث
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {complaints.slice(0, 3).map((complaint) => (
                    <div key={complaint.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">{complaint.title}</h4>
                        <p className="text-xs text-muted-foreground">{complaint.submittedBy}</p>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(complaint.status)} variant="secondary">
                          {complaint.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{complaint.submittedDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="complaints" className="space-y-6">
          <div className="flex gap-4 items-center p-4 bg-card rounded-lg border">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="البحث في الشكاوى..." className="pl-10" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="new">جديدة</SelectItem>
                <SelectItem value="review">قيد المراجعة</SelectItem>
                <SelectItem value="resolved">تم الحل</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {complaints.map((complaint) => (
              <Card key={complaint.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-primary">{complaint.title}</h3>
                        <Badge className={getStatusColor(complaint.status)} variant="secondary">
                          {complaint.status}
                        </Badge>
                        <Badge className={getPriorityColor(complaint.priority)} variant="secondary">
                          {complaint.priority}
                        </Badge>
                      </div>
                      
                      <p className="text-muted-foreground mb-4">{complaint.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">مقدم الشكوى:</span>
                          <p className="font-medium">{complaint.submittedBy}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">القسم:</span>
                          <p className="font-medium">{complaint.department}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">المسؤول:</span>
                          <p className="font-medium">{complaint.assignedTo}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">تاريخ التقديم:</span>
                          <p className="font-medium">{complaint.submittedDate}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">الحل المتوقع:</span>
                          <p className="font-medium">{complaint.expectedResolution}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">رقم الشكوى:</span>
                          <p className="font-medium">{complaint.id}</p>
                        </div>
                      </div>
                      
                      {complaint.attachments.length > 0 && (
                        <div className="mt-3">
                          <span className="text-sm text-muted-foreground">المرفقات:</span>
                          <div className="flex gap-2 mt-1">
                            {complaint.attachments.map((attachment, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {attachment}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" className="gap-2">
                        <Eye className="w-3 h-3" />
                        عرض
                      </Button>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Edit className="w-3 h-3" />
                        تعديل
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {complaintCategories.map((category) => (
              <Card key={category.id} className="border-0 shadow-lg hover:shadow-xl transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-primary">{category.name}</h3>
                    <Badge className={category.color} variant="secondary">
                      {category.count}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>النسبة من الإجمالي:</span>
                      <span className="font-medium">{Math.round((category.count / 164) * 100)}%</span>
                    </div>
                    <Progress value={(category.count / 164) * 100} className="h-2" />
                  </div>
                  
                  <Button size="sm" className="w-full mt-4">
                    عرض التفاصيل
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* New Complaint Modal */}
      {showNewComplaint && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl mx-4">
            <CardHeader>
              <CardTitle>تقديم شكوى جديدة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">عنوان الشكوى</label>
                <Input placeholder="اكتب عنوان الشكوى..." />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">الفئة</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الفئة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">رواتب ومكافآت</SelectItem>
                      <SelectItem value="workplace">بيئة العمل</SelectItem>
                      <SelectItem value="systems">أنظمة وتقنية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">الأولوية</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الأولوية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">عالية</SelectItem>
                      <SelectItem value="medium">متوسطة</SelectItem>
                      <SelectItem value="low">منخفضة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">وصف الشكوى</label>
                <Textarea placeholder="اكتب وصفاً تفصيلياً للشكوى..." rows={4} />
              </div>
              
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowNewComplaint(false)}>
                  إلغاء
                </Button>
                <Button onClick={() => setShowNewComplaint(false)}>
                  تقديم الشكوى
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ComplaintsManagement;