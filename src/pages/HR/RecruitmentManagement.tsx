import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SystemHeader } from '@/components/shared/SystemHeader';
import SmartHire from '@/pages/SmartHire';
import { ManpowerRequestForm } from '@/components/recruitment/ManpowerRequestForm';
import { ManpowerRequestsList } from '@/components/recruitment/ManpowerRequestsList';
import { 
  Users, 
  UserPlus, 
  Search, 
  TrendingUp, 
  BarChart3,
  Target,
  FileText,
  CheckCircle,
  Briefcase
} from 'lucide-react';

export const RecruitmentManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock data for overview
  const overviewStats = {
    activeJobs: 25,
    totalApplications: 185,
    shortlisted: 45,
    interviews: 28,
    hired: 12,
    rejections: 98
  };

  return (
    <div className="min-h-screen p-6 bg-background text-foreground" dir="rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/src/assets/boud-logo-centered.png" alt="Boud Logo" className="h-32 w-auto object-contain" />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-foreground">نظام التوظيف الذكي الشامل</h1>
          <p className="text-muted-foreground">إدارة متكاملة للتوظيف والاستقطاب مع ربط بأنظمة تقييم المرشحين والمقابلات</p>
        </div>

        {/* Main Content */}
        <div className="rounded-xl border border-border p-6 bg-card">
          <Tabs defaultValue="smarthire" className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-card/60 backdrop-blur-xl border border-border shadow-2xl shadow-accent/10 rounded-xl">
              <TabsTrigger value="smarthire" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                <Users className="h-5 w-5" />
                <span className="text-xs">نظام التوظيف الذكي</span>
              </TabsTrigger>
              <TabsTrigger value="manpower" className="flex flex-col gap-1 py-3 text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground hover:bg-accent/20 transition-all duration-300 rounded-lg">
                <Briefcase className="h-5 w-5" />
                <span className="text-xs">طلب احتياج وظيفي</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="smarthire" className="mt-6">
              <SmartHire />
            </TabsContent>

            <TabsContent value="manpower" className="mt-6 space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <ManpowerRequestForm onSuccess={() => {}} />
                </div>
                <div>
                  <Card className="bg-card/50 backdrop-blur-sm border border-border h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-primary" />
                        إرشادات طلب الاحتياج الوظيفي
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">حدد الاحتياج بدقة</h4>
                            <p className="text-sm text-muted-foreground">
                              أدخل المسمى الوظيفي والمهارات المطلوبة بوضوح
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">سلسلة الموافقات</h4>
                            <p className="text-sm text-muted-foreground">
                              المدير المباشر → المالية (إن لزم) → الموارد البشرية
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">الموافقة المالية</h4>
                            <p className="text-sm text-muted-foreground">
                              مطلوبة تلقائياً إذا تجاوز الراتب 15,000 ريال
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium">التحويل التلقائي</h4>
                            <p className="text-sm text-muted-foreground">
                              بعد الموافقة النهائية، يتم التحويل لوظيفة شاغرة
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <FileText className="h-6 w-6 text-primary" />
                  طلبات الاحتياج الوظيفي
                </h3>
                <ManpowerRequestsList />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};