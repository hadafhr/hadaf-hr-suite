import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Link, 
  Upload, 
  Download, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  RefreshCw,
  FileText,
  Send,
  Settings,
  Eye,
  Calendar,
  Users,
  BarChart3,
  Shield
} from 'lucide-react';

interface QiwaConnection {
  isConnected: boolean;
  companyId?: string;
  lastSync?: Date;
  status: 'active' | 'inactive' | 'error';
  apiVersion: string;
}

interface TrainingRecord {
  id: string;
  employeeId: string;
  employeeName: string;
  courseTitle: string;
  trainingType: 'internal' | 'external';
  startDate: Date;
  endDate: Date;
  hours: number;
  status: 'completed' | 'in_progress' | 'failed';
  certificateUrl?: string;
  qiwaStatus: 'synced' | 'pending' | 'failed';
  lastSyncAttempt?: Date;
  syncError?: string;
}

interface ComplianceReport {
  id: string;
  month: string;
  totalEmployees: number;
  trainedEmployees: number;
  requiredHours: number;
  completedHours: number;
  complianceRate: number;
  submissionStatus: 'draft' | 'submitted' | 'approved' | 'rejected';
  submissionDate?: Date;
}

export const QiwaIntegration = () => {
  const { toast } = useToast();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [selectedRecords, setSelectedRecords] = useState<string[]>([]);
  
  const [connectionSettings, setConnectionSettings] = useState({
    companyId: '',
    apiKey: '',
    environment: 'production'
  });

  const [qiwaConnection] = useState<QiwaConnection>({
    isConnected: true,
    companyId: 'CR-7001234567',
    lastSync: new Date('2024-03-20T10:30:00'),
    status: 'active',
    apiVersion: 'v2.1'
  });

  const [trainingRecords] = useState<TrainingRecord[]>([
    {
      id: '1',
      employeeId: 'EMP001',
      employeeName: 'محمد أحمد العلي',
      courseTitle: 'مهارات القيادة الفعالة',
      trainingType: 'internal',
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-03-15'),
      hours: 20,
      status: 'completed',
      certificateUrl: '#',
      qiwaStatus: 'synced',
      lastSyncAttempt: new Date('2024-03-16T09:00:00')
    },
    {
      id: '2',
      employeeId: 'EMP002',
      employeeName: 'فاطمة سالم',
      courseTitle: 'إدارة الوقت والإنتاجية',
      trainingType: 'external',
      startDate: new Date('2024-03-10'),
      endDate: new Date('2024-03-20'),
      hours: 15,
      status: 'completed',
      certificateUrl: '#',
      qiwaStatus: 'pending',
      lastSyncAttempt: new Date('2024-03-21T14:30:00'),
      syncError: 'فشل في التحقق من بيانات الموظف'
    },
    {
      id: '3',
      employeeId: 'EMP003',
      employeeName: 'أحمد محمد',
      courseTitle: 'التسويق الرقمي المتقدم',
      trainingType: 'internal',
      startDate: new Date('2024-03-15'),
      endDate: new Date('2024-03-30'),
      hours: 25,
      status: 'in_progress',
      qiwaStatus: 'pending'
    }
  ]);

  const [complianceReports] = useState<ComplianceReport[]>([
    {
      id: '1',
      month: 'مارس 2024',
      totalEmployees: 150,
      trainedEmployees: 142,
      requiredHours: 3000,
      completedHours: 2840,
      complianceRate: 94.7,
      submissionStatus: 'approved',
      submissionDate: new Date('2024-04-01')
    },
    {
      id: '2',
      month: 'فبراير 2024',
      totalEmployees: 148,
      trainedEmployees: 135,
      requiredHours: 2960,
      completedHours: 2700,
      complianceRate: 91.2,
      submissionStatus: 'approved',
      submissionDate: new Date('2024-03-01')
    },
    {
      id: '3',
      month: 'أبريل 2024',
      totalEmployees: 152,
      trainedEmployees: 98,
      requiredHours: 3040,
      completedHours: 1960,
      complianceRate: 64.5,
      submissionStatus: 'draft'
    }
  ]);

  const handleSyncRecords = async (recordIds?: string[]) => {
    setIsSyncing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const targetRecords = recordIds || selectedRecords;
    
    toast({
      title: "تم المزامنة بنجاح",
      description: `تم مزامنة ${targetRecords.length} سجل تدريبي مع منصة قوى`
    });
    
    setIsSyncing(false);
    setSelectedRecords([]);
  };

  const handleBulkSync = () => {
    if (selectedRecords.length === 0) {
      toast({
        title: "لم يتم تحديد سجلات",
        description: "يرجى تحديد السجلات المراد مزامنتها",
        variant: "destructive"
      });
      return;
    }
    
    handleSyncRecords();
  };

  const handleSubmitReport = (reportId: string) => {
    const report = complianceReports.find(r => r.id === reportId);
    if (!report) return;
    
    toast({
      title: "تم إرسال التقرير",
      description: `تم إرسال تقرير ${report.month} إلى منصة قوى للمراجعة`
    });
  };

  const getConnectionStatusBadge = (status: QiwaConnection['status']) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      active: 'نشط',
      inactive: 'غير نشط',
      error: 'خطأ'
    };

    return <Badge className={variants[status]}>{labels[status]}</Badge>;
  };

  const getSyncStatusIcon = (status: TrainingRecord['qiwaStatus']) => {
    switch (status) {
      case 'synced':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getSyncStatusBadge = (status: TrainingRecord['qiwaStatus']) => {
    const variants = {
      synced: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      failed: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      synced: 'مُزامن',
      pending: 'في الانتظار',
      failed: 'فشل'
    };

    return <Badge className={variants[status]}>{labels[status]}</Badge>;
  };

  const getReportStatusBadge = (status: ComplianceReport['submissionStatus']) => {
    const variants = {
      draft: 'bg-gray-100 text-gray-800',
      submitted: 'bg-blue-100 text-blue-800',
      approved: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    
    const labels = {
      draft: 'مسودة',
      submitted: 'مُرسل',
      approved: 'مُوافق عليه',
      rejected: 'مرفوض'
    };

    return <Badge className={variants[status]}>{labels[status]}</Badge>;
  };

  const toggleRecordSelection = (recordId: string) => {
    setSelectedRecords(prev =>
      prev.includes(recordId)
        ? prev.filter(id => id !== recordId)
        : [...prev, recordId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 p-3 rounded-lg">
            <Link className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">التكامل مع منصة قوى</h1>
            <p className="text-muted-foreground">إرسال بيانات الدورات والساعات التدريبية وتقارير الامتثال</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Settings className="ml-2 h-4 w-4" />
                الإعدادات
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>إعدادات الاتصال بمنصة قوى</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="companyId">رقم المنشأة</Label>
                  <Input
                    id="companyId"
                    value={connectionSettings.companyId}
                    onChange={(e) => setConnectionSettings({ ...connectionSettings, companyId: e.target.value })}
                    placeholder="CR-7001234567"
                  />
                </div>
                <div>
                  <Label htmlFor="apiKey">مفتاح API</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={connectionSettings.apiKey}
                    onChange={(e) => setConnectionSettings({ ...connectionSettings, apiKey: e.target.value })}
                    placeholder="أدخل مفتاح API"
                  />
                </div>
                <div>
                  <Label htmlFor="environment">البيئة</Label>
                  <Select value={connectionSettings.environment} onValueChange={(value) => setConnectionSettings({ ...connectionSettings, environment: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="production">الإنتاج</SelectItem>
                      <SelectItem value="staging">الاختبار</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  حفظ الإعدادات
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button onClick={() => handleSyncRecords([])} disabled={isSyncing}>
            <RefreshCw className={`ml-2 h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'جاري المزامنة...' : 'مزامنة الكل'}
          </Button>
        </div>
      </div>

      {/* Connection Status */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${
                qiwaConnection.status === 'active' ? 'bg-green-500' : 
                qiwaConnection.status === 'inactive' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <div>
                <h3 className="font-semibold">حالة الاتصال مع منصة قوى</h3>
                <p className="text-sm text-muted-foreground">
                  {qiwaConnection.isConnected ? 'متصل' : 'غير متصل'} • 
                  رقم المنشأة: {qiwaConnection.companyId}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {getConnectionStatusBadge(qiwaConnection.status)}
              <div className="text-sm text-muted-foreground text-right">
                <div>الإصدار: {qiwaConnection.apiVersion}</div>
                {qiwaConnection.lastSync && (
                  <div>آخر مزامنة: {qiwaConnection.lastSync.toLocaleString('ar-SA')}</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {trainingRecords.filter(r => r.qiwaStatus === 'synced').length}
            </div>
            <p className="text-sm text-muted-foreground">سجلات مُزامنة</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {trainingRecords.filter(r => r.qiwaStatus === 'pending').length}
            </div>
            <p className="text-sm text-muted-foreground">في الانتظار</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {trainingRecords.filter(r => r.qiwaStatus === 'failed').length}
            </div>
            <p className="text-sm text-muted-foreground">فشل المزامنة</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(complianceReports.reduce((sum, r) => sum + r.complianceRate, 0) / complianceReports.length)}%
            </div>
            <p className="text-sm text-muted-foreground">معدل الامتثال</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="records" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="records">سجلات التدريب ({trainingRecords.length})</TabsTrigger>
          <TabsTrigger value="compliance">تقارير الامتثال</TabsTrigger>
          <TabsTrigger value="logs">سجل العمليات</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-4">
          {/* Bulk Actions */}
          {selectedRecords.length > 0 && (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">تم تحديد {selectedRecords.length} سجل</span>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleBulkSync} disabled={isSyncing}>
                      <Upload className="ml-2 h-4 w-4" />
                      مزامنة المحدد
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setSelectedRecords([])}>
                      إلغاء التحديد
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Training Records */}
          <div className="space-y-4">
            {trainingRecords.map((record) => (
              <Card key={record.id} className={`transition-all ${
                selectedRecords.includes(record.id) ? 'ring-2 ring-primary' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedRecords.includes(record.id)}
                        onChange={() => toggleRecordSelection(record.id)}
                        className="rounded border-gray-300"
                      />
                      <div>
                        <h4 className="font-medium">{record.employeeName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {record.courseTitle} • {record.hours} ساعة
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {record.startDate.toLocaleDateString('ar-SA')} - {record.endDate.toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          {getSyncStatusIcon(record.qiwaStatus)}
                          {getSyncStatusBadge(record.qiwaStatus)}
                        </div>
                        {record.lastSyncAttempt && (
                          <p className="text-xs text-muted-foreground mt-1">
                            آخر محاولة: {record.lastSyncAttempt.toLocaleString('ar-SA')}
                          </p>
                        )}
                        {record.syncError && (
                          <p className="text-xs text-red-600 mt-1 max-w-40 truncate">
                            خطأ: {record.syncError}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleSyncRecords([record.id])}
                          disabled={isSyncing || record.qiwaStatus === 'synced'}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {record.syncError && (
                    <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="font-medium">خطأ في المزامنة</span>
                      </div>
                      <p className="text-sm text-red-600 mt-1">{record.syncError}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <div className="grid gap-4">
            {complianceReports.map((report) => (
              <Card key={report.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{report.month}</CardTitle>
                    {getReportStatusBadge(report.submissionStatus)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold">{report.totalEmployees}</div>
                      <p className="text-xs text-muted-foreground">إجمالي الموظفين</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold text-green-600">{report.trainedEmployees}</div>
                      <p className="text-xs text-muted-foreground">موظفين مُدربين</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className="text-xl font-bold">{report.completedHours}</div>
                      <p className="text-xs text-muted-foreground">ساعات مُنجزة</p>
                    </div>
                    <div className="text-center p-3 border rounded-lg">
                      <div className={`text-xl font-bold ${
                        report.complianceRate >= 90 ? 'text-green-600' :
                        report.complianceRate >= 70 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {report.complianceRate}%
                      </div>
                      <p className="text-xs text-muted-foreground">معدل الامتثال</p>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">تقدم الساعات التدريبية</span>
                      <span className="text-sm">{report.completedHours}/{report.requiredHours} ساعة</span>
                    </div>
                    <Progress value={(report.completedHours / report.requiredHours) * 100} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div>
                      {report.submissionDate && (
                        <p className="text-sm text-muted-foreground">
                          تم الإرسال في: {report.submissionDate.toLocaleDateString('ar-SA')}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <FileText className="ml-2 h-4 w-4" />
                        عرض التفاصيل
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="ml-2 h-4 w-4" />
                        تصدير
                      </Button>
                      {report.submissionStatus === 'draft' && (
                        <Button size="sm" onClick={() => handleSubmitReport(report.id)}>
                          <Send className="ml-2 h-4 w-4" />
                          إرسال إلى قوى
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>سجل عمليات المزامنة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    time: '2024-03-21 14:30',
                    action: 'مزامنة سجل تدريبي',
                    details: 'فاطمة سالم - إدارة الوقت والإنتاجية',
                    status: 'فشل',
                    error: 'فشل في التحقق من بيانات الموظف'
                  },
                  {
                    time: '2024-03-20 10:30',
                    action: 'مزامنة شاملة',
                    details: '15 سجل تدريبي',
                    status: 'نجح'
                  },
                  {
                    time: '2024-03-19 16:45',
                    action: 'إرسال تقرير امتثال',
                    details: 'مارس 2024',
                    status: 'نجح'
                  }
                ].map((log, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 border rounded-lg">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      log.status === 'نجح' ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{log.action}</p>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{log.details}</p>
                      {log.error && (
                        <p className="text-sm text-red-600 mt-1">{log.error}</p>
                      )}
                    </div>
                    <Badge variant={log.status === 'نجح' ? 'default' : 'destructive'}>
                      {log.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};