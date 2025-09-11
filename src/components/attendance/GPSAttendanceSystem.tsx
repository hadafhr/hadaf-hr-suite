import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Clock, 
  Calendar, 
  CheckCircle, 
  XCircle, 
  Loader2,
  Navigation,
  Shield,
  Globe,
  Satellite
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: Date;
  address?: string;
}

interface AttendanceRecord {
  date: string;
  checkIn?: string;
  checkOut?: string;
  location?: LocationData;
  status: 'present' | 'late' | 'absent' | 'early_leave';
  workingHours?: number;
}

interface GPSAttendanceSystemProps {
  onCheckIn?: (location: LocationData) => Promise<void>;
  onCheckOut?: (location: LocationData) => Promise<void>;
  attendanceRecords?: AttendanceRecord[];
  isLoading?: boolean;
}

const GPSAttendanceSystem: React.FC<GPSAttendanceSystemProps> = ({
  onCheckIn,
  onCheckOut,
  attendanceRecords = [],
  isLoading = false
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | 'unknown'>('unknown');
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [isProcessingAttendance, setIsProcessingAttendance] = useState(false);
  const [todayAttendance, setTodayAttendance] = useState<AttendanceRecord | null>(null);

  // تحديث الوقت كل ثانية
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // فحص صلاحيات الموقع عند تحميل المكون
  useEffect(() => {
    checkLocationPermission();
    getTodayAttendance();
  }, [attendanceRecords]);

  const checkLocationPermission = async () => {
    if (!navigator.geolocation) {
      setLocationPermission('denied');
      return;
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      setLocationPermission(permission.state);
      
      permission.addEventListener('change', () => {
        setLocationPermission(permission.state);
      });
    } catch (error) {
      console.error('Error checking location permission:', error);
      setLocationPermission('unknown');
    }
  };

  const getCurrentLocation = (): Promise<LocationData> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      setIsGettingLocation(true);

      const options = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      };

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setIsGettingLocation(false);
          const locationData: LocationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: new Date()
          };

          // محاولة الحصول على العنوان (اختياري)
          try {
            const address = await reverseGeocode(locationData.latitude, locationData.longitude);
            locationData.address = address;
          } catch (error) {
            console.warn('Failed to get address:', error);
          }

          setCurrentLocation(locationData);
          resolve(locationData);
        },
        (error) => {
          setIsGettingLocation(false);
          let errorMessage = 'حدث خطأ في الحصول على الموقع';
          
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'تم رفض الإذن للوصول إلى الموقع';
              setLocationPermission('denied');
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'معلومات الموقع غير متاحة';
              break;
            case error.TIMEOUT:
              errorMessage = 'انتهت مهلة الحصول على الموقع';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        options
      );
    });
  };

  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    // في التطبيق الحقيقي، يمكن استخدام Google Maps API أو خدمة أخرى
    // هنا سنعرض إحداثيات مبسطة
    return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
  };

  const handleCheckIn = async () => {
    if (todayAttendance?.checkIn) {
      toast({
        title: 'تم تسجيل الحضور مسبقاً',
        description: 'لقد سجلت حضورك اليوم بالفعل',
        variant: 'default'
      });
      return;
    }

    setIsProcessingAttendance(true);
    
    try {
      const location = await getCurrentLocation();
      
      if (onCheckIn) {
        await onCheckIn(location);
      }
      
      // تحديث السجل المحلي
      const newAttendance: AttendanceRecord = {
        date: new Date().toISOString().split('T')[0],
        checkIn: currentTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        location,
        status: 'present'
      };
      
      setTodayAttendance(newAttendance);
      
      toast({
        title: 'تم تسجيل الحضور بنجاح',
        description: `تم تسجيل حضورك في ${newAttendance.checkIn}`,
        variant: 'default'
      });
      
    } catch (error) {
      console.error('Check-in failed:', error);
      toast({
        title: 'فشل في تسجيل الحضور',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: 'destructive'
      });
    } finally {
      setIsProcessingAttendance(false);
    }
  };

  const handleCheckOut = async () => {
    if (!todayAttendance?.checkIn) {
      toast({
        title: 'لم يتم تسجيل الحضور',
        description: 'يجب تسجيل الحضور أولاً قبل الانصراف',
        variant: 'destructive'
      });
      return;
    }

    if (todayAttendance?.checkOut) {
      toast({
        title: 'تم تسجيل الانصراف مسبقاً',
        description: 'لقد سجلت انصرافك اليوم بالفعل',
        variant: 'default'
      });
      return;
    }

    setIsProcessingAttendance(true);
    
    try {
      const location = await getCurrentLocation();
      
      if (onCheckOut) {
        await onCheckOut(location);
      }
      
      // حساب ساعات العمل
      const checkInTime = new Date(`${todayAttendance.date} ${todayAttendance.checkIn}`);
      const checkOutTime = new Date();
      const workingHours = (checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60 * 60);
      
      // تحديث السجل المحلي
      const updatedAttendance: AttendanceRecord = {
        ...todayAttendance,
        checkOut: currentTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }),
        location,
        workingHours: Math.max(0, workingHours)
      };
      
      setTodayAttendance(updatedAttendance);
      
      toast({
        title: 'تم تسجيل الانصراف بنجاح',
        description: `تم تسجيل انصرافك في ${updatedAttendance.checkOut}`,
        variant: 'default'
      });
      
    } catch (error) {
      console.error('Check-out failed:', error);
      toast({
        title: 'فشل في تسجيل الانصراف',
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: 'destructive'
      });
    } finally {
      setIsProcessingAttendance(false);
    }
  };

  const getTodayAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayRecord = attendanceRecords.find(record => record.date === today);
    setTodayAttendance(todayRecord || null);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ar-SA', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getLocationStatusColor = () => {
    switch (locationPermission) {
      case 'granted': return 'text-green-600';
      case 'denied': return 'text-red-600';
      case 'prompt': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getLocationStatusText = () => {
    switch (locationPermission) {
      case 'granted': return 'مسموح';
      case 'denied': return 'مرفوض';
      case 'prompt': return 'في انتظار الإذن';
      default: return 'غير معروف';
    }
  };

  return (
    <div className="space-y-6">
      {/* الساعة والتاريخ الرئيسي */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3">
              <Satellite className="h-8 w-8 text-primary animate-pulse" />
              <h2 className="text-2xl font-bold">نظام الحضور والانصراف GPS</h2>
            </div>
            
            <div className="text-5xl font-bold text-primary">
              {formatTime(currentTime)}
            </div>
            
            <div className="text-lg text-muted-foreground">
              {formatDate(currentTime)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* حالة الموقع */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5" />
            حالة تحديد الموقع
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-primary" />
              <span>إذن الوصول للموقع:</span>
            </div>
            <Badge variant="outline" className={getLocationStatusColor()}>
              {getLocationStatusText()}
            </Badge>
          </div>

          {currentLocation && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-green-600" />
                <span className="text-sm">آخر موقع مسجل:</span>
              </div>
              <div className="text-sm text-muted-foreground bg-muted p-3 rounded-lg">
                <p>الإحداثيات: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}</p>
                <p>دقة التحديد: {currentLocation.accuracy.toFixed(0)} متر</p>
                {currentLocation.address && <p>العنوان: {currentLocation.address}</p>}
                <p>وقت التحديد: {currentLocation.timestamp.toLocaleString('ar-SA')}</p>
              </div>
            </div>
          )}

          {locationPermission === 'denied' && (
            <Alert className="border-red-200 bg-red-50">
              <Shield className="h-4 w-4 text-red-600" />
              <AlertDescription>
                تم رفض الإذن للوصول إلى الموقع. يرجى السماح للتطبيق بالوصول إلى موقعك من إعدادات المتصفح لتتمكن من تسجيل الحضور.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* حالة الحضور اليوم */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            حضوري اليوم
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <CheckCircle className={`h-4 w-4 ${todayAttendance?.checkIn ? 'text-green-600' : 'text-gray-400'}`} />
                <span className="text-sm font-medium">الحضور</span>
              </div>
              <div className="text-lg font-bold">
                {todayAttendance?.checkIn || '--:--'}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <XCircle className={`h-4 w-4 ${todayAttendance?.checkOut ? 'text-red-600' : 'text-gray-400'}`} />
                <span className="text-sm font-medium">الانصراف</span>
              </div>
              <div className="text-lg font-bold">
                {todayAttendance?.checkOut || '--:--'}
              </div>
            </div>
          </div>

          {todayAttendance?.workingHours && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">ساعات العمل</span>
                <span className="font-bold">{todayAttendance.workingHours.toFixed(1)} ساعة</span>
              </div>
              <Progress value={(todayAttendance.workingHours / 8) * 100} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1">
                من إجمالي 8 ساعات عمل يومية
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* أزرار الحضور والانصراف */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={handleCheckIn}
          disabled={isProcessingAttendance || isGettingLocation || !!todayAttendance?.checkIn || locationPermission !== 'granted'}
          size="lg"
          className="h-16 text-lg bg-green-600 hover:bg-green-700"
        >
          {isProcessingAttendance && !todayAttendance?.checkIn ? (
            <>
              <Loader2 className="h-5 w-5 ml-2 animate-spin" />
              جاري تسجيل الحضور...
            </>
          ) : (
            <>
              <CheckCircle className="h-5 w-5 ml-2" />
              تسجيل الحضور
            </>
          )}
        </Button>

        <Button
          onClick={handleCheckOut}
          disabled={isProcessingAttendance || isGettingLocation || !todayAttendance?.checkIn || !!todayAttendance?.checkOut || locationPermission !== 'granted'}
          size="lg"
          variant="destructive"
          className="h-16 text-lg"
        >
          {isProcessingAttendance && !todayAttendance?.checkOut ? (
            <>
              <Loader2 className="h-5 w-5 ml-2 animate-spin" />
              جاري تسجيل الانصراف...
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 ml-2" />
              تسجيل الانصراف
            </>
          )}
        </Button>
      </div>

      {isGettingLocation && (
        <Alert className="border-blue-200 bg-blue-50">
          <Navigation className="h-4 w-4 text-blue-600 animate-pulse" />
          <AlertDescription>
            جاري تحديد موقعك الحالي بواسطة الأقمار الصناعية...
          </AlertDescription>
        </Alert>
      )}

      {/* سجل الحضور الأخير */}
      {attendanceRecords.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              سجل الحضور الأخير
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attendanceRecords.slice(0, 7).map((record, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{record.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {record.checkIn || '--:--'} - {record.checkOut || '--:--'}
                    </div>
                  </div>
                  <div className="text-left">
                    <Badge variant="outline" className={
                      record.status === 'present' ? 'text-green-600' :
                      record.status === 'late' ? 'text-yellow-600' :
                      record.status === 'absent' ? 'text-red-600' : 'text-gray-600'
                    }>
                      {record.status === 'present' ? 'حاضر' :
                       record.status === 'late' ? 'متأخر' :
                       record.status === 'absent' ? 'غائب' : 'انصراف مبكر'}
                    </Badge>
                    {record.workingHours && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {record.workingHours.toFixed(1)} ساعة
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GPSAttendanceSystem;