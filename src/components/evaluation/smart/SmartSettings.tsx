import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Settings,
  Target,
  Scale,
  Calendar,
  Shield,
  Globe,
  DollarSign,
  Save,
  RotateCcw,
  Download,
  Upload
} from 'lucide-react';

export const SmartSettings = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Weight settings
  const [weights, setWeights] = useState({
    global: {
      kpi: 30,
      mbo: 20,
      rating360: 20,
      bsc: 10,
      continuous: 10,
      assessments: 10
    },
    assessmentBreakdown: {
      workSample: 4,
      birkman: 2,
      disc: 1.5,
      mbti: 0.5,
      hogan: 1.5,
      competency: 0.5
    }
  });

  // Cycle settings
  const [cycleSettings, setCycleSettings] = useState({
    frequency: 'quarterly',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    autoReminders: true,
    reminderDays: 7,
    lockPeriod: 30
  });

  // Scale settings
  const [scaleSettings, setScaleSettings] = useState({
    scale: '1-5',
    anchors: {
      '1': isRTL ? 'أقل من المتوقع بكثير' : 'Far Below Expectations',
      '2': isRTL ? 'أقل من المتوقع' : 'Below Expectations',
      '3': isRTL ? 'يلتقي بالتوقعات' : 'Meets Expectations',
      '4': isRTL ? 'يتجاوز التوقعات' : 'Exceeds Expectations',
      '5': isRTL ? 'يتجاوز التوقعات بكثير' : 'Far Exceeds Expectations'
    }
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    peerAnonymity: true,
    showExplainScore: true,
    showAISuggestions: true,
    auditLog: true,
    dataRetentionDays: 365
  });

  // 9-Box thresholds
  const [nineBoxSettings, setNineBoxSettings] = useState({
    performanceThresholds: {
      high: 80,
      medium: 70
    },
    potentialThresholds: {
      high: 80,
      medium: 70
    }
  });

  // Compensation hooks
  const [compensationSettings, setCompensationSettings] = useState({
    enabled: false,
    bonusFormula: 'smartScore * 0.1',
    meritFormula: 'smartScore >= 80 ? 5 : smartScore >= 70 ? 3 : 1',
    exportToPayroll: false
  });

  const handleSaveSettings = () => {
    console.log('Saving smart evaluation settings...');
    // Implementation for saving settings
  };

  const handleResetToDefaults = () => {
    // Reset all settings to defaults
    setWeights({
      global: {
        kpi: 30,
        mbo: 20,
        rating360: 20,
        bsc: 10,
        continuous: 10,
        assessments: 10
      },
      assessmentBreakdown: {
        workSample: 4,
        birkman: 2,
        disc: 1.5,
        mbti: 0.5,
        hogan: 1.5,
        competency: 0.5
      }
    });
    console.log('Settings reset to defaults');
  };

  const handleExportSettings = () => {
    const settings = {
      weights,
      cycleSettings,
      scaleSettings,
      privacySettings,
      nineBoxSettings,
      compensationSettings
    };
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'smart-evaluation-settings.json';
    a.click();
  };

  const handleImportSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string);
        // Apply imported settings
        if (settings.weights) setWeights(settings.weights);
        if (settings.cycleSettings) setCycleSettings(settings.cycleSettings);
        // ... other settings
        console.log('Settings imported successfully');
      } catch (error) {
        console.error('Error importing settings:', error);
      }
    };
    reader.readAsText(file);
  };

  const totalWeight = Object.values(weights.global).reduce((sum, weight) => sum + weight, 0);
  const totalAssessmentWeight = Object.values(weights.assessmentBreakdown).reduce((sum, weight) => sum + weight, 0);

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Header and Actions */}
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isRTL ? 'إعدادات التقييمات الذكية' : 'Smart Evaluations Settings'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'تكوين الأوزان والدورات والمقاييس للتقييمات الذكية' : 'Configure weights, cycles, and scales for smart evaluations'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={handleSaveSettings} className="gap-2">
            <Save className="w-4 h-4" />
            {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
          </Button>
          <Button variant="outline" onClick={handleResetToDefaults} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            {isRTL ? 'إعادة تعيين' : 'Reset'}
          </Button>
          <Button variant="outline" onClick={handleExportSettings} className="gap-2">
            <Download className="w-4 h-4" />
            {isRTL ? 'تصدير' : 'Export'}
          </Button>
          <div>
            <input
              type="file"
              accept=".json"
              onChange={handleImportSettings}
              className="hidden"
              id="import-settings"
            />
            <Button variant="outline" asChild className="gap-2">
              <label htmlFor="import-settings" className="cursor-pointer">
                <Upload className="w-4 h-4" />
                {isRTL ? 'استيراد' : 'Import'}
              </label>
            </Button>
          </div>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="weights" className="w-full">
        <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
          <TabsTrigger value="weights" className="gap-2">
            <Scale className="w-4 h-4" />
            <span className="hidden lg:block">{isRTL ? 'الأوزان' : 'Weights'}</span>
          </TabsTrigger>
          <TabsTrigger value="cycles" className="gap-2">
            <Calendar className="w-4 h-4" />
            <span className="hidden lg:block">{isRTL ? 'الدورات' : 'Cycles'}</span>
          </TabsTrigger>
          <TabsTrigger value="scales" className="gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden lg:block">{isRTL ? 'المقاييس' : 'Scales'}</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden lg:block">{isRTL ? 'الخصوصية' : 'Privacy'}</span>
          </TabsTrigger>
          <TabsTrigger value="ninebox" className="gap-2">
            <Target className="w-4 h-4" />
            <span className="hidden lg:block">{isRTL ? '9-صندوق' : '9-Box'}</span>
          </TabsTrigger>
          <TabsTrigger value="compensation" className="gap-2">
            <DollarSign className="w-4 h-4" />
            <span className="hidden lg:block">{isRTL ? 'التعويضات' : 'Compensation'}</span>
          </TabsTrigger>
        </TabsList>

        {/* Weights Tab */}
        <TabsContent value="weights">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Global Weights */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Scale className="w-5 h-5 text-primary" />
                  {isRTL ? 'الأوزان العامة' : 'Global Weights'}
                </CardTitle>
                <CardDescription>
                  {isRTL ? 'الأوزان الافتراضية لمكونات النتيجة الذكية' : 'Default weights for Smart Score components'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(weights.global).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="uppercase font-medium">{key}</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="100"
                            value={value}
                            onChange={(e) => setWeights(prev => ({
                              ...prev,
                              global: {
                                ...prev.global,
                                [key]: parseInt(e.target.value) || 0
                              }
                            }))}
                            className="w-16 text-center"
                          />
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{isRTL ? 'الإجمالي' : 'Total'}</span>
                      <Badge variant={totalWeight === 100 ? 'default' : 'destructive'}>
                        {totalWeight}%
                      </Badge>
                    </div>
                    {totalWeight !== 100 && (
                      <p className="text-sm text-red-600 mt-1">
                        {isRTL ? 'يجب أن يكون الإجمالي 100%' : 'Total must equal 100%'}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Assessment Breakdown */}
            <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  {isRTL ? 'تفكيك التقييمات' : 'Assessment Breakdown'}
                </CardTitle>
                <CardDescription>
                  {isRTL ? 'الأوزان داخل مكون التقييمات (10%)' : 'Weights within Assessments component (10%)'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(weights.assessmentBreakdown).map(([key, value]) => (
                    <div key={key} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <Label className="capitalize font-medium">
                          {key === 'workSample' ? 'Work Sample' :
                           key === 'birkman' ? 'Birkman' :
                           key === 'disc' ? 'DISC' :
                           key === 'mbti' ? 'MBTI' :
                           key === 'hogan' ? 'Hogan' :
                           key === 'competency' ? 'Competency' : key}
                        </Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="0"
                            max="10"
                            step="0.5"
                            value={value}
                            onChange={(e) => setWeights(prev => ({
                              ...prev,
                              assessmentBreakdown: {
                                ...prev.assessmentBreakdown,
                                [key]: parseFloat(e.target.value) || 0
                              }
                            }))}
                            className="w-16 text-center"
                          />
                          <span className="text-sm text-muted-foreground">%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{isRTL ? 'الإجمالي' : 'Total'}</span>
                      <Badge variant={totalAssessmentWeight === 10 ? 'default' : 'destructive'}>
                        {totalAssessmentWeight}%
                      </Badge>
                    </div>
                    {totalAssessmentWeight !== 10 && (
                      <p className="text-sm text-red-600 mt-1">
                        {isRTL ? 'يجب أن يكون الإجمالي 10%' : 'Total must equal 10%'}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Cycles Tab */}
        <TabsContent value="cycles">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                {isRTL ? 'إعدادات الدورات' : 'Cycle Settings'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'تكوين دورات التقييم والتذكيرات' : 'Configure evaluation cycles and reminders'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>{isRTL ? 'تكرار الدورة' : 'Cycle Frequency'}</Label>
                    <select 
                      value={cycleSettings.frequency}
                      onChange={(e) => setCycleSettings(prev => ({ ...prev, frequency: e.target.value }))}
                      className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                    >
                      <option value="quarterly">{isRTL ? 'ربع سنوي' : 'Quarterly'}</option>
                      <option value="semiannual">{isRTL ? 'نصف سنوي' : 'Semi-Annual'}</option>
                      <option value="annual">{isRTL ? 'سنوي' : 'Annual'}</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'تاريخ البداية' : 'Start Date'}</Label>
                    <Input
                      type="date"
                      value={cycleSettings.startDate}
                      onChange={(e) => setCycleSettings(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'تاريخ النهاية' : 'End Date'}</Label>
                    <Input
                      type="date"
                      value={cycleSettings.endDate}
                      onChange={(e) => setCycleSettings(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{isRTL ? 'التذكيرات التلقائية' : 'Auto Reminders'}</Label>
                    <Switch
                      checked={cycleSettings.autoReminders}
                      onCheckedChange={(checked) => setCycleSettings(prev => ({ ...prev, autoReminders: checked }))}
                    />
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'أيام التذكير' : 'Reminder Days'}</Label>
                    <Input
                      type="number"
                      min="1"
                      max="30"
                      value={cycleSettings.reminderDays}
                      onChange={(e) => setCycleSettings(prev => ({ ...prev, reminderDays: parseInt(e.target.value) || 7 }))}
                    />
                  </div>
                  
                  <div>
                    <Label>{isRTL ? 'فترة القفل (أيام)' : 'Lock Period (Days)'}</Label>
                    <Input
                      type="number"
                      min="0"
                      max="90"
                      value={cycleSettings.lockPeriod}
                      onChange={(e) => setCycleSettings(prev => ({ ...prev, lockPeriod: parseInt(e.target.value) || 30 }))}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scales Tab */}
        <TabsContent value="scales">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                {isRTL ? 'مقاييس التقييم' : 'Rating Scales'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'تكوين مقاييس التقييم والمراسي السلوكية' : 'Configure rating scales and behavioral anchors'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <Label>{isRTL ? 'نوع المقياس' : 'Scale Type'}</Label>
                  <select 
                    value={scaleSettings.scale}
                    onChange={(e) => setScaleSettings(prev => ({ ...prev, scale: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 border border-border rounded-md bg-background"
                  >
                    <option value="1-5">{isRTL ? '1-5 نقاط' : '1-5 Point Scale'}</option>
                    <option value="1-10">{isRTL ? '1-10 نقاط' : '1-10 Point Scale'}</option>
                    <option value="percentage">{isRTL ? 'نسبة مئوية' : 'Percentage'}</option>
                  </select>
                </div>
                
                <div>
                  <Label className="mb-3 block">{isRTL ? 'المراسي السلوكية' : 'Behavioral Anchors'}</Label>
                  <div className="space-y-3">
                    {Object.entries(scaleSettings.anchors).map(([level, description]) => (
                      <div key={level} className="flex items-start gap-3">
                        <Badge variant="outline" className="mt-1">{level}</Badge>
                        <Textarea
                          value={description}
                          onChange={(e) => setScaleSettings(prev => ({
                            ...prev,
                            anchors: {
                              ...prev.anchors,
                              [level]: e.target.value
                            }
                          }))}
                          placeholder={isRTL ? 'اكتب وصف هذا المستوى...' : 'Enter description for this level...'}
                          rows={2}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-primary" />
                {isRTL ? 'الخصوصية والشفافية' : 'Privacy & Transparency'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'إعدادات الخصوصية والشفافية للتقييمات الذكية' : 'Privacy and transparency settings for smart evaluations'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">{isRTL ? 'إخفاء هوية الأقران في 360' : 'Peer Anonymity in 360'}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'إخفاء أسماء المقيمين الأقران' : 'Hide names of peer raters'}
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.peerAnonymity}
                    onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, peerAnonymity: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">{isRTL ? 'إظهار تفسير النتيجة' : 'Show Explain Score'}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'السماح للمستخدمين برؤية تفكيك النتيجة' : 'Allow users to see score breakdown'}
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.showExplainScore}
                    onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, showExplainScore: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">{isRTL ? 'إظهار اقتراحات الذكاء الاصطناعي' : 'Show AI Suggestions'}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'عرض اقتراحات الذكاء الاصطناعي للمستخدمين' : 'Display AI recommendations to users'}
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.showAISuggestions}
                    onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, showAISuggestions: checked }))}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">{isRTL ? 'سجل التدقيق' : 'Audit Logging'}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'تسجيل جميع التغييرات والموافقات' : 'Log all changes and approvals'}
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.auditLog}
                    onCheckedChange={(checked) => setPrivacySettings(prev => ({ ...prev, auditLog: checked }))}
                  />
                </div>
                
                <div>
                  <Label>{isRTL ? 'الاحتفاظ بالبيانات (أيام)' : 'Data Retention (Days)'}</Label>
                  <Input
                    type="number"
                    min="30"
                    max="3650"
                    value={privacySettings.dataRetentionDays}
                    onChange={(e) => setPrivacySettings(prev => ({ 
                      ...prev, 
                      dataRetentionDays: parseInt(e.target.value) || 365 
                    }))}
                    className="mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {isRTL ? 'المدة بالأيام للاحتفاظ بالبيانات قبل الحذف التلقائي' : 'Days to retain data before automatic deletion'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 9-Box Tab */}
        <TabsContent value="ninebox">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                {isRTL ? 'إعدادات 9-صندوق' : '9-Box Settings'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'تكوين عتبات الأداء والإمكانات' : 'Configure performance and potential thresholds'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-base mb-4 block">{isRTL ? 'عتبات الأداء' : 'Performance Thresholds'}</Label>
                  <div className="space-y-4">
                    <div>
                      <Label>{isRTL ? 'أداء عالي (≥)' : 'High Performance (≥)'}</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={nineBoxSettings.performanceThresholds.high}
                        onChange={(e) => setNineBoxSettings(prev => ({
                          ...prev,
                          performanceThresholds: {
                            ...prev.performanceThresholds,
                            high: parseInt(e.target.value) || 80
                          }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>{isRTL ? 'أداء متوسط (≥)' : 'Medium Performance (≥)'}</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={nineBoxSettings.performanceThresholds.medium}
                        onChange={(e) => setNineBoxSettings(prev => ({
                          ...prev,
                          performanceThresholds: {
                            ...prev.performanceThresholds,
                            medium: parseInt(e.target.value) || 70
                          }
                        }))}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label className="text-base mb-4 block">{isRTL ? 'عتبات الإمكانات' : 'Potential Thresholds'}</Label>
                  <div className="space-y-4">
                    <div>
                      <Label>{isRTL ? 'إمكانات عالية (≥)' : 'High Potential (≥)'}</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={nineBoxSettings.potentialThresholds.high}
                        onChange={(e) => setNineBoxSettings(prev => ({
                          ...prev,
                          potentialThresholds: {
                            ...prev.potentialThresholds,
                            high: parseInt(e.target.value) || 80
                          }
                        }))}
                      />
                    </div>
                    <div>
                      <Label>{isRTL ? 'إمكانات متوسطة (≥)' : 'Medium Potential (≥)'}</Label>
                      <Input
                        type="number"
                        min="0"
                        max="100"
                        value={nineBoxSettings.potentialThresholds.medium}
                        onChange={(e) => setNineBoxSettings(prev => ({
                          ...prev,
                          potentialThresholds: {
                            ...prev.potentialThresholds,
                            medium: parseInt(e.target.value) || 70
                          }
                        }))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Compensation Tab */}
        <TabsContent value="compensation">
          <Card className="bg-gradient-to-br from-card to-card/50 border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                {isRTL ? 'ربط التعويضات' : 'Compensation Integration'}
              </CardTitle>
              <CardDescription>
                {isRTL ? 'ربط النتائج الذكية بأنظمة التعويضات' : 'Link smart scores to compensation systems'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-base">{isRTL ? 'تفعيل ربط التعويضات' : 'Enable Compensation Hooks'}</Label>
                    <p className="text-sm text-muted-foreground">
                      {isRTL ? 'ربط النتائج الذكية بحساب المكافآت والعلاوات' : 'Connect smart scores to bonus and merit calculations'}
                    </p>
                  </div>
                  <Switch
                    checked={compensationSettings.enabled}
                    onCheckedChange={(checked) => setCompensationSettings(prev => ({ ...prev, enabled: checked }))}
                  />
                </div>
                
                {compensationSettings.enabled && (
                  <>
                    <div>
                      <Label>{isRTL ? 'معادلة المكافآت' : 'Bonus Formula'}</Label>
                      <Input
                        value={compensationSettings.bonusFormula}
                        onChange={(e) => setCompensationSettings(prev => ({ 
                          ...prev, 
                          bonusFormula: e.target.value 
                        }))}
                        placeholder="smartScore * 0.1"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        {isRTL ? 'مثال: smartScore * 0.1' : 'Example: smartScore * 0.1'}
                      </p>
                    </div>
                    
                    <div>
                      <Label>{isRTL ? 'معادلة العلاوة الاستحقاقية' : 'Merit Formula'}</Label>
                      <Input
                        value={compensationSettings.meritFormula}
                        onChange={(e) => setCompensationSettings(prev => ({ 
                          ...prev, 
                          meritFormula: e.target.value 
                        }))}
                        placeholder="smartScore >= 80 ? 5 : smartScore >= 70 ? 3 : 1"
                      />
                      <p className="text-sm text-muted-foreground mt-1">
                        {isRTL ? 'مثال: smartScore >= 80 ? 5 : smartScore >= 70 ? 3 : 1' : 'Example: smartScore >= 80 ? 5 : smartScore >= 70 ? 3 : 1'}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base">{isRTL ? 'التصدير إلى كشوف المرتبات' : 'Export to Payroll'}</Label>
                        <p className="text-sm text-muted-foreground">
                          {isRTL ? 'تصدير النتائج تلقائياً إلى نظام كشوف المرتبات' : 'Automatically export results to payroll system'}
                        </p>
                      </div>
                      <Switch
                        checked={compensationSettings.exportToPayroll}
                        onCheckedChange={(checked) => setCompensationSettings(prev => ({ 
                          ...prev, 
                          exportToPayroll: checked 
                        }))}
                      />
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
