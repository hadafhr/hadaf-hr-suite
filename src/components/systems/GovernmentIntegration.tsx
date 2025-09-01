import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Globe, Wifi, WifiOff, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

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
      icon: <Globe className="h-5 w-5" />
    },
    {
      id: 'GOSI',
      name: 'التأمينات الاجتماعية',
      nameEn: 'GOSI',
      status: 'متصل',
      lastSync: '2024-03-20 13:45',
      description: 'مزامنة بيانات التأمينات الاجتماعية',
      dataCount: 238,
      icon: <Globe className="h-5 w-5" />
    },
    {
      id: 'ZAKAT',
      name: 'هيئة الزكاة والضريبة والجمارك',
      nameEn: 'ZATCA',
      status: 'متصل',
      lastSync: '2024-03-20 12:15',
      description: 'مزامنة بيانات الرواتب والضرائب',
      dataCount: 245,
      icon: <Globe className="h-5 w-5" />
    },
    {
      id: 'QIWA',
      name: 'منصة قوى',
      nameEn: 'Qiwa Platform',
      status: 'خطأ',
      lastSync: '2024-03-19 16:20',
      description: 'منصة التوظيف وخدمات الموارد البشرية',
      dataCount: 0,
      icon: <Globe className="h-5 w-5" />
    },
    {
      id: 'MOI',
      name: 'وزارة الداخلية',
      nameEn: 'Ministry of Interior',
      status: 'متصل',
      lastSync: '2024-03-20 11:00',
      description: 'التحقق من بيانات الهوية والإقامة',
      dataCount: 245,
      icon: <Globe className="h-5 w-5" />
    },
    {
      id: 'MUDAD',
      name: 'منصة مدد',
      nameEn: 'Mudad Platform',
      status: 'غير متصل',
      lastSync: '2024-03-18 09:30',
      description: 'نظام حماية الأجور',
      dataCount: 0,
      icon: <Globe className="h-5 w-5" />
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100" dir="rtl">
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
                  رجوع
                </Button>
              </div>
              
              {/* الشعار في المنتصف */}
              <div className="absolute top-6 left-6">
                <img 
                  src="/lovable-uploads/efcdf377-f1e8-46de-9c53-a32187817fa7.png" 
                  alt="BOUD HR Logo" 
                  className="h-12 w-auto opacity-90"
                />
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  className="bg-white/20 border-white/30 text-white hover:bg-white/30 backdrop-blur-sm"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="h-4 w-4 ml-2" />
                  تحديث جميع الأنظمة
                </Button>
                <Button className="bg-secondary border-secondary text-white hover:bg-secondary/90 shadow-lg">
                  <Globe className="h-4 w-4 ml-2" />
                  ربط نظام جديد
                </Button>
              </div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Globe className="h-12 w-12 text-white" />
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                نظام التكامل الحكومي المتقدم
              </h1>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                منظومة ذكية شاملة للربط مع الأنظمة الحكومية وتزامن البيانات مع جميع الجهات الرسمية
              </p>
            </div>
          </div>
        </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#009F87] mb-1">{systems.length}</div>
            <div className="text-sm text-muted-foreground">إجمالي الأنظمة</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-green-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">{connectedSystems}</div>
            <div className="text-sm text-muted-foreground">أنظمة متصلة</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-red-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600 mb-1">{errorSystems}</div>
            <div className="text-sm text-muted-foreground">أخطاء التزامن</div>
          </CardContent>
        </Card>
        <Card className="bg-white/80 backdrop-blur border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">98%</div>
            <div className="text-sm text-muted-foreground">معدل الاتصال</div>
          </CardContent>
        </Card>
      </div>

      {/* Government Systems Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {systems.map((system) => (
          <Card key={system.id} className="bg-white/80 backdrop-blur border-[#009F87]/20 hover:shadow-lg transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#009F87]/10 rounded-lg">
                    {system.icon}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{system.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{system.nameEn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(system.status)}
                  <Badge className={getStatusBadge(system.status)}>
                    {system.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm text-muted-foreground">
                {system.description}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-[#009F87]/5 p-3 rounded-lg text-center">
                  <div className="font-semibold text-[#009F87]">{system.dataCount}</div>
                  <div className="text-xs text-muted-foreground">سجل محدث</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg text-center">
                  <div className="font-semibold text-blue-600">
                    {system.status === 'متصل' ? 'فعال' : 'معطل'}
                  </div>
                  <div className="text-xs text-muted-foreground">حالة الخدمة</div>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="text-sm font-medium text-gray-900 mb-1">آخر مزامنة</div>
                <div className="text-sm text-gray-700">{system.lastSync}</div>
              </div>

              <Button 
                variant="outline" 
                className="w-full hover:bg-[#009F87] hover:text-white transition-colors"
                onClick={() => handleSync(system.id)}
                disabled={syncing === system.id}
              >
                {syncing === system.id ? (
                  <RefreshCw className="h-4 w-4 ml-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 ml-2" />
                )}
                {syncing === system.id ? 'جاري التزامن...' : 'مزامنة الآن'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    </div>
  );
};