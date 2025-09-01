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
      icon: <Network className="h-6 w-6 text-destructive" />
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
      icon: <Server className="h-6 w-6 text-muted-foreground" />
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background" dir="rtl">
      {/* خلفية متدرجة احترافية */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 opacity-50"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* هيدر احترافي متطور */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-elegant p-12 mb-8 shadow-elegant backdrop-blur-sm border border-primary/20">
          {/* طبقة تراكب متقدمة */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/90"></div>
          
          {/* أنماط هندسية خلفية */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-4 right-4 w-32 h-32 border-2 border-white rounded-full"></div>
            <div className="absolute bottom-4 left-4 w-24 h-24 border border-white rotate-45"></div>
            <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-white/10 rounded-lg rotate-12"></div>
          </div>
          
          <div className="relative z-20">
            {/* الشعار المتطور */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-6 bg-white/10 rounded-3xl backdrop-blur-md border border-white/20 mb-8">
                <img 
                  src="/lovable-uploads/efcdf377-f1e8-46de-9c53-a32187817fa7.png" 
                  alt="BOUD HR Logo" 
                  className="h-32 w-auto brightness-0 invert opacity-95"
                />
              </div>
            </div>

            {/* مجموعة الأزرار الاحترافية */}
            <div className="flex items-center justify-center gap-4 flex-wrap mb-12">
              <Button
                variant="outline"
                size="lg"
                onClick={onBack}
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-md transition-all duration-300 shadow-glow group"
              >
                <ArrowLeft className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                رجوع للوحة التحكم
              </Button>
              
              <Button 
                size="lg"
                className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-md transition-all duration-300 shadow-glow group"
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="h-5 w-5 ml-2 group-hover:rotate-180 transition-transform" />
                تحديث جميع الأنظمة
              </Button>
              
              <Button 
                size="lg"
                className="bg-accent/90 border-accent text-white hover:bg-accent shadow-glow group"
              >
                <Plus className="h-5 w-5 ml-2 group-hover:rotate-90 transition-transform" />
                ربط نظام جديد
              </Button>
              
              <Button 
                size="lg"
                className="bg-destructive/80 border-destructive/60 text-white hover:bg-destructive/90 backdrop-blur-md shadow-glow group"
                onClick={() => {}}
              >
                <Trash2 className="h-5 w-5 ml-2 group-hover:scale-110 transition-transform" />
                حذف نظام سابق
              </Button>
              
              <Button 
                size="lg"
                className="bg-secondary/80 border-secondary/60 text-white hover:bg-secondary/90 backdrop-blur-md shadow-glow group"
                onClick={() => {}}
              >
                <Settings className="h-5 w-5 ml-2 group-hover:rotate-90 transition-transform" />
                الإعدادات المتقدمة
              </Button>
            </div>
            
            {/* العنوان والوصف المتطوران */}
            <div className="text-center">
              <h1 className="text-5xl font-bold text-white mb-4 tracking-wide">
                نظام التكامل الحكومي المتقدم
              </h1>
              <p className="text-white/90 text-xl max-w-3xl mx-auto leading-relaxed">
                منظومة ذكية شاملة للربط الآمن والمتطور مع جميع الأنظمة الحكومية وتزامن البيانات مع الجهات الرسمية
              </p>
              
              {/* أيقونة مركزية متحركة */}
              <div className="mt-8 flex justify-center">
                <div className="p-4 bg-white/20 rounded-3xl backdrop-blur-md border border-white/30 shadow-glow">
                  <Network className="h-16 w-16 text-white animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* إحصائيات احترافية محدثة */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-card/95 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-elegant hover:shadow-glow group">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Server className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-primary mb-1">{systems.length}</div>
              <div className="text-sm text-muted-foreground">إجمالي الأنظمة المتاحة</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/95 backdrop-blur-md border-green-200/50 hover:border-green-300/70 transition-all duration-300 shadow-elegant hover:shadow-glow group">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100/50 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-1">{connectedSystems}</div>
              <div className="text-sm text-muted-foreground">أنظمة متصلة ونشطة</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/95 backdrop-blur-md border-red-200/50 hover:border-red-300/70 transition-all duration-300 shadow-elegant hover:shadow-glow group">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100/50 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-red-600 mb-1">{errorSystems}</div>
              <div className="text-sm text-muted-foreground">أخطاء تتطلب انتباه</div>
            </CardContent>
          </Card>
          
          <Card className="bg-card/95 backdrop-blur-md border-blue-200/50 hover:border-blue-300/70 transition-all duration-300 shadow-elegant hover:shadow-glow group">
            <CardContent className="p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100/50 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-1">98.5%</div>
              <div className="text-sm text-muted-foreground">معدل الاتصال الإجمالي</div>
            </CardContent>
          </Card>
        </div>

        {/* شبكة الأنظمة الحكومية الاحترافية */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {systems.map((system) => (
            <Card key={system.id} className="group bg-card/95 backdrop-blur-md border-primary/20 hover:border-primary/40 transition-all duration-300 shadow-elegant hover:shadow-glow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                      {system.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {system.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground font-medium">{system.nameEn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusIcon(system.status)}
                    <Badge className={`${getStatusBadge(system.status)} border font-medium px-3 py-1`}>
                      {system.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-4 rounded-xl">
                  {system.description}
                </div>
                
                {/* إحصائيات النظام */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-4 rounded-xl text-center border border-primary/20 group-hover:border-primary/30 transition-all">
                    <div className="text-2xl font-bold text-primary mb-1">{system.dataCount}</div>
                    <div className="text-xs text-muted-foreground font-medium">سجل محدث</div>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/5 to-secondary/10 p-4 rounded-xl text-center border border-secondary/20 group-hover:border-secondary/30 transition-all">
                    <div className="text-lg font-bold text-secondary mb-1">
                      {system.status === 'متصل' ? 'فعال' : 'معطل'}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">حالة الخدمة</div>
                  </div>
                </div>

                {/* معلومات آخر مزامنة */}
                <div className="bg-gradient-to-r from-muted/30 to-muted/20 p-4 rounded-xl border border-muted/40">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-foreground mb-1">آخر مزامنة</div>
                      <div className="text-sm text-muted-foreground">{system.lastSync}</div>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <RefreshCw className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>

                {/* أزرار الإجراءات */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1 bg-primary/5 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-md group-hover:border-primary/50"
                    onClick={() => handleSync(system.id)}
                    disabled={syncing === system.id}
                  >
                    {syncing === system.id ? (
                      <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
                    ) : (
                      <RefreshCw className="h-4 w-4 ml-2" />
                    )}
                    {syncing === system.id ? 'مزامنة...' : 'مزامنة'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="bg-secondary/5 border-secondary/30 text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Eye className="h-4 w-4 ml-1" />
                    معاينة
                  </Button>
                  
                  <Button 
                    variant="outline"
                    size="sm" 
                    className="bg-accent/5 border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    <Download className="h-4 w-4 ml-1" />
                    تصدير
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