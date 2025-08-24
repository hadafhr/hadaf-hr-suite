import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Building, 
  Users, 
  UserPlus, 
  DollarSign, 
  FileText, 
  Target, 
  GraduationCap, 
  AlertTriangle, 
  Shield, 
  BarChart3,
  Settings as SettingsIcon,
  Brain,
  Bell,
  Search,
  Filter,
  Download
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { PatternBackground } from '@/components/PatternBackground';

export const EIS = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('dashboard');

  const executiveMetrics = [
    {
      title: 'Total Employees',
      value: '1,247',
      change: '+5.2%',
      icon: Users,
      color: 'bg-primary'
    },
    {
      title: 'Monthly Payroll',
      value: 'SAR 2.8M',
      change: '+3.1%',
      icon: DollarSign,
      color: 'bg-success'
    },
    {
      title: 'Open Positions',
      value: '23',
      change: '-12%',
      icon: UserPlus,
      color: 'bg-warning'
    },
    {
      title: 'Training ROI',
      value: '312%',
      change: '+8.5%',
      icon: GraduationCap,
      color: 'bg-accent'
    }
  ];

  const pendingApprovals = [
    {
      id: 1,
      type: 'Leave Request',
      employee: 'Sarah Ahmed',
      department: 'Marketing',
      urgency: 'high',
      daysAgo: 2
    },
    {
      id: 2,
      type: 'Salary Advance',
      employee: 'Mohammed Ali',
      department: 'Sales',
      urgency: 'medium',
      daysAgo: 1
    },
    {
      id: 3,
      type: 'Training Request',
      employee: 'Fatima Hassan',
      department: 'HR',
      urgency: 'low',
      daysAgo: 3
    }
  ];

  const complianceAlerts = [
    {
      type: 'QIWA Sync',
      message: '3 employees pending QIWA update',
      severity: 'high',
      action: 'Update Now'
    },
    {
      type: 'GOSI Report',
      message: 'Monthly GOSI report due in 2 days',
      severity: 'medium',
      action: 'Generate'
    },
    {
      type: 'WPS Upload',
      message: 'WPS file ready for bank upload',
      severity: 'low',
      action: 'Upload'
    }
  ];

  const getUrgencyBadge = (urgency: string) => {
    const urgencyConfig = {
      high: { label: 'High', variant: 'destructive' as const },
      medium: { label: 'Medium', variant: 'secondary' as const },
      low: { label: 'Low', variant: 'outline' as const }
    };
    
    const config = urgencyConfig[urgency as keyof typeof urgencyConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getSeverityBadge = (severity: string) => {
    const severityConfig = {
      high: { variant: 'destructive' as const },
      medium: { variant: 'secondary' as const },
      low: { variant: 'outline' as const }
    };
    
    return <Badge variant={severityConfig[severity as keyof typeof severityConfig].variant}>
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </Badge>;
  };

  return (
    <div className="min-h-screen bg-background relative" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <PatternBackground opacity={0.015} size={140} />
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/assets/bud-logo.png" alt="BOOD HR" className="h-8" />
            <h1 className="text-xl font-bold text-primary">EIS Portal</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={t('common.search_placeholder')}
                className="pl-9 pr-4 py-2 border border-input rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <LanguageSwitcher />
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <SettingsIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Building className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Acme Corp</p>
                <p className="text-muted-foreground">HR Manager</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-10 lg:w-auto lg:grid-cols-none lg:flex">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.dashboard')}</span>
            </TabsTrigger>
            <TabsTrigger value="organization" className="flex items-center gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.organization')}</span>
            </TabsTrigger>
            <TabsTrigger value="recruitment" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.recruitment')}</span>
            </TabsTrigger>
            <TabsTrigger value="employees" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.employees')}</span>
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
            <TabsTrigger value="compliance" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.compliance')}</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.reports')}</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.ai')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Executive Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Executive Dashboard</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Executive Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {executiveMetrics.map((metric, index) => (
                <Card key={index} className="dashboard-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{metric.title}</p>
                        <p className="text-2xl font-bold mt-1">{metric.value}</p>
                        <p className="text-sm text-success mt-1">{metric.change}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${metric.color}`}>
                        <metric.icon className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Approvals */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Pending Approvals</CardTitle>
                  <Badge variant="secondary">{pendingApprovals.length}</Badge>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingApprovals.map((approval) => (
                      <div key={approval.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{approval.type}</p>
                            {getUrgencyBadge(approval.urgency)}
                          </div>
                          <p className="text-sm text-muted-foreground">{approval.employee}</p>
                          <p className="text-xs text-muted-foreground">{approval.department} • {approval.daysAgo} days ago</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button size="sm" variant="outline">Review</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Alerts */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Compliance Alerts</CardTitle>
                  <AlertTriangle className="h-5 w-5 text-warning" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {complianceAlerts.map((alert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium">{alert.type}</p>
                            {getSeverityBadge(alert.severity)}
                          </div>
                          <p className="text-sm text-muted-foreground">{alert.message}</p>
                        </div>
                        <Button size="sm" className="ml-4">
                          {alert.action}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* KPI Dashboard */}
            <Card>
              <CardHeader>
                <CardTitle>Key Performance Indicators</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold">Employee Satisfaction</h3>
                    <p className="text-3xl font-bold text-success mt-2">8.5/10</p>
                    <p className="text-sm text-muted-foreground">+0.3 from last month</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold">Turnover Rate</h3>
                    <p className="text-3xl font-bold text-primary mt-2">2.1%</p>
                    <p className="text-sm text-muted-foreground">-0.5% from last month</p>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <h3 className="text-lg font-semibold">Training Completion</h3>
                    <p className="text-3xl font-bold text-warning mt-2">87%</p>
                    <p className="text-sm text-muted-foreground">+12% from last month</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs would be implemented similarly */}
          <TabsContent value="organization">
            <Card>
              <CardHeader>
                <CardTitle>Organization Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Organization structure and management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recruitment">
            <Card>
              <CardHeader>
                <CardTitle>Recruitment Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Recruitment and hiring interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="employees">
            <Card>
              <CardHeader>
                <CardTitle>Employee Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Employee management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payroll">
            <Card>
              <CardHeader>
                <CardTitle>Payroll Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Payroll processing interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Performance evaluation interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training">
            <Card>
              <CardHeader>
                <CardTitle>Training Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Training programs interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Compliance tracking interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Reporting and analytics interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p>AI-powered insights and recommendations will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};
