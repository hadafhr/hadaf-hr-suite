import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Calendar, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AttendanceRecord {
  date: string;
  checkIn: string;
  checkOut: string;
  workingHours: string;
  status: 'present' | 'late' | 'absent';
  location: string;
}

export const AttendanceSystem: React.FC = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Mock allowed location (office coordinates)
  const allowedLocation = { lat: 24.7136, lng: 46.6753 }; // Riyadh coordinates
  const allowedRadius = 100; // meters

  // Mock attendance history
  const attendanceHistory: AttendanceRecord[] = [
    {
      date: '2024-01-15',
      checkIn: '08:30',
      checkOut: '17:15',
      workingHours: '8:45',
      status: 'present',
      location: 'مكتب الرياض'
    },
    {
      date: '2024-01-14',
      checkIn: '08:45',
      checkOut: '17:30',
      workingHours: '8:45',
      status: 'late',
      location: 'مكتب الرياض'
    },
    {
      date: '2024-01-13',
      checkIn: '08:15',
      checkOut: '17:00',
      workingHours: '8:45',
      status: 'present',
      location: 'مكتب الرياض'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    checkLocationPermission();

    return () => clearInterval(timer);
  }, []);

  const checkLocationPermission = async () => {
    if (navigator.geolocation) {
      try {
        const permission = await navigator.permissions.query({ name: 'geolocation' });
        setLocationPermission(permission.state);
        
        if (permission.state === 'granted') {
          getCurrentLocation();
        }
      } catch (error) {
        console.log('Location permission check failed');
      }
    }
  };

  const getCurrentLocation = () => {
    return new Promise<{ lat: number; lng: number }>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setCurrentLocation(location);
          resolve(location);
        },
        (error) => {
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    });
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c; // Distance in meters
  };

  const handleCheckIn = async () => {
    try {
      const location = await getCurrentLocation();
      const distance = calculateDistance(
        location.lat, 
        location.lng, 
        allowedLocation.lat, 
        allowedLocation.lng
      );

      if (distance <= allowedRadius) {
        setIsCheckedIn(true);
        setCheckInTime(currentTime.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' }));
        // Here you would send the check-in data to your backend
        alert('تم تسجيل الحضور بنجاح!');
      } else {
        alert('لا يمكن تسجيل الحضور. أنت خارج نطاق الموقع المسموح.');
      }
    } catch (error) {
      alert('فشل في الحصول على الموقع. تأكد من السماح للتطبيق بالوصول للموقع.');
    }
  };

  const handleCheckOut = async () => {
    try {
      const location = await getCurrentLocation();
      const distance = calculateDistance(
        location.lat, 
        location.lng, 
        allowedLocation.lat, 
        allowedLocation.lng
      );

      if (distance <= allowedRadius) {
        setIsCheckedIn(false);
        setCheckInTime(null);
        // Here you would send the check-out data to your backend
        alert('تم تسجيل الانصراف بنجاح!');
      } else {
        alert('لا يمكن تسجيل الانصراف. أنت خارج نطاق الموقع المسموح.');
      }
    } catch (error) {
      alert('فشل في الحصول على الموقع. تأكد من السماح للتطبيق بالوصول للموقع.');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800">حاضر</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800">متأخر</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800">غائب</Badge>;
      default:
        return <Badge variant="secondary">غير محدد</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" size="icon" onClick={() => navigate('/employee-dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="text-right">
              <h1 className="text-xl font-semibold">نظام الحضور والانصراف</h1>
              <p className="text-sm text-muted-foreground">تسجيل الحضور بنظام GPS</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Current Status */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">حالة الحضور الحالية</CardTitle>
            <CardDescription>
              الوقت الحالي: {currentTime.toLocaleTimeString('ar-SA')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-primary/10 rounded-full mb-4">
                <Clock className="w-12 h-12 text-primary" />
              </div>
              <div className="space-y-2">
                {isCheckedIn ? (
                  <>
                    <p className="text-lg font-semibold text-green-600">تم تسجيل الحضور</p>
                    <p className="text-sm text-muted-foreground">وقت الحضور: {checkInTime}</p>
                    <Button 
                      onClick={handleCheckOut}
                      className="mt-4"
                      size="lg"
                    >
                      تسجيل الانصراف
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-semibold text-orange-600">لم يتم تسجيل الحضور</p>
                    <Button 
                      onClick={handleCheckIn}
                      className="mt-4"
                      size="lg"
                    >
                      تسجيل الحضور
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Location Status */}
            <div className="border-t pt-4">
              <div className="flex items-center justify-center space-x-2 space-x-reverse">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-sm">حالة الموقع:</span>
                {locationPermission === 'granted' ? (
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="w-3 h-3 ml-1" />
                    مفعل
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">
                    <AlertCircle className="w-3 h-3 ml-1" />
                    غير مفعل
                  </Badge>
                )}
              </div>
              {locationPermission !== 'granted' && (
                <p className="text-xs text-red-600 text-center mt-2">
                  يرجى السماح للتطبيق بالوصول إلى الموقع لتسجيل الحضور
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">22</div>
              <div className="text-sm text-muted-foreground">أيام الحضور</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">2</div>
              <div className="text-sm text-muted-foreground">أيام الغياب</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">3</div>
              <div className="text-sm text-muted-foreground">مرات التأخير</div>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">92%</div>
              <div className="text-sm text-muted-foreground">نسبة الحضور</div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance History */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-right">سجل الحضور</CardTitle>
            <CardDescription className="text-right">آخر 7 أيام</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {attendanceHistory.map((record, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    {getStatusBadge(record.status)}
                    <div className="text-sm text-muted-foreground">
                      {record.location}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{record.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {record.checkIn} - {record.checkOut} ({record.workingHours})
                    </div>
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