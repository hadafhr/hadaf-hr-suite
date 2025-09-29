import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Heart, 
  FileText, 
  Home, 
  HandHeart, 
  BarChart3, 
  Settings,
  Bell,
  TrendingUp,
  DollarSign,
  Calendar,
  Award,
  ArrowLeft
} from 'lucide-react';
import { SocialServicesDashboard } from './socialServices/SocialServicesDashboard';
import { SupportPrograms } from './socialServices/SupportPrograms';
import { EmployeeSocialRequests } from './socialServices/EmployeeSocialRequests';
import { WellbeingServices } from './socialServices/WellbeingServices';
import { CommunityVolunteering } from './socialServices/CommunityVolunteering';
import { SocialServicesReports } from './socialServices/SocialServicesReports';
import { SocialServicesSettings } from './socialServices/SocialServicesSettings';

const SocialServices = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const onBack = () => {
    // Navigation back functionality can be added here
    console.log('Navigate back');
  };

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      labelAr: 'لوحة التحكم',
      icon: BarChart3,
      component: SocialServicesDashboard
    },
    {
      id: 'programs',
      label: 'Support Programs',
      labelAr: 'برامج الدعم',
      icon: Heart,
      component: SupportPrograms
    },
    {
      id: 'requests',
      label: 'Employee Requests',
      labelAr: 'طلبات الموظفين',
      icon: FileText,
      component: EmployeeSocialRequests
    },
    {
      id: 'wellbeing',
      label: 'Wellbeing & Family',
      labelAr: 'الرفاهية والأسرة',
      icon: Home,
      component: WellbeingServices
    },
    {
      id: 'community',
      label: 'Community & Volunteering',
      labelAr: 'المجتمع والتطوع',
      icon: HandHeart,
      component: CommunityVolunteering
    },
    {
      id: 'reports',
      label: 'Reports',
      labelAr: 'التقارير',
      icon: BarChart3,
      component: SocialServicesReports
    },
    {
      id: 'settings',
      label: 'Settings',
      labelAr: 'الإعدادات',
      icon: Settings,
      component: SocialServicesSettings
    }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || SocialServicesDashboard;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      {/* Header - Matching AI System Design */}
      <div className="flex items-center justify-between mb-12 p-6 bg-gray-900/60 backdrop-blur-xl rounded-3xl shadow-2xl shadow-[#008C6A]/10 border border-[#008C6A]/30 hover:border-[#008C6A]/50 animate-fade-in transition-all duration-300">
        <div className="flex items-center gap-6">
          <Button variant="outline" size="sm" onClick={onBack} className="border-gray-300 hover:bg-[#3CB593]/5 hover:border-[#3CB593]/30 hover:text-[#3CB593] transition-all duration-300">
            <ArrowLeft className="h-4 w-4 ml-2" />
            رجوع
          </Button>
          <div className="h-8 w-px bg-gray-300"></div>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#3CB593] to-[#2da574] rounded-3xl flex items-center justify-center shadow-lg relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              <Heart className="h-8 w-8 text-white relative z-10 group-hover:scale-110 transition-transform" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-black">
                نظام الخدمات الاجتماعية المتطور
              </h1>
              <p className="text-gray-600 text-lg">
                إدارة شاملة لبرامج الدعم الاجتماعي والرعاية بتقنيات ذكية
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="border-[#3CB593]/30 text-[#3CB593] bg-[#3CB593]/5 px-4 py-2 text-sm font-medium">
            <Heart className="h-4 w-4 ml-2" />
            نظام متقدم
          </Badge>
          <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Bell className="h-4 w-4 ml-2" />
            الإشعارات
          </Button>
          <Button className="bg-gradient-to-r from-[#3CB593] to-[#2da574] hover:from-[#2da574] hover:to-[#3CB593] text-white shadow-lg hover:shadow-xl transition-all duration-300">
            <Award className="h-4 w-4 ml-2" />
            التقارير
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold text-foreground">
                نظام الخدمات الاجتماعية المتكامل
              </CardTitle>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  <Award className="h-3 w-3 mr-1" />
                  معتمد من وزارة الموارد البشرية
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-7 mb-8 bg-muted/50 p-1 rounded-xl">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <TabsTrigger
                      key={tab.id}
                      value={tab.id}
                      className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-300 hover:bg-primary/10 data-[state=active]:bg-primary data-[state=active]:text-white"
                    >
                      <Icon className="h-4 w-4" />
                      <span className="hidden lg:inline font-medium">{tab.labelAr}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              <div className="animate-fade-in">
                <ActiveComponent />
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SocialServices;