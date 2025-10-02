import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, Users, DollarSign, FileText, Eye, Save, Download, Share, Settings, TrendingUp, BarChart3, PieChart, Activity, Zap, Globe, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie, BarChart, Bar } from 'recharts';

interface WageProtectionSystemProps {
  onBack: () => void;
}

export const WageProtectionSystem: React.FC<WageProtectionSystemProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // بيانات حماية الأجور
  const wageData = [
    { month: 'يناير', protected: 98, violations: 2, claims: 5, resolved: 95 },
    { month: 'فبراير', protected: 99, violations: 1, claims: 3, resolved: 100 },
    { month: 'مارس', protected: 97, violations: 3, claims: 8, resolved: 88 },
    { month: 'أبريل', protected: 100, violations: 0, claims: 2, resolved: 100 },
    { month: 'مايو', protected: 96, violations: 4, claims: 6, resolved: 92 },
    { month: 'يونيو', protected: 99, violations: 1, claims: 4, resolved: 98 }
  ];

  const protectionStatus = [
    { category: 'الرواتب المحمية', count: 1245, percentage: 98, color: 'hsl(var(--success))' },
    { category: 'انتهاكات مسجلة', count: 15, percentage: 2, color: 'hsl(var(--destructive))' },
    { category: 'مطالبات معلقة', count: 8, percentage: 0.6, color: 'hsl(var(--warning))' },
    { category: 'قضايا محلولة', count: 47, percentage: 95, color: 'hsl(var(--primary))' }
  ];

  const companyCompliance = [
    { name: 'شركات ملتزمة', value: 85, count: 340 },
    { name: 'تحت المراقبة', value: 12, count: 48 },
    { name: 'مخالفات', value: 3, count: 12 }
  ];

  const BOUD_COLORS = ['hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-success via-primary to-primary-glow p-8 mb-8 shadow-2xl">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBack}
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {isRTL ? 'رجوع' : 'Back'}
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm">
                  <Share className="h-4 w-4 ml-2" />
                  {isRTL ? 'استيراد' : 'Import'}
                </Button>
                <Button className="bg-primary/80 border-primary/30 text-white hover:bg-primary/90 backdrop-blur-sm">
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير Excel' : 'Export Excel'}
                </Button>
                <Button className="bg-destructive/80 border-destructive/30 text-white hover:bg-destructive/90 backdrop-blur-sm">
                  <FileText className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير PDF' : 'Export PDF'}
                </Button>
                <Button className="bg-warning/80 border-warning/30 text-white hover:bg-warning/90 backdrop-blur-sm">
                  <Eye className="h-4 w-4 ml-2" />
                  {isRTL ? 'معاينة' : 'Preview'}
                </Button>
                <Button className="bg-success border-success text-white hover:bg-success/90 shadow-lg">
                  <Save className="h-4 w-4 ml-2" />
                  {isRTL ? 'حفظ' : 'Save'}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Shield className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام حماية الأجور الذكي' : 'Smart Wage Protection System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'نظام متطور لحماية حقوق العمال وضمان الالتزام بقوانين العمل والرواتب' : 'Advanced system to protect workers\' rights and ensure compliance with labor and wage laws'}
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Analytics Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-slate-900 via-success to-primary text-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Protection Coverage */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary-glow">
                      {isRTL ? 'التغطية التأمينية' : 'Protection Coverage'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-success/50 to-primary/50 rounded-xl p-4 flex items-center justify-center">
                      <Shield className="h-32 w-32 text-primary-glow opacity-80" />
                      <div className="absolute top-4 right-4 bg-success/80 px-3 py-1 rounded-full text-sm">
                        1,245 {isRTL ? 'موظف محمي' : 'Protected'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-primary/80 px-3 py-1 rounded-full text-sm">
                        98% {isRTL ? 'نسبة الحماية' : 'Coverage Rate'}
                      </div>
                    </div>
                  </div>

                  {/* Compliance Monitoring */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-success">
                      {isRTL ? 'مراقبة الالتزام' : 'Compliance Monitoring'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-primary/50 to-success/50 rounded-xl p-4 flex items-center justify-center">
                      <CheckCircle className="h-32 w-32 text-success opacity-80" />
                      <div className="absolute top-4 right-4 bg-primary/80 px-3 py-1 rounded-full text-sm">
                        340 {isRTL ? 'شركة ملتزمة' : 'Compliant'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-destructive/80 px-3 py-1 rounded-full text-sm">
                        15 {isRTL ? 'انتهاك' : 'Violations'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Protection Trends Chart */}
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={wageData}>
                      <defs>
                        <linearGradient id="colorProtected" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorViolations" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                      />
                      <Area type="monotone" dataKey="protected" stroke="hsl(var(--success))" fill="url(#colorProtected)" />
                      <Area type="monotone" dataKey="violations" stroke="hsl(var(--destructive))" fill="url(#colorViolations)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Statistics */}
          <div className="space-y-6">
            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-800">
                    {isRTL ? 'حالة الحماية' : 'Protection Status'}
                  </h3>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {protectionStatus.map((status, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${status.color}15` }}>
                      <div>
                        <p className="font-semibold text-gray-800">{status.category}</p>
                        <p className="text-sm text-gray-600">{status.count} {isRTL ? 'حالة' : 'cases'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: status.color }}>{status.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {isRTL ? 'التزام الشركات' : 'Company Compliance'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={companyCompliance}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {companyCompliance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={BOUD_COLORS[index % BOUD_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Wage Protection System */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-success text-white px-6 py-2 rounded-full shadow-lg">
              <Shield className="h-5 w-5" />
              <span className="font-medium">{isRTL ? 'نظام حماية متطور' : 'Advanced Protection System'}</span>
            </div>
          </div>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                {isRTL ? 'نظام حماية الأجور' : 'Wage Protection System'}
              </h2>
              <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                {isRTL ? 'نظام شامل لمراقبة وحماية حقوق العمال وضمان دفع الرواتب في مواعيدها وفقاً للقوانين' : 'Comprehensive system to monitor and protect workers\' rights and ensure timely wage payments according to regulations'}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {[
                  { icon: Shield, label: isRTL ? 'الحماية الأساسية' : 'Basic Protection', color: 'bg-success', count: 0 },
                  { icon: AlertTriangle, label: isRTL ? 'إنذارات المخالفات' : 'Violation Alerts', color: 'bg-destructive', count: 15 },
                  { icon: CheckCircle, label: isRTL ? 'التحقق التلقائي' : 'Auto Verification', color: 'bg-success', count: 0 },
                  { icon: Users, label: isRTL ? 'إدارة الموظفين' : 'Employee Management', color: 'bg-primary', count: 3 },
                  { icon: DollarSign, label: isRTL ? 'مراقبة الرواتب' : 'Salary Monitoring', color: 'bg-warning', count: 8 },
                  { icon: FileText, label: isRTL ? 'التقارير والتحليل' : 'Reports & Analytics', color: 'bg-secondary', count: 2 },
                  { icon: Clock, label: isRTL ? 'الجدولة والتنبيهات' : 'Scheduling & Alerts', color: 'bg-warning', count: 5 },
                  { icon: Settings, label: isRTL ? 'الإعدادات المتقدمة' : 'Advanced Settings', color: 'bg-secondary', count: 0 }
                ].map((item, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform relative`}>
                      <item.icon className="h-8 w-8 text-white" />
                      {item.count > 0 && (
                        <div className="absolute -top-2 -right-2 bg-destructive text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {item.count}
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-success transition-colors">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-success/10 to-success/20 rounded-xl border border-success/20">
                  <div className="text-3xl font-bold text-success mb-2">1,245</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'الموظفون المحميون' : 'Protected Employees'}</div>
                  <div className="text-xs text-gray-500 mt-1">{isRTL ? 'تحت الحماية' : 'Under Protection'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-destructive/10 to-destructive/20 rounded-xl border border-destructive/20">
                  <div className="text-3xl font-bold text-destructive mb-2">15</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'انتهاكات مسجلة' : 'Recorded Violations'}</div>
                  <div className="text-xs text-gray-500 mt-1">{isRTL ? 'تحت المعالجة' : 'Under Processing'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'معدل الحماية' : 'Protection Rate'}</div>
                  <div className="text-xs text-gray-500 mt-1">{isRTL ? 'نسبة النجاح' : 'Success Rate'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-warning/10 to-warning/20 rounded-xl border border-warning/20">
                  <div className="text-3xl font-bold text-warning mb-2">95%</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'القضايا المحلولة' : 'Resolved Cases'}</div>
                  <div className="text-xs text-gray-500 mt-1">{isRTL ? 'معدل الحل' : 'Resolution Rate'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Additional Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                {isRTL ? 'مراقبة الرواتب' : 'Salary Monitoring'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {isRTL ? 'نظام مراقبة تلقائي لضمان دفع الرواتب في الوقت المحدد' : 'Automated monitoring system to ensure timely salary payments'}
              </p>
              <div className="flex items-center justify-between">
                <Badge className="bg-success/20 text-success border-success/30">
                  {isRTL ? 'نشط' : 'Active'}
                </Badge>
                <Button size="sm" variant="outline">
                  {isRTL ? 'عرض التفاصيل' : 'View Details'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                {isRTL ? 'تنبيهات المخالفات' : 'Violation Alerts'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {isRTL ? 'تنبيهات فورية عند اكتشاف أي مخالفات في دفع الرواتب' : 'Instant alerts when wage payment violations are detected'}
              </p>
              <div className="flex items-center justify-between">
                <Badge className="bg-destructive/20 text-destructive border-destructive/30">
                  15 {isRTL ? 'تنبيه' : 'Alerts'}
                </Badge>
                <Button size="sm" variant="outline">
                  {isRTL ? 'معالجة' : 'Process'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {isRTL ? 'التقارير التنظيمية' : 'Regulatory Reports'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {isRTL ? 'تقارير شاملة للجهات التنظيمية والحكومية' : 'Comprehensive reports for regulatory and government authorities'}
              </p>
              <div className="flex items-center justify-between">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  {isRTL ? 'محدث' : 'Updated'}
                </Badge>
                <Button size="sm" variant="outline">
                  {isRTL ? 'تصدير' : 'Export'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};