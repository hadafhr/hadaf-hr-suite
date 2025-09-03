import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Settings, Users, Shield, Brain, Database, 
  Save, RefreshCw, Upload, Download, AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AISettings = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('permissions');

  const [aiSettings, setAISettings] = useState({
    chatbot: {
      enabled: true,
      responseTime: 2,
      confidenceThreshold: 80,
      language: 'auto'
    },
    predictiveAnalytics: {
      enabled: true,
      updateFrequency: 'daily',
      alertThreshold: 75,
      departments: ['all']
    },
    recommendations: {
      enabled: true,
      autoApprove: false,
      minConfidence: 85,
      maxRecommendations: 10
    }
  });

  const roles = [
    {
      id: 'employee',
      name: isRTL ? 'موظف' : 'Employee',
      permissions: {
        chatbot: true,
        personalInsights: true,
        leaveQueries: true,
        salaryInfo: true,
        performanceView: true,
        recommendations: false,
        analytics: false,
        training: false,
        teamInsights: false,
        attritionRisk: false,
        systemConfig: false,
        dataExport: false,
        modelTraining: false
      }
    },
    {
      id: 'manager',
      name: isRTL ? 'مدير' : 'Manager',
      permissions: {
        chatbot: true,
        personalInsights: true,
        leaveQueries: true,
        salaryInfo: true,
        performanceView: true,
        recommendations: true,
        analytics: true,
        training: true,
        teamInsights: true,
        attritionRisk: true,
        systemConfig: false,
        dataExport: false,
        modelTraining: false
      }
    },
    {
      id: 'hr',
      name: isRTL ? 'موارد بشرية' : 'HR',
      permissions: {
        chatbot: true,
        personalInsights: true,
        leaveQueries: true,
        salaryInfo: true,
        performanceView: true,
        recommendations: true,
        analytics: true,
        training: true,
        teamInsights: true,
        attritionRisk: true,
        systemConfig: true,
        dataExport: true,
        modelTraining: true
      }
    }
  ];

  const [permissions, setPermissions] = useState(roles);

  const trainingData = [
    {
      id: 1,
      name: isRTL ? 'سياسات الشركة' : 'Company Policies',
      type: 'documents',
      size: '2.4 MB',
      lastUpdated: '2024-06-15',
      status: 'active',
      usage: 847
    },
    {
      id: 2,
      name: isRTL ? 'بيانات الموظفين التاريخية' : 'Historical Employee Data',
      type: 'structured',
      size: '15.2 MB',
      lastUpdated: '2024-06-14',
      status: 'active',
      usage: 1205
    },
    {
      id: 3,
      name: isRTL ? 'دليل الإجراءات' : 'Procedures Manual',
      type: 'documents',
      size: '4.1 MB',
      lastUpdated: '2024-06-13',
      status: 'training',
      usage: 324
    }
  ];

  const handleSettingChange = (category, setting, value) => {
    setAISettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  const handlePermissionChange = (roleId, permission, value) => {
    setPermissions(prev => 
      prev.map(role => 
        role.id === roleId 
          ? {
              ...role,
              permissions: {
                ...role.permissions,
                [permission]: value
              }
            }
          : role
      )
    );
  };

  const saveSettings = () => {
    toast({
      title: isRTL ? 'تم حفظ الإعدادات' : 'Settings Saved',
      description: isRTL ? 'تم تطبيق الإعدادات بنجاح' : 'Settings have been applied successfully'
    });
  };

  const resetSettings = () => {
    toast({
      title: isRTL ? 'تم إعادة تعيين الإعدادات' : 'Settings Reset',
      description: isRTL ? 'تم استعادة الإعدادات الافتراضية' : 'Default settings have been restored'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              {isRTL ? 'إعدادات الذكاء الاصطناعي' : 'AI Settings'}
            </CardTitle>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={resetSettings}>
                <RefreshCw className="h-4 w-4 mr-2" />
                {isRTL ? 'إعادة تعيين' : 'Reset'}
              </Button>
              <Button size="sm" onClick={saveSettings}>
                <Save className="h-4 w-4 mr-2" />
                {isRTL ? 'حفظ' : 'Save'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="permissions">{isRTL ? 'الصلاحيات' : 'Permissions'}</TabsTrigger>
              <TabsTrigger value="features">{isRTL ? 'الميزات' : 'Features'}</TabsTrigger>
              <TabsTrigger value="training">{isRTL ? 'التدريب' : 'Training Data'}</TabsTrigger>
            </TabsList>

            <TabsContent value="permissions" className="mt-6">
              <div className="space-y-6">
                {permissions.map((role) => (
                  <Card key={role.id}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        {role.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.entries(role.permissions).map(([permission, enabled]) => (
                          <div key={permission} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <span className="font-medium capitalize">
                                {permission.replace(/([A-Z])/g, ' $1').trim()}
                              </span>
                            </div>
                            <Switch
                              checked={enabled}
                              onCheckedChange={(value) => 
                                handlePermissionChange(role.id, permission, value)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <div className="space-y-6">
                {/* Chatbot Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      {isRTL ? 'إعدادات المساعد الذكي' : 'AI Chatbot Settings'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{isRTL ? 'تفعيل المساعد الذكي' : 'Enable AI Chatbot'}</h4>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'تفعيل أو إلغاء تفعيل المساعد الذكي' : 'Enable or disable the AI chatbot'}
                        </p>
                      </div>
                      <Switch
                        checked={aiSettings.chatbot.enabled}
                        onCheckedChange={(value) => 
                          handleSettingChange('chatbot', 'enabled', value)
                        }
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{isRTL ? 'وقت الاستجابة' : 'Response Time'}</h4>
                        <Badge variant="outline">{aiSettings.chatbot.responseTime}s</Badge>
                      </div>
                      <Slider
                        value={[aiSettings.chatbot.responseTime]}
                        onValueChange={([value]) => 
                          handleSettingChange('chatbot', 'responseTime', value)
                        }
                        max={10}
                        min={1}
                        step={1}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{isRTL ? 'حد الثقة' : 'Confidence Threshold'}</h4>
                        <Badge variant="outline">{aiSettings.chatbot.confidenceThreshold}%</Badge>
                      </div>
                      <Slider
                        value={[aiSettings.chatbot.confidenceThreshold]}
                        onValueChange={([value]) => 
                          handleSettingChange('chatbot', 'confidenceThreshold', value)
                        }
                        max={100}
                        min={50}
                        step={5}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">{isRTL ? 'اللغة الافتراضية' : 'Default Language'}</h4>
                      <Select
                        value={aiSettings.chatbot.language}
                        onValueChange={(value) => 
                          handleSettingChange('chatbot', 'language', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">{isRTL ? 'تلقائي' : 'Auto-detect'}</SelectItem>
                          <SelectItem value="ar">{isRTL ? 'عربي' : 'Arabic'}</SelectItem>
                          <SelectItem value="en">{isRTL ? 'إنجليزي' : 'English'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Predictive Analytics Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Database className="h-5 w-5" />
                      {isRTL ? 'إعدادات التحليلات التنبؤية' : 'Predictive Analytics Settings'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{isRTL ? 'تفعيل التحليلات التنبؤية' : 'Enable Predictive Analytics'}</h4>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'تفعيل التنبؤات والتحليلات الذكية' : 'Enable predictions and smart analytics'}
                        </p>
                      </div>
                      <Switch
                        checked={aiSettings.predictiveAnalytics.enabled}
                        onCheckedChange={(value) => 
                          handleSettingChange('predictiveAnalytics', 'enabled', value)
                        }
                      />
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">{isRTL ? 'تكرار التحديث' : 'Update Frequency'}</h4>
                      <Select
                        value={aiSettings.predictiveAnalytics.updateFrequency}
                        onValueChange={(value) => 
                          handleSettingChange('predictiveAnalytics', 'updateFrequency', value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="realtime">{isRTL ? 'فوري' : 'Real-time'}</SelectItem>
                          <SelectItem value="hourly">{isRTL ? 'كل ساعة' : 'Hourly'}</SelectItem>
                          <SelectItem value="daily">{isRTL ? 'يومي' : 'Daily'}</SelectItem>
                          <SelectItem value="weekly">{isRTL ? 'أسبوعي' : 'Weekly'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{isRTL ? 'حد التنبيه' : 'Alert Threshold'}</h4>
                        <Badge variant="outline">{aiSettings.predictiveAnalytics.alertThreshold}%</Badge>
                      </div>
                      <Slider
                        value={[aiSettings.predictiveAnalytics.alertThreshold]}
                        onValueChange={([value]) => 
                          handleSettingChange('predictiveAnalytics', 'alertThreshold', value)
                        }
                        max={100}
                        min={50}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Recommendations Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {isRTL ? 'إعدادات التوصيات الذكية' : 'Smart Recommendations Settings'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{isRTL ? 'تفعيل التوصيات' : 'Enable Recommendations'}</h4>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'إنشاء توصيات ذكية تلقائياً' : 'Generate smart recommendations automatically'}
                        </p>
                      </div>
                      <Switch
                        checked={aiSettings.recommendations.enabled}
                        onCheckedChange={(value) => 
                          handleSettingChange('recommendations', 'enabled', value)
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{isRTL ? 'الموافقة التلقائية' : 'Auto-approve'}</h4>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'موافقة تلقائية على التوصيات عالية الثقة' : 'Auto-approve high-confidence recommendations'}
                        </p>
                      </div>
                      <Switch
                        checked={aiSettings.recommendations.autoApprove}
                        onCheckedChange={(value) => 
                          handleSettingChange('recommendations', 'autoApprove', value)
                        }
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{isRTL ? 'الحد الأدنى للثقة' : 'Minimum Confidence'}</h4>
                        <Badge variant="outline">{aiSettings.recommendations.minConfidence}%</Badge>
                      </div>
                      <Slider
                        value={[aiSettings.recommendations.minConfidence]}
                        onValueChange={([value]) => 
                          handleSettingChange('recommendations', 'minConfidence', value)
                        }
                        max={100}
                        min={60}
                        step={5}
                        className="w-full"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="training" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>
                        {isRTL ? 'بيانات التدريب' : 'Training Data'}
                      </CardTitle>
                      <Button>
                        <Upload className="h-4 w-4 mr-2" />
                        {isRTL ? 'رفع بيانات' : 'Upload Data'}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {trainingData.map((data) => (
                        <Card key={data.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="p-2 bg-primary/10 rounded-lg">
                                  <Database className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-semibold">{data.name}</h4>
                                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span>{data.type}</span>
                                    <span>{data.size}</span>
                                    <span>{isRTL ? 'آخر تحديث:' : 'Updated:'} {data.lastUpdated}</span>
                                    <span>{data.usage} {isRTL ? 'استخدام' : 'usages'}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={data.status === 'active' ? 'default' : 'secondary'}>
                                  {data.status === 'active' 
                                    ? (isRTL ? 'نشط' : 'Active')
                                    : (isRTL ? 'قيد التدريب' : 'Training')
                                  }
                                </Badge>
                                <Button size="sm" variant="outline">
                                  <Download className="h-4 w-4 mr-2" />
                                  {isRTL ? 'تحميل' : 'Download'}
                                </Button>
                                <Button size="sm" variant="outline">
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  {isRTL ? 'إعادة تدريب' : 'Retrain'}
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Training Status */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5" />
                      {isRTL ? 'حالة التدريب' : 'Training Status'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-primary">94%</div>
                        <div className="text-sm text-muted-foreground">
                          {isRTL ? 'دقة النموذج' : 'Model Accuracy'}
                        </div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-chart-2">15.2MB</div>
                        <div className="text-sm text-muted-foreground">
                          {isRTL ? 'حجم البيانات' : 'Data Size'}
                        </div>
                      </div>
                      <div className="text-center p-4 border rounded-lg">
                        <div className="text-2xl font-bold text-chart-3">2h 34m</div>
                        <div className="text-sm text-muted-foreground">
                          {isRTL ? 'آخر تدريب' : 'Last Training'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AISettings;