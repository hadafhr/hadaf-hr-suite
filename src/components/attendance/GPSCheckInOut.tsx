import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Loader2 
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface GPSCheckInOutProps {
  onAttendanceUpdate?: () => void;
}

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address?: string;
}

interface WorkLocation {
  id: string;
  location_name: string;
  latitude: number;
  longitude: number;
  radius_meters: number;
  address: string;
}

export const GPSCheckInOut: React.FC<GPSCheckInOutProps> = ({ onAttendanceUpdate }) => {
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [workLocations, setWorkLocations] = useState<WorkLocation[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [locationStatus, setLocationStatus] = useState<'unknown' | 'granted' | 'denied' | 'prompt'>('unknown');
  const [todayRecord, setTodayRecord] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    checkLocationPermission();
    fetchWorkLocations();
    fetchTodayAttendance();
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const checkLocationPermission = async () => {
    if (!navigator.geolocation) {
      setLocationStatus('denied');
      return;
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      setLocationStatus(permission.state);
      
      permission.addEventListener('change', () => {
        setLocationStatus(permission.state);
      });
    } catch (error) {
      setLocationStatus('prompt');
    }
  };

  const fetchWorkLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('work_locations')
        .select('*')
        .eq('is_active', true);

      if (error) throw error;
      setWorkLocations(data || []);
    } catch (error) {
      console.error('Error fetching work locations:', error);
    }
  };

  const fetchTodayAttendance = async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const { data: employeeData } = await supabase
        .from('boud_employees')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!employeeData) return;

      const { data, error } = await supabase
        .from('employee_attendance_records')
        .select('*')
        .eq('employee_id', employeeData.id)
        .eq('attendance_date', today)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setTodayRecord(data);
    } catch (error) {
      console.error('Error fetching today attendance:', error);
    }
  };

  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: Date.now()
          };
          setCurrentLocation(location);
          resolve(location);
        },
        (error) => reject(error),
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000
        }
      );
    });
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const findNearestWorkLocation = (location: LocationData): { location: WorkLocation; distance: number } | null => {
    let nearest: { location: WorkLocation; distance: number } | null = null;

    for (const workLocation of workLocations) {
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        workLocation.latitude,
        workLocation.longitude
      );

      if (distance <= workLocation.radius_meters && (!nearest || distance < nearest.distance)) {
        nearest = { location: workLocation, distance };
      }
    }

    return nearest;
  };

  const handleCheckIn = async () => {
    if (todayRecord?.check_in_time) {
      toast.error('تم تسجيل الحضور مسبقاً اليوم');
      return;
    }

    setIsProcessing(true);
    try {
      const location = await getCurrentLocation();
      const nearestLocation = findNearestWorkLocation(location);

      if (!nearestLocation) {
        toast.error('يجب أن تكون داخل نطاق أحد مواقع العمل المعتمدة');
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data: employeeData } = await supabase
        .from('boud_employees')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!employeeData) throw new Error('Employee not found');

      const now = new Date();
      const today = now.toISOString().split('T')[0];

      // تحديد حالة التأخير
      const workStart = new Date(`${today}T08:00:00`);
      const isLate = now > workStart;
      const lateMinutes = isLate ? Math.floor((now.getTime() - workStart.getTime()) / (1000 * 60)) : 0;

      const { error } = await supabase
        .from('employee_attendance_records')
        .insert({
          employee_id: employeeData.id,
          attendance_date: today,
          check_in_time: now.toISOString(),
          check_in_location: {
            lat: location.latitude,
            lng: location.longitude,
            accuracy: location.accuracy,
            address: nearestLocation.location.location_name
          },
          status: isLate ? 'late' : 'present',
          source_type: 'gps',
          late_minutes: lateMinutes,
          is_remote: false
        });

      if (error) throw error;

      toast.success(`تم تسجيل الحضور بنجاح في ${nearestLocation.location.location_name}`, {
        description: `الوقت: ${now.toLocaleTimeString('ar-SA')}`
      });

      fetchTodayAttendance();
      onAttendanceUpdate?.();

    } catch (error: any) {
      console.error('Check-in error:', error);
      toast.error(error.message || 'خطأ في تسجيل الحضور');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCheckOut = async () => {
    if (!todayRecord?.check_in_time) {
      toast.error('يجب تسجيل الحضور أولاً');
      return;
    }

    if (todayRecord?.check_out_time) {
      toast.error('تم تسجيل الانصراف مسبقاً');
      return;
    }

    setIsProcessing(true);
    try {
      const location = await getCurrentLocation();
      const nearestLocation = findNearestWorkLocation(location);

      if (!nearestLocation) {
        toast.error('يجب أن تكون داخل نطاق أحد مواقع العمل المعتمدة');
        return;
      }

      const now = new Date();
      const checkInTime = new Date(todayRecord.check_in_time);
      const totalHours = (now.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);

      const { error } = await supabase
        .from('employee_attendance_records')
        .update({
          check_out_time: now.toISOString(),
          check_out_location: {
            lat: location.latitude,
            lng: location.longitude,
            accuracy: location.accuracy,
            address: nearestLocation.location.location_name
          },
          total_hours: Math.round(totalHours * 100) / 100
        })
        .eq('id', todayRecord.id);

      if (error) throw error;

      toast.success(`تم تسجيل الانصراف بنجاح من ${nearestLocation.location.location_name}`, {
        description: `إجمالي ساعات العمل: ${Math.round(totalHours * 100) / 100} ساعة`
      });

      fetchTodayAttendance();
      onAttendanceUpdate?.();

    } catch (error: any) {
      console.error('Check-out error:', error);
      toast.error(error.message || 'خطأ في تسجيل الانصراف');
    } finally {
      setIsProcessing(false);
    }
  };

  const getLocationStatusColor = () => {
    switch (locationStatus) {
      case 'granted': return 'text-green-600';
      case 'denied': return 'text-red-600';
      case 'prompt': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getLocationStatusText = () => {
    switch (locationStatus) {
      case 'granted': return 'تم منح إذن الوصول للموقع';
      case 'denied': return 'تم رفض إذن الوصول للموقع';
      case 'prompt': return 'يتطلب إذن الوصول للموقع';
      default: return 'جاري فحص إذن الوصول للموقع';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">تسجيل الحضور والانصراف عبر GPS</h2>
        <p className="text-muted-foreground">تسجيل آمن مع التحقق من الموقع الجغرافي</p>
      </div>

      {/* Current Time Card */}
      <Card className="text-center">
        <CardContent className="pt-6">
          <div className="text-4xl font-bold text-primary mb-2">
            {currentTime.toLocaleTimeString('ar-SA')}
          </div>
          <div className="text-sm text-muted-foreground">
            {currentTime.toLocaleDateString('ar-SA', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </CardContent>
      </Card>

      {/* Location Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            حالة الموقع
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className={`flex items-center gap-2 ${getLocationStatusColor()}`}>
              <Navigation className="h-4 w-4" />
              <span className="text-sm font-medium">{getLocationStatusText()}</span>
            </div>

            {currentLocation && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-sm text-green-800 font-medium">تم تحديد موقعك الحالي</p>
                <p className="text-xs text-green-600 mt-1">
                  دقة الموقع: {Math.round(currentLocation.accuracy)} متر
                </p>
              </div>
            )}

            {locationStatus === 'denied' && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  يرجى السماح للتطبيق بالوصول لموقعك الجغرافي لتتمكن من تسجيل الحضور والانصراف
                </AlertDescription>
              </Alert>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Today's Status */}
      <Card>
        <CardHeader>
          <CardTitle>حالة اليوم</CardTitle>
          <CardDescription>
            {new Date().toLocaleDateString('ar-SA', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className={`p-4 rounded-lg border ${
                todayRecord?.check_in_time ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {todayRecord?.check_in_time ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-500" />
                    )}
                    <span className="font-medium">وقت الحضور</span>
                  </div>
                  <span className={`text-lg font-bold ${
                    todayRecord?.check_in_time ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {todayRecord?.check_in_time 
                      ? new Date(todayRecord.check_in_time).toLocaleTimeString('ar-SA')
                      : '--:--'
                    }
                  </span>
                </div>
                {todayRecord?.late_minutes > 0 && (
                  <Badge variant="secondary" className="mt-2 bg-yellow-100 text-yellow-800">
                    تأخير {todayRecord.late_minutes} دقيقة
                  </Badge>
                )}
              </div>

              <div className={`p-4 rounded-lg border ${
                todayRecord?.check_out_time ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {todayRecord?.check_out_time ? (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-500" />
                    )}
                    <span className="font-medium">وقت الانصراف</span>
                  </div>
                  <span className={`text-lg font-bold ${
                    todayRecord?.check_out_time ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {todayRecord?.check_out_time 
                      ? new Date(todayRecord.check_out_time).toLocaleTimeString('ar-SA')
                      : '--:--'
                    }
                  </span>
                </div>
                {todayRecord?.total_hours && (
                  <Badge variant="outline" className="mt-2">
                    إجمالي: {todayRecord.total_hours} ساعة
                  </Badge>
                )}
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <Button
                onClick={handleCheckIn}
                disabled={isProcessing || locationStatus !== 'granted' || todayRecord?.check_in_time}
                className="bg-green-600 hover:bg-green-700 text-white py-6 text-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    جاري التحقق...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    تسجيل الحضور
                  </>
                )}
              </Button>

              <Button
                onClick={handleCheckOut}
                disabled={isProcessing || locationStatus !== 'granted' || !todayRecord?.check_in_time || todayRecord?.check_out_time}
                variant="outline"
                className="border-red-200 text-red-700 hover:bg-red-50 py-6 text-lg"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    جاري التحقق...
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 mr-2" />
                    تسجيل الانصراف
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Work Locations */}
      <Card>
        <CardHeader>
          <CardTitle>مواقع العمل المعتمدة</CardTitle>
          <CardDescription>يمكنك تسجيل الحضور من هذه المواقع فقط</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workLocations.map((location) => (
              <div key={location.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-medium">{location.location_name}</p>
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                  </div>
                </div>
                <Badge variant="outline">
                  نطاق {location.radius_meters}م
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};