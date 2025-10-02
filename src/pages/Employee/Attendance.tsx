
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, CheckCircle, XCircle, AlertCircle, MapPin, Navigation } from 'lucide-react';
import { toast } from 'sonner';

const attendanceHistory = [
  {
    date: "2024-01-28",
    checkIn: "08:00",
    checkOut: "17:00",
    workingHours: "9:00",
    status: "حضور",
    late: false
  },
  {
    date: "2024-01-27",
    checkIn: "08:15",
    checkOut: "17:10",
    workingHours: "8:55",
    status: "حضور",
    late: true
  },
  {
    date: "2024-01-26",
    checkIn: "-",
    checkOut: "-",
    workingHours: "-",
    status: "غياب",
    late: false
  },
  {
    date: "2024-01-25",
    checkIn: "08:00",
    checkOut: "17:00",
    workingHours: "9:00",
    status: "حضور",
    late: false
  }
];

export const Attendance: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<{lat: number, lng: number} | null>(null);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  // الموقع المسموح للعمل (مثال: مكتب الشركة)
  const allowedLocation = { lat: 24.7136, lng: 46.6753 }; // الرياض
  const allowedRadius = 100; // 100 متر

  useEffect(() => {
    checkLocationPermission();
  }, []);

  const checkLocationPermission = async () => {
    if ('geolocation' in navigator) {
      const permission = await navigator.permissions.query({name: 'geolocation'});
      setLocationPermission(permission.state);
    }
  };

  const getCurrentLocation = () => {
    return new Promise<{lat: number, lng: number}>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported'));
        return;
      }

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
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  };

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371e3; // الأرض في المتر
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lng2-lng1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const distance = R * c; // في الأمتار
    return distance;
  };

  const handleCheckOut = async () => {
    setIsCheckingIn(true);
    try {
      const location = await getCurrentLocation();
      const distance = calculateDistance(
        location.lat, 
        location.lng, 
        allowedLocation.lat, 
        allowedLocation.lng
      );

      if (distance <= allowedRadius) {
        // تسجيل الانصراف بنجاح
        toast.success('تم تسجيل الانصراف بنجاح!');
        console.log('تم تسجيل الانصراف من:', location);
      } else {
        toast.error(`يجب أن تكون في نطاق ${allowedRadius} متر من مكان العمل للتسجيل`);
      }
    } catch (error) {
      toast.error('خطأ في تحديد الموقع. تأكد من تفعيل خدمة الموقع');
      console.error('Location error:', error);
    } finally {
      setIsCheckingIn(false);
    }
  };

  return (
    <div className="min-h-screen p-6 bg-background text-foreground" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-foreground">سجل الحضور والانصراف</h1>
          <p className="text-muted-foreground">متابعة أوقات الحضور والانصراف اليومية</p>
        </div>

        {/* Current Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-black">الحالة الحالية</h3>
            <Badge className="bg-green-100 text-green-800">متواجد</Badge>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="font-semibold text-black">وقت الحضور</p>
                    <p className="text-sm text-gray-600">اليوم</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-green-600">08:00 ص</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3 space-x-reverse">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="font-semibold text-black">وقت الانصراف المتوقع</p>
                    <p className="text-sm text-gray-600">اليوم</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-gray-600">17:00 م</span>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-4">
              {currentLocation && (
                <div className="flex items-center text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <MapPin className="h-4 w-4 mr-2" />
                  تم تحديد موقعك
                </div>
              )}
              
              <Button 
                className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg"
                onClick={handleCheckOut}
                disabled={isCheckingIn}
              >
                {isCheckingIn ? (
                  <Navigation className="h-5 w-5 mr-2 animate-spin" />
                ) : (
                  <Clock className="h-5 w-5 mr-2" />
                )}
                {isCheckingIn ? 'جاري التحقق من الموقع...' : 'تسجيل الانصراف'}
              </Button>
              
              {locationPermission === 'denied' && (
                <p className="text-sm text-red-600 text-center">
                  يجب السماح بالوصول للموقع لتسجيل الحضور والانصراف
                </p>
              )}
            </div>
          </div>
        </Card>

        {/* Monthly Statistics */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="p-6 border-l-4 border-l-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">أيام الحضور</p>
                <p className="text-2xl font-bold text-green-600">22</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">أيام الغياب</p>
                <p className="text-2xl font-bold text-red-600">1</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">مرات التأخير</p>
                <p className="text-2xl font-bold text-yellow-600">3</p>
              </div>
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            </div>
          </Card>

          <Card className="p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">نسبة الحضور</p>
                <p className="text-2xl font-bold text-blue-600">95%</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </Card>
        </div>

        {/* Attendance History */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-black mb-4">سجل الحضور الأسبوعي</h3>
          <div className="space-y-4">
            {attendanceHistory.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className={`w-3 h-3 rounded-full ${
                    record.status === 'حضور' ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <p className="font-semibold text-black">{record.date}</p>
                    <p className="text-sm text-gray-600">
                      {record.status === 'حضور' ? 
                        `${record.checkIn} - ${record.checkOut}` : 
                        'لم يتم التسجيل'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium text-black">{record.workingHours}</p>
                    <p className="text-xs text-gray-500">ساعات العمل</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={record.status === 'حضور' ? 'default' : 'destructive'}>
                      {record.status}
                    </Badge>
                    {record.late && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        متأخر
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
