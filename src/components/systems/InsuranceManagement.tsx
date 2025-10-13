import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Shield, Heart, Users, FileText, Calendar, DollarSign, Eye, Save, Download, Share, Settings, BarChart, Clock, Search, Plus, User, AlertTriangle, CheckCircle, Building, Phone, Mail, Globe, CreditCard, TrendingUp, Activity, Bell, Zap, Target, Briefcase, Star, Award, PieChart, LineChart, Filter, RefreshCw, Upload, Edit, Trash2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart as RechartsBarChart, Bar } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
interface InsuranceManagementProps {
  onBack: () => void;
}
interface InsuranceProvider {
  id: string;
  provider_name: string;
  provider_code: string;
  provider_type: string;
  contact_person: string;
  contact_email: string;
  contact_phone: string;
  service_areas: string[];
  is_active: boolean;
}
interface InsurancePolicy {
  id: string;
  policy_number: string;
  policy_name: string;
  insurance_type: string;
  coverage_level: string;
  start_date: string;
  end_date: string;
  premium_amount: number;
  status: string;
  provider_id: string;
}
interface InsuranceClaim {
  id: string;
  claim_number: string;
  claim_type: string;
  incident_date: string;
  claimed_amount: number;
  approved_amount: number;
  status: string;
  provider_name: string;
  treatment_type: string;
  diagnosis: string;
}
interface GosiIntegration {
  id: string;
  employee_id: string;
  gosi_number: string;
  subscription_date: string;
  salary_subject_to_gosi: number;
  monthly_employee_contribution: number;
  monthly_employer_contribution: number;
  total_months_contributed: number;
  status: string;
}
export const InsuranceManagement: React.FC<InsuranceManagementProps> = ({
  onBack
}) => {
  const {
    t,
    i18n
  } = useTranslation();
  const {
    toast
  } = useToast();
  const isRTL = i18n.language === 'ar';

  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [providers, setProviders] = useState<InsuranceProvider[]>([]);
  const [policies, setPolicies] = useState<InsurancePolicy[]>([]);
  const [claims, setClaims] = useState<InsuranceClaim[]>([]);
  const [gosiData, setGosiData] = useState<GosiIntegration[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Dialog states
  const [newProviderDialog, setNewProviderDialog] = useState(false);
  const [newPolicyDialog, setNewPolicyDialog] = useState(false);
  const [newClaimDialog, setNewClaimDialog] = useState(false);

  // Form states
  const [newProvider, setNewProvider] = useState({
    provider_name: '',
    provider_code: '',
    provider_type: 'health',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    service_areas: [] as string[]
  });
  const [newPolicy, setNewPolicy] = useState({
    policy_name: '',
    insurance_type: 'health',
    coverage_level: 'standard',
    start_date: '',
    end_date: '',
    premium_amount: 0,
    provider_id: ''
  });
  const [newClaim, setNewClaim] = useState({
    claim_type: '',
    incident_date: '',
    claimed_amount: 0,
    provider_name: '',
    treatment_type: '',
    diagnosis: ''
  });

  // Fetch data functions
  const fetchProviders = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('insurance_providers').select('*').order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setProviders(data || []);
    } catch (error) {
      console.error('Error fetching providers:', error);
    }
  };
  const fetchPolicies = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('insurance_policies').select('*').order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setPolicies(data || []);
    } catch (error) {
      console.error('Error fetching policies:', error);
    }
  };
  const fetchClaims = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('insurance_claims').select('*').order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setClaims(data || []);
    } catch (error) {
      console.error('Error fetching claims:', error);
    }
  };
  const fetchGosiData = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('gosi_integration').select('*').order('created_at', {
        ascending: false
      });
      if (error) throw error;
      setGosiData(data || []);
    } catch (error) {
      console.error('Error fetching GOSI data:', error);
    }
  };
  useEffect(() => {
    fetchProviders();
    fetchPolicies();
    fetchClaims();
    fetchGosiData();
  }, []);

  // Analytics data
  const insuranceAnalytics = [{
    month: 'يناير',
    healthClaims: 25,
    gosiContributions: 450000,
    premiums: 180000
  }, {
    month: 'فبراير',
    healthClaims: 32,
    gosiContributions: 465000,
    premiums: 185000
  }, {
    month: 'مارس',
    healthClaims: 28,
    gosiContributions: 470000,
    premiums: 190000
  }, {
    month: 'أبريل',
    healthClaims: 35,
    gosiContributions: 480000,
    premiums: 195000
  }, {
    month: 'مايو',
    healthClaims: 22,
    gosiContributions: 485000,
    premiums: 200000
  }, {
    month: 'يونيو',
    healthClaims: 18,
    gosiContributions: 490000,
    premiums: 205000
  }];
  const insuranceMetrics = [{
    category: 'إجمالي المؤمن عليهم',
    count: 245,
    percentage: 100,
    color: '#009F87'
  }, {
    category: 'المطالبات المعتمدة',
    count: 189,
    percentage: 92,
    color: '#10b981'
  }, {
    category: 'التأمينات الاجتماعية',
    count: 245,
    percentage: 100,
    color: '#1e40af'
  }, {
    category: 'التأمين الصحي',
    count: 238,
    percentage: 97,
    color: '#8b5cf6'
  }];
  const claimTypes = [{
    type: 'علاج طبي',
    value: claims.filter(c => c.claim_type === 'علاج طبي').length,
    count: claims.filter(c => c.claim_type === 'علاج طبي').length
  }, {
    type: 'أدوية',
    value: claims.filter(c => c.claim_type === 'أدوية').length,
    count: claims.filter(c => c.claim_type === 'أدوية').length
  }, {
    type: 'طوارئ',
    value: claims.filter(c => c.claim_type === 'طوارئ').length,
    count: claims.filter(c => c.claim_type === 'طوارئ').length
  }];
  const BOUD_COLORS = ['#009F87', '#1e40af', '#f59e0b', '#10b981', '#8b5cf6'];
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success/20 text-success border-success/30';
      case 'pending':
        return 'bg-warning/20 text-warning border-warning/30';
      case 'approved':
        return 'bg-accent/20 text-accent-foreground border-accent/30';
      case 'rejected':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'paid':
        return 'bg-success/20 text-success border-success/30';
      case 'expired':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };
  const getStatusText = (status: string) => {
    const statusMap: {
      [key: string]: string;
    } = {
      'active': isRTL ? 'نشط' : 'Active',
      'pending': isRTL ? 'معلق' : 'Pending',
      'approved': isRTL ? 'معتمد' : 'Approved',
      'rejected': isRTL ? 'مرفوض' : 'Rejected',
      'paid': isRTL ? 'مدفوع' : 'Paid',
      'expired': isRTL ? 'منتهي' : 'Expired',
      'processing': isRTL ? 'قيد المعالجة' : 'Processing'
    };
    return statusMap[status] || status;
  };
  const getInsuranceTypeText = (type: string) => {
    const typeMap: {
      [key: string]: string;
    } = {
      'health': isRTL ? 'تأمين صحي' : 'Health Insurance',
      'social': isRTL ? 'تأمينات اجتماعية' : 'Social Insurance',
      'life': isRTL ? 'تأمين الحياة' : 'Life Insurance',
      'disability': isRTL ? 'تأمين العجز' : 'Disability Insurance',
      'dental': isRTL ? 'تأمين الأسنان' : 'Dental Insurance',
      'vision': isRTL ? 'تأمين النظر' : 'Vision Insurance'
    };
    return typeMap[type] || type;
  };
  const getCoverageLevelText = (level: string) => {
    const levelMap: {
      [key: string]: string;
    } = {
      'basic': isRTL ? 'أساسي' : 'Basic',
      'standard': isRTL ? 'قياسي' : 'Standard',
      'premium': isRTL ? 'مميز' : 'Premium',
      'comprehensive': isRTL ? 'شامل' : 'Comprehensive'
    };
    return levelMap[level] || level;
  };
  return <div className="min-h-screen p-6 bg-background text-foreground" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">قسم إدارة التأمين والتأمينات </h1>
            <p className="text-muted-foreground">إدارة متكاملة للتأمين الصحي والتأمينات الاجتماعية مع التكامل مع المنصات الحكومية</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="rounded-xl border border-border p-6 bg-card">

        {/* Main Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Key Metrics Cards */}
          <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-primary">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'إجمالي المؤمن عليهم' : 'Total Insured'}</p>
                  <p className="text-2xl font-bold text-primary">245</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <TrendingUp className="h-3 w-3 inline ml-1" />
                    {isRTL ? '+5% من الشهر الماضي' : '+5% from last month'}
                  </p>
                </div>
                <Users className="h-8 w-8 text-primary/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-blue-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'المطالبات النشطة' : 'Active Claims'}</p>
                  <p className="text-2xl font-bold text-blue-600">{claims.length}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Activity className="h-3 w-3 inline ml-1" />
                    {isRTL ? 'معدل الموافقة 92%' : '92% approval rate'}
                  </p>
                </div>
                <FileText className="h-8 w-8 text-blue-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'الأقساط الشهرية' : 'Monthly Premiums'}</p>
                  <p className="text-2xl font-bold text-purple-600">205,000</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <DollarSign className="h-3 w-3 inline ml-1" />
                    {isRTL ? 'ريال سعودي' : 'SAR'}
                  </p>
                </div>
                <CreditCard className="h-8 w-8 text-purple-500/60" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card backdrop-blur-xl border border-border hover:border-accent shadow-2xl transition-all duration-300 hover:scale-105 border-l-4 border-l-orange-500">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'التأمينات الاجتماعية' : 'GOSI Contributions'}</p>
                  <p className="text-2xl font-bold text-orange-600">490,000</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    <Building className="h-3 w-3 inline ml-1" />
                    {isRTL ? 'شهر أغسطس' : 'August'}
                  </p>
                </div>
                <Shield className="h-8 w-8 text-orange-500/60" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Navigation */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="bg-card backdrop-blur rounded-xl border border-border shadow-lg p-4">
            <TabsList className="grid w-full grid-cols-6 bg-muted rounded-lg p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BarChart className="h-4 w-4 ml-2" />
                {isRTL ? 'نظرة عامة' : 'Overview'}
              </TabsTrigger>
              <TabsTrigger value="health" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Heart className="h-4 w-4 ml-2" />
                {isRTL ? 'التأمين الصحي' : 'Health Insurance'}
              </TabsTrigger>
              <TabsTrigger value="gosi" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Building className="h-4 w-4 ml-2" />
                {isRTL ? 'التأمينات الاجتماعية' : 'GOSI'}
              </TabsTrigger>
              <TabsTrigger value="claims" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <FileText className="h-4 w-4 ml-2" />
                {isRTL ? 'المطالبات' : 'Claims'}
              </TabsTrigger>
              <TabsTrigger value="providers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Users className="h-4 w-4 ml-2" />
                {isRTL ? 'شركات التأمين' : 'Providers'}
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <PieChart className="h-4 w-4 ml-2" />
                {isRTL ? 'التقارير' : 'Reports'}
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Insurance Analytics Chart */}
              <Card className="bg-card backdrop-blur shadow-xl border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <TrendingUp className="h-6 w-6" />
                    {isRTL ? 'تحليلات التأمين الشهرية' : 'Monthly Insurance Analytics'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={insuranceAnalytics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #009F87',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }} />
                        <Area type="monotone" dataKey="healthClaims" stackId="1" stroke="#009F87" fill="#009F87" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="premiums" stackId="2" stroke="#1e40af" fill="#1e40af" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Insurance Distribution */}
              <Card className="bg-card backdrop-blur shadow-xl border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <PieChart className="h-6 w-6" />
                    {isRTL ? 'توزيع أنواع المطالبات' : 'Claims Distribution'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie data={claimTypes} cx="50%" cy="50%" innerRadius={60} outerRadius={120} paddingAngle={5} dataKey="value">
                          {claimTypes.map((entry, index) => <Cell key={`cell-${index}`} fill={BOUD_COLORS[index % BOUD_COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4">
                    {claimTypes.map((type, index) => <div key={type.type} className="flex items-center justify-between py-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{
                          backgroundColor: BOUD_COLORS[index % BOUD_COLORS.length]
                        }}></div>
                          <span className="text-sm">{type.type}</span>
                        </div>
                        <span className="text-sm font-semibold">{type.count}</span>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {insuranceMetrics.map((metric, index) => <Card key={metric.category} className="bg-card backdrop-blur shadow-lg border-border">
                  <CardContent className="p-6 bg-muted/60 backdrop-blur-xl rounded-3xl shadow-2xl border border-border hover:border-accent animate-fade-in transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-medium text-muted-foreground">{metric.category}</h3>
                      <div className="p-2 rounded-full bg-accent/20">
                        {index === 0 && <Users className="h-4 w-4 text-accent-foreground" />}
                        {index === 1 && <CheckCircle className="h-4 w-4 text-success" />}
                        {index === 2 && <Building className="h-4 w-4 text-accent-foreground" />}
                        {index === 3 && <Heart className="h-4 w-4 text-accent-foreground" />}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-foreground">{metric.count}</span>
                        <span className="text-sm text-muted-foreground">{metric.percentage}%</span>
                      </div>
                      <Progress value={metric.percentage} className="h-2" />
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </TabsContent>

          {/* Health Insurance Tab */}
          <TabsContent value="health" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {isRTL ? 'إدارة التأمين الصحي' : 'Health Insurance Management'}
              </h2>
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white">
                <Plus className="h-4 w-4 ml-2" />
                {isRTL ? 'إضافة بوليصة جديدة' : 'Add New Policy'}
              </Button>
            </div>

            <Card className="bg-card backdrop-blur shadow-xl border-border">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isRTL ? 'رقم البوليصة' : 'Policy Number'}</TableHead>
                      <TableHead>{isRTL ? 'اسم البوليصة' : 'Policy Name'}</TableHead>
                      <TableHead>{isRTL ? 'نوع التأمين' : 'Type'}</TableHead>
                      <TableHead>{isRTL ? 'مستوى التغطية' : 'Coverage'}</TableHead>
                      <TableHead>{isRTL ? 'القسط السنوي' : 'Premium'}</TableHead>
                      <TableHead>{isRTL ? 'الحالة' : 'Status'}</TableHead>
                      <TableHead>{isRTL ? 'الإجراءات' : 'Actions'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {policies.map(policy => <TableRow key={policy.id}>
                        <TableCell className="font-medium">{policy.policy_number}</TableCell>
                        <TableCell>{policy.policy_name}</TableCell>
                        <TableCell>{getInsuranceTypeText(policy.insurance_type)}</TableCell>
                        <TableCell>{getCoverageLevelText(policy.coverage_level)}</TableCell>
                        <TableCell>{policy.premium_amount?.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(policy.status)}>
                            {getStatusText(policy.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GOSI Tab */}
          <TabsContent value="gosi" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {isRTL ? 'التأمينات الاجتماعية (GOSI)' : 'Social Insurance (GOSI)'}
              </h2>
              <div className="flex gap-2">
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white">
                  <RefreshCw className="h-4 w-4 ml-2" />
                  {isRTL ? 'مزامنة مع GOSI' : 'Sync with GOSI'}
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تقرير شهري' : 'Monthly Report'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-gradient-to-br from-primary to-accent text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">{isRTL ? 'إجمالي المشتركين' : 'Total Subscribers'}</p>
                      <p className="text-3xl font-bold">{gosiData.length}</p>
                    </div>
                    <Users className="h-8 w-8 text-white/80" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-accent to-primary text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">{isRTL ? 'اشتراكات الشهر' : 'Monthly Contributions'}</p>
                      <p className="text-3xl font-bold">490,000</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-white/80" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-success to-accent text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm">{isRTL ? 'معدل الامتثال' : 'Compliance Rate'}</p>
                      <p className="text-3xl font-bold">100%</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-white/80" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-card backdrop-blur shadow-xl border-border">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isRTL ? 'رقم GOSI' : 'GOSI Number'}</TableHead>
                      <TableHead>{isRTL ? 'الراتب الخاضع للتأمين' : 'Insurable Salary'}</TableHead>
                      <TableHead>{isRTL ? 'اشتراك الموظف' : 'Employee Contribution'}</TableHead>
                      <TableHead>{isRTL ? 'اشتراك صاحب العمل' : 'Employer Contribution'}</TableHead>
                      <TableHead>{isRTL ? 'الأشهر المساهمة' : 'Contributed Months'}</TableHead>
                      <TableHead>{isRTL ? 'الحالة' : 'Status'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gosiData.map(gosi => <TableRow key={gosi.id}>
                        <TableCell className="font-medium">{gosi.gosi_number}</TableCell>
                        <TableCell>{gosi.salary_subject_to_gosi?.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</TableCell>
                        <TableCell>{gosi.monthly_employee_contribution?.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</TableCell>
                        <TableCell>{gosi.monthly_employer_contribution?.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</TableCell>
                        <TableCell>{gosi.total_months_contributed}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(gosi.status)}>
                            {getStatusText(gosi.status)}
                          </Badge>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Claims Tab */}
          <TabsContent value="claims" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {isRTL ? 'إدارة المطالبات التأمينية' : 'Insurance Claims Management'}
              </h2>
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white">
                <Plus className="h-4 w-4 ml-2" />
                {isRTL ? 'مطالبة جديدة' : 'New Claim'}
              </Button>
            </div>

            <Card className="bg-card backdrop-blur shadow-xl border-border">
              <CardContent className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{isRTL ? 'رقم المطالبة' : 'Claim Number'}</TableHead>
                      <TableHead>{isRTL ? 'نوع المطالبة' : 'Type'}</TableHead>
                      <TableHead>{isRTL ? 'تاريخ الحادث' : 'Incident Date'}</TableHead>
                      <TableHead>{isRTL ? 'المبلغ المطالب' : 'Claimed Amount'}</TableHead>
                      <TableHead>{isRTL ? 'المبلغ المعتمد' : 'Approved Amount'}</TableHead>
                      <TableHead>{isRTL ? 'الحالة' : 'Status'}</TableHead>
                      <TableHead>{isRTL ? 'الإجراءات' : 'Actions'}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claims.map(claim => <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.claim_number}</TableCell>
                        <TableCell>{claim.claim_type}</TableCell>
                        <TableCell>{claim.incident_date}</TableCell>
                        <TableCell>{claim.claimed_amount?.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</TableCell>
                        <TableCell>{claim.approved_amount?.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</TableCell>
                        <TableCell>
                          <Badge className={getStatusBadgeColor(claim.status)}>
                            {getStatusText(claim.status)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>)}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Providers Tab */}
          <TabsContent value="providers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {isRTL ? 'شركات ومقدمو التأمين' : 'Insurance Providers'}
              </h2>
              <Button className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white">
                <Plus className="h-4 w-4 ml-2" />
                {isRTL ? 'إضافة مقدم خدمة' : 'Add Provider'}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map(provider => <Card key={provider.id} className="bg-card backdrop-blur shadow-lg border-border hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-accent/10 rounded-lg">
                          {provider.provider_type === 'health' && <Heart className="h-6 w-6 text-accent-foreground" />}
                          {provider.provider_type === 'life' && <Shield className="h-6 w-6 text-accent-foreground" />}
                          {provider.provider_type === 'social' && <Building className="h-6 w-6 text-accent-foreground" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{provider.provider_name}</h3>
                          <p className="text-sm text-muted-foreground">{provider.provider_code}</p>
                        </div>
                      </div>
                      <Badge className={provider.is_active ? 'bg-success/20 text-success border-success/30' : 'bg-destructive/20 text-destructive border-destructive/30'}>
                        {provider.is_active ? isRTL ? 'نشط' : 'Active' : isRTL ? 'غير نشط' : 'Inactive'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        {provider.contact_person}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {provider.contact_email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        {provider.contact_phone}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        {provider.service_areas?.join(', ')}
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-4 w-4 ml-2" />
                        {isRTL ? 'عرض' : 'View'}
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 ml-2" />
                        {isRTL ? 'تعديل' : 'Edit'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">
                {isRTL ? 'تقارير التأمين والتأمينات' : 'Insurance Reports & Analytics'}
              </h2>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 ml-2" />
                  {isRTL ? 'فلترة' : 'Filter'}
                </Button>
                <Button className="bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white">
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير التقرير' : 'Export Report'}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Claims Analysis */}
              <Card className="bg-card backdrop-blur shadow-xl border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <BarChart className="h-6 w-6" />
                    {isRTL ? 'تحليل المطالبات الشهرية' : 'Monthly Claims Analysis'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={insuranceAnalytics}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                        <YAxis stroke="#64748b" fontSize={12} />
                        <Tooltip contentStyle={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #009F87',
                          borderRadius: '8px',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }} />
                        <Bar dataKey="healthClaims" fill="#009F87" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Cost Analysis */}
              <Card className="bg-card backdrop-blur shadow-xl border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <DollarSign className="h-6 w-6" />
                    {isRTL ? 'تحليل التكاليف' : 'Cost Analysis'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{isRTL ? 'إجمالي الأقساط المدفوعة' : 'Total Premiums Paid'}</span>
                        <span className="text-2xl font-bold text-foreground">1,175,000 {isRTL ? 'ريال' : 'SAR'}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{isRTL ? 'المطالبات المدفوعة' : 'Claims Paid'}</span>
                        <span className="text-2xl font-bold text-accent-foreground">285,500 {isRTL ? 'ريال' : 'SAR'}</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-success/10 to-success/5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{isRTL ? 'نسبة الاستخدام' : 'Utilization Rate'}</span>
                        <span className="text-2xl font-bold text-success">24.3%</span>
                      </div>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-accent/10 to-accent/5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">{isRTL ? 'التوفير المحقق' : 'Cost Savings'}</span>
                        <span className="text-2xl font-bold text-accent-foreground">889,500 {isRTL ? 'ريال' : 'SAR'}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Report Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-primary to-accent text-white">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 mx-auto mb-3 text-white/80" />
                  <p className="text-3xl font-bold mb-1">98.5%</p>
                  <p className="text-white/90 text-sm">{isRTL ? 'رضا المؤمن عليهم' : 'Customer Satisfaction'}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-accent to-primary text-white">
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-3 text-white/80" />
                  <p className="text-3xl font-bold mb-1">2.1</p>
                  <p className="text-white/90 text-sm">{isRTL ? 'متوسط أيام المعالجة' : 'Avg Processing Days'}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-success to-accent text-white">
                <CardContent className="p-6 text-center">
                  <Target className="h-12 w-12 mx-auto mb-3 text-white/80" />
                  <p className="text-3xl font-bold mb-1">92%</p>
                  <p className="text-white/90 text-sm">{isRTL ? 'معدل قبول المطالبات' : 'Claims Approval Rate'}</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-accent to-accent text-white">
                <CardContent className="p-6 text-center">
                  <Star className="h-12 w-12 mx-auto mb-3 text-white/80" />
                  <p className="text-3xl font-bold mb-1">4.8/5</p>
                  <p className="text-white/90 text-sm">{isRTL ? 'تقييم الخدمة' : 'Service Rating'}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        </div>
      </div>
    </div>;
};