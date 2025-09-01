import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Globe, Wifi, WifiOff, RefreshCw, CheckCircle, AlertCircle, Settings, Trash2, Plus, Shield, Server, Database, Network, Lock, Eye, Download, BarChart3 } from 'lucide-react';

interface GovernmentSystem {
  id: string;
  name: string;
  nameEn: string;
  status: 'متصل' | 'غير متصل' | 'خطأ';
  lastSync: string;
  description: string;
  dataCount: number;
  icon: React.ReactNode;
}

interface GovernmentIntegrationProps {
  onBack: () => void;
}

export const GovernmentIntegration: React.FC<GovernmentIntegrationProps> = ({ onBack }) => {
  const [syncing, setSyncing] = useState<string | null>(null);

  const systems: GovernmentSystem[] = [
    {
      id: 'MOL',
      name: 'وزارة العمل والتنمية الاجتماعية',
      nameEn: 'Ministry of Labor',
      status: 'متصل',
      lastSync: '2024-03-20 14:30',
      description: 'مزامنة بيانات الموظفين وتصاريح العمل',
      dataCount: 245,
      icon: <Shield className="h-6 w-6 text-primary" />
    },
    {
      id: 'GOSI',
      name: 'التأمينات الاجتماعية',
      nameEn: 'GOSI',
      status: 'متصل',
      lastSync: '2024-03-20 13:45',
      description: 'مزامنة بيانات التأمينات الاجتماعية',
      dataCount: 238,
      icon: <Database className="h-6 w-6 text-primary" />
    },
    {
      id: 'ZAKAT',
      name: 'هيئة الزكاة والضريبة والجمارك',
      nameEn: 'ZATCA',
      status: 'متصل',
      lastSync: '2024-03-20 12:15',
      description: 'مزامنة بيانات الرواتب والضرائب',
      dataCount: 245,
      icon: <BarChart3 className="h-6 w-6 text-primary" />
    },
    {
      id: 'QIWA',
      name: 'منصة قوى',
      nameEn: 'Qiwa Platform',
      status: 'خطأ',
      lastSync: '2024-03-19 16:20',
      description: 'منصة التوظيف وخدمات الموارد البشرية',
      dataCount: 0,
      icon: <Network className="h-6 w-6 text-primary" />
    },
    {
      id: 'MOI',
      name: 'وزارة الداخلية',
      nameEn: 'Ministry of Interior',
      status: 'متصل',
      lastSync: '2024-03-20 11:00',
      description: 'التحقق من بيانات الهوية والإقامة',
      dataCount: 245,
      icon: <Lock className="h-6 w-6 text-primary" />
    },
    {
      id: 'MUDAD',
      name: 'منصة مدد',
      nameEn: 'Mudad Platform',
      status: 'غير متصل',
      lastSync: '2024-03-18 09:30',
      description: 'نظام حماية الأجور',
      dataCount: 0,
      icon: <Server className="h-6 w-6 text-primary" />
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'متصل':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'غير متصل':
        return <WifiOff className="h-4 w-4 text-gray-500" />;
      case 'خطأ':
        return <AlertCircle className="h-4 w-4 text-red-600" />;
      default:
        return <Wifi className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      'متصل': 'bg-green-100 text-green-800 border-green-200',
      'غير متصل': 'bg-gray-100 text-gray-800 border-gray-200',
      'خطأ': 'bg-red-100 text-red-800 border-red-200'
    };
    return config[status as keyof typeof config] || 'bg-gray-100 text-gray-800';
  };

  const handleSync = async (systemId: string) => {
    setSyncing(systemId);
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSyncing(null);
  };

  const connectedSystems = systems.filter(s => s.status === 'متصل').length;
  const errorSystems = systems.filter(s => s.status === 'خطأ').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/10 to-background relative overflow-hidden" dir="rtl">
      {/* خلفية متحركة احترافية */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-secondary/3 to-accent/3 opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_theme(colors.primary.DEFAULT)_0%,_transparent_50%)] opacity-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_theme(colors.secondary.DEFAULT)_0%,_transparent_50%)] opacity-10"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* هيدر فائق الجمال والاحترافية */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-gray-900 to-black p-10 mb-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.4)] backdrop-blur-xl border border-primary/30">
          {/* طبقات التدرج المتقدمة */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/15 to-accent/20 opacity-80"></div>
          <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(255,255,255,0.05)_180deg,transparent_360deg)]"></div>
          
          {/* عناصر هندسية متحركة */}
          <div className="absolute top-0 left-0 w-full h-full opacity-20">
            <div className="absolute top-4 right-4 w-24 h-24 border-2 border-primary/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 left-4 w-16 h-16 border border-secondary/40 rotate-45 animate-bounce"></div>
            <div className="absolute top-1/3 left-1/4 w-12 h-12 bg-accent/10 rounded-lg rotate-12 animate-pulse"></div>
            <div className="absolute bottom-1/3 right-1/4 w-8 h-8 bg-primary/20 rounded-full animate-bounce"></div>
            <div className="absolute top-1/2 left-1/2 w-6 h-6 border border-secondary/30 transform -translate-x-1/2 -translate-y-1/2 rotate-45 animate-spin"></div>
          </div>
          
          <div className="relative z-20">
            {/* التخطيط الفائق: شعار - نص - رمز */}
            <div className="grid grid-cols-12 items-center mb-10 gap-6">
              {/* الشعار المتطور في أقصى اليمين */}
              <div className="col-span-3 flex justify-end">
                <div className="group relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary/50 to-secondary/50 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl backdrop-blur-xl border border-white/20 shadow-2xl hover:scale-105 transition-all duration-500">
                    <img 
                      src="/lovable-uploads/4b2910fb-b74e-4c5d-b399-8b1109f26b7b.png" 
                      alt="BOUD HR Logo" 
                      className="h-24 w-auto filter drop-shadow-2xl hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all duration-500"
                    />
                  </div>
                </div>
              </div>
              
              {/* النص المركزي الفائق */}
              <div className="col-span-6 text-center">
                <div className="space-y-4">
                  <div className="relative">
                    <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white mb-3 tracking-wider animate-fade-in">
                      قسم التكامل والربط
                    </h1>
                    <div className="absolute inset-0 text-6xl font-black text-white/5 blur-sm transform -translate-y-3">
                      قسم التكامل والربط
                    </div>
                  </div>
                  <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-full border border-primary/50 backdrop-blur-xl shadow-2xl">
                    <span className="text-2xl font-bold text-white tracking-widest">API INTEGRATION</span>
                  </div>
                </div>
              </div>
              
              {/* الرمز المتقدم في اليسار */}
              <div className="col-span-3 flex justify-start">
                <div className="group relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-secondary/40 to-accent/40 rounded-3xl blur opacity-40 group-hover:opacity-70 transition duration-1000 animate-pulse"></div>
                  <div className="relative p-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl backdrop-blur-xl border border-primary/30 shadow-2xl hover:scale-110 transition-all duration-500">
                    <Network className="h-16 w-16 text-white drop-shadow-2xl animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            {/* الوصف الجمالي */}
            <div className="text-center mb-10">
              <div className="max-w-4xl mx-auto p-6 bg-gradient-to-r from-white/5 to-white/10 rounded-2xl backdrop-blur-xl border border-white/20 shadow-inner">
                <p className="text-xl text-white/90 leading-relaxed font-medium tracking-wide">
                  <span className="text-primary font-bold">منظومة ذكية متطورة</span> للربط الآمن والسلس مع جميع الأنظمة الحكومية 
                  <span className="text-secondary font-bold"> وتزامن البيانات المتقدم</span> مع الجهات الرسمية بتقنية عالية الأمان
                </p>
              </div>
            </div>

            {/* شريط الفاصل الجمالي */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
              <div className="mx-6 w-3 h-3 bg-primary rounded-full animate-pulse shadow-lg"></div>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
            </div>

            {/* مجموعة الأزرار الفائقة الجمال */}
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <Button
                onClick={onBack}
                className="group relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <ArrowLeft className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                <span className="relative z-10">رجوع للوحة التحكم</span>
              </Button>
              
              <Button 
                onClick={() => window.location.reload()}
                className="group relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <RefreshCw className="h-5 w-5 ml-3 group-hover:rotate-180 transition-transform duration-500" />
                <span className="relative z-10">تحديث الأنظمة</span>
              </Button>
              
              <Button 
                className="group relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Plus className="h-5 w-5 ml-3 group-hover:rotate-90 transition-transform duration-300" />
                <span className="relative z-10">ربط نظام جديد</span>
              </Button>
              
              <Button 
                className="group relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Trash2 className="h-5 w-5 ml-3 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">حذف نظام</span>
              </Button>
              
              <Button 
                className="group relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-white font-bold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border border-primary/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <Settings className="h-5 w-5 ml-3 group-hover:rotate-90 transition-transform duration-500" />
                <span className="relative z-10">الإعدادات المتقدمة</span>
              </Button>
            </div>
          </div>
        </div>

        {/* إحصائيات احترافية محدثة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card className="group bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl border-primary/30 hover:border-primary/60 transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.3)] transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-3xl mb-4 group-hover:scale-110 transition-all duration-500 shadow-inner">
                <Server className="h-10 w-10 text-primary drop-shadow-lg" />
              </div>
              <div className="text-4xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">{systems.length}</div>
              <div className="text-sm font-medium text-muted-foreground">إجمالي الأنظمة المتاحة</div>
            </CardContent>
          </Card>
          
          <Card className="group bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl border-green-200/50 hover:border-green-400/70 transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_-10px_rgba(34,197,94,0.2)] transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-100/80 to-green-50/60 rounded-3xl mb-4 group-hover:scale-110 transition-all duration-500 shadow-inner">
                <CheckCircle className="h-10 w-10 text-green-600 drop-shadow-lg" />
              </div>
              <div className="text-4xl font-black text-green-600 mb-2 group-hover:scale-110 transition-transform">{connectedSystems}</div>
              <div className="text-sm font-medium text-muted-foreground">أنظمة متصلة ونشطة</div>
            </CardContent>
          </Card>
          
          <Card className="group bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl border-red-200/50 hover:border-red-400/70 transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_-10px_rgba(239,68,68,0.2)] transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-100/80 to-red-50/60 rounded-3xl mb-4 group-hover:scale-110 transition-all duration-500 shadow-inner">
                <AlertCircle className="h-10 w-10 text-red-600 drop-shadow-lg" />
              </div>
              <div className="text-4xl font-black text-red-600 mb-2 group-hover:scale-110 transition-transform">{errorSystems}</div>
              <div className="text-sm font-medium text-muted-foreground">أخطاء تتطلب انتباه</div>
            </CardContent>
          </Card>
          
          <Card className="group bg-gradient-to-br from-card/95 to-card/85 backdrop-blur-xl border-gray-200/50 hover:border-gray-400/70 transition-all duration-500 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] transform hover:scale-105">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-gray-800/80 to-gray-900/60 rounded-3xl mb-4 group-hover:scale-110 transition-all duration-500 shadow-inner">
                <BarChart3 className="h-10 w-10 text-gray-800 drop-shadow-lg" />
              </div>
              <div className="text-4xl font-black text-gray-800 mb-2 group-hover:scale-110 transition-transform">98.5%</div>
              <div className="text-sm font-medium text-muted-foreground">معدل الاتصال الإجمالي</div>
            </CardContent>
          </Card>
        </div>

        {/* شبكة الأنظمة الحكومية الفائقة الجمال */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((system) => (
            <Card key={system.id} className="group relative overflow-hidden bg-gradient-to-br from-card/98 to-card/90 backdrop-blur-xl border border-primary/20 hover:border-primary/50 transition-all duration-700 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] transform hover:scale-[1.02] hover:-translate-y-2">
              
              {/* تأثير الإضاءة المتحركة */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
              
              <CardHeader className="pb-6 relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl blur-sm group-hover:blur-md transition-all duration-500"></div>
                      <div className="relative p-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-2xl group-hover:from-primary/20 group-hover:to-secondary/15 transition-all duration-500 shadow-inner">
                        {system.icon}
                      </div>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-all duration-300 mb-1">
                        {system.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-semibold tracking-wide">{system.nameEn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-muted/20 to-muted/10 rounded-xl backdrop-blur-sm">
                      {getStatusIcon(system.status)}
                    </div>
                    <Badge className={`${getStatusBadge(system.status)} border-2 font-bold px-4 py-2 text-sm shadow-lg`}>
                      {system.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6 relative z-10">
                {/* وصف النظام */}
                <div className="p-5 bg-gradient-to-r from-muted/20 via-muted/10 to-muted/20 rounded-2xl border border-muted/30 backdrop-blur-sm">
                  <p className="text-sm text-foreground/80 leading-relaxed font-medium">{system.description}</p>
                </div>
                
                {/* إحصائيات النظام المتطورة */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="group/stat relative overflow-hidden bg-gradient-to-br from-primary/8 to-primary/15 p-5 rounded-2xl text-center border-2 border-primary/25 hover:border-primary/40 transition-all duration-500 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover/stat:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative z-10">
                      <div className="text-3xl font-black text-primary mb-2 group-hover/stat:scale-110 transition-transform">{system.dataCount}</div>
                      <div className="text-xs text-muted-foreground font-semibold">سجل محدث</div>
                    </div>
                  </div>
                  
                  <div className="group/stat relative overflow-hidden bg-gradient-to-br from-secondary/8 to-secondary/15 p-5 rounded-2xl text-center border-2 border-secondary/25 hover:border-secondary/40 transition-all duration-500 shadow-inner">
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/0 via-secondary/10 to-secondary/0 translate-x-[-100%] group-hover/stat:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative z-10">
                      <div className="text-xl font-black text-secondary mb-2 group-hover/stat:scale-110 transition-transform">
                        {system.status === 'متصل' ? 'فعال' : 'معطل'}
                      </div>
                      <div className="text-xs text-muted-foreground font-semibold">حالة الخدمة</div>
                    </div>
                  </div>
                </div>

                {/* معلومات آخر مزامنة */}
                <div className="relative overflow-hidden bg-gradient-to-br from-accent/8 to-accent/15 p-5 rounded-2xl border-2 border-accent/25 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-foreground mb-2">آخر مزامنة</div>
                      <div className="text-sm text-muted-foreground font-medium">{system.lastSync}</div>
                    </div>
                    <div className="p-3 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl shadow-lg">
                      <RefreshCw className="h-6 w-6 text-accent animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* أزرار الإجراءات الوظيفية */}
                <div className="grid grid-cols-2 gap-3 pt-4">
                  <Button 
                    size="default"
                    className="group/btn relative overflow-hidden bg-gradient-to-r from-primary/90 to-primary hover:from-primary hover:to-primary/80 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300 border border-primary/30"
                    onClick={() => handleSync(system.id)}
                    disabled={syncing === system.id}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                    {syncing === system.id ? (
                      <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 ml-2 group-hover/btn:rotate-180 transition-transform duration-500" />
                    )}
                    <span className="relative z-10">{syncing === system.id ? 'مزامنة...' : 'مزامنة فورية'}</span>
                  </Button>
                  
                  <Button 
                    size="default"
                    className="group/btn relative overflow-hidden bg-gradient-to-r from-secondary/90 to-secondary hover:from-secondary hover:to-secondary/80 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-secondary/25 transform hover:scale-105 transition-all duration-300 border border-secondary/30"
                    onClick={() => {
                      // وظيفة المعاينة
                      console.log(`عرض تفاصيل نظام: ${system.name}`);
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                    <Eye className="h-4 w-4 ml-2 group-hover/btn:scale-110 transition-transform duration-300" />
                    <span className="relative z-10">معاينة</span>
                  </Button>
                  
                  <Button 
                    size="default"
                    className="group/btn relative overflow-hidden bg-gradient-to-r from-accent/90 to-accent hover:from-accent hover:to-accent/80 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-accent/25 transform hover:scale-105 transition-all duration-300 border border-accent/30"
                    onClick={() => {
                      // وظيفة التصدير
                      console.log(`تصدير بيانات نظام: ${system.name}`);
                      // يمكن إضافة منطق تصدير ملف Excel أو PDF هنا
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                    <Download className="h-4 w-4 ml-2 group-hover/btn:translate-y-1 transition-transform duration-300" />
                    <span className="relative z-10">تصدير</span>
                  </Button>
                  
                  <Button 
                    size="default"
                    className="group/btn relative overflow-hidden bg-gradient-to-r from-gray-800/90 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-gray-800/25 transform hover:scale-105 transition-all duration-300 border border-gray-800/30"
                    onClick={() => {
                      // وظيفة الإعدادات
                      console.log(`إعدادات نظام: ${system.name}`);
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>
                    <Settings className="h-4 w-4 ml-2 group-hover/btn:rotate-90 transition-transform duration-500" />
                    <span className="relative z-10">إعدادات</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};