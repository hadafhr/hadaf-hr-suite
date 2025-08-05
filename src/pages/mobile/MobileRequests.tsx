import React, { useState } from 'react';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileSidebar } from '@/components/mobile/MobileSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTranslation } from 'react-i18next';
import { 
  Plus, 
  Calendar, 
  CreditCard, 
  FileText, 
  Plane, 
  Laptop,
  CheckCircle,
  AlertCircle,
  XCircle,
  Clock
} from 'lucide-react';

export const MobileRequests: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation();

  const requestTypes = [
    { id: 'leave', title: t('leaveRequest'), icon: Calendar, color: 'bg-blue-50 text-blue-600' },
    { id: 'salary', title: t('salaryCertificate'), icon: CreditCard, color: 'bg-green-50 text-green-600' },
    { id: 'advance', title: t('salaryAdvance'), icon: FileText, color: 'bg-orange-50 text-orange-600' },
    { id: 'trip', title: t('businessTrip'), icon: Plane, color: 'bg-purple-50 text-purple-600' },
    { id: 'equipment', title: t('equipmentRequest'), icon: Laptop, color: 'bg-red-50 text-red-600' },
    { id: 'attendance', title: t('attendanceModification'), icon: Clock, color: 'bg-yellow-50 text-yellow-600' }
  ];

  const requests = [
    {
      id: 1,
      type: t('leaveRequest'),
      description: 'إجازة سنوية - 5 أيام',
      status: 'pending',
      date: '2024-01-15',
      requestDate: '2024-01-10',
      icon: Calendar
    },
    {
      id: 2,
      type: t('salaryCertificate'),
      description: 'شهادة راتب للبنك',
      status: 'approved',
      date: '2024-01-14',
      requestDate: '2024-01-12',
      icon: CreditCard
    },
    {
      id: 3,
      type: t('attendanceModification'),
      description: 'تعديل وقت الدخول - 2024/01/08',
      status: 'rejected',
      date: '2024-01-13',
      requestDate: '2024-01-09',
      icon: Clock
    },
    {
      id: 4,
      type: t('equipmentRequest'),
      description: 'لابتوب جديد - Dell Latitude',
      status: 'approved',
      date: '2024-01-12',
      requestDate: '2024-01-05',
      icon: Laptop
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'rejected': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <AlertCircle className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const filterRequestsByStatus = (status: string) => {
    if (status === 'all') return requests;
    return requests.filter(request => request.status === status);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="p-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{t('requests')}</h1>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            {t('newRequest')}
          </Button>
        </div>

        {/* Quick Request Types */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">أنواع الطلبات</CardTitle>
            <CardDescription>اختر نوع الطلب المناسب</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {requestTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <Button
                    key={type.id}
                    variant="outline"
                    className="h-20 flex-col p-3"
                  >
                    <div className={`p-2 rounded-lg mb-2 ${type.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-xs font-medium text-center">{type.title}</span>
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Requests List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">طلباتي</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="text-xs">الكل</TabsTrigger>
                <TabsTrigger value="pending" className="text-xs">{t('pending')}</TabsTrigger>
                <TabsTrigger value="approved" className="text-xs">{t('approved')}</TabsTrigger>
                <TabsTrigger value="rejected" className="text-xs">{t('rejected')}</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-3 mt-4">
                {filterRequestsByStatus('all').map((request) => {
                  const Icon = request.icon;
                  return (
                    <div key={request.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{request.type}</h3>
                            <p className="text-sm text-muted-foreground">{request.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(request.status)}
                          <Badge className={getStatusColor(request.status)}>
                            {t(request.status)}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>تاريخ الطلب: {request.requestDate}</span>
                        <span>التاريخ المطلوب: {request.date}</span>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="pending" className="space-y-3 mt-4">
                {filterRequestsByStatus('pending').map((request) => {
                  const Icon = request.icon;
                  return (
                    <div key={request.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{request.type}</h3>
                            <p className="text-sm text-muted-foreground">{request.description}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {t(request.status)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="approved" className="space-y-3 mt-4">
                {filterRequestsByStatus('approved').map((request) => {
                  const Icon = request.icon;
                  return (
                    <div key={request.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{request.type}</h3>
                            <p className="text-sm text-muted-foreground">{request.description}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {t(request.status)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
              
              <TabsContent value="rejected" className="space-y-3 mt-4">
                {filterRequestsByStatus('rejected').map((request) => {
                  const Icon = request.icon;
                  return (
                    <div key={request.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-muted rounded-lg">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-medium">{request.type}</h3>
                            <p className="text-sm text-muted-foreground">{request.description}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(request.status)}>
                          {t(request.status)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <MobileNavigation />
    </div>
  );
};