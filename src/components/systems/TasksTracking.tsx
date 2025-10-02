import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ArrowLeft, CheckSquare, Clock, Users, AlertTriangle, TrendingUp, Eye, Save, Download, Share, Settings, BarChart, Target, Calendar, Plus, User, Search, AlertCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface TasksTrackingProps {
  onBack: () => void;
}

export const TasksTracking: React.FC<TasksTrackingProps> = ({ onBack }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // بيانات المهام والمتابعة
  const tasksData = [
    { month: 'يناير', completed: 125, pending: 35, overdue: 8 },
    { month: 'فبراير', completed: 140, pending: 28, overdue: 5 },
    { month: 'مارس', completed: 118, pending: 42, overdue: 12 },
    { month: 'أبريل', completed: 155, pending: 25, overdue: 3 },
    { month: 'مايو', completed: 132, pending: 38, overdue: 7 },
    { month: 'يونيو', completed: 168, pending: 22, overdue: 4 }
  ];

  const tasksMetrics = [
    { category: 'المهام المكتملة', count: 1240, percentage: 87, color: '#009F87' },
    { category: 'المهام قيد التنفيذ', count: 185, percentage: 13, color: '#1e40af' },
    { category: 'المهام المتأخرة', count: 28, percentage: 2, color: '#dc2626' },
    { category: 'معدل الإنجاز', count: 95, percentage: 95, color: '#059669' }
  ];

  const tasksByPriority = [
    { priority: 'عالية الأولوية', value: 35, count: 48 },
    { priority: 'متوسطة الأولوية', value: 45, count: 62 },
    { priority: 'منخفضة الأولوية', value: 20, count: 27 }
  ];

  const BOUD_COLORS = ['#dc2626', '#f59e0b', '#059669'];

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
                  <CheckSquare className="h-4 w-4 ml-2" />
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
                  <CheckSquare className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام المهام والمتابعة الذكي' : 'Smart Tasks & Tracking System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'نظام متطور لإدارة المهام وتتبع التقدم وقياس الأداء' : 'Advanced system for task management and progress tracking'}
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
                  {/* Task Management */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-300">
                      {isRTL ? 'إدارة المهام' : 'Task Management'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-[#009F87]/50 to-blue-600/50 rounded-xl p-4 flex items-center justify-center">
                      <CheckSquare className="h-32 w-32 text-green-300 opacity-80" />
                      <div className="absolute top-4 right-4 bg-[#009F87]/80 px-3 py-1 rounded-full text-sm">
                        1240 {isRTL ? 'مهمة مكتملة' : 'Completed'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-blue-600/80 px-3 py-1 rounded-full text-sm">
                        87% {isRTL ? 'معدل الإنجاز' : 'Completion Rate'}
                      </div>
                    </div>
                  </div>

                  {/* Time Tracking */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-blue-300">
                      {isRTL ? 'تتبع الوقت' : 'Time Tracking'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-blue-600/50 to-purple-600/50 rounded-xl p-4 flex items-center justify-center">
                      <Clock className="h-32 w-32 text-blue-300 opacity-80" />
                      <div className="absolute top-4 right-4 bg-blue-600/80 px-3 py-1 rounded-full text-sm">
                        2,840 {isRTL ? 'ساعة' : 'Hours'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-purple-600/80 px-3 py-1 rounded-full text-sm">
                        95% {isRTL ? 'كفاءة الوقت' : 'Time Efficiency'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tasks Trends Chart */}
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={tasksData}>
                      <defs>
                        <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#009F87" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#009F87" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1e40af" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: 'hsl(var(--card-foreground))' }}
                      />
                      <Area type="monotone" dataKey="completed" stroke="#009F87" fill="url(#colorCompleted)" />
                      <Area type="monotone" dataKey="pending" stroke="#1e40af" fill="url(#colorPending)" />
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
                    {isRTL ? 'مؤشرات المهام' : 'Task Metrics'}
                  </h3>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {tasksMetrics.map((metric, index) => (
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
                  {isRTL ? 'المهام حسب الأولوية' : 'Tasks by Priority'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={tasksByPriority}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {tasksByPriority.map((entry, index) => (
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

        {/* Tasks System */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-[#009F87] text-white px-6 py-2 rounded-full shadow-lg">
              <CheckSquare className="h-5 w-5" />
              <span className="font-medium">{isRTL ? 'نظام مهام متطور' : 'Advanced Tasks System'}</span>
            </div>
          </div>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                {isRTL ? 'نظام المهام والمتابعة المتطور' : 'Advanced Tasks & Tracking System'}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {[
                  { icon: CheckSquare, label: isRTL ? 'إدارة المهام' : 'Task Management', color: 'bg-[#009F87]', count: 0 },
                  { icon: Clock, label: isRTL ? 'تتبع الوقت' : 'Time Tracking', color: 'bg-blue-600', count: 28 },
                  { icon: Users, label: isRTL ? 'فرق العمل' : 'Team Collaboration', color: 'bg-green-600', count: 5 },
                  { icon: TrendingUp, label: isRTL ? 'تقارير الأداء' : 'Performance Reports', color: 'bg-purple-600', count: 0 },
                  { icon: Target, label: isRTL ? 'الأهداف والمعالم' : 'Goals & Milestones', color: 'bg-yellow-600', count: 12 },
                  { icon: AlertTriangle, label: isRTL ? 'التنبيهات والتذكيرات' : 'Alerts & Reminders', color: 'bg-red-600', count: 15 },
                  { icon: Calendar, label: isRTL ? 'جدولة المهام' : 'Task Scheduling', color: 'bg-indigo-600', count: 0 },
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
                  <div className="text-3xl font-bold text-[#009F87] mb-2">1,240</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'مهام مكتملة' : 'Completed Tasks'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-blue-600/10 to-blue-600/20 rounded-xl border border-blue-600/20">
                  <div className="text-3xl font-bold text-blue-600 mb-2">185</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'مهام نشطة' : 'Active Tasks'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-green-600/10 to-green-600/20 rounded-xl border border-green-600/20">
                  <div className="text-3xl font-bold text-green-600 mb-2">87%</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'معدل الإنجاز' : 'Completion Rate'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-purple-600/10 to-purple-600/20 rounded-xl border border-purple-600/20">
                  <div className="text-3xl font-bold text-purple-600 mb-2">2,840</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'ساعات العمل' : 'Work Hours'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
