import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, GraduationCap, BookOpen, Users, TrendingUp, 
  Video, ClipboardCheck, FileText, Settings, Brain, 
  Award, Target, Play, Download, Share
} from 'lucide-react';
import TrainingDashboard from './training/TrainingDashboard';
import TrainingPrograms from './training/TrainingPrograms';
import EmployeeTrainingRecords from './training/EmployeeTrainingRecords';
import LearningPaths from './training/LearningPaths';
import ELearningIntegration from './training/ELearningIntegration';
import AssessmentsFeedback from './training/AssessmentsFeedback';
import TrainingReports from './training/TrainingReports';
import TrainingSettings from './training/TrainingSettings';

interface TrainingDevelopmentProps {
  onBack: () => void;
}

const TrainingDevelopment = ({ onBack }: TrainingDevelopmentProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    {
      id: 'dashboard',
      label: isRTL ? 'لوحة التحكم' : 'Dashboard',
      icon: TrendingUp,
      component: TrainingDashboard,
      description: isRTL ? 'تنبيهات وإحصائيات التدريب' : 'Training alerts & KPIs'
    },
    {
      id: 'programs',
      label: isRTL ? 'برامج التدريب' : 'Training Programs',
      icon: BookOpen,
      component: TrainingPrograms,
      description: isRTL ? 'إدارة الدورات والبرامج' : 'Manage courses & programs'
    },
    {
      id: 'records',
      label: isRTL ? 'سجلات الموظفين' : 'Employee Records',
      icon: Users,
      component: EmployeeTrainingRecords,
      description: isRTL ? 'تتبع تدريب الموظفين' : 'Track employee training'
    },
    {
      id: 'paths',
      label: isRTL ? 'مسارات التعلم' : 'Learning Paths',
      icon: Target,
      component: LearningPaths,
      description: isRTL ? 'مسارات التطوير المهني' : 'Professional development paths'
    },
    {
      id: 'elearning',
      label: isRTL ? 'التعلم الإلكتروني' : 'E-Learning',
      icon: Video,
      component: ELearningIntegration,
      description: isRTL ? 'التكامل مع منصات التعلم' : 'Learning platform integration'
    },
    {
      id: 'assessments',
      label: isRTL ? 'التقييمات والتقييم' : 'Assessments',
      icon: ClipboardCheck,
      component: AssessmentsFeedback,
      description: isRTL ? 'تقييم فعالية التدريب' : 'Training effectiveness evaluation'
    },
    {
      id: 'reports',
      label: isRTL ? 'التقارير' : 'Reports',
      icon: FileText,
      component: TrainingReports,
      description: isRTL ? 'تقارير تفصيلية شاملة' : 'Comprehensive detailed reports'
    },
    {
      id: 'settings',
      label: isRTL ? 'الإعدادات' : 'Settings',
      icon: Settings,
      component: TrainingSettings,
      description: isRTL ? 'إعدادات النظام والصلاحيات' : 'System settings & permissions'
    }
  ];

  const trainingStats = [
    { label: isRTL ? 'برامج نشطة' : 'Active Programs', value: 42, icon: BookOpen, color: 'bg-gradient-to-r from-blue-500 to-cyan-600' },
    { label: isRTL ? 'موظف في التدريب' : 'Employees in Training', value: 127, icon: Users, color: 'bg-gradient-to-r from-green-500 to-emerald-600' },
    { label: isRTL ? 'شهادات مكتملة' : 'Completed Certifications', value: 89, icon: Award, color: 'bg-gradient-to-r from-purple-500 to-violet-600' },
    { label: isRTL ? 'ساعات تدريبية' : 'Training Hours', value: '2,340', icon: Play, color: 'bg-gradient-to-r from-orange-500 to-red-600' }
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Advanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-900 to-cyan-900 p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-chart-2/20"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
          
          <div className="relative z-10">
            {/* Header Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
                <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                  {isRTL ? 'نظام التدريب المتقدم' : 'Advanced Training System'}
                </Badge>
              </div>
              
              <div className="flex items-center gap-3">
                <Button className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300">
                  <Share className="h-4 w-4 mr-2" />
                  {isRTL ? 'مشاركة المحتوى' : 'Share Content'}
                </Button>
                <Button className="bg-primary hover:bg-primary/90 shadow-lg transition-all duration-300">
                  <Download className="h-4 w-4 mr-2" />
                  {isRTL ? 'تصدير التقارير' : 'Export Reports'}
                </Button>
                <Button className="bg-gradient-to-r from-chart-2 to-chart-3 hover:from-chart-2/90 hover:to-chart-3/90 text-white shadow-lg transition-all duration-300">
                  <Brain className="h-4 w-4 mr-2" />
                  {isRTL ? 'مساعد ذكي' : 'AI Assistant'}
                </Button>
              </div>
            </div>
            
            {/* Main Header Content */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-6 mb-6">
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 shadow-lg">
                  <GraduationCap className="h-16 w-16 text-white" />
                </div>
                <div className="hidden md:flex items-center gap-4">
                  {trainingStats.slice(0, 3).map((stat, idx) => (
                    <div key={idx} className="p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                      <stat.icon className="h-8 w-8 text-white/80" />
                    </div>
                  ))}
                </div>
              </div>
              
              <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
                {isRTL ? 'مركز التدريب والتطوير المتقدم' : 'Advanced Training & Development Center'}
              </h1>
              <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
                {isRTL 
                  ? 'منصة متكاملة لإدارة برامج التدريب وتطوير المهارات مع تتبع شامل للأداء وتقييم فعالية التعلم'
                  : 'Integrated platform for managing training programs and skill development with comprehensive performance tracking and learning effectiveness evaluation'
                }
              </p>
              
              {/* Training Performance Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                {trainingStats.map((stat, idx) => (
                  <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Training Features Overview */}
        <div className="mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-3 rounded-2xl shadow-lg">
              <BookOpen className="h-6 w-6" />
              <span className="font-bold text-lg">{isRTL ? 'منظومة التدريب الذكية' : 'Smart Training Ecosystem'}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {tabs.slice(0, 8).map((tab, index) => (
              <div key={index} className="group cursor-pointer" onClick={() => setActiveTab(tab.id)}>
                <div className={`${activeTab === tab.id ? 'bg-gradient-to-r from-primary to-chart-2' : 'bg-gradient-to-r from-slate-600 to-slate-700'} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <tab.icon className="h-10 w-10 text-white relative z-10" />
                </div>
                <p className={`text-center font-medium ${activeTab === tab.id ? 'text-primary' : 'text-gray-700'} group-hover:text-primary transition-colors duration-300 text-sm`}>
                  {tab.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="shadow-2xl border-0 overflow-hidden bg-gradient-to-br from-white to-slate-50">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Advanced Tab Navigation */}
              <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 p-6">
                <TabsList className="bg-transparent border-none p-0 h-auto space-x-2 w-full justify-start overflow-x-auto">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex-shrink-0 bg-white/10 border border-white/20 text-white hover:bg-white/20 data-[state=active]:bg-primary data-[state=active]:text-white transition-all duration-300 rounded-xl px-6 py-3 text-sm font-medium backdrop-blur-sm"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-white/10 rounded-lg">
                          <tab.icon className="h-4 w-4" />
                        </div>
                        <div className="text-left">
                          <div className="font-semibold">{tab.label}</div>
                          <div className="text-xs text-white/70">{tab.description}</div>
                        </div>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {tabs.map((tab) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0">
                    <div className="animate-fade-in">
                      <tab.component />
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer Information */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <GraduationCap className="h-4 w-4" />
            <span>
              {isRTL 
                ? 'نظام التدريب والتطوير المتقدم - مدعوم بالذكاء الاصطناعي'
                : 'Advanced Training & Development System - AI-Powered'
              }
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingDevelopment;