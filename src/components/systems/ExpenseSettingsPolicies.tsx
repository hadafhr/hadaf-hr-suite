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
      'limit': { color: 'bg-blue-500/20 text-blue-300 border-blue-500/30', text: isRTL ? 'حدود' : 'Limits', icon: DollarSign },
      'mcc': { color: 'bg-purple-500/20 text-purple-300 border-purple-500/30', text: isRTL ? 'رمز التصنيف' : 'MCC', icon: CreditCard },
      'location': { color: 'bg-green-500/20 text-green-300 border-green-500/30', text: isRTL ? 'موقع' : 'Location', icon: MapPin },
      'time': { color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', text: isRTL ? 'وقت' : 'Time', icon: Clock }
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
        <h2 className="text-2xl font-bold text-white">
          {isRTL ? 'الإعدادات والسياسات' : 'Settings & Policies'}
        </h2>
        <Button className="bg-[#003366] text-white hover:bg-[#004488]">
          <Save className="h-4 w-4 mr-2" />
          {isRTL ? 'حفظ جميع التغييرات' : 'Save All Changes'}
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-2 bg-[#2A2A2A] p-2 rounded-2xl border border-[#3A3A3A] h-auto w-full">
          <TabsTrigger 
            value="general" 
            className="flex items-center gap-2 p-3 text-white data-[state=active]:bg-[#003366] data-[state=active]:text-white hover:bg-[#003366]/50 transition-all duration-300 rounded-xl"
          >
            <Settings className="h-4 w-4" />
            <span className="text-sm font-medium">{isRTL ? 'عام' : 'General'}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="roles" 
            className="flex items-center gap-2 p-3 text-white data-[state=active]:bg-[#003366] data-[state=active]:text-white hover:bg-[#003366]/50 transition-all duration-300 rounded-xl"
          >
            <Users className="h-4 w-4" />
            <span className="text-sm font-medium">{isRTL ? 'الأدوار' : 'Roles'}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="policies" 
            className="flex items-center gap-2 p-3 text-white data-[state=active]:bg-[#003366] data-[state=active]:text-white hover:bg-[#003366]/50 transition-all duration-300 rounded-xl"
          >
            <Shield className="h-4 w-4" />
            <span className="text-sm font-medium">{isRTL ? 'السياسات' : 'Policies'}</span>
          </TabsTrigger>
          
          <TabsTrigger 
            value="integrations" 
            className="flex items-center gap-2 p-3 text-white data-[state=active]:bg-[#003366] data-[state=active]:text-white hover:bg-[#003366]/50 transition-all duration-300 rounded-xl"
          >
            <Key className="h-4 w-4" />
            <span className="text-sm font-medium">{isRTL ? 'التكاملات' : 'Integrations'}</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-[#003366]" />
                  {isRTL ? 'الحدود الافتراضية' : 'Default Limits'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">{isRTL ? 'الحد اليومي الافتراضي (ريال)' : 'Default Daily Limit (SAR)'}</Label>
                  <Input 
                    type="number"
                    defaultValue="1000"
                    className="bg-[#1C1C1C] border-[#3A3A3A] text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">{isRTL ? 'الحد الشهري الافتراضي (ريال)' : 'Default Monthly Limit (SAR)'}</Label>
                  <Input 
                    type="number"
                    defaultValue="5000"
                    className="bg-[#1C1C1C] border-[#3A3A3A] text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">{isRTL ? 'الحد الأقصى للمعاملة الواحدة (ريال)' : 'Max Transaction Amount (SAR)'}</Label>
                  <Input 
                    type="number"
                    defaultValue="2000"
                    className="bg-[#1C1C1C] border-[#3A3A3A] text-white mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-[#003366]" />
                  {isRTL ? 'سياسات الإيصالات' : 'Receipt Policies'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300">{isRTL ? 'مهلة رفع الإيصال (أيام)' : 'Receipt Upload Deadline (Days)'}</Label>
                  <Input 
                    type="number"
                    defaultValue="7"
                    className="bg-[#1C1C1C] border-[#3A3A3A] text-white mt-1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">{isRTL ? 'تعليق تلقائي عند التأخر' : 'Auto-suspend on delay'}</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">{isRTL ? 'إشعار تذكير يومي' : 'Daily reminder notification'}</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Globe className="h-5 w-5 text-[#003366]" />
                  {isRTL ? 'سياسة المعاملات الخارجية' : 'Foreign Transaction Policy'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">{isRTL ? 'السماح بالمعاملات الخارجية' : 'Allow foreign transactions'}</Label>
                  <Switch />
                </div>
                <div>
                  <Label className="text-gray-300">{isRTL ? 'هامش تحويل العملة (%)' : 'Currency conversion margin (%)'}</Label>
                  <Input 
                    type="number"
                    defaultValue="2.5"
                    step="0.1"
                    className="bg-[#1C1C1C] border-[#3A3A3A] text-white mt-1"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">{isRTL ? 'اعتماد إضافي للمعاملات الخارجية' : 'Additional approval for foreign transactions'}</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-[#F39C12]" />
                  {isRTL ? 'إعدادات التنبيهات' : 'Alert Settings'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">{isRTL ? 'تنبيه عند اقتراب الحد (80%)' : 'Alert near limit (80%)'}</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">{isRTL ? 'تنبيه عند تجاوز السياسة' : 'Alert on policy violation'}</Label>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">{isRTL ? 'تنبيه عند انخفاض الرصيد' : 'Alert on low balance'}</Label>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles" className="space-y-6">
          <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-5 w-5 text-[#003366]" />
                {isRTL ? 'الأدوار والصلاحيات' : 'Roles & Permissions'}
              </CardTitle>
              <Button size="sm" className="bg-[#003366] text-white hover:bg-[#004488]">
                <PlusCircle className="h-4 w-4 mr-2" />
                {isRTL ? 'إضافة دور جديد' : 'Add New Role'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {roles.map((role) => (
                  <div key={role.id} className="p-4 bg-[#1C1C1C] rounded-xl border border-[#3A3A3A]">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-white text-lg">{role.name}</h4>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-[#3A3A3A] text-white hover:bg-[#003366]">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-[#3A3A3A] text-white hover:bg-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <Label className="text-xs text-gray-400">{isRTL ? 'الحد اليومي' : 'Daily Limit'}</Label>
                        <p className="text-white">{role.dailyLimit === 0 ? (isRTL ? 'غير محدود' : 'Unlimited') : `${role.dailyLimit.toLocaleString()} SAR`}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">{isRTL ? 'الحد الشهري' : 'Monthly Limit'}</Label>
                        <p className="text-white">{role.monthlyLimit === 0 ? (isRTL ? 'غير محدود' : 'Unlimited') : `${role.monthlyLimit.toLocaleString()} SAR`}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-gray-400">{isRTL ? 'الحد الأقصى للمعاملة' : 'Max Transaction'}</Label>
                        <p className="text-white">{role.maxTransaction === 0 ? (isRTL ? 'غير محدود' : 'Unlimited') : `${role.maxTransaction.toLocaleString()} SAR`}</p>
                      </div>
                    </div>
                    
                    <div>
                      <Label className="text-xs text-gray-400 mb-2 block">{isRTL ? 'الصلاحيات' : 'Permissions'}</Label>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission, index) => (
                          <Badge key={index} className="bg-[#003366]/20 text-[#003366] border-[#003366]/30">
                            {permission.replace(/_/g, ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies */}
        <TabsContent value="policies" className="space-y-6">
          <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#003366]" />
                {isRTL ? 'السياسات النشطة' : 'Active Policies'}
              </CardTitle>
              <Button size="sm" className="bg-[#003366] text-white hover:bg-[#004488]">
                <PlusCircle className="h-4 w-4 mr-2" />
                {isRTL ? 'إضافة سياسة جديدة' : 'Add New Policy'}
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {policies.map((policy) => (
                  <div key={policy.id} className="p-4 bg-[#1C1C1C] rounded-xl border border-[#3A3A3A]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getPolicyTypeBadge(policy.type)}
                        <div>
                          <h4 className="font-semibold text-white">{policy.name}</h4>
                          <p className="text-sm text-gray-400">{policy.description}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-bold text-white">{policy.value}</p>
                          <Badge className={policy.isActive ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}>
                            {policy.isActive ? (isRTL ? 'نشط' : 'Active') : (isRTL ? 'معطل' : 'Inactive')}
                          </Badge>
                        </div>
                        
                        <div className="flex gap-2">
                          <Switch 
                            checked={policy.isActive}
                            onCheckedChange={() => togglePolicyStatus(policy.id)}
                          />
                          <Button size="sm" variant="outline" className="border-[#3A3A3A] text-white hover:bg-[#003366]">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#3A3A3A] text-white hover:bg-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Zap className="h-5 w-5 text-[#F39C12]" />
                  {isRTL ? 'تكامل Zapier' : 'Zapier Integration'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">
                    {isRTL ? 'رابط Zapier Webhook' : 'Zapier Webhook URL'}
                  </Label>
                  <Input
                    type="url"
                    value={zapierWebhook}
                    onChange={(e) => setZapierWebhook(e.target.value)}
                    placeholder={isRTL ? 'https://hooks.zapier.com/hooks/catch/...' : 'https://hooks.zapier.com/hooks/catch/...'}
                    className="bg-[#1C1C1C] border-[#3A3A3A] text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    onClick={handleZapierTest}
                    disabled={isLoading}
                    className="bg-[#F39C12] text-white hover:bg-[#E67E22] flex-1"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    {isLoading ? (isRTL ? 'جاري الاختبار...' : 'Testing...') : (isRTL ? 'اختبار الاتصال' : 'Test Connection')}
                  </Button>
                  <Button variant="outline" className="border-[#3A3A3A] text-white hover:bg-[#003366]">
                    <Save className="h-4 w-4 mr-2" />
                    {isRTL ? 'حفظ' : 'Save'}
                  </Button>
                </div>
                <p className="text-xs text-gray-400">
                  {isRTL ? 'سيتم إرسال تنبيهات المصروفات والموافقات عبر Zapier' : 'Expense alerts and approvals will be sent via Zapier'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-[#003366]" />
                  {isRTL ? 'تكامل البنك' : 'Banking Integration'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">
                    {isRTL ? 'مفتاح API البنك' : 'Bank API Key'}
                  </Label>
                  <div className="relative">
                    <Input
                      type="password"
                      value={bankApiKey}
                      onChange={(e) => setBankApiKey(e.target.value)}
                      placeholder={isRTL ? 'أدخل مفتاح API المشفر' : 'Enter encrypted API key'}
                      className="bg-[#1C1C1C] border-[#3A3A3A] text-white pr-10"
                    />
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">
                    {isRTL ? 'سر HMAC للويبهوك' : 'Webhook HMAC Secret'}
                  </Label>
                  <Input
                    type="password"
                    placeholder={isRTL ? 'سر HMAC للتحقق من الأمان' : 'HMAC secret for security verification'}
                    className="bg-[#1C1C1C] border-[#3A3A3A] text-white"
                  />
                </div>
                <Button className="bg-[#003366] text-white hover:bg-[#004488] w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {isRTL ? 'حفظ الإعدادات الآمنة' : 'Save Secure Settings'}
                </Button>
                <p className="text-xs text-gray-400">
                  {isRTL ? 'جميع مفاتيح API مشفرة ومحمية' : 'All API keys are encrypted and protected'}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="h-5 w-5 text-[#2ECC71]" />
                  {isRTL ? 'تكامل الرواتب/ERP' : 'Payroll/ERP Integration'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-gray-300 mb-2 block">
                    {isRTL ? 'رابط نقطة الواجهة' : 'API Endpoint'}
                  </Label>
                  <Input
                    type="url"
                    placeholder={isRTL ? 'https://api.yourpayroll.com/expenses' : 'https://api.yourpayroll.com/expenses'}
                    className="bg-[#1C1C1C] border-[#3A3A3A] text-white"
                  />
                </div>
                <div>
                  <Label className="text-gray-300 mb-2 block">
                    {isRTL ? 'خرائط حسابات (COA)' : 'Chart of Accounts (COA)'}
                  </Label>
                  <Textarea
                    placeholder={isRTL ? 'تعيين فئات المصروفات لحسابات المحاسبة...' : 'Map expense categories to accounting accounts...'}
                    className="bg-[#1C1C1C] border-[#3A3A3A] text-white"
                    rows={3}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-gray-300">{isRTL ? 'مزامنة تلقائية يومية' : 'Daily auto-sync'}</Label>
                  <Switch defaultChecked />
                </div>
                <Button className="bg-[#2ECC71] text-white hover:bg-[#27AE60] w-full">
                  <Save className="h-4 w-4 mr-2" />
                  {isRTL ? 'تكوين التكامل' : 'Configure Integration'}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-[#2A2A2A] border-[#3A3A3A]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Key className="h-5 w-5 text-[#E74C3C]" />
                  {isRTL ? 'أمان النظام' : 'System Security'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-[#1C1C1C] rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-300">{isRTL ? 'تشفير SSL' : 'SSL Encryption'}</p>
                  </div>
                  <div className="text-center p-3 bg-[#1C1C1C] rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-300">{isRTL ? 'مصادقة ثنائية' : '2FA Authentication'}</p>
                  </div>
                  <div className="text-center p-3 bg-[#1C1C1C] rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-300">{isRTL ? 'تدقيق السجلات' : 'Audit Logs'}</p>
                  </div>
                  <div className="text-center p-3 bg-[#1C1C1C] rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-300">{isRTL ? 'نسخ احتياطية' : 'Backups'}</p>
                  </div>
                </div>
                <Button variant="outline" className="border-[#3A3A3A] text-white hover:bg-[#E74C3C] w-full">
                  <Shield className="h-4 w-4 mr-2" />
                  {isRTL ? 'مسح أمني شامل' : 'Run Security Scan'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};