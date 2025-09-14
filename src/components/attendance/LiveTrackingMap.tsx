import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  MapPin, 
  Navigation, 
  Activity, 
  Radio, 
  RefreshCw,
  Eye,
  EyeOff,
  Users,
  Zap,
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  Battery,
  Smartphone
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface LiveTrackingMapProps {
  onBack?: () => void;
}

interface TrackingData {
  id: string;
  employee_id: string;
  employee_name: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  heading: number;
  activity_type: string;
  battery_level: number;
  timestamp: string;
  is_inside_geofence: boolean;
}

export const LiveTrackingMap: React.FC<LiveTrackingMapProps> = ({ onBack }) => {
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);
  const [geofences, setGeofences] = useState<any[]>([]);
  const [isTrackingEnabled, setIsTrackingEnabled] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrackingData();
    fetchGeofences();
    
    // تحديث البيانات كل 30 ثانية
    const interval = setInterval(fetchTrackingData, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchTrackingData = async () => {
    try {
      const { data, error } = await supabase
        .from('employee_live_tracking')
        .select(`
          *,
          boud_employees(first_name, last_name, employee_id)
        `)
        .order('timestamp', { ascending: false });

      if (error) throw error;

      const formattedData: TrackingData[] = (data || []).map(item => ({
        id: item.id,
        employee_id: item.employee_id,
        employee_name: `${item.boud_employees?.first_name || ''} ${item.boud_employees?.last_name || ''}`.trim(),
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
        accuracy: item.accuracy || 0,
        speed: item.speed || 0,
        heading: item.heading || 0,
        activity_type: item.activity_type || 'stationary',
        battery_level: item.battery_level || 0,
        timestamp: item.timestamp,
        is_inside_geofence: item.is_inside_geofence || false
      }));

      setTrackingData(formattedData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tracking data:', error);
      toast.error('خطأ في تحميل بيانات التتبع');
      setLoading(false);
    }
  };

  const fetchGeofences = async () => {
    try {
      const { data, error } = await supabase
        .from('attendance_locations')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setGeofences(data || []);
    } catch (error) {
      console.error('Error fetching geofences:', error);
    }
  };

  const simulateLocationUpdate = async () => {
    // محاكاة تحديث المواقع للاختبار
    const employees = await supabase
      .from('boud_employees')
      .select('id')
      .limit(3);

    if (employees.data) {
      for (const emp of employees.data) {
        const mockLocation = {
          employee_id: emp.id,
          latitude: 24.7136 + (Math.random() - 0.5) * 0.01, // حول الرياض
          longitude: 46.6753 + (Math.random() - 0.5) * 0.01,
          accuracy: 5 + Math.random() * 10,
          speed: Math.random() * 60,
          heading: Math.random() * 360,
          activity_type: ['walking', 'driving', 'stationary'][Math.floor(Math.random() * 3)],
          battery_level: 20 + Math.random() * 80,
          is_inside_geofence: Math.random() > 0.3
        };

        await supabase
          .from('employee_live_tracking')
          .insert(mockLocation);
      }

      fetchTrackingData();
      toast.success('تم تحديث المواقع');
    }
  };

  const getActivityIcon = (activity: string) => {
    switch (activity) {
      case 'walking':
        return <Users className="h-4 w-4" />;
      case 'driving':
        return <Navigation className="h-4 w-4" />;
      case 'stationary':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'walking':
        return 'text-blue-600 bg-blue-100';
      case 'driving':
        return 'text-green-600 bg-green-100';
      case 'stationary':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-purple-600 bg-purple-100';
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 50) return 'text-green-600';
    if (level > 20) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <MapPin className="h-12 w-12 animate-pulse mx-auto mb-4 text-primary" />
            <p className="text-lg text-muted-foreground">جاري تحميل خريطة التتبع المباشر...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              التتبع المباشر للموظفين الميدانيين
            </h1>
            <p className="text-muted-foreground">
              متابعة المواقع والأنشطة لحظة بلحظة مع تقنية GPS المتقدمة
            </p>
          </div>
          {onBack && (
            <Button onClick={onBack} variant="outline">
              العودة للوحة الرئيسية
            </Button>
          )}
        </div>

        {/* Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Radio className="h-5 w-5 text-green-600" />
                لوحة التحكم في التتبع
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch 
                    checked={isTrackingEnabled} 
                    onCheckedChange={setIsTrackingEnabled}
                  />
                  <span className="text-sm">التتبع النشط</span>
                </div>
                <Button onClick={simulateLocationUpdate} size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  تحديث المواقع
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">داخل المنطقة</span>
                </div>
                <div className="text-2xl font-bold text-green-900">
                  {trackingData.filter(d => d.is_inside_geofence).length}
                </div>
              </div>

              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <span className="font-medium text-red-800">خارج المنطقة</span>
                </div>
                <div className="text-2xl font-bold text-red-900">
                  {trackingData.filter(d => !d.is_inside_geofence).length}
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-800">في الحركة</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">
                  {trackingData.filter(d => d.activity_type !== 'stationary').length}
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800">إجمالي المتتبعين</span>
                </div>
                <div className="text-2xl font-bold text-purple-900">
                  {trackingData.length}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Tracking Data */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-600" />
                الخريطة التفاعلية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-8 text-center min-h-[400px] flex flex-col items-center justify-center border-2 border-dashed border-blue-300">
                <MapPin className="h-16 w-16 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-blue-800 mb-2">خريطة التتبع المباشر</h3>
                <p className="text-blue-600 mb-4">يمكن دمج خريطة Google Maps أو Mapbox هنا</p>
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  {trackingData.slice(0, 4).map((data, index) => (
                    <div key={data.id} className="bg-white/70 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium">{data.employee_name}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Lat: {data.latitude.toFixed(4)}, Lng: {data.longitude.toFixed(4)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Employee Tracking List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                قائمة المتتبعين
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-[400px] overflow-y-auto">
                {trackingData.map((data) => (
                  <div 
                    key={data.id} 
                    className={`p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedEmployee === data.employee_id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedEmployee(
                      selectedEmployee === data.employee_id ? null : data.employee_id
                    )}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{data.employee_name}</h4>
                        <p className="text-xs text-muted-foreground">
                          آخر تحديث: {new Date(data.timestamp).toLocaleTimeString('ar-SA')}
                        </p>
                      </div>
                      <Badge 
                        variant={data.is_inside_geofence ? 'default' : 'destructive'} 
                        className="text-xs"
                      >
                        {data.is_inside_geofence ? 'داخل المنطقة' : 'خارج المنطقة'}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded ${getActivityColor(data.activity_type)}`}>
                          {getActivityIcon(data.activity_type)}
                        </div>
                        <span className="capitalize">{data.activity_type}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Battery className={`h-4 w-4 ${getBatteryColor(data.battery_level)}`} />
                        <span>{data.battery_level}%</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Navigation className="h-4 w-4 text-blue-500" />
                        <span>{Math.round(data.speed)} km/h</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-green-500" />
                        <span>±{data.accuracy}m</span>
                      </div>
                    </div>

                    {selectedEmployee === data.employee_id && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="text-xs text-muted-foreground space-y-1">
                          <p>الإحداثيات: {data.latitude.toFixed(6)}, {data.longitude.toFixed(6)}</p>
                          <p>الاتجاه: {data.heading}°</p>
                          <p>الدقة: ±{data.accuracy} متر</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {trackingData.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>لا يوجد موظفين في الميدان حالياً</p>
                    <Button 
                      onClick={simulateLocationUpdate} 
                      className="mt-4"
                      size="sm"
                    >
                      إضافة بيانات تجريبية
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Geofences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-600" />
              المناطق الجغرافية المصرح بها (Geofencing)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {geofences.map((fence) => (
                <div key={fence.id} className="p-4 border rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{fence.location_name}</h4>
                    <Badge variant={fence.is_active ? 'default' : 'secondary'}>
                      {fence.is_active ? 'نشط' : 'غير نشط'}
                    </Badge>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>النطاق: {fence.radius_meters} متر</p>
                    <p>النوع: {fence.work_type}</p>
                    <p className="truncate">
                      الموقع: {fence.latitude.toFixed(4)}, {fence.longitude.toFixed(4)}
                    </p>
                  </div>

                  <div className="mt-3 text-xs">
                    <span className="text-green-600 font-medium">
                      {trackingData.filter(d => d.is_inside_geofence).length} موظف داخل النطاق
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};