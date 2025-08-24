import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Heart, 
  Users, 
  Target, 
  DollarSign, 
  Calendar, 
  Award, 
  BookOpen, 
  Eye,
  Shield,
  FileText,
  BarChart3,
  Settings as SettingsIcon,
  Bell,
  Handshake,
  Gift
} from 'lucide-react';
import { LanguageSwitcher } from '@/components/shared/LanguageSwitcher';
import { PatternBackground } from '@/components/PatternBackground';

export const NPCS = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('programs');

  const programMetrics = [
    {
      title: 'Active Programs',
      value: '12',
      change: '+2 this month',
      icon: Target,
      color: 'bg-primary'
    },
    {
      title: 'Active Volunteers',
      value: '156',
      change: '+23 this month',
      icon: Users,
      color: 'bg-success'
    },
    {
      title: 'Funded Positions',
      value: '43',
      change: '+5 this month',
      icon: Award,
      color: 'bg-warning'
    },
    {
      title: 'Monthly Budget',
      value: 'SAR 850K',
      change: '+8.2% utilization',
      icon: DollarSign,
      color: 'bg-accent'
    }
  ];

  const programs = [
    {
      id: 1,
      name: 'Youth Empowerment Initiative',
      type: 'Education',
      budget: 'SAR 120,000',
      volunteers: 25,
      funded_jobs: 8,
      status: 'active',
      progress: 75
    },
    {
      id: 2,
      name: 'Community Health Outreach',
      type: 'Healthcare',
      budget: 'SAR 200,000',
      volunteers: 40,
      funded_jobs: 12,
      status: 'active',
      progress: 60
    },
    {
      id: 3,
      name: 'Environmental Conservation',
      type: 'Environment',
      budget: 'SAR 90,000',
      volunteers: 18,
      funded_jobs: 5,
      status: 'planning',
      progress: 30
    }
  ];

  const volunteers = [
    {
      id: 1,
      name: 'Aisha Mohammed',
      program: 'Youth Empowerment',
      hours: 120,
      skills: ['Teaching', 'Mentoring'],
      status: 'active'
    },
    {
      id: 2,
      name: 'Omar Hassan',
      program: 'Health Outreach',
      hours: 85,
      skills: ['Medical', 'Community Relations'],
      status: 'active'
    },
    {
      id: 3,
      name: 'Fatima Al-Zahra',
      program: 'Environmental',
      hours: 95,
      skills: ['Project Management', 'Research'],
      status: 'active'
    }
  ];

  const donors = [
    {
      name: 'Al-Rajhi Foundation',
      type: 'Corporate',
      contribution: 'SAR 500,000',
      programs: 3,
      status: 'active'
    },
    {
      name: 'Ministry of Social Development',
      type: 'Government',
      contribution: 'SAR 300,000',
      programs: 2,
      status: 'active'
    },
    {
      name: 'Community Donors',
      type: 'Individual',
      contribution: 'SAR 150,000',
      programs: 5,
      status: 'active'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: 'Active', variant: 'default' as const },
      planning: { label: 'Planning', variant: 'secondary' as const },
      completed: { label: 'Completed', variant: 'outline' as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-background relative" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <PatternBackground opacity={0.02} size={130} />
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/assets/bud-logo.png" alt="BOOD HR" className="h-8" />
            <h1 className="text-xl font-bold text-primary">NPCS Portal</h1>
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
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <div className="text-sm">
                <p className="font-medium">Hope Foundation</p>
                <p className="text-muted-foreground">Program Manager</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Navigation Tabs */}
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:grid-cols-none lg:flex">
            <TabsTrigger value="programs" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nonprofit.programs')}</span>
            </TabsTrigger>
            <TabsTrigger value="volunteers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nonprofit.volunteers')}</span>
            </TabsTrigger>
            <TabsTrigger value="funded-jobs" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Funded Jobs</span>
            </TabsTrigger>
            <TabsTrigger value="governance" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nonprofit.governance')}</span>
            </TabsTrigger>
            <TabsTrigger value="donor-view" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:inline">Donor View</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">{t('nav.reports')}</span>
            </TabsTrigger>
          </TabsList>

          {/* Programs Dashboard */}
          <TabsContent value="programs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Programs Dashboard</h2>
              <Button className="flex items-center gap-2">
                <Target className="h-4 w-4" />
                New Program
              </Button>
            </div>

            {/* Program Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {programMetrics.map((metric, index) => (
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

            {/* Programs List */}
            <Card>
              <CardHeader>
                <CardTitle>Active Programs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programs.map((program) => (
                    <div key={program.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{program.name}</h3>
                          <p className="text-sm text-muted-foreground">{program.type}</p>
                        </div>
                        {getStatusBadge(program.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Budget</p>
                          <p className="font-medium">{program.budget}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Volunteers</p>
                          <p className="font-medium">{program.volunteers}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Funded Jobs</p>
                          <p className="font-medium">{program.funded_jobs}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Progress</p>
                          <p className="font-medium">{program.progress}%</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{program.progress}%</span>
                        </div>
                        <Progress value={program.progress} className="h-2" />
                      </div>
                      
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" variant="outline">View Details</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Volunteers Management */}
          <TabsContent value="volunteers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Volunteer Management</h2>
              <Button className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Add Volunteer
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Active Volunteers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {volunteers.map((volunteer) => (
                    <div key={volunteer.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{volunteer.name}</h3>
                          <p className="text-sm text-muted-foreground">{volunteer.program}</p>
                        </div>
                        <Badge variant="default">Active</Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-muted-foreground">Hours Contributed</p>
                          <p className="font-medium">{volunteer.hours}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Skills</p>
                          <div className="flex gap-1 mt-1">
                            {volunteer.skills.map((skill, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View Profile</Button>
                        <Button size="sm" variant="outline">Schedule</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Funded Jobs */}
          <TabsContent value="funded-jobs">
            <Card>
              <CardHeader>
                <CardTitle>Funded Job Positions</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Funded job positions management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Governance */}
          <TabsContent value="governance">
            <Card>
              <CardHeader>
                <CardTitle>Governance & Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Governance and compliance management interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Donor View (Read-only) */}
          <TabsContent value="donor-view" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Donor Dashboard</h2>
              <Badge variant="outline" className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Read-Only View
              </Badge>
            </div>

            {/* Impact Metrics for Donors */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary rounded-lg">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold">2,456</h3>
                <p className="text-muted-foreground">Lives Impacted</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-success rounded-lg">
                    <Target className="h-8 w-8 text-success-foreground" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold">95%</h3>
                <p className="text-muted-foreground">Goal Achievement</p>
              </Card>
              
              <Card className="text-center p-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-warning rounded-lg">
                    <Gift className="h-8 w-8 text-warning-foreground" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold">SAR 1.2M</h3>
                <p className="text-muted-foreground">Total Donations</p>
              </Card>
            </div>

            {/* Donor List */}
            <Card>
              <CardHeader>
                <CardTitle>Donor Partners</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {donors.map((donor, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{donor.name}</h3>
                        <Badge variant="outline">{donor.type}</Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Contribution</p>
                          <p className="font-medium">{donor.contribution}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Programs Supported</p>
                          <p className="font-medium">{donor.programs}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge variant="default">Active</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Reports & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Nonprofit-specific reporting interface will be implemented here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};