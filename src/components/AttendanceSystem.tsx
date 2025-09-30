import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/components/ui/use-toast';
import { 
  Clock, 
  MapPin, 
  CheckCircle, 
  XCircle, 
  Calendar,
  TrendingUp,
  Clock3,
  AlertCircle,
  Loader2,
  Navigation,
  Shield,
  Wifi,
  Battery
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  date: string;
  checkIn: string;
  checkOut: string | null;
  workHours: number;
  status: 'present' | 'absent' | 'late' | 'earlyLeave';
  location?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

interface EmployeeData {
  id: string;
  name: string;
  employeeId: string;
  department: string;
  position: string;
  workLocation: string;
}

interface AttendanceSystemProps {
  employeeData: EmployeeData;
}

export const AttendanceSystem: React.FC<AttendanceSystemProps> = ({ employeeData }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt' | 'checking'>('checking');
  const [currentLocation, setCurrentLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [todayRecord, setTodayRecord] = useState<AttendanceRecord | null>(null);

  // Allowed work location (company coordinates)
  const allowedLocation = {
    latitude: 24.7136, // Riyadh coordinates
    longitude: 46.6753,
    name: 'المكتب الرئيسي - الرياض'
  };
  const allowedRadius = 200; // 200 meters

  // Mock attendance history
  const [attendanceHistory] = useState<AttendanceRecord[]>([
    {
      id: '1',
      date: '2024-03-24',
      checkIn: '08:00',
      checkOut: '17:00',
      workHours: 8,
      status: 'present',
      location: 'المكتب الرئيسي',
      coordinates: { latitude: 24.7136, longitude: 46.6753 }
    },
    {
      id: '2',
      date: '2024-03-23',
      checkIn: '08:15',
      checkOut: '17:00',
      workHours: 7.75,
      status: 'late',
      location: 'المكتب الرئيسي',
      coordinates: { latitude: 24.7136, longitude: 46.6753 }
    },
    {
      id: '3',
      date: '2024-03-22',
      checkIn: '08:00',
      checkOut: '16:30',
      workHours: 7.5,
      status: 'earlyLeave',
      location: 'المكتب الرئيسي',
      coordinates: { latitude: 24.7136, longitude: 46.6753 }
    }
  ]);

  // Monthly statistics
  const monthlyStats = {
    totalDays: 22,
    presentDays: 20,
    absentDays: 1,
    lateDays: 3,
    attendanceRate: 91
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    checkLocationPermission();
    
    return () => clearInterval(timer);
  }, []);

  const checkLocationPermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      setLocationPermission(permission.state);
      
      permission.addEventListener('change', () => {
        setLocationPermission(permission.state);
      });
    } catch (error) {
      console.error('Error checking location permission:', error);
      setLocationPermission('denied');
    }
  };

  const getCurrentLocation = (): Promise<{latitude: number; longitude: number}> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('متصفحك لا يدعم خدمة تحديد الموقع'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              reject(new Error('تم رفض الإذن للوصول للموقع'));
              break;
            case error.POSITION_UNAVAILABLE:
              reject(new Error('معلومات الموقع غير متاحة'));
              break;
            case error.TIMEOUT:
              reject(new Error('انتهت مهلة طلب تحديد الموقع'));
              break;
            default:
              reject(new Error('خطأ غير معروف في تحديد الموقع'));
              break;
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const handleCheckIn = async () => {
    setIsLoading(true);
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        allowedLocation.latitude,
        allowedLocation.longitude
      );

      if (distance <= allowedRadius) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ar-SA', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        
        setIsCheckedIn(true);
        setCheckInTime(timeString);
        
        // Create today's attendance record
        const newRecord: AttendanceRecord = {
          id: Date.now().toString(),
          date: now.toLocaleDateString('ar-SA'),
          checkIn: timeString,
          checkOut: null,
          workHours: 0,
          status: now.getHours() > 8 ? 'late' : 'present',
          location: allowedLocation.name,
          coordinates: location
        };
        setTodayRecord(newRecord);

        toast({
          title: "تم تسجيل الحضور بنجاح",
          description: `وقت الحضور: ${timeString} - ${allowedLocation.name}`,
        });
      } else {
        toast({
          title: "خطأ في الموقع",
          description: `أنت خارج نطاق مكان العمل المحدد (${Math.round(distance)}م من المكتب)`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الحضور",
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setIsLoading(true);
    try {
      const location = await getCurrentLocation();
      setCurrentLocation(location);
      
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        allowedLocation.latitude,
        allowedLocation.longitude
      );

      if (distance <= allowedRadius) {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ar-SA', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        });
        
        setIsCheckedIn(false);
        
        // Update today's record
        if (todayRecord && checkInTime) {
          const checkInDate = new Date();
          const [checkInHour, checkInMin] = checkInTime.split(':').map(Number);
          checkInDate.setHours(checkInHour, checkInMin, 0, 0);
          
          const workHours = (now.getTime() - checkInDate.getTime()) / (1000 * 60 * 60);
          
          const updatedRecord: AttendanceRecord = {
            ...todayRecord,
            checkOut: timeString,
            workHours: Math.round(workHours * 100) / 100,
            status: workHours < 7.5 ? 'earlyLeave' : todayRecord.status
          };
          setTodayRecord(updatedRecord);
        }

        toast({
          title: "تم تسجيل الانصراف بنجاح",
          description: `وقت الانصراف: ${timeString} - ${allowedLocation.name}`,
        });
      } else {
        toast({
          title: "خطأ في الموقع",
          description: `أنت خارج نطاق مكان العمل المحدد (${Math.round(distance)}م من المكتب)`,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ في تسجيل الانصراف",
        description: error instanceof Error ? error.message : 'حدث خطأ غير متوقع',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      'present': { color: 'bg-success/10 text-success border-success/20', text: 'حاضر' },
      'absent': { color: 'bg-red-100 text-red-700 border-red-200', text: 'غائب' },
      'late': { color: 'bg-orange-100 text-orange-700 border-orange-200', text: 'متأخر' },
      'earlyLeave': { color: 'bg-blue-100 text-blue-700 border-blue-200', text: 'انصراف مبكر' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.present;
    
    return (
      <Badge className={config.color}>
        {config.text}
      </Badge>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Current Status Card */}
      <Card className="bg-gradient-to-br from-primary/5 to-primary-glow/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-foreground">
            <div className="flex items-center">
              <Clock className="h-6 w-6 ml-3 text-primary" />
              حالة الحضور الحالية
            </div>
            <div className="text-2xl font-mono text-primary">
              {currentTime.toLocaleTimeString('ar-SA', { 
                hour: '2-digit', 
                minute: '2-digit', 
                second: '2-digit',
                hour12: false 
              })}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Status */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 space-x-reverse">
              {isCheckedIn ? (
                <>
                  <CheckCircle className="h-8 w-8 text-success" />
                  <span className="text-xl font-semibold text-success">محضر حالياً</span>
                </>
              ) : (
                <>
                  <XCircle className="h-8 w-8 text-muted-foreground" />
                  <span className="text-xl font-semibold text-muted-foreground">غير محضر</span>
                </>
              )}
            </div>
            
            {isCheckedIn && checkInTime && (
              <div className="bg-card p-4 rounded-lg border border-border">
                <p className="text-muted-foreground">وقت الحضور: <span className="font-semibold text-primary">{checkInTime}</span></p>
                {todayRecord && (
                  <p className="text-muted-foreground">الموقع: <span className="font-semibold">{todayRecord.location}</span></p>
                )}
              </div>
            )}
          </div>

          {/* Location Status */}
          <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">حالة تحديد الموقع</h4>
              <div className="flex items-center space-x-2 space-x-reverse">
                <Navigation className="h-4 w-4 text-primary" />
                <Wifi className="h-4 w-4 text-success" />
                <Battery className="h-4 w-4 text-success" />
              </div>
            </div>
            
            {locationPermission === 'checking' && (
              <div className="flex items-center space-x-2 space-x-reverse text-warning">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>جاري فحص إذن الموقع...</span>
              </div>
            )}
            
            {locationPermission === 'granted' && (
              <div className="flex items-center space-x-2 space-x-reverse text-success">
                <CheckCircle className="h-4 w-4" />
                <span>تم منح إذن الوصول للموقع</span>
              </div>
            )}
            
            {locationPermission === 'denied' && (
              <div className="flex items-center space-x-2 space-x-reverse text-destructive">
                <XCircle className="h-4 w-4" />
                <span>تم رفض إذن الوصول للموقع</span>
              </div>
            )}
            
            {locationPermission === 'prompt' && (
              <div className="flex items-center space-x-2 space-x-reverse text-warning">
                <AlertCircle className="h-4 w-4" />
                <span>يرجى السماح بالوصول للموقع</span>
              </div>
            )}
            
            {currentLocation && (
              <div className="mt-2 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <MapPin className="h-4 w-4" />
                  <span>
                    الإحداثيات: {currentLocation.latitude.toFixed(6)}, {currentLocation.longitude.toFixed(6)}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            {!isCheckedIn ? (
              <Button 
                onClick={handleCheckIn}
                disabled={isLoading || locationPermission !== 'granted'}
                className="flex-1 bg-background text-foreground border border-border hover:bg-accent h-14 text-lg"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin ml-2" />
                ) : (
                  <CheckCircle className="h-5 w-5 ml-2" />
                )}
                تسجيل الحضور
              </Button>
            ) : (
              <Button 
                onClick={handleCheckOut}
                disabled={isLoading || locationPermission !== 'granted'}
                variant="outline"
                className="flex-1 border-border text-foreground hover:bg-accent h-14 text-lg"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin ml-2" />
                ) : (
                  <XCircle className="h-5 w-5 ml-2" />
                )}
                تسجيل الانصراف
              </Button>
            )}
          </div>

          {locationPermission !== 'granted' && (
            <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
              <div className="flex items-start space-x-3 space-x-reverse">
                <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-orange-700">
                  <p className="font-semibold mb-1">إذن الموقع مطلوب</p>
                  <p>
                    لتسجيل الحضور والانصراف، يرجى السماح للتطبيق بالوصول لموقعك الحالي. 
                    هذا يضمن أنك في مكان العمل المحدد.
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Monthly Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">{monthlyStats.presentDays}</p>
            <p className="text-sm text-muted-foreground">أيام الحضور</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <XCircle className="h-5 w-5 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-destructive">{monthlyStats.absentDays}</p>
            <p className="text-sm text-muted-foreground">أيام الغياب</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock3 className="h-5 w-5 text-warning" />
            </div>
            <p className="text-2xl font-bold text-warning">{monthlyStats.lateDays}</p>
            <p className="text-sm text-muted-foreground">أيام التأخير</p>
          </CardContent>
        </Card>
        
        <Card className="bg-card border-border">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">{monthlyStats.attendanceRate}%</p>
            <p className="text-sm text-muted-foreground">معدل الحضور</p>
            <Progress value={monthlyStats.attendanceRate} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Attendance History */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center text-foreground">
            <Clock className="h-5 w-5 ml-2 text-primary" />
            سجل الحضور والانصراف
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Today's Record */}
            {todayRecord && (
              <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-primary">{formatDate(todayRecord.date)} - اليوم</h4>
                    <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground mt-1">
                      <span>حضور: {todayRecord.checkIn}</span>
                      {todayRecord.checkOut && <span>انصراف: {todayRecord.checkOut}</span>}
                      {todayRecord.workHours > 0 && <span>ساعات العمل: {todayRecord.workHours}h</span>}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      الموقع: {todayRecord.location}
                    </p>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(todayRecord.status)}
                  </div>
                </div>
              </div>
            )}
            
            {/* Historical Records */}
            {attendanceHistory.map((record) => (
              <div key={record.id} className="flex justify-between items-center p-4 bg-muted/20 rounded-lg border border-border">
                <div>
                  <h4 className="font-semibold text-foreground">{formatDate(record.date)}</h4>
                  <div className="flex items-center space-x-4 space-x-reverse text-sm text-muted-foreground mt-1">
                    <span>حضور: {record.checkIn}</span>
                    <span>انصراف: {record.checkOut}</span>
                    <span>ساعات العمل: {record.workHours}h</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    الموقع: {record.location}
                  </p>
                </div>
                <div className="text-right">
                  {getStatusBadge(record.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};