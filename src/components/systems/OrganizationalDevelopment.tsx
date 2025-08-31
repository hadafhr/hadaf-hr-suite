import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, TrendingUp, Users, Target, BookOpen, Network, Building, ArrowUpCircle, CheckCircle, Eye, Save, Download, Share, Settings, BarChart, Clock, Zap } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface OrganizationalDevelopmentProps {
  onBack: () => void;
}

const OrganizationalDevelopment = ({ onBack }: OrganizationalDevelopmentProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // بيانات التطوير التنظيمي
  const developmentData = [
    { month: 'يناير', programs: 25, completed: 20, inProgress: 5 },
    { month: 'فبراير', programs: 28, completed: 24, inProgress: 4 },
    { month: 'مارس', programs: 32, completed: 28, inProgress: 4 },
    { month: 'أبريل', programs: 30, completed: 26, inProgress: 4 },
    { month: 'مايو', programs: 35, completed: 30, inProgress: 5 },
    { month: 'يونيو', programs: 38, completed: 33, inProgress: 5 }
  ];

  const developmentMetrics = [
    { category: 'البرامج المكتملة', count: 156, percentage: 87, color: 'hsl(var(--success))' },
    { category: 'قيد التنفيذ', count: 23, percentage: 13, color: 'hsl(var(--warning))' },
    { category: 'مبادرات جديدة', count: 8, percentage: 4.5, color: 'hsl(var(--primary))' },
    { category: 'تحسينات مقترحة', count: 45, percentage: 25, color: 'hsl(var(--secondary))' }
  ];

  const programsByType = [
    { type: 'تطوير القيادات', value: 35, count: 42 },
    { type: 'التحول الرقمي', value: 28, count: 34 },
    { type: 'تطوير المهارات', value: 22, count: 26 },
    { type: 'الثقافة التنظيمية', value: 15, count: 18 }
  ];

  const BOUD_COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))', 'hsl(var(--warning))', 'hsl(var(--success))'];

  const handleDevelopmentProgram = () => {
    alert('فتح برنامج التطوير التنظيمي الجديد');
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-100 ${isRTL ? 'font-cairo' : 'font-inter'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-success to-primary-glow p-8 mb-8 shadow-2xl">
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
                  <Save className="h-4 w-4 ml-2" />
                  {isRTL ? 'تصدير PDF' : 'Export PDF'}
                </Button>
                <Button 
                  className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg"
                  onClick={() => handleDevelopmentProgram()}
                >
                  <Target className="h-4 w-4 ml-2" />
                  {isRTL ? 'برنامج جديد' : 'New Program'}
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <TrendingUp className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام التطوير التنظيمي والتغيير الذكي' : 'Smart Organizational Development & Change System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'منظومة متطورة لإدارة التطوير التنظيمي وقيادة التغيير وبناء القدرات المؤسسية' : 'Advanced system for organizational development management, change leadership, and institutional capacity building'}
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Main Analytics Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-gradient-to-br from-slate-900 via-primary to-success text-white shadow-2xl rounded-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Development Framework */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary-glow">
                      {isRTL ? 'إطار التطوير' : 'Development Framework'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-primary/50 to-success/50 rounded-xl p-4 flex items-center justify-center">
                      <TrendingUp className="h-32 w-32 text-primary-glow opacity-80" />
                      <div className="absolute top-4 right-4 bg-primary/80 px-3 py-1 rounded-full text-sm">
                        156 {isRTL ? 'برنامج مكتمل' : 'Programs Completed'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-success/80 px-3 py-1 rounded-full text-sm">
                        87% {isRTL ? 'معدل النجاح' : 'Success Rate'}
                      </div>
                    </div>
                  </div>

                  {/* Change Management */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-warning">
                      {isRTL ? 'إدارة التغيير' : 'Change Management'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-warning/50 to-secondary/50 rounded-xl p-4 flex items-center justify-center">
                      <ArrowUpCircle className="h-32 w-32 text-warning opacity-80" />
                      <div className="absolute top-4 right-4 bg-warning/80 px-3 py-1 rounded-full text-sm">
                        23 {isRTL ? 'مبادرة نشطة' : 'Active Initiatives'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-secondary/80 px-3 py-1 rounded-full text-sm">
                        45 {isRTL ? 'تحسين مقترح' : 'Improvements'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Development Trends Chart */}
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={developmentData}>
                      <defs>
                        <linearGradient id="colorPrograms" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--success))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--success))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Area type="monotone" dataKey="programs" stroke="hsl(var(--primary))" fill="url(#colorPrograms)" />
                      <Area type="monotone" dataKey="completed" stroke="hsl(var(--success))" fill="url(#colorCompleted)" />
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
                    {isRTL ? 'مؤشرات التطوير' : 'Development Metrics'}
                  </h3>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {developmentMetrics.map((metric, index) => (
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
                  {isRTL ? 'توزيع البرامج' : 'Program Distribution'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={programsByType}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {programsByType.map((entry, index) => (
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

        {/* Organizational Development System */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-success text-white px-6 py-2 rounded-full shadow-lg">
              <TrendingUp className="h-5 w-5" />
              <span className="font-medium">{isRTL ? 'نظام تطوير متقدم' : 'Advanced Development System'}</span>
            </div>
          </div>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                {isRTL ? 'نظام التطوير التنظيمي والتغيير' : 'Organizational Development & Change System'}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {[
                  { icon: TrendingUp, label: isRTL ? 'مؤشرات الأداء' : 'Performance Metrics', color: 'bg-primary', count: 5 },
                  { icon: Users, label: isRTL ? 'تطوير المواهب' : 'Talent Development', color: 'bg-secondary', count: 12 },
                  { icon: Target, label: isRTL ? 'الأهداف الاستراتيجية' : 'Strategic Goals', color: 'bg-success', count: 3 },
                  { icon: BookOpen, label: isRTL ? 'برامج التدريب' : 'Training Programs', color: 'bg-warning', count: 8 },
                  { icon: Network, label: isRTL ? 'الهيكل التنظيمي' : 'Organizational Structure', color: 'bg-primary', count: 2 },
                  { icon: ArrowUpCircle, label: isRTL ? 'إدارة التغيير' : 'Change Management', color: 'bg-destructive', count: 6 },
                  { icon: CheckCircle, label: isRTL ? 'مراجعة الأداء' : 'Performance Review', color: 'bg-success', count: 0 },
                  { icon: Settings, label: isRTL ? 'إعدادات النظام' : 'System Settings', color: 'bg-secondary', count: 0 }
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
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">156</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'برامج مكتملة' : 'Completed Programs'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-warning/10 to-warning/20 rounded-xl border border-warning/20">
                  <div className="text-3xl font-bold text-warning mb-2">23</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'مبادرات نشطة' : 'Active Initiatives'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-success/10 to-success/20 rounded-xl border border-success/20">
                  <div className="text-3xl font-bold text-success mb-2">87%</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'معدل النجاح' : 'Success Rate'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl border border-secondary/20">
                  <div className="text-3xl font-bold text-secondary mb-2">45</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'تحسينات مقترحة' : 'Proposed Improvements'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default OrganizationalDevelopment;