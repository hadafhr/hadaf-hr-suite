import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, Building2, Plus, BarChart3, Settings, 
  TrendingUp, Users, Network, FileText, 
  Activity, Target, Sparkles, Award, 
  Layers, GitBranch, Eye, Edit, Trash2,
  Download, Upload, Save, Printer, 
  Shield, Database, Workflow, Globe
} from 'lucide-react';
import DepartmentsDashboard from './departments/DepartmentsDashboard';
import DepartmentsDirectory from './departments/DepartmentsDirectory';
import UnitsManagement from './departments/UnitsManagement';
import OrganizationalChart from './departments/OrganizationalChart';
import DepartmentsReports from './departments/DepartmentsReports';
import DepartmentsSettings from './departments/DepartmentsSettings';

interface DepartmentsManagementProps {
  onBack: () => void;
}

const DepartmentsManagement = ({ onBack }: DepartmentsManagementProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const tabs = [
    {
      id: 'dashboard',
      label: isRTL ? 'لوحة التحكم' : 'Dashboard',
      icon: BarChart3,
      component: DepartmentsDashboard,
      description: isRTL ? 'إحصائيات شاملة للإدارات والوحدات مع مؤشرات الأداء' : 'Comprehensive statistics for departments and units with performance indicators'
    },
    {
      id: 'departments',
      label: isRTL ? 'قائمة الإدارات' : 'Departments List',
      icon: Building2,
      component: DepartmentsDirectory,
      description: isRTL ? 'إدارة الإدارات مع إمكانيات الإضافة والتعديل والحذف' : 'Department management with add, edit, and delete capabilities'
    },
    {
      id: 'units',
      label: isRTL ? 'الوحدات التابعة' : 'Associated Units',
      icon: Layers,
      component: UnitsManagement,
      description: isRTL ? 'ربط وإدارة الوحدات الفرعية بالإدارات الرئيسية' : 'Link and manage sub-units with main departments'
    },
    {
      id: 'orgchart',
      label: isRTL ? 'الهيكل التنظيمي' : 'Org Chart',
      icon: GitBranch,
      component: OrganizationalChart,
      description: isRTL ? 'العرض البصري التفاعلي للهيكل التنظيمي الكامل' : 'Interactive visual display of the complete organizational structure'
    },
    {
      id: 'reports',
      label: isRTL ? 'التقارير' : 'Reports',
      icon: FileText,
      component: DepartmentsReports,
      description: isRTL ? 'تقارير تفصيلية قابلة للطباعة والتصدير بصيغ متعددة' : 'Detailed reports for printing and exporting in multiple formats'
    },
    {
      id: 'settings',
      label: isRTL ? 'الإعدادات' : 'Settings',
      icon: Settings,
      component: DepartmentsSettings,
      description: isRTL ? 'تخصيص الصلاحيات والحقول وضبط آلية الربط' : 'Customize permissions, fields, and link mechanisms'
    }
  ];

  const departmentMetrics = [
    { 
      title: isRTL ? 'إجمالي الإدارات' : 'Total Departments',
      value: '12',
      description: isRTL ? 'جميع الإدارات المسجلة في النظام' : 'All departments registered in the system',
      icon: Building2,
      trend: '+3',
      color: 'from-primary to-primary-glow'
    },
    { 
      title: isRTL ? 'الإدارات النشطة' : 'Active Departments',
      value: '11',
      description: isRTL ? 'الإدارات العاملة حالياً' : 'Currently active departments',
      icon: Activity,
      trend: '+2',
      color: 'from-primary to-primary-glow'
    },
    { 
      title: isRTL ? 'الوحدات التابعة' : 'Sub Units',
      value: '34',
      description: isRTL ? 'الوحدات الفرعية المرتبطة' : 'Associated sub-units',
      icon: Layers,
      trend: '+8',
      color: 'from-muted-foreground to-muted-foreground'
    },
    { 
      title: isRTL ? 'إجمالي الموظفين' : 'Total Employees',
      value: '456',
      description: isRTL ? 'موظفين موزعين على الإدارات' : 'Employees distributed across departments',
      icon: Users,
      trend: '+23',
      color: 'from-primary to-primary-glow'
    }
  ];

  const quickActions = [
    { 
      title: isRTL ? 'إضافة إدارة جديدة' : 'Add New Department',
      description: isRTL ? 'إنشاء إدارة جديدة' : 'Create new department',
      icon: Plus,
      action: () => setActiveTab('departments')
    },
    { 
      title: isRTL ? 'ربط وحدة فرعية' : 'Link Sub Unit',
      description: isRTL ? 'ربط وحدة بإدارة' : 'Link unit to department',
      icon: Network,
      action: () => setActiveTab('units')
    },
    { 
      title: isRTL ? 'عرض الهيكل التنظيمي' : 'View Org Chart',
      description: isRTL ? 'الهيكل البصري' : 'Visual structure',
      icon: GitBranch,
      action: () => setActiveTab('orgchart')
    },
    { 
      title: isRTL ? 'طباعة التقارير' : 'Print Reports',
      description: isRTL ? 'تصدير وطباعة' : 'Export and print',
      icon: Printer,
      action: () => setActiveTab('reports')
    },
    { 
      title: isRTL ? 'تصدير البيانات' : 'Export Data',
      description: isRTL ? 'تصدير إكسل وPDF' : 'Export Excel & PDF',
      icon: Download,
      action: () => setActiveTab('reports')
    },
    { 
      title: isRTL ? 'رفع البيانات' : 'Upload Data',
      description: isRTL ? 'استيراد البيانات' : 'Import data',
      icon: Upload,
      action: () => console.log('رفع البيانات')
    },
    { 
      title: isRTL ? 'إدارة الصلاحيات' : 'Manage Permissions',
      description: isRTL ? 'ضبط الصلاحيات' : 'Configure permissions',
      icon: Shield,
      action: () => setActiveTab('settings')
    },
    { 
      title: isRTL ? 'سير العمل' : 'Workflow',
      description: isRTL ? 'تصميم سير العمل' : 'Design workflow',
      icon: Workflow,
      action: () => console.log('سير العمل')
    }
  ];

  const overviewData = [
    { 
      value: '94%',
      label: isRTL ? 'كفاءة التنظيم' : 'Organizational Efficiency',
      trend: isRTL ? 'تحسن مستمر' : 'Continuous improvement'
    },
    { 
      value: '89%',
      label: isRTL ? 'التكامل بين الإدارات' : 'Inter-Dept Integration',
      trend: isRTL ? 'تنسيق ممتاز' : 'Excellent coordination'
    },
    { 
      value: '96%',
      label: isRTL ? 'وضوح الهيكل' : 'Structure Clarity',
      trend: isRTL ? 'شفافية عالية' : 'High transparency'
    }
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img 
            src="/src/assets/boud-logo-centered.png" 
            alt="Boud Logo" 
            className="h-32 w-auto object-contain"
          />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">إدارة الإدارات والوحدات</h1>
          <p className="text-muted-foreground">منظومة شاملة لإدارة الهيكل التنظيمي</p>
        </div>

        {/* العنوان الرئيسي الاحترافي */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-primary to-primary-glow rounded-full shadow-glow mb-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent animate-pulse"></div>
            <Building2 className="h-14 w-14 text-white relative z-10" />
            <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent rounded-full animate-pulse"></div>
            <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-white/30 rounded-full animate-bounce"></div>
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-6 relative">
            {isRTL ? 'إدارة الإدارات والوحدات الاحترافية' : 'Professional Departments & Units Management'}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1.5 bg-gradient-to-r from-primary to-primary-glow rounded-full"></div>
          </h1>
          <p className="text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
            {isRTL ? 'نظام شامل ومتطور لإدارة الهيكل التنظيمي والإدارات والوحدات بأحدث التقنيات الاحترافية' : 'Comprehensive and advanced system for managing organizational structure, departments and units with the latest professional technologies'}
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-6 py-3 text-base font-medium hover:bg-primary/10 transition-all duration-300">
              <Sparkles className="h-5 w-5 ml-2" />
              {isRTL ? 'نظام ذكي' : 'Smart System'}
            </Badge>
            <Badge variant="outline" className="border-muted-foreground/30 text-muted-foreground bg-muted/20 px-6 py-3 text-base font-medium hover:bg-muted/30 transition-all duration-300">
              <Target className="h-5 w-5 ml-2" />
              {isRTL ? 'هيكل تنظيمي' : 'Organizational Structure'}
            </Badge>
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-6 py-3 text-base font-medium hover:bg-primary/10 transition-all duration-300">
              <Award className="h-5 w-5 ml-2" />
              {isRTL ? 'إدارة متقدمة' : 'Advanced Management'}
            </Badge>
          </div>
        </div>

        {/* الإحصائيات السريعة الاحترافية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {departmentMetrics.map((metric, index) => (
            <Card key={index} className="group hover:shadow-glow hover:scale-105 transition-all duration-700 border border-border/20 bg-white/98 backdrop-blur-sm animate-fade-in overflow-hidden relative" 
                  style={{animationDelay: `${index * 0.2}s`}}>
              {/* تأثير الخلفية المتحركة */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-xl -translate-y-12 translate-x-12 group-hover:scale-150 transition-transform duration-1000"></div>
              
              <CardContent className="p-8 relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-5 rounded-3xl bg-gradient-to-br ${metric.color} shadow-soft group-hover:shadow-glow group-hover:scale-110 transition-all duration-700 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <metric.icon className="h-8 w-8 text-white relative z-10" />
                  </div>
                  <Badge variant="outline" className="border-muted-foreground/20 text-muted-foreground bg-muted/10 hover:bg-muted/20 transition-colors duration-300 px-4 py-2">
                    +{metric.trend}
                  </Badge>
                </div>
                <div className="space-y-4">
                  <p className="text-4xl font-bold text-foreground group-hover:text-primary transition-colors duration-500">{metric.value}</p>
                  <p className="text-lg text-foreground font-semibold">{metric.title}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{metric.description}</p>
                </div>
                {/* مؤشر التقدم */}
                <div className="mt-6 w-full bg-muted/20 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* الإجراءات السريعة الاحترافية */}
        <div className="mb-12">
          <Card className="border border-border/20 bg-white/98 backdrop-blur-sm shadow-soft hover:shadow-medium transition-shadow duration-700 overflow-hidden relative">
            {/* خلفية متحركة للكارت */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/2 to-transparent"></div>
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-primary-glow to-primary"></div>
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
            
            <CardContent className="p-10 relative z-10">
              <div className="flex items-center gap-6 mb-10">
                <div className="w-18 h-18 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                  <Activity className="h-9 w-9 text-white relative z-10" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-foreground">{isRTL ? 'الإجراءات السريعة والذكية' : 'Smart Quick Actions'}</h3>
                  <p className="text-muted-foreground text-lg">{isRTL ? 'أدوات الإدارة المتقدمة للهيكل التنظيمي والإدارات' : 'Advanced management tools for organizational structure and departments'}</p>
                </div>
                <div className="mr-auto">
                  <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5 px-5 py-2 text-base">
                    {isRTL ? 'جاهز للاستخدام' : 'Ready to Use'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="group h-auto p-8 flex flex-col items-center gap-5 border border-border/30 bg-white hover:bg-primary/5 hover:border-primary/40 hover:shadow-glow transition-all duration-700 animate-fade-in relative overflow-hidden"
                    style={{animationDelay: `${index * 0.1}s`}}
                    onClick={() => {
                      console.log(`تم تفعيل ${action.title}`);
                      if (action.action) action.action();
                    }}
                  >
                    {/* تأثير الهوفر المتحرك */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute top-0 right-0 w-10 h-10 bg-primary/10 rounded-full blur-lg -translate-y-5 translate-x-5 group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <div className="w-16 h-16 bg-gradient-to-br from-muted/30 to-muted/10 group-hover:from-primary group-hover:to-primary-glow rounded-3xl flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:shadow-glow relative z-10">
                      <action.icon className="h-8 w-8 text-muted-foreground group-hover:text-white transition-colors duration-500" />
                    </div>
                    <div className="text-center relative z-10">
                      <p className="text-base font-semibold text-foreground group-hover:text-primary transition-colors duration-500">{action.title}</p>
                      <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{action.description}</p>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* عرض سريع للبيانات الاحترافي */}
        <div className="mb-12">
          <Card className="border border-border/20 bg-white/98 backdrop-blur-sm shadow-soft hover:shadow-medium transition-all duration-700 overflow-hidden relative">
            {/* تصميم الخلفية المتقدم */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-muted/3"></div>
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-muted/15 rounded-full blur-2xl animate-float"></div>
            
            <CardContent className="p-10 relative z-10">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-6">
                  <div className="w-18 h-18 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-glow relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent rounded-3xl animate-pulse"></div>
                    <BarChart3 className="h-9 w-9 text-white relative z-10" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-foreground">{isRTL ? 'نظرة عامة تنظيمية متقدمة' : 'Advanced Organizational Overview'}</h3>
                    <p className="text-muted-foreground text-lg">{isRTL ? 'إحصائيات الهيكل التنظيمي المحدثة لحظياً' : 'Real-time organizational structure statistics'}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-primary/30 hover:border-primary hover:bg-primary/10 hover:text-primary transition-all duration-500 hover:shadow-soft px-8 py-3 text-base"
                  onClick={() => {
                    console.log('تصدير البيانات التنظيمية');
                    setActiveTab('reports');
                  }}
                >
                  <Download className="h-5 w-5 ml-2" />
                  {isRTL ? 'تصدير البيانات' : 'Export Data'}
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {overviewData.map((item, index) => (
                  <div key={index} className="group text-center p-8 bg-card/50 hover:bg-card/80 rounded-3xl border border-border/20 hover:border-primary/30 hover:shadow-glow transition-all duration-700 animate-fade-in relative overflow-hidden"
                       style={{animationDelay: `${index * 0.2}s`}}>
                    {/* تأثيرات الخلفية التفاعلية */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/8 rounded-full blur-lg -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-1000"></div>
                    
                    <div className="relative z-10">
                      <div className="text-5xl font-bold text-foreground group-hover:text-primary transition-colors duration-500 mb-4">{item.value}</div>
                      <div className="text-lg text-foreground font-semibold mb-3">{item.label}</div>
                      <div className="text-sm text-muted-foreground">{item.trend}</div>
                      
                      {/* مؤشر التقدم المتحرك */}
                      <div className="mt-6 w-full bg-muted/20 rounded-full h-1.5 overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-primary to-primary-glow rounded-full transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 ease-out"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* قسم التبويبات الاحترافي المتطور */}
        <div className="overflow-hidden animate-fade-in">
          <Card className="border border-border/20 bg-white/99 backdrop-blur-sm shadow-medium hover:shadow-strong transition-all duration-1000 overflow-hidden relative">
            {/* خلفية متدرجة متحركة */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/1 via-transparent to-muted/2"></div>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/3 rounded-full blur-3xl animate-pulse-slow"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-muted/8 rounded-full blur-3xl animate-float"></div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full relative z-10">
              <div className="border-b border-border/20 px-10 py-8 bg-gradient-to-r from-primary/3 via-white/70 to-muted/3 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center shadow-glow relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent animate-pulse"></div>
                      <Database className="h-10 w-10 text-white relative z-10" />
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-accent rounded-full animate-bounce"></div>
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-foreground">{isRTL ? 'أقسام إدارة الهيكل التنظيمي' : 'Organizational Structure Management Sections'}</h3>
                      <p className="text-muted-foreground text-lg">{isRTL ? 'الوصول الشامل لجميع أدوات إدارة الإدارات والوحدات' : 'Comprehensive access to all departments and units management tools'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="border-primary/30 text-primary bg-primary/10 px-6 py-3 font-semibold text-base">
                      {tabs.find(tab => tab.id === activeTab)?.label}
                    </Badge>
                    <div className="w-4 h-4 bg-primary rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <TabsList className="bg-white/90 backdrop-blur-sm border border-border/30 p-3 shadow-soft rounded-3xl overflow-hidden">
                  {tabs.map((tab, index) => (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary-glow data-[state=active]:text-white data-[state=active]:shadow-glow hover:bg-muted/30 hover:scale-105 transition-all duration-700 animate-fade-in px-8 py-4 rounded-2xl font-medium relative overflow-hidden text-base"
                      style={{animationDelay: `${index * 0.1}s`}}
                      onClick={() => {
                        console.log(`تم تفعيل تبويب: ${tab.label}`);
                        setActiveTab(tab.id);
                      }}
                    >
                      {/* تأثير الهوفر */}
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/8 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                      <tab.icon className="h-6 w-6 ml-3 relative z-10" />
                      <span className="relative z-10">{tab.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              <div className="p-10 bg-gradient-to-br from-white/70 via-card/20 to-muted/8 backdrop-blur-sm">
                {tabs.map((tab, tabIndex) => (
                  <TabsContent key={tab.id} value={tab.id} className="mt-0 animate-fade-in" style={{animationDelay: '0.3s'}}>
                    <div className="bg-white/95 backdrop-blur-sm p-10 rounded-3xl shadow-soft hover:shadow-medium transition-all duration-700 border border-border/20 relative overflow-hidden">
                      {/* خلفية التبويب المتحركة */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/2 via-transparent to-muted/3"></div>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/3 rounded-full blur-3xl -translate-y-16 translate-x-16 animate-pulse-slow"></div>
                      
                      <div className="flex items-center gap-6 mb-8 relative z-10">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-glow rounded-3xl flex items-center justify-center shadow-soft">
                          <tab.icon className="h-8 w-8 text-white" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold text-foreground">{tab.label}</h4>
                          <p className="text-muted-foreground text-lg leading-relaxed">{tab.description}</p>
                        </div>
                        <div className="mr-auto">
                          <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 px-4 py-2 text-base">
                            {isRTL ? 'نشط' : 'Active'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="relative z-10">
                        <tab.component />
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DepartmentsManagement;