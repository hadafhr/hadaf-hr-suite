import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  FileText, 
  Calendar, 
  DollarSign, 
  Target, 
  GraduationCap, 
  MessageSquare, 
  Shield, 
  Brain,
  Clock,
  Plus,
  Bell,
  Settings as SettingsIcon
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { PatternBackground } from '@/components/PatternBackground';

export const ECSS = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');

  const dashboardCards = [
    {
      title: t('dashboard.leave_balance'),
      value: '25 days',
      icon: Calendar,
      color: 'bg-primary'
    },
    {
      title: t('dashboard.pending_approvals'),
      value: '3 requests',
      icon: Clock,
      color: 'bg-warning'
    },
    {
      title: t('payroll.salary'),
      value: 'SAR 12,000',
      icon: DollarSign,
      color: 'bg-success'
    },
    {
      title: t('training.courses'),
      value: '2 enrolled',
      icon: GraduationCap,
      color: 'bg-accent'
    }
  ];

  const quickActions = [
    { label: t('requests.new'), icon: Plus, action: () => {} },
    { label: t('attendance.clock_in'), icon: Clock, action: () => {} },
    { label: t('payroll.payslip'), icon: FileText, action: () => {} },
    { label: t('training.courses'), icon: GraduationCap, action: () => {} }
  ];

  const recentRequests = [
    {
      id: 1,
      type: t('requests.leave'),
      status: 'pending',
      date: '2025-01-10',
      description: 'Annual leave for vacation'
    },
    {
      id: 2,
      type: t('requests.salary_certificate'),
      status: 'approved',
      date: '2025-01-08',
      description: 'Salary certificate for bank loan'
    },
    {
      id: 3,
      type: t('requests.training'),
      status: 'approved',
      date: '2025-01-05',
      description: 'Leadership development course'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: t('status.pending'), variant: 'secondary' as const },
      approved: { label: t('status.approved'), variant: 'default' as const },
      rejected: { label: t('status.rejected'), variant: 'destructive' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background relative" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <PatternBackground opacity={0.02} size={120} />
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/assets/bud-logo.png" alt="BOOD HR" className="h-8" />
            <h1 className="text-xl font-bold text-primary">E-CSS Portal</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <SettingsIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="text-sm font-medium">Ahmed Al-Rashid</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-8 lg:w-auto lg:grid-cols-none lg:flex">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.dashboard')}</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.profile')}</span>
            </TabsTrigger>
            <TabsTrigger value="requests" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.requests')}</span>
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.attendance')}</span>
            </TabsTrigger>
            <TabsTrigger value="payroll" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.payroll')}</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.performance')}</span>
            </TabsTrigger>
            <TabsTrigger value="training" className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.training')}</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.ai')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">{t('dashboard.welcome')}, Ahmed!</h2>
              <Badge variant="outline" className="text-sm">
                {new Date().toLocaleDateString(i18n.language === 'ar' ? 'ar-SA' : 'en-US')}
              </Badge>
            </div>

            {/* Dashboard Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {dashboardCards.map((card, index) => (
                <Card key={index} className="dashboard-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{card.title}</p>
                        <p className="text-2xl font-bold mt-1">{card.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${card.color}`}>
                        <card.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{t('dashboard.quick_actions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-auto p-4 flex flex-col items-center gap-2"
                      onClick={action.action}
                    >
                      <action.icon className="h-6 w-6" />
                      <span className="text-sm">{action.label}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('dashboard.recent_activity')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentRequests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{request.type}</p>
                          <p className="text-sm text-muted-foreground">{request.description}</p>
                          <p className="text-xs text-muted-foreground">{request.date}</p>
                        </div>
                        {getStatusBadge(request.status)}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('performance.goals')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Sales Target</span>
                        <span>75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Training Hours</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Project Completion</span>
                        <span>90%</span>
                      </div>
                      <Progress value={90} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tabs content would be implemented similarly */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>{t('employee.profile')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Profile management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>{t('nav.requests')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Request management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle>{t('nav.attendance')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Attendance tracking interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll">
            <Card>
              <CardHeader>
                <CardTitle>{t('nav.payroll')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Payroll information interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>{t('nav.performance')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Performance management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>{t('nav.training')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Training management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>{t('ai.assistant')}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>AI Assistant interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
