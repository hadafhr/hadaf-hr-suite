import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, GraduationCap, BookOpen, Users, TrendingUp, 
  Video, ClipboardCheck, FileText, Settings, Brain, 
  Award, Target, Play, Download, Share, Plus
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
    <div className={`min-h-screen bg-background ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-border/50">
          <div className="absolute inset-0 bg-[url('/lovable-uploads/boud-pattern-bg.jpg')] opacity-5"></div>
          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Button
                  variant="ghost" 
                  size="sm"
                  onClick={onBack}
                  className="hover:bg-primary/10"
                >
                  <ArrowLeft className="h-4 w-4 ml-2" />
                  العودة
                </Button>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">
                      {isRTL ? 'التدريب والتطوير' : 'Training & Development'}
                    </h1>
                    <p className="text-muted-foreground text-lg mt-1">
                      {isRTL 
                        ? 'منظومة شاملة لإدارة برامج التدريب وتطوير المهارات مع أدوات التحليل المتقدمة والتقارير التفصيلية'
                        : 'Comprehensive platform for managing training programs and skill development with advanced analytics and detailed reports'
                      }
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير التقرير' : 'Export Report'}
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 ml-2" />
                  {isRTL ? 'طباعة' : 'Print'}
                </Button>
                <Button size="sm">
                  <Plus className="h-4 w-4 ml-2" />
                  {isRTL ? 'تدريب جديد' : 'New Training'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Key Performance Indicators */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
            <Card className="border-l-4 border-l-primary">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'برامج نشطة' : 'Active Programs'}</p>
                    <p className="text-2xl font-bold text-primary">42</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-primary/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'موظف في التدريب' : 'Employees in Training'}</p>
                    <p className="text-2xl font-bold text-orange-600">127</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-500/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-emerald-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'شهادات مكتملة' : 'Completed Certifications'}</p>
                    <p className="text-2xl font-bold text-emerald-600">89</p>
                  </div>
                  <Award className="h-8 w-8 text-emerald-500/60" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{isRTL ? 'ساعات تدريبية' : 'Training Hours'}</p>
                    <p className="text-2xl font-bold text-blue-600">2,340</p>
                  </div>
                  <Play className="h-8 w-8 text-blue-500/60" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Card className="border border-border">
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              {/* Simple Tab Navigation */}
              <div className="bg-muted/30 border-b border-border">
                <TabsList className="bg-transparent border-none p-1 h-auto w-full justify-start overflow-x-auto">
                  {tabs.map((tab) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex-shrink-0 data-[state=active]:bg-background data-[state=active]:text-foreground transition-all duration-200 rounded-md px-4 py-2 text-sm font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <tab.icon className="h-4 w-4" />
                        <span>{tab.label}</span>
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