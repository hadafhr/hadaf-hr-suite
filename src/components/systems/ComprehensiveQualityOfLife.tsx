import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import {
  Heart,
  Smile,
  Users,
  Calendar,
  Clock,
  TrendingUp,
  FileText,
  Award,
  MessageCircle,
  Shield,
  Activity,
  Target,
  BarChart3,
  PieChart,
  Settings,
  Plus,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star,
  ThumbsUp,
  Brain,
  Coffee,
  Zap,
  Eye,
  Edit,
  Trash2,
  Upload,
  Send,
  Phone,
  Mail,
  Building,
  MapPin,
  Globe,
  Leaf,
  Sun,
  Moon,
  Wind,
  Droplets
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComprehensiveQualityOfLifeProps {
  onBack?: () => void;
}

// Mock Data
const qualityOfLifeStats = {
  overallSatisfaction: 87,
  engagementScore: 92,
  workLifeBalance: 78,
  mentalHealthSupport: 85,
  activeInitiatives: 12,
  completedInitiatives: 8,
  employeeParticipation: 456,
  wellnessPrograms: 15,
  supportSessions: 34,
  averageWorkHours: 42.5
};

const departmentSatisfaction = [
  { department: 'الموارد البشرية', departmentEn: 'Human Resources', score: 91, employees: 45, trend: 'up' },
  { department: 'تقنية المعلومات', departmentEn: 'Information Technology', score: 88, employees: 78, trend: 'up' },
  { department: 'التسويق', departmentEn: 'Marketing', score: 85, employees: 32, trend: 'down' },
  { department: 'المالية', departmentEn: 'Finance', score: 82, employees: 28, trend: 'stable' },
  { department: 'العمليات', departmentEn: 'Operations', score: 79, employees: 56, trend: 'up' }
];

const surveys = [
  {
    id: 1,
    title: 'استبيان الرضا الوظيفي الربعي',
    titleEn: 'Quarterly Job Satisfaction Survey',
    type: 'رضا',
    typeEn: 'Satisfaction',
    status: 'نشط',
    statusEn: 'Active',
    participants: 234,
    targetParticipants: 300,
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    questions: 25,
    averageScore: 4.2,
    completion: 78
  },
  {
    id: 2,
    title: 'تقييم بيئة العمل',
    titleEn: 'Work Environment Assessment',
    type: 'بيئة العمل',
    typeEn: 'Work Environment',
    status: 'مكتمل',
    statusEn: 'Completed',
    participants: 189,
    targetParticipants: 200,
    startDate: '2024-01-01',
    endDate: '2024-01-31',
    questions: 18,
    averageScore: 3.8,
    completion: 95
  }
];

const initiatives = [
  {
    id: 1,
    title: 'أسبوع الرفاهية',
    titleEn: 'Wellness Week',
    category: 'صحة',
    categoryEn: 'Health',
    status: 'جاري التنفيذ',
    statusEn: 'In Progress',
    startDate: '2024-02-01',
    endDate: '2024-02-07',
    participants: 145,
    targetParticipants: 200,
    budget: 15000,
    description: 'أسبوع مخصص لتعزيز الصحة البدنية والنفسية',
    descriptionEn: 'A week dedicated to promoting physical and mental health',
    activities: ['يوغا صباحية', 'ورش التأمل', 'فحوصات طبية مجانية'],
    activitiesEn: ['Morning Yoga', 'Meditation Workshops', 'Free Health Checkups'],
    rating: 4.6,
    completion: 65
  },
  {
    id: 2,
    title: 'الموظف السعيد',
    titleEn: 'Happy Employee Initiative',  
    category: 'تحفيز',
    categoryEn: 'Motivation',
    status: 'مخطط',
    statusEn: 'Planned',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    participants: 0,
    targetParticipants: 300,
    budget: 25000,
    description: 'مبادرة لتكريم الموظفين المتميزين وتعزيز السعادة في مكان العمل',
    descriptionEn: 'Initiative to honor outstanding employees and promote workplace happiness',
    activities: ['حفل تقدير', 'جوائز شهرية', 'أنشطة ترفيهية'],
    activitiesEn: ['Recognition Ceremony', 'Monthly Awards', 'Fun Activities'],
    rating: 0,
    completion: 0
  }
];

const mentalHealthSupport = {
  totalSessions: 67,
  activeCases: 12,
  resolvedCases: 55,
  averageSatisfaction: 4.8,
  counselors: 4,
  monthlyGrowth: 15
};

const workLifeBalance = {
  averageWorkHours: 42.5,
  overtimeHours: 245,
  flexibleSchedule: 78,
  remoteWorkDays: 156,
  burnoutRisk: 23,
  workStressLevel: 3.2
};

const chartData = [
  { month: 'يناير', satisfaction: 85, engagement: 82, balance: 78 },
  { month: 'فبراير', satisfaction: 87, engagement: 85, balance: 80 },
  { month: 'مارس', satisfaction: 84, engagement: 88, balance: 82 },
  { month: 'أبريل', satisfaction: 89, engagement: 90, balance: 85 },
  { month: 'مايو', satisfaction: 91, engagement: 92, balance: 88 },
  { month: 'يونيو', satisfaction: 87, engagement: 89, balance: 86 }
];

const satisfactionDistribution = [
  { name: 'ممتاز', nameEn: 'Excellent', value: 45, color: '#10B981' },
  { name: 'جيد جداً', nameEn: 'Very Good', value: 30, color: '#3CB593' },
  { name: 'جيد', nameEn: 'Good', value: 20, color: '#F59E0B' },
  { name: 'مقبول', nameEn: 'Fair', value: 5, color: '#EF4444' }
];

export const ComprehensiveQualityOfLife: React.FC<ComprehensiveQualityOfLifeProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const isRTL = i18n.language === 'ar';
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedInitiative, setSelectedInitiative] = useState<any>(null);

  // Form states
  const [surveyForm, setSurveyForm] = useState({
    title: '',
    type: '',
    questions: '',
    targetParticipants: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const [initiativeForm, setInitiativeForm] = useState({
    title: '',
    category: '',
    budget: '',
    targetParticipants: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleCreateSurvey = () => {
    if (!surveyForm.title || !surveyForm.type) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: isRTL ? "تم بنجاح" : "Success",
      description: isRTL ? "تم إنشاء الاستبيان بنجاح" : "Survey created successfully"
    });

    setSurveyForm({
      title: '',
      type: '',
      questions: '',
      targetParticipants: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsDialogOpen(false);
  };

  const handleCreateInitiative = () => {
    if (!initiativeForm.title || !initiativeForm.category) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى ملء جميع الحقول المطلوبة" : "Please fill all required fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: isRTL ? "تم بنجاح" : "Success",
      description: isRTL ? "تم إنشاء المبادرة بنجاح" : "Initiative created successfully"
    });

    setInitiativeForm({
      title: '',
      category: '',
      budget: '',
      targetParticipants: '',
      startDate: '',
      endDate: '',
      description: ''
    });
    setIsDialogOpen(false);
  };

  const handleJoinInitiative = (initiativeId: number) => {
    toast({
      title: isRTL ? "تم التسجيل" : "Registered",
      description: isRTL ? "تم تسجيلك في المبادرة بنجاح" : "You have been registered for the initiative successfully"
    });
  };

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", class: string }> = {
      'نشط': { variant: 'default', class: 'bg-green-100 text-green-800 hover:bg-green-100' },
      'Active': { variant: 'default', class: 'bg-green-100 text-green-800 hover:bg-green-100' },
      'مكتمل': { variant: 'secondary', class: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      'Completed': { variant: 'secondary', class: 'bg-blue-100 text-blue-800 hover:bg-blue-100' },
      'جاري التنفيذ': { variant: 'default', class: 'bg-primary/10 text-primary hover:bg-primary/10' },
      'In Progress': { variant: 'default', class: 'bg-primary/10 text-primary hover:bg-primary/10' },
      'مخطط': { variant: 'outline', class: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
      'Planned': { variant: 'outline', class: 'bg-yellow-50 text-yellow-700 border-yellow-200' }
    };
    
    const config = statusMap[status] || { variant: 'outline' as const, class: '' };
    return <Badge variant={config.variant} className={config.class}>{status}</Badge>;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-400 rotate-90" />;
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Smile className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">{isRTL ? 'الرضا العام' : 'Overall Satisfaction'}</p>
                <p className="text-2xl font-bold">{qualityOfLifeStats.overallSatisfaction}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-600 to-green-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">{isRTL ? 'الانخراط والمشاركة' : 'Engagement Score'}</p>
                <p className="text-2xl font-bold">{qualityOfLifeStats.engagementScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Heart className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">{isRTL ? 'الدعم النفسي' : 'Mental Health Support'}</p>
                <p className="text-2xl font-bold">{qualityOfLifeStats.mentalHealthSupport}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-600 to-purple-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg">
                <Target className="h-6 w-6" />
              </div>
              <div>
                <p className="text-white/80 text-sm">{isRTL ? 'توازن الحياة والعمل' : 'Work-Life Balance'}</p>
                <p className="text-2xl font-bold">{qualityOfLifeStats.workLifeBalance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Department Satisfaction */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            {isRTL ? 'مستوى الرضا حسب الأقسام' : 'Satisfaction by Department'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departmentSatisfaction.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {getTrendIcon(dept.trend)}
                    <h4 className="font-medium">{isRTL ? dept.department : dept.departmentEn}</h4>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {dept.employees} {isRTL ? 'موظف' : 'employees'}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress value={dept.score} className="w-24 h-2" />
                  <span className="font-bold text-primary">{dept.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-primary mb-2">{qualityOfLifeStats.activeInitiatives}</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'مبادرات نشطة' : 'Active Initiatives'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{qualityOfLifeStats.employeeParticipation}</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'مشاركة الموظفين' : 'Employee Participation'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{qualityOfLifeStats.supportSessions}</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'جلسات دعم' : 'Support Sessions'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{qualityOfLifeStats.wellnessPrograms}</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'برامج الرفاهية' : 'Wellness Programs'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'اتجاهات جودة الحياة' : 'Quality of Life Trends'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="satisfaction" stroke="#3CB593" name={isRTL ? 'الرضا' : 'Satisfaction'} />
                <Line type="monotone" dataKey="engagement" stroke="#2563eb" name={isRTL ? 'الانخراط' : 'Engagement'} />
                <Line type="monotone" dataKey="balance" stroke="#8b5cf6" name={isRTL ? 'التوازن' : 'Balance'} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'توزيع مستويات الرضا' : 'Satisfaction Levels Distribution'}</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie dataKey="value" data={satisfactionDistribution} cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
                  {satisfactionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSurveys = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{isRTL ? 'استبيانات الرضا والانتماء' : 'Satisfaction & Engagement Surveys'}</h3>
          <p className="text-muted-foreground">{isRTL ? 'قياس مستوى الرضا الوظيفي والانتماء المؤسسي' : 'Measure job satisfaction and organizational commitment'}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'استبيان جديد' : 'New Survey'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إنشاء استبيان جديد' : 'Create New Survey'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'عنوان الاستبيان' : 'Survey Title'}</Label>
                  <Input 
                    value={surveyForm.title}
                    onChange={(e) => setSurveyForm({...surveyForm, title: e.target.value})}
                    placeholder={isRTL ? 'أدخل عنوان الاستبيان' : 'Enter survey title'}
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'نوع الاستبيان' : 'Survey Type'}</Label>
                  <Select value={surveyForm.type} onValueChange={(value) => setSurveyForm({...surveyForm, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر النوع' : 'Select type'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="satisfaction">{isRTL ? 'رضا وظيفي' : 'Job Satisfaction'}</SelectItem>
                      <SelectItem value="engagement">{isRTL ? 'انخراط' : 'Engagement'}</SelectItem>
                      <SelectItem value="environment">{isRTL ? 'بيئة العمل' : 'Work Environment'}</SelectItem>
                      <SelectItem value="wellbeing">{isRTL ? 'رفاهية' : 'Wellbeing'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'عدد الأسئلة' : 'Number of Questions'}</Label>
                  <Input 
                    value={surveyForm.questions}
                    onChange={(e) => setSurveyForm({...surveyForm, questions: e.target.value})}
                    placeholder={isRTL ? 'عدد الأسئلة' : 'Questions count'}
                    type="number"
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'الهدف المشاركين' : 'Target Participants'}</Label>
                  <Input 
                    value={surveyForm.targetParticipants}
                    onChange={(e) => setSurveyForm({...surveyForm, targetParticipants: e.target.value})}
                    placeholder={isRTL ? 'عدد المشاركين المستهدف' : 'Target participants count'}
                    type="number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'تاريخ البداية' : 'Start Date'}</Label>
                  <Input 
                    value={surveyForm.startDate}
                    onChange={(e) => setSurveyForm({...surveyForm, startDate: e.target.value})}
                    type="date"
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'تاريخ النهاية' : 'End Date'}</Label>
                  <Input 
                    value={surveyForm.endDate}
                    onChange={(e) => setSurveyForm({...surveyForm, endDate: e.target.value})}
                    type="date"
                  />
                </div>
              </div>
              
              <div>
                <Label>{isRTL ? 'الوصف' : 'Description'}</Label>
                <Textarea 
                  value={surveyForm.description}
                  onChange={(e) => setSurveyForm({...surveyForm, description: e.target.value})}
                  placeholder={isRTL ? 'وصف الاستبيان وأهدافه' : 'Survey description and objectives'}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleCreateSurvey} className="bg-primary hover:bg-primary/90">
                {isRTL ? 'إنشاء الاستبيان' : 'Create Survey'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {surveys.map((survey) => (
          <Card key={survey.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold">{isRTL ? survey.title : survey.titleEn}</h4>
                    {getStatusBadge(isRTL ? survey.status : survey.statusEn)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                    <span className="flex items-center gap-1">
                      <FileText className="h-4 w-4" />
                      {survey.questions} {isRTL ? 'سؤال' : 'questions'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {survey.participants}/{survey.targetParticipants} {isRTL ? 'مشارك' : 'participants'}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {survey.startDate} - {survey.endDate}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-primary border-primary">
                    {isRTL ? survey.type : survey.typeEn}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{isRTL ? 'معدل المشاركة' : 'Participation Rate'}</span>
                    <span>{survey.completion}%</span>
                  </div>
                  <Progress value={survey.completion} className="h-2" />
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{survey.averageScore}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'متوسط التقييم' : 'Average Score'}</p>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{Math.round((survey.participants / survey.targetParticipants) * 100)}%</div>
                  <p className="text-xs text-muted-foreground">{isRTL ? 'الهدف المحقق' : 'Target Achieved'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderInitiatives = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{isRTL ? 'المبادرات والأنشطة الداخلية' : 'Wellness & Engagement Programs'}</h3>
          <p className="text-muted-foreground">{isRTL ? 'برامج تعزيز الرفاهية والانخراط الوظيفي' : 'Programs to enhance wellbeing and employee engagement'}</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              {isRTL ? 'مبادرة جديدة' : 'New Initiative'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{isRTL ? 'إنشاء مبادرة جديدة' : 'Create New Initiative'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'اسم المبادرة' : 'Initiative Name'}</Label>
                  <Input 
                    value={initiativeForm.title}
                    onChange={(e) => setInitiativeForm({...initiativeForm, title: e.target.value})}
                    placeholder={isRTL ? 'أدخل اسم المبادرة' : 'Enter initiative name'}
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'الفئة' : 'Category'}</Label>
                  <Select value={initiativeForm.category} onValueChange={(value) => setInitiativeForm({...initiativeForm, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={isRTL ? 'اختر الفئة' : 'Select category'} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="health">{isRTL ? 'صحة' : 'Health'}</SelectItem>
                      <SelectItem value="social">{isRTL ? 'اجتماعي' : 'Social'}</SelectItem>
                      <SelectItem value="motivation">{isRTL ? 'تحفيز' : 'Motivation'}</SelectItem>
                      <SelectItem value="development">{isRTL ? 'تطوير' : 'Development'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'الميزانية' : 'Budget'}</Label>
                  <Input 
                    value={initiativeForm.budget}
                    onChange={(e) => setInitiativeForm({...initiativeForm, budget: e.target.value})}
                    placeholder={isRTL ? 'الميزانية بالريال' : 'Budget in SAR'}
                    type="number"
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'الهدف المشاركين' : 'Target Participants'}</Label>
                  <Input 
                    value={initiativeForm.targetParticipants}
                    onChange={(e) => setInitiativeForm({...initiativeForm, targetParticipants: e.target.value})}
                    placeholder={isRTL ? 'عدد المشاركين المستهدف' : 'Target participants count'}
                    type="number"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{isRTL ? 'تاريخ البداية' : 'Start Date'}</Label>
                  <Input 
                    value={initiativeForm.startDate}
                    onChange={(e) => setInitiativeForm({...initiativeForm, startDate: e.target.value})}
                    type="date"
                  />
                </div>
                <div>
                  <Label>{isRTL ? 'تاريخ النهاية' : 'End Date'}</Label>
                  <Input 
                    value={initiativeForm.endDate}
                    onChange={(e) => setInitiativeForm({...initiativeForm, endDate: e.target.value})}
                    type="date"
                  />
                </div>
              </div>
              
              <div>
                <Label>{isRTL ? 'الوصف' : 'Description'}</Label>
                <Textarea 
                  value={initiativeForm.description}
                  onChange={(e) => setInitiativeForm({...initiativeForm, description: e.target.value})}
                  placeholder={isRTL ? 'وصف المبادرة وأهدافها' : 'Initiative description and objectives'}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
              <Button onClick={handleCreateInitiative} className="bg-primary hover:bg-primary/90">
                {isRTL ? 'إنشاء المبادرة' : 'Create Initiative'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {initiatives.map((initiative) => (
          <Card key={initiative.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedInitiative(initiative)}>
            <CardContent className="p-0">
              <div className="relative">
                <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/30 flex items-center justify-center">
                  <div className="text-center">
                    <Leaf className="h-12 w-12 text-primary mx-auto mb-2" />
                    <Badge className="bg-white text-primary">
                      {isRTL ? initiative.category : initiative.categoryEn}
                    </Badge>
                  </div>
                </div>
                <div className="absolute top-2 right-2">
                  {getStatusBadge(isRTL ? initiative.status : initiative.statusEn)}
                </div>
              </div>
              
              <div className="p-4">
                <h4 className="font-semibold mb-2">{isRTL ? initiative.title : initiative.titleEn}</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  {isRTL ? initiative.description : initiative.descriptionEn}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {initiative.startDate} - {initiative.endDate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {initiative.participants}/{initiative.targetParticipants}
                  </span>
                </div>
                
                {initiative.completion > 0 && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span>{isRTL ? 'التقدم' : 'Progress'}</span>
                      <span>{initiative.completion}%</span>
                    </div>
                    <Progress value={initiative.completion} className="h-2" />
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleJoinInitiative(initiative.id);
                    }}
                    disabled={initiative.status === 'مكتمل' || initiative.status === 'Completed'}
                  >
                    {initiative.participants > 0 ? (isRTL ? 'مشارك' : 'Participating') : (isRTL ? 'انضمام' : 'Join')}
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
                
                {initiative.rating > 0 && (
                  <div className="flex items-center justify-center gap-1 mt-2 pt-2 border-t">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{initiative.rating}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Initiative Details Dialog */}
      {selectedInitiative && (
        <Dialog open={!!selectedInitiative} onOpenChange={() => setSelectedInitiative(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Leaf className="h-5 w-5 text-primary" />
                {isRTL ? selectedInitiative.title : selectedInitiative.titleEn}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">{isRTL ? 'تفاصيل المبادرة' : 'Initiative Details'}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{isRTL ? 'الفئة:' : 'Category:'}</span>
                      <span>{isRTL ? selectedInitiative.category : selectedInitiative.categoryEn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'الفترة:' : 'Duration:'}</span>
                      <span>{selectedInitiative.startDate} - {selectedInitiative.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'الميزانية:' : 'Budget:'}</span>
                      <span>{selectedInitiative.budget.toLocaleString()} {isRTL ? 'ريال' : 'SAR'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'الحالة:' : 'Status:'}</span>
                      {getStatusBadge(isRTL ? selectedInitiative.status : selectedInitiative.statusEn)}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">{isRTL ? 'إحصائيات المشاركة' : 'Participation Stats'}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{isRTL ? 'المشاركين:' : 'Participants:'}</span>
                      <span>{selectedInitiative.participants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'الهدف:' : 'Target:'}</span>
                      <span>{selectedInitiative.targetParticipants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'معدل التحقق:' : 'Achievement Rate:'}</span>
                      <span>{Math.round((selectedInitiative.participants / selectedInitiative.targetParticipants) * 100)}%</span>
                    </div>
                  </div>
                  
                  {selectedInitiative.completion > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">{isRTL ? 'التقدم' : 'Progress'}</h4>
                      <Progress value={selectedInitiative.completion} className="h-3 mb-2" />
                      <p className="text-sm text-muted-foreground">{selectedInitiative.completion}% {isRTL ? 'مكتمل' : 'completed'}</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">{isRTL ? 'الأنشطة المتضمنة' : 'Included Activities'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  {(isRTL ? selectedInitiative.activities : selectedInitiative.activitiesEn).map((activity: string, index: number) => (
                    <Badge key={index} variant="outline" className="justify-center py-2">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-2">{isRTL ? 'وصف المبادرة' : 'Initiative Description'}</h4>
                <p className="text-sm text-muted-foreground">{isRTL ? selectedInitiative.description : selectedInitiative.descriptionEn}</p>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setSelectedInitiative(null)}>
                {isRTL ? 'إغلاق' : 'Close'}
              </Button>
              <Button 
                onClick={() => handleJoinInitiative(selectedInitiative.id)} 
                className="bg-primary hover:bg-primary/90"
                disabled={selectedInitiative.status === 'مكتمل' || selectedInitiative.status === 'Completed'}
              >
                {selectedInitiative.participants > 0 ? (isRTL ? 'إدارة المشاركة' : 'Manage Participation') : (isRTL ? 'الانضمام للمبادرة' : 'Join Initiative')}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );

  const renderMentalHealthSupport = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{isRTL ? 'الدعم النفسي والمهني' : 'Mental & Emotional Support'}</h3>
          <p className="text-muted-foreground">{isRTL ? 'خدمات الدعم النفسي والاستشارة المهنية' : 'Mental health support and professional counseling services'}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          {isRTL ? 'طلب دعم' : 'Request Support'}
        </Button>
      </div>

      {/* Support Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Brain className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">{mentalHealthSupport.totalSessions}</p>
                <p className="text-blue-100 text-sm">{isRTL ? 'إجمالي الجلسات' : 'Total Sessions'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">{mentalHealthSupport.activeCases}</p>
                <p className="text-green-100 text-sm">{isRTL ? 'حالات نشطة' : 'Active Cases'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">{mentalHealthSupport.resolvedCases}</p>
                <p className="text-purple-100 text-sm">{isRTL ? 'حالات محلولة' : 'Resolved Cases'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8" />
              <div>
                <p className="text-2xl font-bold">{mentalHealthSupport.averageSatisfaction}</p>
                <p className="text-orange-100 text-sm">{isRTL ? 'متوسط الرضا' : 'Avg Satisfaction'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Support Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              {isRTL ? 'خدمات الدعم المتاحة' : 'Available Support Services'}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">{isRTL ? 'استشارة فورية' : 'Instant Consultation'}</h4>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'متوفر 24/7' : 'Available 24/7'}</p>
                </div>
              </div>
              <Button size="sm">{isRTL ? 'ابدأ الآن' : 'Start Now'}</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">{isRTL ? 'جلسة هاتفية' : 'Phone Session'}</h4>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'احجز موعد' : 'Book appointment'}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">{isRTL ? 'احجز' : 'Book'}</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">{isRTL ? 'جلسة جماعية' : 'Group Session'}</h4>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'أسبوعياً' : 'Weekly'}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">{isRTL ? 'انضم' : 'Join'}</Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 text-yellow-600 rounded-lg">
                  <Brain className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">{isRTL ? 'تقييم نفسي' : 'Psychological Assessment'}</h4>
                  <p className="text-sm text-muted-foreground">{isRTL ? 'تقييم شامل' : 'Comprehensive evaluation'}</p>
                </div>
              </div>
              <Button size="sm" variant="outline">{isRTL ? 'ابدأ' : 'Start'}</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {isRTL ? 'مؤشرات الصحة النفسية' : 'Mental Health Indicators'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'مستوى التوتر العام' : 'Overall Stress Level'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={32} className="w-20 h-2" />
                  <span className="text-sm font-medium">32% {isRTL ? 'منخفض' : 'Low'}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'الرضا النفسي' : 'Psychological Satisfaction'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-20 h-2" />
                  <span className="text-sm font-medium">85% {isRTL ? 'عالي' : 'High'}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'التوازن العاطفي' : 'Emotional Balance'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="w-20 h-2" />
                  <span className="text-sm font-medium">78% {isRTL ? 'جيد' : 'Good'}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'الدعم الاجتماعي' : 'Social Support'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={92} className="w-20 h-2" />
                  <span className="text-sm font-medium">92% {isRTL ? 'ممتاز' : 'Excellent'}</span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <h4 className="font-medium">{isRTL ? 'نصائح يومية' : 'Daily Tips'}</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p className="flex items-start gap-2">
                  <Sun className="h-4 w-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  {isRTL ? 'خذ استراحة قصيرة كل ساعتين للاسترخاء' : 'Take a short break every two hours to relax'}
                </p>
                <p className="flex items-start gap-2">
                  <Droplets className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                  {isRTL ? 'اشرب الماء بانتظام للحفاظ على التركيز' : 'Drink water regularly to maintain focus'}
                </p>
                <p className="flex items-start gap-2">
                  <Wind className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  {isRTL ? 'مارس تمارين التنفس العميق' : 'Practice deep breathing exercises'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderWorkLifeBalance = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{isRTL ? 'توازن الحياة والعمل' : 'Work-Life Balance'}</h3>
          <p className="text-muted-foreground">{isRTL ? 'تحليل ومراقبة توازن العمل والحياة الشخصية' : 'Analyze and monitor work-life balance'}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Settings className="h-4 w-4 mr-2" />
          {isRTL ? 'إعدادات التوازن' : 'Balance Settings'}
        </Button>
      </div>

      {/* Balance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary mb-1">{workLifeBalance.averageWorkHours}</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'متوسط ساعات العمل' : 'Avg Work Hours'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-500 mb-1">{workLifeBalance.overtimeHours}</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'ساعات إضافية' : 'Overtime Hours'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600 mb-1">{workLifeBalance.flexibleSchedule}%</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'مرونة الجدول' : 'Schedule Flexibility'}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600 mb-1">{workLifeBalance.burnoutRisk}%</div>
            <p className="text-sm text-muted-foreground">{isRTL ? 'خطر الإرهاق' : 'Burnout Risk'}</p>
          </CardContent>
        </Card>
      </div>

      {/* Balance Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              {isRTL ? 'تحليل أوقات العمل' : 'Work Hours Analysis'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'ساعات العمل الأساسية' : 'Core Work Hours'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={85} className="w-20 h-2" />
                  <span className="text-sm font-medium">85%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'العمل الإضافي' : 'Overtime Work'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={25} className="w-20 h-2" />
                  <span className="text-sm font-medium">25%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'العمل عن بُعد' : 'Remote Work'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={65} className="w-20 h-2" />
                  <span className="text-sm font-medium">65%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'المرونة في الجدولة' : 'Schedule Flexibility'}</span>
                <div className="flex items-center gap-2">
                  <Progress value={78} className="w-20 h-2" />
                  <span className="text-sm font-medium">78%</span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{workLifeBalance.workStressLevel}/5</div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'مستوى ضغط العمل' : 'Work Stress Level'}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              {isRTL ? 'توصيات التوازن' : 'Balance Recommendations'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800">{isRTL ? 'ممتاز' : 'Excellent'}</h4>
                    <p className="text-sm text-green-700">{isRTL ? 'التوازن في القسم ممتاز' : 'Department balance is excellent'}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800">{isRTL ? 'تحذير' : 'Warning'}</h4>
                    <p className="text-sm text-yellow-700">{isRTL ? 'ساعات إضافية مرتفعة لبعض الموظفين' : 'High overtime hours for some employees'}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">{isRTL ? 'نصائح للتحسين' : 'Improvement Tips'}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p>{isRTL ? 'تطبيق استراحات منتظمة كل ساعتين' : 'Implement regular breaks every two hours'}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p>{isRTL ? 'تشجيع العمل المرن والعمل عن بُعد' : 'Encourage flexible and remote work'}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p>{isRTL ? 'تقليل الاجتماعات غير الضرورية' : 'Reduce unnecessary meetings'}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                    <p>{isRTL ? 'تطبيق سياسة عدم الإزعاج بعد ساعات العمل' : 'Implement no-contact policy after work hours'}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderSpecialInitiatives = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{isRTL ? 'المبادرات والمكافآت الخاصة' : 'Special Initiatives & Rewards'}</h3>
          <p className="text-muted-foreground">{isRTL ? 'مبادرات خاصة لتعزيز السعادة والتقدير' : 'Special initiatives to enhance happiness and recognition'}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Award className="h-4 w-4 mr-2" />
          {isRTL ? 'مبادرة خاصة' : 'Special Initiative'}
        </Button>
      </div>

      {/* Featured Initiatives */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">{isRTL ? 'الموظف السعيد' : 'Happy Employee'}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {isRTL ? 'تكريم الموظفين المتميزين وتعزيز السعادة' : 'Recognize outstanding employees and promote happiness'}
              </p>
              <div className="space-y-2 mb-4">
                <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                  {isRTL ? '45 ترشيح' : '45 Nominations'}
                </Badge>
                <Badge variant="outline" className="text-yellow-700 border-yellow-300">
                  {isRTL ? '12 فائز' : '12 Winners'}
                </Badge>
              </div>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                {isRTL ? 'رشح زميل' : 'Nominate Colleague'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">{isRTL ? 'أفضل بيئة مكتبية' : 'Best Office Environment'}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {isRTL ? 'مسابقة لأفضل تنظيم وتزيين مكتبي' : 'Competition for best office organization and decoration'}
              </p>
              <div className="space-y-2 mb-4">
                <Badge variant="outline" className="text-green-700 border-green-300">
                  {isRTL ? '23 مشارك' : '23 Participants'}
                </Badge>
                <Badge variant="outline" className="text-green-700 border-green-300">
                  {isRTL ? 'جاري التصويت' : 'Voting Active'}
                </Badge>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                {isRTL ? 'شارك الآن' : 'Participate Now'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold mb-2">{isRTL ? 'أسبوع الرفاهية' : 'Wellness Week'}</h4>
              <p className="text-sm text-muted-foreground mb-4">
                {isRTL ? 'أسبوع مخصص للصحة البدنية والنفسية' : 'Week dedicated to physical and mental health'}
              </p>
              <div className="space-y-2 mb-4">
                <Badge variant="outline" className="text-purple-700 border-purple-300">
                  {isRTL ? '156 مشارك' : '156 Participants'}
                </Badge>
                <Badge variant="outline" className="text-purple-700 border-purple-300">
                  {isRTL ? '8 أنشطة' : '8 Activities'}
                </Badge>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                {isRTL ? 'عرض الأنشطة' : 'View Activities'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recognition Wall */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            {isRTL ? 'جدار التقدير' : 'Recognition Wall'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'أحمد محمد', nameEn: 'Ahmed Mohammed', dept: 'تقنية المعلومات', deptEn: 'IT', achievement: 'التميز في خدمة العملاء', achievementEn: 'Excellence in Customer Service', date: '2024-02-10' },
              { name: 'سارة أحمد', nameEn: 'Sarah Ahmed', dept: 'التسويق', deptEn: 'Marketing', achievement: 'الإبداع في الحملات', achievementEn: 'Creative Campaigns', date: '2024-02-08' },
              { name: 'محمد علي', nameEn: 'Mohammed Ali', dept: 'المالية', deptEn: 'Finance', achievement: 'الدقة والتميز', achievementEn: 'Accuracy & Excellence', date: '2024-02-05' },
              { name: 'فاطمة سالم', nameEn: 'Fatima Salem', dept: 'الموارد البشرية', deptEn: 'HR', achievement: 'روح الفريق', achievementEn: 'Team Spirit', date: '2024-02-03' }
            ].map((recognition, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-primary text-white">
                    {(isRTL ? recognition.name : recognition.nameEn).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{isRTL ? recognition.name : recognition.nameEn}</h4>
                  <p className="text-sm text-muted-foreground">{isRTL ? recognition.dept : recognition.deptEn}</p>
                  <p className="text-sm font-medium text-primary">{isRTL ? recognition.achievement : recognition.achievementEn}</p>
                </div>
                <div className="text-right">
                  <Star className="h-5 w-5 text-yellow-400 fill-current mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">{recognition.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Points & Rewards */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            {isRTL ? 'نظام النقاط والمكافآت' : 'Points & Rewards System'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Zap className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-600 mb-1">1,250</div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'نقاطك الحالية' : 'Your Current Points'}</p>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Award className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600 mb-1">5</div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'الشارات المحققة' : 'Badges Earned'}</p>
            </div>
            
            <div className="text-center p-4 bg-muted/30 rounded-lg">
              <Target className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-600 mb-1">7</div>
              <p className="text-sm text-muted-foreground">{isRTL ? 'المبادرات المشاركة' : 'Initiatives Joined'}</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div>
            <h4 className="font-semibold mb-3">{isRTL ? 'المكافآت المتاحة' : 'Available Rewards'}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Coffee className="h-5 w-5 text-brown-600" />
                  <span className="text-sm">{isRTL ? 'قسيمة قهوة مجانية' : 'Free Coffee Voucher'}</span>
                </div>
                <Badge variant="outline">200 {isRTL ? 'نقطة' : 'points'}</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">{isRTL ? 'يوم إجازة إضافي' : 'Extra Day Off'}</span>
                </div>
                <Badge variant="outline">1000 {isRTL ? 'نقطة' : 'points'}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">{isRTL ? 'التقارير والتحليلات' : 'Reports & Analytics'}</h3>
          <p className="text-muted-foreground">{isRTL ? 'تقارير شاملة عن جودة الحياة الوظيفية' : 'Comprehensive reports on quality of work life'}</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <FileText className="h-4 w-4 mr-2" />
          {isRTL ? 'تقرير جديد' : 'New Report'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Smile className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold mb-1">{isRTL ? 'تقرير الرضا' : 'Satisfaction Report'}</h4>
            <p className="text-sm text-muted-foreground">{isRTL ? 'تقرير مفصل عن مستوى الرضا' : 'Detailed satisfaction level report'}</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">{isRTL ? 'تقرير الانخراط' : 'Engagement Report'}</h4>
            <p className="text-sm text-muted-foreground">{isRTL ? 'مستوى انخراط الموظفين' : 'Employee engagement levels'}</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">{isRTL ? 'تقرير الصحة النفسية' : 'Mental Health Report'}</h4>
            <p className="text-sm text-muted-foreground">{isRTL ? 'حالة الصحة النفسية العامة' : 'Overall mental health status'}</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-4 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold mb-1">{isRTL ? 'تقرير التوازن' : 'Balance Report'}</h4>
            <p className="text-sm text-muted-foreground">{isRTL ? 'توازن الحياة العملية' : 'Work-life balance analysis'}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'تقارير سريعة' : 'Quick Reports'}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              {isRTL ? 'تقرير الرضا الشهري' : 'Monthly Satisfaction Report'}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <BarChart3 className="h-4 w-4 mr-2" />
              {isRTL ? 'تحليل المبادرات' : 'Initiatives Analysis'}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-4 w-4 mr-2" />
              {isRTL ? 'مشاركة الموظفين' : 'Employee Participation'}
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              {isRTL ? 'اتجاهات جودة الحياة' : 'Quality of Life Trends'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'إحصائيات سريعة' : 'Quick Statistics'}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'أعلى قسم في الرضا:' : 'Highest Satisfaction Department:'}</span>
                <span className="font-semibold">{isRTL ? 'الموارد البشرية' : 'Human Resources'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'أكثر مبادرة نجاحاً:' : 'Most Successful Initiative:'}</span>
                <span className="font-semibold">{isRTL ? 'أسبوع الرفاهية' : 'Wellness Week'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'متوسط المشاركة:' : 'Average Participation:'}</span>
                <span className="font-semibold">78%</span>
              </div>
              <div className="flex justify-between items-center">
                <span>{isRTL ? 'تحسن الرضا:' : 'Satisfaction Improvement:'}</span>
                <div className="flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-semibold text-green-600">+12%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const tabContent = {
    dashboard: renderDashboard,
    surveys: renderSurveys,
    initiatives: renderInitiatives,
    mentalHealth: renderMentalHealthSupport,
    workBalance: renderWorkLifeBalance,
    specialInitiatives: renderSpecialInitiatives,
    reports: renderReports,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Leaf className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {isRTL ? 'نظام جودة الحياة المتكامل' : 'Comprehensive Quality of Life System'}
                </h1>
                <p className="text-muted-foreground">
                  {isRTL ? 'منصة شاملة لتعزيز الرفاهية والسعادة الوظيفية' : 'Complete platform for enhancing workplace wellbeing and happiness'}
                </p>
              </div>
            </div>
            {onBack && (
              <Button variant="outline" onClick={onBack}>
                {isRTL ? 'العودة' : 'Back'}
              </Button>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/90 backdrop-blur rounded-xl border border-primary/20 shadow-lg">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border/40 px-6 pt-6">
              <TabsList className="grid w-full grid-cols-7 gap-1 bg-muted/50">
                <TabsTrigger value="dashboard" className="flex items-center gap-2 text-xs">
                  <BarChart3 className="h-4 w-4" />
                  {isRTL ? 'لوحة التحكم' : 'Dashboard'}
                </TabsTrigger>
                <TabsTrigger value="surveys" className="flex items-center gap-2 text-xs">
                  <FileText className="h-4 w-4" />
                  {isRTL ? 'الاستبيانات' : 'Surveys'}
                </TabsTrigger>
                <TabsTrigger value="initiatives" className="flex items-center gap-2 text-xs">
                  <Leaf className="h-4 w-4" />
                  {isRTL ? 'المبادرات' : 'Initiatives'}
                </TabsTrigger>
                <TabsTrigger value="mentalHealth" className="flex items-center gap-2 text-xs">
                  <Brain className="h-4 w-4" />
                  {isRTL ? 'الدعم النفسي' : 'Mental Health'}
                </TabsTrigger>
                <TabsTrigger value="workBalance" className="flex items-center gap-2 text-xs">
                  <Target className="h-4 w-4" />
                  {isRTL ? 'التوازن' : 'Balance'}
                </TabsTrigger>
                <TabsTrigger value="specialInitiatives" className="flex items-center gap-2 text-xs">
                  <Award className="h-4 w-4" />
                  {isRTL ? 'مبادرات خاصة' : 'Special'}
                </TabsTrigger>
                <TabsTrigger value="reports" className="flex items-center gap-2 text-xs">
                  <PieChart className="h-4 w-4" />
                  {isRTL ? 'التقارير' : 'Reports'}
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              {Object.entries(tabContent).map(([key, renderContent]) => (
                <TabsContent key={key} value={key} className="mt-0">
                  {renderContent()}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveQualityOfLife;