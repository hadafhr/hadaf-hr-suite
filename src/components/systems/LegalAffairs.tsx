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
import { 
  ArrowLeft, Scale, FileText, Gavel, AlertTriangle, CheckCircle, Building, Users, 
  Eye, Save, Download, Share, Settings, BarChart, Clock, Search, Plus, User,
  Calendar, Mail, AlertCircle, Edit, Trash2, Bell, PenTool, Shield, FileCheck
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LegalAffairsProps {
  onBack: () => void;
}

interface LegalCase {
  id: string;
  case_number: string;
  title: string;
  description: string;
  case_type: string;
  status: string;
  plaintiff_name: string;
  defendant_name: string;
  court_name: string;
  judge_name: string;
  lawyer_name: string;
  case_value: number;
  filing_date: string;
  hearing_date: string;
  priority_level: number;
  notes: string;
}

interface LegalContract {
  id: string;
  contract_number: string;
  title: string;
  description: string;
  contract_type: string;
  status: string;
  party_name: string;
  party_contact: string;
  start_date: string;
  end_date: string;
  contract_value: number;
  currency: string;
  auto_renewal: boolean;
  terms_conditions: string;
}

interface LegalCorrespondence {
  id: string;
  reference_number: string;
  subject: string;
  content: string;
  correspondence_type: string;
  sender_name: string;
  recipient_name: string;
  status: string;
  due_date: string;
  response_required: boolean;
}

export const LegalAffairs: React.FC<LegalAffairsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';

  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [legalCases, setLegalCases] = useState<LegalCase[]>([]);
  const [legalContracts, setLegalContracts] = useState<LegalContract[]>([]);
  const [correspondence, setCorrespondence] = useState<LegalCorrespondence[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Dialog states
  const [newCaseDialog, setNewCaseDialog] = useState(false);
  const [newContractDialog, setNewContractDialog] = useState(false);
  const [newCorrespondenceDialog, setNewCorrespondenceDialog] = useState(false);

  // Form states
  const [newCase, setNewCase] = useState({
    title: '',
    description: '',
    case_type: 'labor_dispute',
    plaintiff_name: '',
    defendant_name: '',
    court_name: '',
    judge_name: '',
    lawyer_name: '',
    case_value: 0,
    filing_date: '',
    hearing_date: '',
    priority_level: 3,
    notes: ''
  });

  const [newContract, setNewContract] = useState({
    title: '',
    description: '',
    contract_type: 'employment',
    party_name: '',
    party_contact: '',
    start_date: '',
    end_date: '',
    contract_value: 0,
    currency: 'SAR',
    auto_renewal: false,
    terms_conditions: ''
  });

  const [newCorr, setNewCorr] = useState({
    subject: '',
    content: '',
    correspondence_type: 'outgoing',
    recipient_name: '',
    response_required: false,
    due_date: ''
  });

  // Fetch data functions
  const fetchLegalCases = async () => {
    try {
      const { data, error } = await supabase
        .from('legal_cases')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLegalCases(data || []);
    } catch (error) {
      console.error('Error fetching legal cases:', error);
    }
  };

  const fetchLegalContracts = async () => {
    try {
      const { data, error } = await supabase
        .from('legal_contracts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLegalContracts(data || []);
    } catch (error) {
      console.error('Error fetching legal contracts:', error);
    }
  };

  const fetchCorrespondence = async () => {
    try {
      const { data, error } = await supabase
        .from('legal_correspondence')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCorrespondence(data || []);
    } catch (error) {
      console.error('Error fetching correspondence:', error);
    }
  };

  // Create functions
  const createLegalCase = async () => {
    setIsLoading(true);
    try {
      const caseNumber = `LC-${new Date().getFullYear()}-${String(legalCases.length + 1).padStart(3, '0')}`;
      
      const { error } = await supabase
        .from('legal_cases')
        .insert([{
          ...newCase,
          case_number: caseNumber,
          company_id: null,
          case_type: newCase.case_type as any,
          filing_date: newCase.filing_date,
          title: newCase.title
        }]);

      if (error) throw error;

      toast({
        title: isRTL ? 'تمت إضافة القضية بنجاح' : 'Case added successfully',
        description: isRTL ? `تم إنشاء القضية رقم ${caseNumber}` : `Case ${caseNumber} has been created`,
      });

      setNewCaseDialog(false);
      setNewCase({
        title: '',
        description: '',
        case_type: 'labor_dispute',
        plaintiff_name: '',
        defendant_name: '',
        court_name: '',
        judge_name: '',
        lawyer_name: '',
        case_value: 0,
        filing_date: '',
        hearing_date: '',
        priority_level: 3,
        notes: ''
      });
      
      fetchLegalCases();
    } catch (error) {
      console.error('Error creating legal case:', error);
      toast({
        title: isRTL ? 'خطأ في إضافة القضية' : 'Error adding case',
        description: isRTL ? 'حدث خطأ أثناء إضافة القضية' : 'An error occurred while adding the case',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createLegalContract = async () => {
    setIsLoading(true);
    try {
      const contractNumber = `CT-${new Date().getFullYear()}-${String(legalContracts.length + 1).padStart(3, '0')}`;
      
      const { error } = await supabase
        .from('legal_contracts')
        .insert([{
          ...newContract,
          contract_number: contractNumber,
          company_id: null,
          contract_type: newContract.contract_type as any,
          start_date: newContract.start_date,
          title: newContract.title,
          party_name: newContract.party_name
        }]);

      if (error) throw error;

      toast({
        title: isRTL ? 'تمت إضافة العقد بنجاح' : 'Contract added successfully',
        description: isRTL ? `تم إنشاء العقد رقم ${contractNumber}` : `Contract ${contractNumber} has been created`,
      });

      setNewContractDialog(false);
      setNewContract({
        title: '',
        description: '',
        contract_type: 'employment',
        party_name: '',
        party_contact: '',
        start_date: '',
        end_date: '',
        contract_value: 0,
        currency: 'SAR',
        auto_renewal: false,
        terms_conditions: ''
      });
      
      fetchLegalContracts();
    } catch (error) {
      console.error('Error creating legal contract:', error);
      toast({
        title: isRTL ? 'خطأ في إضافة العقد' : 'Error adding contract',
        description: isRTL ? 'حدث خطأ أثناء إضافة العقد' : 'An error occurred while adding the contract',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLegalCases();
    fetchLegalContracts();
    fetchCorrespondence();
  }, []);

  // Analytics data
  const legalData = [
    { month: 'يناير', cases: 15, contracts: 45, consultations: 32 },
    { month: 'فبراير', cases: 12, contracts: 52, consultations: 28 },
    { month: 'مارس', cases: 18, contracts: 38, consultations: 35 },
    { month: 'أبريل', cases: 8, contracts: 62, consultations: 41 },
    { month: 'مايو', cases: 14, contracts: 48, consultations: 37 },
    { month: 'يونيو', cases: 10, contracts: 55, consultations: 43 }
  ];

  const legalMetrics = [
    { category: 'القضايا المكتملة', count: legalCases.filter(c => c.status === 'resolved').length, percentage: 94, color: '#009F87' },
    { category: 'العقود النشطة', count: legalContracts.filter(c => c.status === 'active').length, percentage: 87, color: '#1e40af' },
    { category: 'المراسلات المعلقة', count: correspondence.filter(c => c.status === 'pending').length, percentage: 12, color: '#f59e0b' },
    { category: 'الامتثال القانوني', count: 98, percentage: 98, color: '#10b981' }
  ];

  const caseTypes = [
    { type: 'قضايا عمالية', value: legalCases.filter(c => c.case_type === 'labor_dispute').length, count: legalCases.filter(c => c.case_type === 'labor_dispute').length },
    { type: 'عقود تجارية', value: legalCases.filter(c => c.case_type === 'commercial_contract').length, count: legalCases.filter(c => c.case_type === 'commercial_contract').length },
    { type: 'نزاعات إدارية', value: legalCases.filter(c => c.case_type === 'administrative_dispute').length, count: legalCases.filter(c => c.case_type === 'administrative_dispute').length }
  ];

  const BOUD_COLORS = ['#009F87', '#1e40af', '#f59e0b'];

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: { [key: string]: string } = {
      'pending': isRTL ? 'معلق' : 'Pending',
      'in_progress': isRTL ? 'قيد المعالجة' : 'In Progress',
      'resolved': isRTL ? 'محلول' : 'Resolved',
      'active': isRTL ? 'نشط' : 'Active',
      'draft': isRTL ? 'مسودة' : 'Draft',
      'expired': isRTL ? 'منتهي' : 'Expired'
    };
    return statusMap[status] || status;
  };

  const getCaseTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'labor_dispute': isRTL ? 'نزاع عمالي' : 'Labor Dispute',
      'commercial_contract': isRTL ? 'عقد تجاري' : 'Commercial Contract',
      'administrative_dispute': isRTL ? 'نزاع إداري' : 'Administrative Dispute',
      'disciplinary_action': isRTL ? 'إجراء تأديبي' : 'Disciplinary Action',
      'compensation_claim': isRTL ? 'مطالبة تعويض' : 'Compensation Claim',
      'regulatory_violation': isRTL ? 'مخالفة تنظيمية' : 'Regulatory Violation'
    };
    return typeMap[type] || type;
  };

  const getContractTypeText = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'employment': isRTL ? 'عقد عمل' : 'Employment',
      'commercial': isRTL ? 'عقد تجاري' : 'Commercial',
      'service': isRTL ? 'عقد خدمات' : 'Service',
      'confidentiality': isRTL ? 'عقد سرية' : 'Confidentiality',
      'partnership': isRTL ? 'عقد شراكة' : 'Partnership',
      'consulting': isRTL ? 'عقد استشاري' : 'Consulting'
    };
    return typeMap[type] || type;
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#009F87] via-[#008072] to-[#009F87] p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Share className="h-4 w-4 ml-2" />
                  {isRTL ? 'استيراد' : 'Import'}
                </Button>
                <Button className="bg-[#009F87]/80 border-[#009F87]/30 text-white hover:bg-[#009F87]/90 backdrop-blur-sm">
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير Excel' : 'Export Excel'}
                </Button>
                <Button className="bg-red-600/80 border-red-600/30 text-white hover:bg-red-600/90 backdrop-blur-sm">
                  <FileText className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير PDF' : 'Export PDF'}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Scale className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام الشؤون القانونية الشامل' : 'Comprehensive Legal Affairs System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'إدارة القضايا القانونية والعقود والمراسلات والامتثال بشكل متكامل' : 'Integrated management of legal cases, contracts, correspondence and compliance'}
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Analytics Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-slate-900 via-[#009F87] to-blue-900 text-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Legal Cases */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-300">
                      {isRTL ? 'القضايا القانونية' : 'Legal Cases'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-[#009F87]/50 to-blue-600/50 rounded-xl p-4 flex items-center justify-center">
                      <Gavel className="h-32 w-32 text-green-300 opacity-80" />
                      <div className="absolute top-4 right-4 bg-[#009F87]/80 px-3 py-1 rounded-full text-sm">
                        {legalCases.length} {isRTL ? 'قضية' : 'Cases'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-blue-600/80 px-3 py-1 rounded-full text-sm">
                        {Math.round((legalCases.filter(c => c.status === 'resolved').length / Math.max(legalCases.length, 1)) * 100)}% {isRTL ? 'معدل النجاح' : 'Success Rate'}
                      </div>
                    </div>
                  </div>

                  {/* Contract Management */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-300">
                      {isRTL ? 'إدارة العقود' : 'Contract Management'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-blue-600/50 to-purple-600/50 rounded-xl p-4 flex items-center justify-center">
                      <FileText className="h-32 w-32 text-blue-300 opacity-80" />
                      <div className="absolute top-4 right-4 bg-blue-600/80 px-3 py-1 rounded-full text-sm">
                        {legalContracts.length} {isRTL ? 'عقد' : 'Contracts'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-purple-600/80 px-3 py-1 rounded-full text-sm">
                        {legalContracts.filter(c => c.status === 'active').length} {isRTL ? 'نشط' : 'Active'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legal Trends Chart */}
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={legalData}>
                      <defs>
                        <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#009F87" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#009F87" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorContracts" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1e40af" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Area type="monotone" dataKey="cases" stroke="#009F87" fill="url(#colorCases)" />
                      <Area type="monotone" dataKey="contracts" stroke="#1e40af" fill="url(#colorContracts)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {isRTL ? 'مؤشرات قانونية' : 'Legal Metrics'}
                  </h3>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {legalMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${metric.color}15` }}>
                      <div>
                        <p className="font-semibold text-gray-800">{metric.category}</p>
                        <p className="text-sm text-gray-600">{metric.count} {isRTL ? 'عنصر' : 'items'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: metric.color }}>{metric.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {isRTL ? 'أنواع القضايا' : 'Case Types'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={caseTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {caseTypes.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={BOUD_COLORS[index % BOUD_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Legal System */}
        <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <CardContent className="p-8">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-6 mb-8 bg-gray-100 p-1 rounded-xl h-12">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white rounded-lg font-medium"
                >
                  <BarChart className="h-4 w-4 mr-2" />
                  {isRTL ? 'نظرة عامة' : 'Overview'}
                </TabsTrigger>
                <TabsTrigger 
                  value="cases" 
                  className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white rounded-lg font-medium"
                >
                  <Gavel className="h-4 w-4 mr-2" />
                  {isRTL ? 'القضايا' : 'Cases'}
                </TabsTrigger>
                <TabsTrigger 
                  value="contracts" 
                  className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white rounded-lg font-medium"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {isRTL ? 'العقود' : 'Contracts'}
                </TabsTrigger>
                <TabsTrigger 
                  value="violations" 
                  className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white rounded-lg font-medium"
                >
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {isRTL ? 'المخالفات' : 'Violations'}
                </TabsTrigger>
                <TabsTrigger 
                  value="correspondence" 
                  className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white rounded-lg font-medium"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  {isRTL ? 'المراسلات' : 'Correspondence'}
                </TabsTrigger>
                <TabsTrigger 
                  value="templates" 
                  className="data-[state=active]:bg-[#009F87] data-[state=active]:text-white rounded-lg font-medium"
                >
                  <FileCheck className="h-4 w-4 mr-2" />
                  {isRTL ? 'القوالب' : 'Templates'}
                </TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                  {[
                    { icon: Scale, label: isRTL ? 'الاستشارات القانونية' : 'Legal Consulting', color: 'bg-[#009F87]', count: 0 },
                    { icon: FileText, label: isRTL ? 'إدارة العقود' : 'Contract Management', color: 'bg-blue-600', count: legalContracts.length },
                    { icon: Gavel, label: isRTL ? 'القضايا والمحاكم' : 'Cases & Courts', color: 'bg-red-600', count: legalCases.length },
                    { icon: Building, label: isRTL ? 'الامتثال التنظيمي' : 'Regulatory Compliance', color: 'bg-green-600', count: 0 },
                    { icon: Users, label: isRTL ? 'الوساطة والتحكيم' : 'Mediation & Arbitration', color: 'bg-yellow-600', count: 3 },
                    { icon: AlertTriangle, label: isRTL ? 'إدارة المخاطر' : 'Risk Management', color: 'bg-orange-600', count: 8 },
                    { icon: Eye, label: isRTL ? 'المراجعة القانونية' : 'Legal Review', color: 'bg-purple-600', count: 0 },
                    { icon: Settings, label: isRTL ? 'الإعدادات المتقدمة' : 'Advanced Settings', color: 'bg-gray-600', count: 0 }
                  ].map((item, index) => (
                    <div key={index} className="text-center group cursor-pointer">
                      <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform relative`}>
                        <item.icon className="h-8 w-8 text-white" />
                        {item.count > 0 && (
                          <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                            {item.count}
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-700 group-hover:text-[#009F87] transition-colors">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                  <div className="text-center p-6 bg-gradient-to-br from-[#009F87]/10 to-[#009F87]/20 rounded-xl border border-[#009F87]/20">
                    <div className="text-3xl font-bold text-[#009F87] mb-2">{legalCases.filter(c => c.status === 'resolved').length}</div>
                    <div className="text-sm text-gray-600">{isRTL ? 'قضايا مكتملة' : 'Completed Cases'}</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-blue-600/10 to-blue-600/20 rounded-xl border border-blue-600/20">
                    <div className="text-3xl font-bold text-blue-600 mb-2">{legalContracts.filter(c => c.status === 'active').length}</div>
                    <div className="text-sm text-gray-600">{isRTL ? 'عقود نشطة' : 'Active Contracts'}</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-600/20 rounded-xl border border-green-600/20">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {legalCases.length > 0 ? Math.round((legalCases.filter(c => c.status === 'resolved').length / legalCases.length) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600">{isRTL ? 'معدل النجاح' : 'Success Rate'}</div>
                  </div>
                  
                  <div className="text-center p-6 bg-gradient-to-br from-yellow-600/10 to-yellow-600/20 rounded-xl border border-yellow-600/20">
                    <div className="text-3xl font-bold text-yellow-600 mb-2">{correspondence.length}</div>
                    <div className="text-sm text-gray-600">{isRTL ? 'مراسلات قانونية' : 'Legal Correspondence'}</div>
                  </div>
                </div>
              </TabsContent>

              {/* Legal Cases Tab */}
              <TabsContent value="cases" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {isRTL ? 'إدارة القضايا القانونية' : 'Legal Cases Management'}
                  </h2>
                  <Dialog open={newCaseDialog} onOpenChange={setNewCaseDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        {isRTL ? 'قضية جديدة' : 'New Case'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-[#009F87]">
                          {isRTL ? 'إضافة قضية قانونية جديدة' : 'Add New Legal Case'}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="case-title">{isRTL ? 'عنوان القضية' : 'Case Title'}</Label>
                          <Input
                            id="case-title"
                            value={newCase.title}
                            onChange={(e) => setNewCase({ ...newCase, title: e.target.value })}
                            placeholder={isRTL ? 'أدخل عنوان القضية' : 'Enter case title'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="case-type">{isRTL ? 'نوع القضية' : 'Case Type'}</Label>
                          <Select value={newCase.case_type} onValueChange={(value) => setNewCase({ ...newCase, case_type: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder={isRTL ? 'اختر نوع القضية' : 'Select case type'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="labor_dispute">{isRTL ? 'نزاع عمالي' : 'Labor Dispute'}</SelectItem>
                              <SelectItem value="commercial_contract">{isRTL ? 'عقد تجاري' : 'Commercial Contract'}</SelectItem>
                              <SelectItem value="administrative_dispute">{isRTL ? 'نزاع إداري' : 'Administrative Dispute'}</SelectItem>
                              <SelectItem value="disciplinary_action">{isRTL ? 'إجراء تأديبي' : 'Disciplinary Action'}</SelectItem>
                              <SelectItem value="compensation_claim">{isRTL ? 'مطالبة تعويض' : 'Compensation Claim'}</SelectItem>
                              <SelectItem value="regulatory_violation">{isRTL ? 'مخالفة تنظيمية' : 'Regulatory Violation'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="plaintiff">{isRTL ? 'المدعي' : 'Plaintiff'}</Label>
                          <Input
                            id="plaintiff"
                            value={newCase.plaintiff_name}
                            onChange={(e) => setNewCase({ ...newCase, plaintiff_name: e.target.value })}
                            placeholder={isRTL ? 'اسم المدعي' : 'Plaintiff name'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="defendant">{isRTL ? 'المدعى عليه' : 'Defendant'}</Label>
                          <Input
                            id="defendant"
                            value={newCase.defendant_name}
                            onChange={(e) => setNewCase({ ...newCase, defendant_name: e.target.value })}
                            placeholder={isRTL ? 'اسم المدعى عليه' : 'Defendant name'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="court">{isRTL ? 'المحكمة' : 'Court'}</Label>
                          <Input
                            id="court"
                            value={newCase.court_name}
                            onChange={(e) => setNewCase({ ...newCase, court_name: e.target.value })}
                            placeholder={isRTL ? 'اسم المحكمة' : 'Court name'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="judge">{isRTL ? 'القاضي' : 'Judge'}</Label>
                          <Input
                            id="judge"
                            value={newCase.judge_name}
                            onChange={(e) => setNewCase({ ...newCase, judge_name: e.target.value })}
                            placeholder={isRTL ? 'اسم القاضي' : 'Judge name'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lawyer">{isRTL ? 'المحامي' : 'Lawyer'}</Label>
                          <Input
                            id="lawyer"
                            value={newCase.lawyer_name}
                            onChange={(e) => setNewCase({ ...newCase, lawyer_name: e.target.value })}
                            placeholder={isRTL ? 'اسم المحامي' : 'Lawyer name'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="case-value">{isRTL ? 'قيمة القضية' : 'Case Value'}</Label>
                          <Input
                            id="case-value"
                            type="number"
                            value={newCase.case_value}
                            onChange={(e) => setNewCase({ ...newCase, case_value: parseFloat(e.target.value) || 0 })}
                            placeholder={isRTL ? 'قيمة القضية بالريال' : 'Case value in SAR'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="filing-date">{isRTL ? 'تاريخ رفع القضية' : 'Filing Date'}</Label>
                          <Input
                            id="filing-date"
                            type="date"
                            value={newCase.filing_date}
                            onChange={(e) => setNewCase({ ...newCase, filing_date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hearing-date">{isRTL ? 'تاريخ الجلسة' : 'Hearing Date'}</Label>
                          <Input
                            id="hearing-date"
                            type="date"
                            value={newCase.hearing_date}
                            onChange={(e) => setNewCase({ ...newCase, hearing_date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priority">{isRTL ? 'مستوى الأولوية' : 'Priority Level'}</Label>
                          <Select value={newCase.priority_level.toString()} onValueChange={(value) => setNewCase({ ...newCase, priority_level: parseInt(value) })}>
                            <SelectTrigger>
                              <SelectValue placeholder={isRTL ? 'اختر مستوى الأولوية' : 'Select priority'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">{isRTL ? 'أولوية منخفضة' : 'Low Priority'}</SelectItem>
                              <SelectItem value="2">{isRTL ? 'أولوية عادية' : 'Normal Priority'}</SelectItem>
                              <SelectItem value="3">{isRTL ? 'أولوية متوسطة' : 'Medium Priority'}</SelectItem>
                              <SelectItem value="4">{isRTL ? 'أولوية عالية' : 'High Priority'}</SelectItem>
                              <SelectItem value="5">{isRTL ? 'أولوية عاجلة' : 'Urgent Priority'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="description">{isRTL ? 'وصف القضية' : 'Case Description'}</Label>
                          <Textarea
                            id="description"
                            rows={3}
                            value={newCase.description}
                            onChange={(e) => setNewCase({ ...newCase, description: e.target.value })}
                            placeholder={isRTL ? 'وصف تفصيلي للقضية' : 'Detailed case description'}
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="notes">{isRTL ? 'ملاحظات' : 'Notes'}</Label>
                          <Textarea
                            id="notes"
                            rows={2}
                            value={newCase.notes}
                            onChange={(e) => setNewCase({ ...newCase, notes: e.target.value })}
                            placeholder={isRTL ? 'ملاحظات إضافية' : 'Additional notes'}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setNewCaseDialog(false)}>
                          {isRTL ? 'إلغاء' : 'Cancel'}
                        </Button>
                        <Button onClick={createLegalCase} disabled={isLoading} className="bg-[#009F87] hover:bg-[#008072]">
                          {isLoading ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : (isRTL ? 'حفظ القضية' : 'Save Case')}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="bg-white rounded-lg border shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">{isRTL ? 'رقم القضية' : 'Case Number'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'العنوان' : 'Title'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'النوع' : 'Type'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'الحالة' : 'Status'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'تاريخ الجلسة' : 'Hearing Date'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'القيمة' : 'Value'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'إجراءات' : 'Actions'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {legalCases.map((legalCase) => (
                        <TableRow key={legalCase.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-[#009F87]">{legalCase.case_number}</TableCell>
                          <TableCell className="max-w-48 truncate" title={legalCase.title}>{legalCase.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {getCaseTypeText(legalCase.case_type)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`text-xs ${getStatusBadgeColor(legalCase.status)}`}>
                              {getStatusText(legalCase.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {legalCase.hearing_date ? new Date(legalCase.hearing_date).toLocaleDateString('ar-SA') : '-'}
                          </TableCell>
                          <TableCell className="font-medium">
                            {legalCase.case_value ? `${legalCase.case_value.toLocaleString()} ${isRTL ? 'ر.س' : 'SAR'}` : '-'}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {legalCases.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                            {isRTL ? 'لا توجد قضايا قانونية' : 'No legal cases found'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Legal Contracts Tab */}
              <TabsContent value="contracts" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {isRTL ? 'إدارة العقود القانونية' : 'Legal Contracts Management'}
                  </h2>
                  <Dialog open={newContractDialog} onOpenChange={setNewContractDialog}>
                    <DialogTrigger asChild>
                      <Button className="bg-[#009F87] hover:bg-[#008072] text-white">
                        <Plus className="h-4 w-4 mr-2" />
                        {isRTL ? 'عقد جديد' : 'New Contract'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl font-bold text-[#009F87]">
                          {isRTL ? 'إضافة عقد قانوني جديد' : 'Add New Legal Contract'}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="contract-title">{isRTL ? 'عنوان العقد' : 'Contract Title'}</Label>
                          <Input
                            id="contract-title"
                            value={newContract.title}
                            onChange={(e) => setNewContract({ ...newContract, title: e.target.value })}
                            placeholder={isRTL ? 'أدخل عنوان العقد' : 'Enter contract title'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contract-type">{isRTL ? 'نوع العقد' : 'Contract Type'}</Label>
                          <Select value={newContract.contract_type} onValueChange={(value) => setNewContract({ ...newContract, contract_type: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder={isRTL ? 'اختر نوع العقد' : 'Select contract type'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="employment">{isRTL ? 'عقد عمل' : 'Employment'}</SelectItem>
                              <SelectItem value="commercial">{isRTL ? 'عقد تجاري' : 'Commercial'}</SelectItem>
                              <SelectItem value="service">{isRTL ? 'عقد خدمات' : 'Service'}</SelectItem>
                              <SelectItem value="confidentiality">{isRTL ? 'عقد سرية' : 'Confidentiality'}</SelectItem>
                              <SelectItem value="partnership">{isRTL ? 'عقد شراكة' : 'Partnership'}</SelectItem>
                              <SelectItem value="consulting">{isRTL ? 'عقد استشاري' : 'Consulting'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="party-name">{isRTL ? 'الطرف الآخر' : 'Other Party'}</Label>
                          <Input
                            id="party-name"
                            value={newContract.party_name}
                            onChange={(e) => setNewContract({ ...newContract, party_name: e.target.value })}
                            placeholder={isRTL ? 'اسم الطرف الآخر' : 'Other party name'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="party-contact">{isRTL ? 'بيانات التواصل' : 'Contact Info'}</Label>
                          <Input
                            id="party-contact"
                            value={newContract.party_contact}
                            onChange={(e) => setNewContract({ ...newContract, party_contact: e.target.value })}
                            placeholder={isRTL ? 'بريد إلكتروني أو هاتف' : 'Email or phone'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="start-date">{isRTL ? 'تاريخ البداية' : 'Start Date'}</Label>
                          <Input
                            id="start-date"
                            type="date"
                            value={newContract.start_date}
                            onChange={(e) => setNewContract({ ...newContract, start_date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="end-date">{isRTL ? 'تاريخ النهاية' : 'End Date'}</Label>
                          <Input
                            id="end-date"
                            type="date"
                            value={newContract.end_date}
                            onChange={(e) => setNewContract({ ...newContract, end_date: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contract-value">{isRTL ? 'قيمة العقد' : 'Contract Value'}</Label>
                          <Input
                            id="contract-value"
                            type="number"
                            value={newContract.contract_value}
                            onChange={(e) => setNewContract({ ...newContract, contract_value: parseFloat(e.target.value) || 0 })}
                            placeholder={isRTL ? 'قيمة العقد بالريال' : 'Contract value in SAR'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="currency">{isRTL ? 'العملة' : 'Currency'}</Label>
                          <Select value={newContract.currency} onValueChange={(value) => setNewContract({ ...newContract, currency: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder={isRTL ? 'اختر العملة' : 'Select currency'} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="SAR">{isRTL ? 'ريال سعودي' : 'Saudi Riyal'}</SelectItem>
                              <SelectItem value="USD">{isRTL ? 'دولار أمريكي' : 'US Dollar'}</SelectItem>
                              <SelectItem value="EUR">{isRTL ? 'يورو' : 'Euro'}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="contract-description">{isRTL ? 'وصف العقد' : 'Contract Description'}</Label>
                          <Textarea
                            id="contract-description"
                            rows={3}
                            value={newContract.description}
                            onChange={(e) => setNewContract({ ...newContract, description: e.target.value })}
                            placeholder={isRTL ? 'وصف تفصيلي للعقد' : 'Detailed contract description'}
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="terms">{isRTL ? 'الشروط والأحكام' : 'Terms & Conditions'}</Label>
                          <Textarea
                            id="terms"
                            rows={4}
                            value={newContract.terms_conditions}
                            onChange={(e) => setNewContract({ ...newContract, terms_conditions: e.target.value })}
                            placeholder={isRTL ? 'الشروط والأحكام التفصيلية' : 'Detailed terms and conditions'}
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setNewContractDialog(false)}>
                          {isRTL ? 'إلغاء' : 'Cancel'}
                        </Button>
                        <Button onClick={createLegalContract} disabled={isLoading} className="bg-[#009F87] hover:bg-[#008072]">
                          {isLoading ? (isRTL ? 'جاري الحفظ...' : 'Saving...') : (isRTL ? 'حفظ العقد' : 'Save Contract')}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="bg-white rounded-lg border shadow-sm">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold">{isRTL ? 'رقم العقد' : 'Contract Number'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'العنوان' : 'Title'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'النوع' : 'Type'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'الطرف الآخر' : 'Other Party'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'الحالة' : 'Status'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'تاريخ الانتهاء' : 'End Date'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'القيمة' : 'Value'}</TableHead>
                        <TableHead className="font-semibold">{isRTL ? 'إجراءات' : 'Actions'}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {legalContracts.map((contract) => (
                        <TableRow key={contract.id} className="hover:bg-gray-50">
                          <TableCell className="font-medium text-[#009F87]">{contract.contract_number}</TableCell>
                          <TableCell className="max-w-48 truncate" title={contract.title}>{contract.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {getContractTypeText(contract.contract_type)}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-32 truncate" title={contract.party_name}>{contract.party_name}</TableCell>
                          <TableCell>
                            <Badge className={`text-xs ${getStatusBadgeColor(contract.status)}`}>
                              {getStatusText(contract.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {contract.end_date ? new Date(contract.end_date).toLocaleDateString('ar-SA') : '-'}
                          </TableCell>
                          <TableCell className="font-medium">
                            {contract.contract_value ? `${contract.contract_value.toLocaleString()} ${contract.currency}` : '-'}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                                <PenTool className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      {legalContracts.length === 0 && (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                            {isRTL ? 'لا توجد عقود قانونية' : 'No legal contracts found'}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Other tabs content placeholders */}
              <TabsContent value="violations" className="space-y-6">
                <div className="text-center py-12">
                  <AlertTriangle className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {isRTL ? 'إدارة المخالفات القانونية' : 'Legal Violations Management'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {isRTL ? 'سيتم تطوير هذا القسم قريباً' : 'This section will be developed soon'}
                  </p>
                  <Button variant="outline" className="border-[#009F87] text-[#009F87] hover:bg-[#009F87] hover:text-white">
                    {isRTL ? 'إضافة مخالفة' : 'Add Violation'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="correspondence" className="space-y-6">
                <div className="text-center py-12">
                  <Mail className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {isRTL ? 'إدارة المراسلات القانونية' : 'Legal Correspondence Management'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {isRTL ? 'سيتم تطوير هذا القسم قريباً' : 'This section will be developed soon'}
                  </p>
                  <Button variant="outline" className="border-[#009F87] text-[#009F87] hover:bg-[#009F87] hover:text-white">
                    {isRTL ? 'إنشاء مراسلة' : 'Create Correspondence'}
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="templates" className="space-y-6">
                <div className="text-center py-12">
                  <FileCheck className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {isRTL ? 'قوالب المستندات القانونية' : 'Legal Document Templates'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {isRTL ? 'سيتم تطوير هذا القسم قريباً' : 'This section will be developed soon'}
                  </p>
                  <Button variant="outline" className="border-[#009F87] text-[#009F87] hover:bg-[#009F87] hover:text-white">
                    {isRTL ? 'إنشاء قالب' : 'Create Template'}
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
