import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Scale, AlertTriangle, CheckCircle, FileCheck, Gavel, Users, FileText, Eye, Save, Download, Share, Settings } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface GovernanceComplianceProps {
  onBack: () => void;
}

export const GovernanceCompliance: React.FC<GovernanceComplianceProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // بيانات الحوكمة والامتثال
  const complianceData = [
    { month: 'يناير', compliance: 95, violations: 5 },
    { month: 'فبراير', compliance: 97, violations: 3 },
    { month: 'مارس', compliance: 94, violations: 6 },
    { month: 'أبريل', compliance: 98, violations: 2 },
    { month: 'مايو', compliance: 96, violations: 4 },
    { month: 'يونيو', compliance: 99, violations: 1 }
  ];

  const governanceMetrics = [
    { category: 'الامتثال الكامل', count: 340, percentage: 92, color: 'hsl(var(--success))' },
    { category: 'تحت المراجعة', count: 28, percentage: 7.5, color: 'hsl(var(--warning))' },
    { category: 'مخالفات قيد المعالجة', count: 8, percentage: 2, color: 'hsl(var(--destructive))' },
    { category: 'تدقيقات مكتملة', count: 95, percentage: 98, color: 'hsl(var(--primary))' }
  ];

  const riskAssessment = [
    { level: 'مخاطر منخفضة', value: 70, count: 280 },
    { level: 'مخاطر متوسطة', value: 25, count: 100 },
    { level: 'مخاطر عالية', value: 5, count: 20 }
  ];

  const BOUD_COLORS = ['hsl(var(--success))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-secondary to-primary-glow p-8 mb-8 shadow-2xl">
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
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                  <Save className="h-4 w-4 ml-2" />
                  {isRTL ? 'حفظ' : 'Save'}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Scale className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام الحوكمة والامتثال الذكي' : 'Smart Governance & Compliance System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'نظام متطور لإدارة الحوكمة المؤسسية وضمان الامتثال للقوانين واللوائح' : 'Advanced system for corporate governance management and regulatory compliance assurance'}
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Analytics Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-slate-900 via-primary to-secondary text-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Governance Framework */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary-glow">
                      {isRTL ? 'إطار الحوكمة' : 'Governance Framework'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-primary/50 to-secondary/50 rounded-xl p-4 flex items-center justify-center">
                      <Scale className="h-32 w-32 text-primary-glow opacity-80" />
                      <div className="absolute top-4 right-4 bg-primary/80 px-3 py-1 rounded-full text-sm">
                        340 {isRTL ? 'إجراء ملتزم' : 'Compliant'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-secondary/80 px-3 py-1 rounded-full text-sm">
                        92% {isRTL ? 'معدل الامتثال' : 'Compliance Rate'}
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-warning">
                      {isRTL ? 'تقييم المخاطر' : 'Risk Assessment'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-warning/50 to-destructive/50 rounded-xl p-4 flex items-center justify-center">
                      <AlertTriangle className="h-32 w-32 text-warning opacity-80" />
                      <div className="absolute top-4 right-4 bg-warning/80 px-3 py-1 rounded-full text-sm">
                        20 {isRTL ? 'مخاطر عالية' : 'High Risk'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-destructive/80 px-3 py-1 rounded-full text-sm">
                        95 {isRTL ? 'تدقيق مكتمل' : 'Audits Done'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Compliance Trends Chart */}
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={complianceData}>
                      <defs>
                        <linearGradient id="colorCompliance" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorViolations" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Area type="monotone" dataKey="compliance" stroke="hsl(var(--primary))" fill="url(#colorCompliance)" />
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
                    {isRTL ? 'مؤشرات الحوكمة' : 'Governance Metrics'}
                  </h3>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {governanceMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${metric.color}15` }}>
                      <div>
                        <p className="font-semibold text-gray-800">{metric.category}</p>
                        <p className="text-sm text-gray-600">{metric.count} {isRTL ? 'عنصر' : 'items'}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold" style={{ color: metric.color }}>{metric.percentage}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">
                  {isRTL ? 'تقييم المخاطر' : 'Risk Assessment'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={riskAssessment}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {riskAssessment.map((entry, index) => (
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

        {/* Governance System */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-2 rounded-full shadow-lg">
              <Scale className="h-5 w-5" />
              <span className="font-medium">{isRTL ? 'نظام حوكمة متطور' : 'Advanced Governance System'}</span>
            </div>
          </div>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                {isRTL ? 'نظام الحوكمة والامتثال' : 'Governance & Compliance System'}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {[
                  { icon: Scale, label: isRTL ? 'إطار الحوكمة' : 'Governance Framework', color: 'bg-primary', count: 0 },
                  { icon: Gavel, label: isRTL ? 'الامتثال القانوني' : 'Legal Compliance', color: 'bg-secondary', count: 8 },
                  { icon: AlertTriangle, label: isRTL ? 'إدارة المخاطر' : 'Risk Management', color: 'bg-destructive', count: 20 },
                  { icon: FileCheck, label: isRTL ? 'التدقيق الداخلي' : 'Internal Audit', color: 'bg-success', count: 0 },
                  { icon: Users, label: isRTL ? 'إدارة الأصحاب' : 'Stakeholder Management', color: 'bg-warning', count: 5 },
                  { icon: FileText, label: isRTL ? 'التقارير التنظيمية' : 'Regulatory Reports', color: 'bg-warning', count: 2 },
                  { icon: Eye, label: isRTL ? 'المراقبة المستمرة' : 'Continuous Monitoring', color: 'bg-success', count: 0 },
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
                    <p className="text-sm font-medium text-gray-700 group-hover:text-secondary transition-colors">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">340</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'إجراءات ملتزمة' : 'Compliant Procedures'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-destructive/10 to-destructive/20 rounded-xl border border-destructive/20">
                  <div className="text-3xl font-bold text-destructive mb-2">8</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'مخالفات قيد المعالجة' : 'Violations Under Review'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-success/10 to-success/20 rounded-xl border border-success/20">
                  <div className="text-3xl font-bold text-success mb-2">92%</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'معدل الامتثال' : 'Compliance Rate'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl border border-secondary/20">
                  <div className="text-3xl font-bold text-secondary mb-2">95</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'تدقيقات مكتملة' : 'Completed Audits'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};