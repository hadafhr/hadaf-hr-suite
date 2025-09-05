import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  MessageSquare, 
  Upload, 
  Mic, 
  Video, 
  FileText, 
  Settings, 
  Play,
  Pause,
  Download,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Brain,
  User,
  Phone,
  Mail,
  Calendar,
  Star
} from 'lucide-react';

export const RecruitmentChatbot = () => {
  const [activeTab, setActiveTab] = useState('configure');
  const [botSettings, setBotSettings] = useState({
    welcomeMessage: 'مرحباً بك في منصة التوظيف الذكي! أنا مساعدك الافتراضي وسأساعدك في عملية التقديم.',
    collectBasicInfo: true,
    enableCVParsing: true,
    enablePreScreening: true,
    enableVoiceInterview: true,
    enableVideoInterview: false,
    autoNotifications: true,
    multiLanguage: true
  });

  const candidateInteractions = [
    {
      id: 1,
      candidateName: 'أحمد محمد العتيبي',
      position: 'مطور Full Stack',
      status: 'مكتمل',
      startTime: '2024-01-20 14:30',
      duration: '12 دقيقة',
      cvUploaded: true,
      preScreenCompleted: true,
      extractedData: {
        experience: '4 سنوات',
        skills: ['React', 'Node.js', 'TypeScript', 'MongoDB'],
        education: 'بكالوريوس علوم حاسب',
        expectedSalary: '15000 ريال'
      },
      preScreenScore: 85,
      nextStep: 'مراجعة الذكاء الاصطناعي'
    },
    {
      id: 2,
      candidateName: 'فاطمة سالم القحطاني',
      position: 'محاسب أول',
      status: 'جاري',
      startTime: '2024-01-20 15:15',
      duration: '8 دقائق',
      cvUploaded: true,
      preScreenCompleted: false,
      extractedData: {
        experience: '6 سنوات',
        skills: ['Excel', 'SAP', 'التدقيق المالي'],
        education: 'بكالوريوس محاسبة + CPA',
        expectedSalary: '12000 ريال'
      },
      preScreenScore: null,
      nextStep: 'المقابلة الأولية'
    },
    {
      id: 3,
      candidateName: 'خالد عبدالله المطيري',
      position: 'مدير مشروع',
      status: 'معلق',
      startTime: '2024-01-20 13:45',
      duration: '5 دقائق',
      cvUploaded: false,
      preScreenCompleted: false,
      extractedData: null,
      preScreenScore: null,
      nextStep: 'رفع السيرة الذاتية'
    }
  ];

  const botFeatures = [
    {
      title: 'جمع البيانات الأساسية',
      description: 'جمع اسم المرشح، خبرته، وتوقع الراتب',
      icon: User,
      enabled: botSettings.collectBasicInfo
    },
    {
      title: 'تحليل السيرة الذاتية',
      description: 'رفع وتحليل السيرة الذاتية تلقائياً واستخراج المهارات',
      icon: FileText,
      enabled: botSettings.enableCVParsing
    },
    {
      title: 'المقابلة الأولية',
      description: 'إجراء مقابلة أولية مع أسئلة ذكية حسب المنصب',
      icon: MessageSquare,
      enabled: botSettings.enablePreScreening
    },
    {
      title: 'المقابلة الصوتية',
      description: 'مقابلة صوتية مع تحليل النبرة والثقة',
      icon: Mic,
      enabled: botSettings.enableVoiceInterview
    },
    {
      title: 'المقابلة المرئية',
      description: 'مقابلة فيديو مع تحليل تعابير الوجه ولغة الجسد',
      icon: Video,
      enabled: botSettings.enableVideoInterview
    },
    {
      title: 'الإشعارات التلقائية',
      description: 'إشعارات للمرشح عن الاستلام والمواعيد والنتائج',
      icon: CheckCircle,
      enabled: botSettings.autoNotifications
    }
  ];

  const handleSettingChange = (setting: string, value: boolean) => {
    setBotSettings(prev => ({ ...prev, [setting]: value }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'مكتمل': return 'bg-green-500 text-white';
      case 'جاري': return 'bg-blue-500 text-white';
      case 'معلق': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            الشات بوت التوظيفي الذكي
          </h2>
          <p className="text-muted-foreground">تكوين وإدارة المساعد الافتراضي للتوظيف</p>
        </div>
        <Button className="flex items-center gap-2">
          <Play className="w-4 h-4" />
          تشغيل الشات بوت
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="configure">التكوين</TabsTrigger>
          <TabsTrigger value="interactions">التفاعلات</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
          <TabsTrigger value="preview">المعاينة</TabsTrigger>
        </TabsList>

        <TabsContent value="configure" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bot Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-primary" />
                  إعدادات الشات بوت
                </CardTitle>
                <CardDescription>تخصيص رسائل وسلوك الشات بوت</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="welcomeMessage">رسالة الترحيب</Label>
                  <Textarea
                    id="welcomeMessage"
                    value={botSettings.welcomeMessage}
                    onChange={(e) => setBotSettings(prev => ({ ...prev, welcomeMessage: e.target.value }))}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">الميزات المتاحة</h4>
                  {botFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <feature.icon className="w-5 h-5 text-primary" />
                        <div>
                          <p className="font-medium">{feature.title}</p>
                          <p className="text-sm text-muted-foreground">{feature.description}</p>
                        </div>
                      </div>
                      <Switch
                        checked={feature.enabled}
                        onCheckedChange={(checked) => {
                          const settingKey = Object.keys(botSettings).find(key => 
                            botSettings[key as keyof typeof botSettings] === feature.enabled
                          );
                          if (settingKey) handleSettingChange(settingKey, checked);
                        }}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-primary" />
                  إجراءات سريعة
                </CardTitle>
                <CardDescription>إدارة وتشغيل الشات بوت</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    تشغيل
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Pause className="w-4 h-4" />
                    إيقاف
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    معاينة
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    تصدير
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">حالة الشات بوت</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>الحالة:</span>
                      <Badge className="bg-green-500 text-white">نشط</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>التفاعلات اليوم:</span>
                      <span className="font-semibold">24</span>
                    </div>
                    <div className="flex justify-between">
                      <span>معدل الإكمال:</span>
                      <span className="font-semibold text-green-600">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>متوسط الوقت:</span>
                      <span className="font-semibold">8.5 دقيقة</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="interactions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                تفاعلات المرشحين
              </CardTitle>
              <CardDescription>مراقبة وإدارة تفاعلات المرشحين مع الشات بوت</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {candidateInteractions.map((interaction) => (
                  <div key={interaction.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold">{interaction.candidateName}</h4>
                        <p className="text-sm text-muted-foreground">{interaction.position}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(interaction.status)}>
                          {interaction.status}
                        </Badge>
                        {interaction.preScreenScore && (
                          <Badge variant="outline">
                            <Star className="w-3 h-3 mr-1" />
                            {interaction.preScreenScore}%
                          </Badge>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">بدء التفاعل</p>
                        <p className="font-medium">{interaction.startTime}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">المدة</p>
                        <p className="font-medium">{interaction.duration}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">السيرة الذاتية</p>
                        <div className="flex items-center gap-1">
                          {interaction.cvUploaded ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-600" />
                          )}
                          <span>{interaction.cvUploaded ? 'مرفوعة' : 'لم ترفع'}</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-muted-foreground">المقابلة الأولية</p>
                        <div className="flex items-center gap-1">
                          {interaction.preScreenCompleted ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-600" />
                          )}
                          <span>{interaction.preScreenCompleted ? 'مكتملة' : 'جارية'}</span>
                        </div>
                      </div>
                    </div>

                    {interaction.extractedData && (
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h5 className="font-medium mb-2">البيانات المستخرجة:</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">الخبرة: </span>
                            <span className="font-medium">{interaction.extractedData.experience}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">التعليم: </span>
                            <span className="font-medium">{interaction.extractedData.education}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">الراتب المتوقع: </span>
                            <span className="font-medium">{interaction.extractedData.expectedSalary}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">المهارات: </span>
                            <span className="font-medium">{interaction.extractedData.skills.join(', ')}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <Badge variant="outline" className="text-blue-600">
                        الخطوة التالية: {interaction.nextStep}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          عرض المحادثة
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          متابعة
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">إجمالي التفاعلات</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">معدل الإكمال</p>
                    <p className="text-2xl font-bold">87%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">متوسط الوقت</p>
                    <p className="text-2xl font-bold">8.5 دقيقة</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-muted-foreground">رضا المرشحين</p>
                    <p className="text-2xl font-bold">4.6/5</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>تحليلات مفصلة</CardTitle>
              <CardDescription>إحصائيات شاملة عن أداء الشات بوت</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-4">أداء الميزات</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>تحليل السيرة الذاتية</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div className="w-[96%] bg-green-500 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm">96%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>المقابلة الأولية</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div className="w-[87%] bg-blue-500 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm">87%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>المقابلة الصوتية</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-muted rounded-full h-2">
                          <div className="w-[78%] bg-purple-500 h-2 rounded-full"></div>
                        </div>
                        <span className="text-sm">78%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5 text-primary" />
                معاينة الشات بوت
              </CardTitle>
              <CardDescription>اختبر تجربة المرشح مع الشات بوت</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted/30 rounded-lg p-6 max-w-md mx-auto">
                <div className="bg-primary/10 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bot className="w-5 h-5 text-primary" />
                    <span className="font-semibold">مساعد التوظيف</span>
                  </div>
                  <p className="text-sm">{botSettings.welcomeMessage}</p>
                </div>
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <User className="w-4 h-4 mr-2" />
                    إدخال البيانات الأساسية
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    رفع السيرة الذاتية
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    بدء المقابلة الأولية
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Mic className="w-4 h-4 mr-2" />
                    المقابلة الصوتية
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};