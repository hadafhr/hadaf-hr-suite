import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Scale, FileText, Gavel, AlertTriangle, CheckCircle, Building, Users, Eye, Save, Download, Share, Settings, BarChart, Clock, Search, Plus, User } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface LegalAffairsProps {
  onBack: () => void;
}

export const LegalAffairs: React.FC<LegalAffairsProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // بيانات الشؤون القانونية
  const legalData = [
    { month: 'يناير', cases: 15, contracts: 45, consultations: 32 },
    { month: 'فبراير', cases: 12, contracts: 52, consultations: 28 },
    { month: 'مارس', cases: 18, contracts: 38, consultations: 35 },
    { month: 'أبريل', cases: 8, contracts: 62, consultations: 41 },
    { month: 'مايو', cases: 14, contracts: 48, consultations: 37 },
    { month: 'يونيو', cases: 10, contracts: 55, consultations: 43 }
  ];

  const legalMetrics = [
    { category: 'القضايا المكتملة', count: 85, percentage: 94, color: '#009F87' },
    { category: 'العقود النشطة', count: 142, percentage: 87, color: '#1e40af' },
    { category: 'الاستشارات المعلقة', count: 18, percentage: 12, color: '#f59e0b' },
    { category: 'الامتثال القانوني', count: 98, percentage: 98, color: '#10b981' }
  ];

  const caseTypes = [
    { type: 'قضايا عمالية', value: 45, count: 45 },
    { type: 'عقود تجارية', value: 35, count: 35 },
    { type: 'نزاعات إدارية', value: 20, count: 20 }
  ];

  const BOUD_COLORS = ['#009F87', '#1e40af', '#f59e0b'];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#009F87] via-[#008072] to-[#009F87] p-8 mb-8 shadow-2xl">
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
                <Button className="bg-[#009F87]/80 border-[#009F87]/30 text-white hover:bg-[#009F87]/90 backdrop-blur-sm">
                  <Download className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير Excel' : 'Export Excel'}
                </Button>
                <Button className="bg-red-600/80 border-red-600/30 text-white hover:bg-red-600/90 backdrop-blur-sm">
                  <FileText className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير PDF' : 'Export PDF'}
                </Button>
                <Button className="bg-blue-600 border-blue-600 text-white hover:bg-blue-600/90 shadow-lg">
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
                {isRTL ? 'نظام الشؤون القانونية الذكي' : 'Smart Legal Affairs System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'نظام متطور لإدارة القضايا القانونية والعقود والاستشارات' : 'Advanced system for legal case management and contract administration'}
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Analytics Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-slate-900 via-[#009F87] to-blue-900 text-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Legal Cases */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-300">
                      {isRTL ? 'القضايا القانونية' : 'Legal Cases'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-[#009F87]/50 to-blue-600/50 rounded-xl p-4 flex items-center justify-center">
                      <Gavel className="h-32 w-32 text-green-300 opacity-80" />
                      <div className="absolute top-4 right-4 bg-[#009F87]/80 px-3 py-1 rounded-full text-sm">
                        85 {isRTL ? 'قضية مكتملة' : 'Completed'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-blue-600/80 px-3 py-1 rounded-full text-sm">
                        94% {isRTL ? 'معدل النجاح' : 'Success Rate'}
                      </div>
                    </div>
                  </div>

                  {/* Contract Management */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-300">
                      {isRTL ? 'إدارة العقود' : 'Contract Management'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-blue-600/50 to-purple-600/50 rounded-xl p-4 flex items-center justify-center">
                      <FileText className="h-32 w-32 text-blue-300 opacity-80" />
                      <div className="absolute top-4 right-4 bg-blue-600/80 px-3 py-1 rounded-full text-sm">
                        142 {isRTL ? 'عقد نشط' : 'Active'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-purple-600/80 px-3 py-1 rounded-full text-sm">
                        87% {isRTL ? 'معدل التنفيذ' : 'Execution Rate'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legal Trends Chart */}
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={legalData}>
                      <defs>
                        <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#009F87" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#009F87" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorContracts" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1e40af" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Area type="monotone" dataKey="cases" stroke="#009F87" fill="url(#colorCases)" />
                      <Area type="monotone" dataKey="contracts" stroke="#1e40af" fill="url(#colorContracts)" />
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
                    {isRTL ? 'مؤشرات قانونية' : 'Legal Metrics'}
                  </h3>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {legalMetrics.map((metric, index) => (
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
                  {isRTL ? 'أنواع القضايا' : 'Case Types'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={caseTypes}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {caseTypes.map((entry, index) => (
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

        {/* Legal Affairs System */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#009F87] text-white px-6 py-2 rounded-full shadow-lg">
              <Scale className="h-5 w-5" />
              <span className="font-medium">{isRTL ? 'نظام قانوني متطور' : 'Advanced Legal System'}</span>
            </div>
          </div>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                {isRTL ? 'نظام الشؤون القانونية المتطور' : 'Advanced Legal Affairs System'}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {[
                  { icon: Scale, label: isRTL ? 'الاستشارات القانونية' : 'Legal Consulting', color: 'bg-[#009F87]', count: 0 },
                  { icon: FileText, label: isRTL ? 'إدارة العقود' : 'Contract Management', color: 'bg-blue-600', count: 18 },
                  { icon: Gavel, label: isRTL ? 'القضايا والمحاكم' : 'Cases & Courts', color: 'bg-red-600', count: 5 },
                  { icon: Building, label: isRTL ? 'الامتثال التنظيمي' : 'Regulatory Compliance', color: 'bg-green-600', count: 0 },
                  { icon: Users, label: isRTL ? 'الوساطة والتحكيم' : 'Mediation & Arbitration', color: 'bg-yellow-600', count: 3 },
                  { icon: AlertTriangle, label: isRTL ? 'إدارة المخاطر' : 'Risk Management', color: 'bg-orange-600', count: 8 },
                  { icon: Eye, label: isRTL ? 'المراجعة القانونية' : 'Legal Review', color: 'bg-purple-600', count: 0 },
                  { icon: Settings, label: isRTL ? 'الإعدادات المتقدمة' : 'Advanced Settings', color: 'bg-gray-600', count: 0 }
                ].map((item, index) => (
                  <div key={index} className="text-center group cursor-pointer">
                    <div className={`${item.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform relative`}>
                      <item.icon className="h-8 w-8 text-white" />
                      {item.count > 0 && (
                        <div className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                          {item.count}
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-700 group-hover:text-[#009F87] transition-colors">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-[#009F87]/10 to-[#009F87]/20 rounded-xl border border-[#009F87]/20">
                  <div className="text-3xl font-bold text-[#009F87] mb-2">85</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'قضايا مكتملة' : 'Completed Cases'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-600/10 to-blue-600/20 rounded-xl border border-blue-600/20">
                  <div className="text-3xl font-bold text-blue-600 mb-2">142</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'عقود نشطة' : 'Active Contracts'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-600/20 rounded-xl border border-green-600/20">
                  <div className="text-3xl font-bold text-green-600 mb-2">94%</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'معدل النجاح' : 'Success Rate'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-yellow-600/10 to-yellow-600/20 rounded-xl border border-yellow-600/20">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">216</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'استشارات قانونية' : 'Legal Consultations'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
