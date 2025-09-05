import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { 
  Building2, 
  Upload, 
  Palette, 
  Globe, 
  Calendar,
  Save,
  RefreshCw,
  Copy,
  Eye,
  EyeOff
} from 'lucide-react';

export const AccountIdentitySettings: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [organizationSettings, setOrganizationSettings] = useState({
    organizationName: 'شركة بُعد للموارد البشرية',
    organizationNameEn: 'BOUD HR Solutions Company',
    commercialRegister: '1010123456',
    vatNumber: '300123456700003',
    address: 'الرياض، المملكة العربية السعودية',
    phone: '+966112345678',
    email: 'info@boud-hr.com',
    website: 'https://www.boud-hr.com',
    logo: '',
    primaryColor: '#3CB593',
    secondaryColor: '#000000',
    accentColor: '#FFFFFF',
    defaultLanguage: 'ar',
    dateFormat: 'dd/mm/yyyy',
    timeZone: 'Asia/Riyadh',
    currency: 'SAR',
    inheritanceMode: true
  });

  const [branches, setBranches] = useState([
    {
      id: '1',
      name: 'الفرع الرئيسي - الرياض',
      nameEn: 'Main Branch - Riyadh',
      code: 'RYD-01',
      manager: 'أحمد محمد',
      status: 'active',
      customSettings: false
    },
    {
      id: '2', 
      name: 'فرع جدة',
      nameEn: 'Jeddah Branch',
      code: 'JED-01',
      manager: 'فاطمة علي',
      status: 'active',
      customSettings: true
    },
    {
      id: '3',
      name: 'فرع الدمام',
      nameEn: 'Dammam Branch', 
      code: 'DMM-01',
      manager: 'محمد عبدالله',
      status: 'inactive',
      customSettings: false
    }
  ]);

  const handleOrganizationChange = (field: string, value: any) => {
    setOrganizationSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveSettings = () => {
    console.log('Saving organization settings:', organizationSettings);
  };

  const handleResetSettings = () => {
    console.log('Resetting settings to default');
  };

  const handleLogoUpload = () => {
    console.log('Uploading logo');
  };

  const handleBranchToggleCustom = (branchId: string) => {
    setBranches(prev => prev.map(branch => 
      branch.id === branchId 
        ? { ...branch, customSettings: !branch.customSettings }
        : branch
    ));
  };

  return (
    <div className="space-y-6">
      {/* Organization Identity */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">
              {isRTL ? 'هوية المنشأة' : 'Organization Identity'}
            </CardTitle>
          </div>
          <CardDescription>
            {isRTL ? 'إدارة المعلومات الأساسية للمنشأة والهوية البصرية' : 'Manage basic organization information and visual identity'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{isRTL ? 'اسم المنشأة (عربي)' : 'Organization Name (Arabic)'}</Label>
              <Input
                value={organizationSettings.organizationName}
                onChange={(e) => handleOrganizationChange('organizationName', e.target.value)}
                placeholder={isRTL ? 'أدخل اسم المنشأة' : 'Enter organization name'}
              />
            </div>
            <div className="space-y-2">
              <Label>{isRTL ? 'اسم المنشأة (إنجليزي)' : 'Organization Name (English)'}</Label>
              <Input
                value={organizationSettings.organizationNameEn}
                onChange={(e) => handleOrganizationChange('organizationNameEn', e.target.value)}
                placeholder={isRTL ? 'أدخل اسم المنشأة بالإنجليزية' : 'Enter organization name in English'}
              />
            </div>
            <div className="space-y-2">
              <Label>{isRTL ? 'السجل التجاري' : 'Commercial Register'}</Label>
              <Input
                value={organizationSettings.commercialRegister}
                onChange={(e) => handleOrganizationChange('commercialRegister', e.target.value)}
                placeholder={isRTL ? 'رقم السجل التجاري' : 'Commercial register number'}
              />
            </div>
            <div className="space-y-2">
              <Label>{isRTL ? 'الرقم الضريبي' : 'VAT Number'}</Label>
              <Input
                value={organizationSettings.vatNumber}
                onChange={(e) => handleOrganizationChange('vatNumber', e.target.value)}
                placeholder={isRTL ? 'الرقم الضريبي' : 'VAT number'}
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>{isRTL ? 'العنوان' : 'Address'}</Label>
              <Textarea
                value={organizationSettings.address}
                onChange={(e) => handleOrganizationChange('address', e.target.value)}
                placeholder={isRTL ? 'عنوان المنشأة' : 'Organization address'}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>{isRTL ? 'رقم الهاتف' : 'Phone Number'}</Label>
                <Input
                  value={organizationSettings.phone}
                  onChange={(e) => handleOrganizationChange('phone', e.target.value)}
                  placeholder={isRTL ? 'رقم الهاتف' : 'Phone number'}
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? 'البريد الإلكتروني' : 'Email'}</Label>
                <Input
                  type="email"
                  value={organizationSettings.email}
                  onChange={(e) => handleOrganizationChange('email', e.target.value)}
                  placeholder={isRTL ? 'البريد الإلكتروني' : 'Email address'}
                />
              </div>
              <div className="space-y-2">
                <Label>{isRTL ? 'الموقع الإلكتروني' : 'Website'}</Label>
                <Input
                  value={organizationSettings.website}
                  onChange={(e) => handleOrganizationChange('website', e.target.value)}
                  placeholder={isRTL ? 'الموقع الإلكتروني' : 'Website URL'}
                />
              </div>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="space-y-2">
            <Label>{isRTL ? 'شعار المنشأة' : 'Organization Logo'}</Label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center">
                <Building2 className="w-8 h-8 text-muted-foreground" />
              </div>
              <Button onClick={handleLogoUpload} variant="outline" className="gap-2">
                <Upload className="w-4 h-4" />
                {isRTL ? 'رفع الشعار' : 'Upload Logo'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'الحد الأقصى: 2MB، الصيغ المدعومة: PNG, JPG, SVG' : 'Max: 2MB, Supported: PNG, JPG, SVG'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Visual Identity */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">
              {isRTL ? 'الهوية البصرية' : 'Visual Identity'}
            </CardTitle>
          </div>
          <CardDescription>
            {isRTL ? 'تخصيص الألوان والتنسيقات البصرية للنظام' : 'Customize colors and visual formatting for the system'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>{isRTL ? 'اللون الأساسي' : 'Primary Color'}</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded border border-border"
                  style={{ backgroundColor: organizationSettings.primaryColor }}
                />
                <Input
                  type="color"
                  value={organizationSettings.primaryColor}
                  onChange={(e) => handleOrganizationChange('primaryColor', e.target.value)}
                  className="w-20"
                />
                <Input
                  value={organizationSettings.primaryColor}
                  onChange={(e) => handleOrganizationChange('primaryColor', e.target.value)}
                  placeholder="#3CB593"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{isRTL ? 'اللون الثانوي' : 'Secondary Color'}</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded border border-border"
                  style={{ backgroundColor: organizationSettings.secondaryColor }}
                />
                <Input
                  type="color"
                  value={organizationSettings.secondaryColor}
                  onChange={(e) => handleOrganizationChange('secondaryColor', e.target.value)}
                  className="w-20"
                />
                <Input
                  value={organizationSettings.secondaryColor}
                  onChange={(e) => handleOrganizationChange('secondaryColor', e.target.value)}
                  placeholder="#000000"
                  className="flex-1"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>{isRTL ? 'لون التمييز' : 'Accent Color'}</Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-10 h-10 rounded border border-border"
                  style={{ backgroundColor: organizationSettings.accentColor }}
                />
                <Input
                  type="color"
                  value={organizationSettings.accentColor}
                  onChange={(e) => handleOrganizationChange('accentColor', e.target.value)}
                  className="w-20"
                />
                <Input
                  value={organizationSettings.accentColor}
                  onChange={(e) => handleOrganizationChange('accentColor', e.target.value)}
                  placeholder="#FFFFFF"
                  className="flex-1"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Localization & Formats */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">
              {isRTL ? 'التوطين والصيغ' : 'Localization & Formats'}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{isRTL ? 'اللغة الافتراضية' : 'Default Language'}</Label>
              <Select value={organizationSettings.defaultLanguage} onValueChange={(value) => handleOrganizationChange('defaultLanguage', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{isRTL ? 'صيغة التاريخ' : 'Date Format'}</Label>
              <Select value={organizationSettings.dateFormat} onValueChange={(value) => handleOrganizationChange('dateFormat', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                  <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                  <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{isRTL ? 'المنطقة الزمنية' : 'Time Zone'}</Label>
              <Select value={organizationSettings.timeZone} onValueChange={(value) => handleOrganizationChange('timeZone', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Asia/Riyadh">Asia/Riyadh (GMT+3)</SelectItem>
                  <SelectItem value="Asia/Dubai">Asia/Dubai (GMT+4)</SelectItem>
                  <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{isRTL ? 'العملة' : 'Currency'}</Label>
              <Select value={organizationSettings.currency} onValueChange={(value) => handleOrganizationChange('currency', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SAR">SAR - ريال سعودي</SelectItem>
                  <SelectItem value="AED">AED - درهم إماراتي</SelectItem>
                  <SelectItem value="USD">USD - دولار أمريكي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Multi-Tenant Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              <div>
                <CardTitle className="text-lg">
                  {isRTL ? 'إدارة الفروع' : 'Branch Management'}
                </CardTitle>
                <CardDescription>
                  {isRTL ? 'إدارة إعدادات الفروع ووراثة الإعدادات' : 'Manage branch settings and inheritance'}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={organizationSettings.inheritanceMode}
                onCheckedChange={(checked) => handleOrganizationChange('inheritanceMode', checked)}
              />
              <span className="text-sm">{isRTL ? 'وراثة الإعدادات' : 'Inheritance Mode'}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {branches.map((branch) => (
              <div key={branch.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex flex-col">
                    <span className="font-medium">{isRTL ? branch.name : branch.nameEn}</span>
                    <span className="text-sm text-muted-foreground">
                      {isRTL ? `كود: ${branch.code} | المدير: ${branch.manager}` : `Code: ${branch.code} | Manager: ${branch.manager}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={branch.status === 'active' ? 'default' : 'secondary'}>
                    {isRTL ? (branch.status === 'active' ? 'نشط' : 'غير نشط') : branch.status}
                  </Badge>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={branch.customSettings}
                      onCheckedChange={() => handleBranchToggleCustom(branch.id)}
                    />
                    <span className="text-sm">
                      {isRTL ? 'إعدادات مخصصة' : 'Custom Settings'}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button onClick={handleResetSettings} variant="outline" className="gap-2">
          <RefreshCw className="w-4 h-4" />
          {isRTL ? 'إعادة تعيين' : 'Reset'}
        </Button>
        <div className="flex items-center gap-2">
          <Button onClick={handleSaveSettings} className="gap-2">
            <Save className="w-4 h-4" />
            {isRTL ? 'حفظ الإعدادات' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </div>
  );
};