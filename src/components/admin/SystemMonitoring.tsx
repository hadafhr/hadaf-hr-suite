import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Activity,
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  TrendingUp
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTranslation } from 'react-i18next';

const performanceData = [
  { time: '00:00', cpu: 45, memory: 62, network: 38 },
  { time: '04:00', cpu: 32, memory: 58, network: 42 },
  { time: '08:00', cpu: 78, memory: 71, network: 65 },
  { time: '12:00', cpu: 85, memory: 79, network: 72 },
  { time: '16:00', cpu: 92, memory: 84, network: 78 },
  { time: '20:00', cpu: 68, memory: 73, network: 58 },
  { time: '24:00', cpu: 45, memory: 62, network: 38 }
];

export const SystemMonitoring: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  const systemMetrics = [
    {
      title: isArabic ? 'الخادم الرئيسي' : 'Main Server',
      status: 'online',
      uptime: '99.9%',
      cpu: 68,
      memory: 73,
      disk: 42,
      network: 58,
      icon: Server
    },
    {
      title: isArabic ? 'قاعدة البيانات' : 'Database',
      status: 'online',
      uptime: '99.8%',
      cpu: 45,
      memory: 67,
      disk: 78,
      network: 32,
      icon: Database
    },
    {
      title: isArabic ? 'خادم التطبيقات' : 'App Server',
      status: 'warning',
      uptime: '98.5%',
      cpu: 89,
      memory: 91,
      disk: 56,
      network: 74,
      icon: Activity
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'offline': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'online': return isArabic ? 'متصل' : 'Online';
      case 'warning': return isArabic ? 'تحذير' : 'Warning';
      case 'offline': return isArabic ? 'غير متصل' : 'Offline';
      default: return isArabic ? 'غير معروف' : 'Unknown';
    }
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {systemMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <metric.icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-base">{metric.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(metric.status)}`} />
                  <Badge variant="outline" className="text-xs">
                    {getStatusLabel(metric.status)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">{isArabic ? 'وقت التشغيل:' : 'Uptime:'}</span>
                  <div className="font-medium">{metric.uptime}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">{isArabic ? 'الحالة:' : 'Status:'}</span>
                  <div className="flex items-center space-x-1 space-x-reverse">
                    {metric.status === 'online' ? (
                      <CheckCircle className="h-3 w-3 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-3 w-3 text-yellow-500" />
                    )}
                    <span className="font-medium">{getStatusLabel(metric.status)}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>CPU</span>
                    <span>{metric.cpu}%</span>
                  </div>
                  <Progress value={metric.cpu} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{isArabic ? 'الذاكرة' : 'Memory'}</span>
                    <span>{metric.memory}%</span>
                  </div>
                  <Progress value={metric.memory} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{isArabic ? 'القرص الصلب' : 'Disk'}</span>
                    <span>{metric.disk}%</span>
                  </div>
                  <Progress value={metric.disk} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{isArabic ? 'الشبكة' : 'Network'}</span>
                    <span>{metric.network}%</span>
                  </div>
                  <Progress value={metric.network} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2 space-x-reverse">
              <TrendingUp className="h-5 w-5 text-primary" />
              <span>{isArabic ? 'أداء النظام (24 ساعة)' : 'System Performance (24h)'}</span>
            </CardTitle>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              {isArabic ? 'تحديث' : 'Refresh'}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="cpu" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="CPU %"
                />
                <Line 
                  type="monotone" 
                  dataKey="memory" 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  name={isArabic ? 'الذاكرة %' : 'Memory %'}
                />
                <Line 
                  type="monotone" 
                  dataKey="network" 
                  stroke="hsl(var(--muted-foreground))" 
                  strokeWidth={2}
                  name={isArabic ? 'الشبكة %' : 'Network %'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Server className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">{isArabic ? 'إعادة تشغيل الخادم' : 'Restart Server'}</h4>
              <p className="text-xs text-muted-foreground">{isArabic ? 'إعادة تشغيل آمنة' : 'Safe restart'}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-2 bg-green-100 rounded-lg">
              <Database className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">{isArabic ? 'نسخ احتياطي للبيانات' : 'Backup Data'}</h4>
              <p className="text-xs text-muted-foreground">{isArabic ? 'نسخة فورية' : 'Instant backup'}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Cpu className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h4 className="font-medium">{isArabic ? 'تحليل الأداء' : 'Performance Analysis'}</h4>
              <p className="text-xs text-muted-foreground">{isArabic ? 'تقرير مفصل' : 'Detailed report'}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center space-x-3 space-x-reverse">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Wifi className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-medium">{isArabic ? 'حالة الشبكة' : 'Network Status'}</h4>
              <p className="text-xs text-muted-foreground">{isArabic ? 'اختبار الاتصال' : 'Connection test'}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};