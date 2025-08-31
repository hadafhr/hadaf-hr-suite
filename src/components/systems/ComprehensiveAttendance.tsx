import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, FileText, AlertTriangle, CheckCircle, Users, Eye, Save, Download, Share, Settings, Calendar, MapPin, Building, Bot } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface ComprehensiveAttendanceProps {
  onBack: () => void;
}

const ComprehensiveAttendance = ({ onBack }: ComprehensiveAttendanceProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // بيانات الحضور والانصراف
  const attendanceData = [
    { month: 'يناير', present: 120, late: 8, absent: 2 },
    { month: 'فبراير', present: 135, late: 12, absent: 3 },
    { month: 'مارس', present: 128, late: 5, absent: 1 },
    { month: 'أبريل', present: 142, late: 10, absent: 4 },
    { month: 'مايو', present: 130, late: 7, absent: 2 },
    { month: 'يونيو', present: 138, late: 9, absent: 3 }
  ];

  const attendanceMetrics = [
    { category: 'حضور منتظم', count: 832, percentage: 92, color: 'hsl(var(--success))' },
    { category: 'تأخير', count: 51, percentage: 5.6, color: 'hsl(var(--warning))' },
    { category: 'غياب', count: 15, percentage: 1.7, color: 'hsl(var(--destructive))' },
    { category: 'عمل عن بُعد', count: 67, percentage: 7.4, color: 'hsl(var(--primary))' }
  ];

  const attendanceByDepartment = [
    { level: 'تقنية المعلومات', value: 35, count: 45 },
    { level: 'الموارد البشرية', value: 25, count: 32 },
    { level: 'المبيعات', value: 40, count: 51 }
  ];

  const BOUD_COLORS = ['hsl(var(--primary))', 'hsl(var(--warning))', 'hsl(var(--destructive))'];

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
                  <Clock className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {isRTL ? 'نظام الحضور والانصراف الشامل' : 'Comprehensive Attendance System'}
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                {isRTL ? 'نظام متطور لإدارة حضور الموظفين مع تتبع الموقع والذكاء الاصطناعي' : 'Advanced employee attendance management system with location tracking and AI'}
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
                  {/* Attendance Tracking */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-primary-glow">
                      {isRTL ? 'تتبع الحضور' : 'Attendance Tracking'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-primary/50 to-secondary/50 rounded-xl p-4 flex items-center justify-center">
                      <Clock className="h-32 w-32 text-primary-glow opacity-80" />
                      <div className="absolute top-4 right-4 bg-primary/80 px-3 py-1 rounded-full text-sm">
                        832 {isRTL ? 'حضور منتظم' : 'Regular Attendance'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-secondary/80 px-3 py-1 rounded-full text-sm">
                        92% {isRTL ? 'معدل الحضور' : 'Attendance Rate'}
                      </div>
                    </div>
                  </div>

                  {/* Shift Management */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-warning">
                      {isRTL ? 'إدارة النوبات' : 'Shift Management'}
                    </h3>
                    <div className="relative h-48 bg-gradient-to-br from-warning/50 to-destructive/50 rounded-xl p-4 flex items-center justify-center">
                      <Calendar className="h-32 w-32 text-warning opacity-80" />
                      <div className="absolute top-4 right-4 bg-warning/80 px-3 py-1 rounded-full text-sm">
                        24 {isRTL ? 'نوبة نشطة' : 'Active Shifts'}
                      </div>
                      <div className="absolute bottom-4 left-4 bg-destructive/80 px-3 py-1 rounded-full text-sm">
                        67 {isRTL ? 'عمل عن بُعد' : 'Remote Work'}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Attendance Trends Chart */}
                <div className="mt-8">
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={attendanceData}>
                      <defs>
                        <linearGradient id="colorPresent" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorLate" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
                        labelStyle={{ color: '#F3F4F6' }}
                      />
                      <Area type="monotone" dataKey="present" stroke="hsl(var(--primary))" fill="url(#colorPresent)" />
                      <Area type="monotone" dataKey="late" stroke="hsl(var(--warning))" fill="url(#colorLate)" />
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
                    {isRTL ? 'مؤشرات الحضور' : 'Attendance Metrics'}
                  </h3>
                  <Settings className="h-5 w-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {attendanceMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: `${metric.color}15` }}>
                      <div>
                        <p className="font-semibold text-gray-800">{metric.category}</p>
                        <p className="text-sm text-gray-600">{metric.count} {isRTL ? 'موظف' : 'employees'}</p>
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
                  {isRTL ? 'الحضور حسب القسم' : 'Attendance by Department'}
                </h3>
                <ResponsiveContainer width="100%" height={200}>
                  <RechartsPieChart>
                    <Pie
                      data={attendanceByDepartment}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {attendanceByDepartment.map((entry, index) => (
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

        {/* Attendance System */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 bg-secondary text-white px-6 py-2 rounded-full shadow-lg">
              <Clock className="h-5 w-5" />
              <span className="font-medium">{isRTL ? 'نظام حضور متطور' : 'Advanced Attendance System'}</span>
            </div>
          </div>
          
          <Card className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                {isRTL ? 'نظام الحضور والانصراف الشامل' : 'Comprehensive Attendance System'}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                {[
                  { icon: Clock, label: isRTL ? 'الحضور اليومي' : 'Daily Attendance', color: 'bg-primary', count: 8 },
                  { icon: Calendar, label: isRTL ? 'جدولة النوبات' : 'Shift Scheduling', color: 'bg-secondary', count: 3 },
                  { icon: MapPin, label: isRTL ? 'تتبع الموقع' : 'Location Tracking', color: 'bg-warning', count: 5 },
                  { icon: CheckCircle, label: isRTL ? 'الحضور المنتظم' : 'Regular Attendance', color: 'bg-success', count: 0 },
                  { icon: AlertTriangle, label: isRTL ? 'تنبيهات التأخير' : 'Late Alerts', color: 'bg-destructive', count: 12 },
                  { icon: Users, label: isRTL ? 'إدارة الموظفين' : 'Employee Management', color: 'bg-primary', count: 2 },
                  { icon: Building, label: isRTL ? 'إدارة المواقع' : 'Location Management', color: 'bg-warning', count: 6 },
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
                    <p className="text-sm font-medium text-gray-700 group-hover:text-secondary transition-colors">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/20 rounded-xl border border-primary/20">
                  <div className="text-3xl font-bold text-primary mb-2">832</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'حضور منتظم' : 'Regular Attendance'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-xl border border-secondary/20">
                  <div className="text-3xl font-bold text-secondary mb-2">24</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'نوبات نشطة' : 'Active Shifts'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-success/10 to-success/20 rounded-xl border border-success/20">
                  <div className="text-3xl font-bold text-success mb-2">92%</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'معدل الحضور' : 'Attendance Rate'}</div>
                </div>
                
                <div className="text-center p-6 bg-gradient-to-br from-warning/10 to-warning/20 rounded-xl border border-warning/20">
                  <div className="text-3xl font-bold text-warning mb-2">51</div>
                  <div className="text-sm text-gray-600">{isRTL ? 'حالات تأخير' : 'Late Cases'}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveAttendance;