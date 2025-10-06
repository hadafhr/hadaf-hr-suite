import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Settings, DollarSign, Users, Shield, Key, Zap, 
  Globe, AlertTriangle, CheckCircle, XCircle, 
  PlusCircle, Edit, Trash2, Lock, CreditCard,
  Calendar, MapPin, Clock, Ban, Save
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Policy {
  id: string;
  name: string;
  type: 'limit' | 'mcc' | 'location' | 'time';
  value: string;
  isActive: boolean;
  description: string;
}

interface Role {
  id: string;
  name: string;
  permissions: string[];
  dailyLimit: number;
  monthlyLimit: number;
  maxTransaction: number;
}

interface ExpenseSettingsPoliciesProps {
  isRTL: boolean;
}

export const ExpenseSettingsPolicies: React.FC<ExpenseSettingsPoliciesProps> = ({ isRTL }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');
  const [zapierWebhook, setZapierWebhook] = useState('');
  const [bankApiKey, setBankApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data
  const [policies, setPolicies] = useState<Policy[]>([
    {
      id: 'POL-001',
      name: 'حد يومي افتراضي',
      type: 'limit',
      value: '1000 SAR',
      isActive: true,
      description: 'الحد الأقصى للإنفاق اليومي للموظفين'
    },
    {
      id: 'POL-002',
      name: 'حد شهري افتراضي',
      type: 'limit',
      value: '5000 SAR',
      isActive: true,
      description: 'الحد الأقصى للإنفاق الشهري للموظفين'
    },
    {
      id: 'POL-003',
      name: 'حد المعاملة الواحدة',
      type: 'limit',
      value: '2000 SAR',
      isActive: true,
      description: 'الحد الأقصى للمعاملة الواحدة'
    },
    {
      id: 'POL-004',
      name: 'محظور: مراكز تسوق',
      type: 'mcc',
      value: '5311',
      isActive: true,
      description: 'منع الشراء من متاجر الأقسام والمراكز التجارية'
    },
    {
      id: 'POL-005',
      name: 'مسموح: محطات الوقود',
      type: 'mcc',
      value: '5541',
      isActive: true,
      description: 'السماح بالشراء من محطات الوقود'
    }
  ]);

  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'ROLE-001',
      name: 'موظف',
      permissions: ['view_own_transactions', 'upload_receipts', 'create_requests'],
      dailyLimit: 800,
      monthlyLimit: 4000,
      maxTransaction: 1500
    },
    {
      id: 'ROLE-002',
      name: 'مدير',
      permissions: ['view_team_transactions', 'approve_requests', 'fund_cards'],
      dailyLimit: 1500,
      monthlyLimit: 8000,
      maxTransaction: 3000
    },
    {
      id: 'ROLE-003',
      name: 'مسؤول مصروفات',
      permissions: ['view_all_transactions', 'manage_policies', 'issue_cards', 'final_approval'],
      dailyLimit: 2500,
      monthlyLimit: 15000,
      maxTransaction: 5000
    },
    {
      id: 'ROLE-004',
      name: 'مشرف عام',
      permissions: ['full_access', 'manage_integrations', 'system_settings'],
      dailyLimit: 0,
      monthlyLimit: 0,
      maxTransaction: 0
    }
  ]);

  const handleZapierTest = async () => {
    if (!zapierWebhook) {
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "يرجى إدخال رابط Zapier Webhook" : "Please enter your Zapier webhook URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(zapierWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors",
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          source: "Boud HR Expenses Module",
          message: isRTL ? "اختبار تكامل Zapier من نظام المصروفات" : "Zapier integration test from Expenses system"
        }),
      });

      toast({
        title: isRTL ? "تم الإرسال" : "Request Sent",
        description: isRTL ? "تم إرسال الطلب إلى Zapier. يرجى التحقق من سجل Zap للتأكد من التشغيل." : "The request was sent to Zapier. Please check your Zap's history to confirm it was triggered.",
      });
    } catch (error) {
      console.error("Error triggering webhook:", error);
      toast({
        title: isRTL ? "خطأ" : "Error",
        description: isRTL ? "فشل في تشغيل Zapier webhook. يرجى التحقق من الرابط والمحاولة مرة أخرى." : "Failed to trigger the Zapier webhook. Please check the URL and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePolicyStatus = (policyId: string) => {
    setPolicies(policies.map(policy => 
      policy.id === policyId 
        ? { ...policy, isActive: !policy.isActive }
        : policy
    ));
  };

  const getPolicyTypeBadge = (type: string) => {
    const typeConfig = {
      'limit': { color: 'bg-accent/20 text-accent-foreground border-accent/30', text: isRTL ? 'حدود' : 'Limits', icon: DollarSign },
      'mcc': { color: 'bg-accent/20 text-accent-foreground border-accent/30', text: isRTL ? 'رمز التصنيف' : 'MCC', icon: CreditCard },
      'location': { color: 'bg-success/20 text-success-foreground border-success/30', text: isRTL ? 'موقع' : 'Location', icon: MapPin },
      'time': { color: 'bg-warning/20 text-warning-foreground border-warning/30', text: isRTL ? 'وقت' : 'Time', icon: Clock }
    };
    
    const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.limit;
    const IconComponent = config.icon;
    
    return (
      <Badge className={`${config.color} font-medium flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.text}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">
          {isRTL ? 'الإعدادات والسياسات' : 'Settings & Policies'}
        </h2>
        <Button>
          <Save className="h-4 w-4 mr-2" />
          {isRTL ? 'حفظ جميع التغييرات' : 'Save All Changes'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-2 bg-card p-2 rounded-2xl border border-border h-auto w-full">
          <TabsTrigger 
            value="general" 
            className="flex items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm font-medium">{isRTL ? 'عام' : 'General'}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="roles" 
            className="flex items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl"
          >
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">{isRTL ? 'الأدوار' : 'Roles'}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="policies" 
            className="flex items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl"
          >
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">{isRTL ? 'السياسات' : 'Policies'}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="integrations" 
            className="flex items-center gap-2 p-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 rounded-xl"
          >
            <Key className="h-4 w-4" />
            <span className="text-sm font-medium">{isRTL ? 'التكاملات' : 'Integrations'}</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  {isRTL ? 'الحدود الافتراضية' : 'Default Limits'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">{isRTL ? 'الحد اليومي الافتراضي (ريال)' : 'Default Daily Limit (SAR)'}</Label>
                  <Input 
                    type="number"
                    defaultValue="1000"
                    className="bg-background border-border text-foreground mt-1"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground">{isRTL ? 'الحد الشهري الافتراضي (ريال)' : 'Default Monthly Limit (SAR)'}</Label>
                  <Input 
                    type="number"
                    defaultValue="5000"
                    className="bg-background border-border text-foreground mt-1"
                  />
                </div>
                <div>
                  <Label className="text-muted-foreground">{isRTL ? 'الحد الأقصى للمعاملة الواحدة (ريال)' : 'Max Transaction Amount (SAR)'}</Label>
                  <Input 
                    type="number"
                    defaultValue="2000"
                    className="bg-background border-border text-foreground mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {isRTL ? 'سياسات الإيصالات' : 'Receipt Policies'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-muted-foreground">{isRTL ? 'مهلة رفع الإيصال (أيام)' : 'Receipt Upload Deadline (Days)'}</Label>
                  <Input 
                    type="number"
                    defaultValue="7"
                    className="bg-background border-border text-foreground mt-1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground">{isRTL ? 'تعليق تلقائي عند التأخر' : 'Auto-suspend on delay'}</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground">{isRTL ? 'إشعار تذكير يومي' : 'Daily reminder notification'}</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  {isRTL ? 'سياسة المعاملات الخارجية' : 'Foreign Transaction Policy'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground">{isRTL ? 'السماح بالمعاملات الخارجية' : 'Allow foreign transactions'}</Label>
                  <Switch />
                </div>
                <div>
                  <Label className="text-muted-foreground">{isRTL ? 'هامش تحويل العملة (%)' : 'Currency conversion margin (%)'}</Label>
                  <Input 
                    type="number"
                    defaultValue="2.5"
                    step="0.1"
                    className="bg-background border-border text-foreground mt-1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground">{isRTL ? 'اعتماد إضافي للمعاملات الخارجية' : 'Additional approval for foreign transactions'}</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  {isRTL ? 'إعدادات التنبيهات' : 'Alert Settings'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground">{isRTL ? 'تنبيه عند اقتراب الحد (80%)' : 'Alert near limit (80%)'}</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground">{isRTL ? 'تنبيه عند تجاوز السياسة' : 'Alert on policy violation'}</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-muted-foreground">{isRTL ? 'تنبيه عند انخفاض الرصيد' : 'Alert on low balance'}</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {isRTL ? 'الأدوار والصلاحيات' : 'Roles & Permissions'}
              </CardTitle>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                {isRTL ? 'إضافة دور جديد' : 'Add New Role'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="p-4 bg-background rounded-xl border border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-foreground text-lg">{role.name}</h4>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">{isRTL ? 'الحد اليومي' : 'Daily Limit'}</Label>
                        <p className="text-foreground">{role.dailyLimit === 0 ? (isRTL ? 'غير محدود' : 'Unlimited') : `${role.dailyLimit.toLocaleString()} SAR`}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">{isRTL ? 'الحد الشهري' : 'Monthly Limit'}</Label>
                        <p className="text-foreground">{role.monthlyLimit === 0 ? (isRTL ? 'غير محدود' : 'Unlimited') : `${role.monthlyLimit.toLocaleString()} SAR`}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">{isRTL ? 'الحد الأقصى للمعاملة' : 'Max Transaction'}</Label>
                        <p className="text-foreground">{role.maxTransaction === 0 ? (isRTL ? 'غير محدود' : 'Unlimited') : `${role.maxTransaction.toLocaleString()} SAR`}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((permission, idx) => (
                        <Badge key={idx} variant="outline" className="bg-muted text-muted-foreground">
                          {permission.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies Tab */}
        <TabsContent value="policies" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                {isRTL ? 'السياسات المالية' : 'Financial Policies'}
              </CardTitle>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                {isRTL ? 'إضافة سياسة جديدة' : 'Add New Policy'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="p-4 bg-background rounded-xl border border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-foreground">{policy.name}</h4>
                          {getPolicyTypeBadge(policy.type)}
                          <Badge variant={policy.isActive ? "default" : "secondary"} className={policy.isActive ? "bg-success text-success-foreground" : ""}>
                            {policy.isActive ? (isRTL ? 'مفعلة' : 'Active') : (isRTL ? 'معطلة' : 'Inactive')}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mb-1">{policy.description}</p>
                        <p className="text-foreground font-medium">{isRTL ? 'القيمة:' : 'Value:'} {policy.value}</p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Switch 
                          checked={policy.isActive}
                          onCheckedChange={() => togglePolicyStatus(policy.id)}
                        />
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations Tab */}
        <TabsContent value="integrations" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                {isRTL ? 'تكامل Zapier' : 'Zapier Integration'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground">{isRTL ? 'رابط Webhook' : 'Webhook URL'}</Label>
                <Input
                  value={zapierWebhook}
                  onChange={(e) => setZapierWebhook(e.target.value)}
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                  className="bg-background border-border text-foreground mt-1"
                />
              </div>
              <Button onClick={handleZapierTest} disabled={isLoading}>
                <Zap className="h-4 w-4 mr-2" />
                {isLoading ? (isRTL ? 'جاري الاختبار...' : 'Testing...') : (isRTL ? 'اختبار الاتصال' : 'Test Connection')}
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center gap-2">
                <Key className="h-5 w-5 text-primary" />
                {isRTL ? 'تكامل البنك' : 'Bank Integration'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-muted-foreground">{isRTL ? 'مفتاح API البنك' : 'Bank API Key'}</Label>
                <Input
                  type="password"
                  value={bankApiKey}
                  onChange={(e) => setBankApiKey(e.target.value)}
                  placeholder="••••••••••••••••"
                  className="bg-background border-border text-foreground mt-1"
                />
              </div>
              <Button>
                <Lock className="h-4 w-4 mr-2" />
                {isRTL ? 'حفظ المفتاح' : 'Save Key'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
