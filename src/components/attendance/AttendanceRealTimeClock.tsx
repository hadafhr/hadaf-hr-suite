import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import {
  Clock,
  LogIn,
  LogOut,
  MapPin,
  Smartphone,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Timer,
  Pause,
  Play,
  Coffee
} from 'lucide-react';

interface AttendanceRealTimeClockProps {
  employeeId?: string;
  onCheckIn?: (data: any) => void;
  onCheckOut?: (data: any) => void;
}

const AttendanceRealTimeClock: React.FC<AttendanceRealTimeClockProps> = ({
  employeeId = 'EMP001',
  onCheckIn,
  onCheckOut
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [breakStartTime, setBreakStartTime] = useState<Date | null>(null);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [workingHours, setWorkingHours] = useState(0);
  const [location, setLocation] = useState('المكتب الرئيسي - الرياض');
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Calculate working hours
  useEffect(() => {
    if (isCheckedIn && checkInTime) {
      const timer = setInterval(() => {
        const now = new Date();
        const diff = now.getTime() - checkInTime.getTime();
        
        // Subtract break time if on break
        let breakTime = 0;
        if (breakStartTime && isOnBreak) {
          breakTime = now.getTime() - breakStartTime.getTime();
        }
        
        setWorkingHours(Math.max(0, (diff - breakTime) / (1000 * 60 * 60)));
      }, 60000); // Update every minute

      return () => clearInterval(timer);
    }
  }, [isCheckedIn, checkInTime, breakStartTime, isOnBreak]);

  // Get location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`);
        },
        () => {
          setLocation('المكتب الرئيسي - الرياض');
        }
      );
    }
  }, []);

  // Analog Clock Component
  const AnalogClock = () => {
    const seconds = currentTime.getSeconds();
    const minutes = currentTime.getMinutes();
    const hours = currentTime.getHours() % 12;

    const secondAngle = (seconds * 6) - 90;
    const minuteAngle = (minutes * 6) - 90;
    const hourAngle = (hours * 30 + minutes * 0.5) - 90;

    return (
      <div className="relative w-48 h-48 mx-auto mb-6">
        {/* Clock Face */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-300 bg-white shadow-lg">
          {/* Hour Markers */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-6 bg-gray-400"
              style={{
                top: '8px',
                left: '50%',
                transformOrigin: '0 88px',
                transform: `translateX(-50%) rotate(${i * 30}deg)`
              }}
            />
          ))}
          
          {/* Numbers */}
          {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => (
            <div
              key={num}
              className="absolute text-lg font-bold text-gray-700"
              style={{
                top: '16px',
                left: '50%',
                transformOrigin: '0 80px',
                transform: `translateX(-50%) rotate(${i * 30}deg)`
              }}
            >
              <span style={{ transform: `rotate(${-i * 30}deg)`, display: 'inline-block' }}>
                {num}
              </span>
            </div>
          ))}

          {/* Center Dot */}
          <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-30" />

          {/* Hour Hand */}
          <div
            className="absolute top-1/2 left-1/2 w-1 h-12 bg-gray-800 rounded-full origin-bottom z-20"
            style={{
              transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`,
              transition: 'transform 1s ease-in-out'
            }}
          />

          {/* Minute Hand */}
          <div
            className="absolute top-1/2 left-1/2 w-0.5 h-16 bg-gray-600 rounded-full origin-bottom z-20"
            style={{
              transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`,
              transition: 'transform 1s ease-in-out'
            }}
          />

          {/* Second Hand */}
          <div
            className="absolute top-1/2 left-1/2 w-px h-20 bg-red-500 rounded-full origin-bottom z-10"
            style={{
              transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`,
              transition: seconds === 0 ? 'none' : 'transform 0.1s ease-out'
            }}
          />
        </div>
      </div>
    );
  };

  const handleCheckIn = () => {
    const now = new Date();
    const workStart = new Date(now);
    workStart.setHours(8, 0, 0, 0); // 8:00 AM
    
    const isLate = now > workStart;
    const minutesLate = isLate ? Math.floor((now.getTime() - workStart.getTime()) / (1000 * 60)) : 0;

    setIsCheckedIn(true);
    setCheckInTime(now);
    
    const checkInData = {
      employeeId,
      checkInTime: now.toISOString(),
      location,
      device: 'Web Browser',
      isLate,
      minutesLate
    };

    onCheckIn?.(checkInData);

    toast({
      title: isLate ? "تم تسجيل الحضور - متأخر" : "تم تسجيل الحضور بنجاح",
      description: `الوقت: ${now.toLocaleTimeString('ar-SA')}${isLate ? ` - متأخر ${minutesLate} دقيقة` : ''}`,
      variant: isLate ? "destructive" : "default"
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    setIsCheckedIn(false);
    
    const checkOutData = {
      employeeId,
      checkOutTime: now.toISOString(),
      totalHours: workingHours.toFixed(2),
      location,
      device: 'Web Browser'
    };

    onCheckOut?.(checkOutData);

    toast({
      title: "تم تسجيل الانصراف بنجاح",
      description: `إجمالي ساعات العمل: ${workingHours.toFixed(1)} ساعة`
    });

    setCheckInTime(null);
    setWorkingHours(0);
    setBreakStartTime(null);
    setIsOnBreak(false);
  };

  const handleBreakToggle = () => {
    if (isOnBreak) {
      setIsOnBreak(false);
      setBreakStartTime(null);
      toast({
        title: "تم انتهاء الاستراحة",
        description: "تم استئناف العمل بنجاح"
      });
    } else {
      setIsOnBreak(true);
      setBreakStartTime(new Date());
      toast({
        title: "بدء الاستراحة",
        description: "تم تسجيل بداية الاستراحة"
      });
    }
  };

  const getShiftStatus = () => {
    const hour = currentTime.getHours();
    if (hour >= 8 && hour < 17) return { status: 'active', text: 'دوام نهاري', color: 'bg-green-500' };
    if (hour >= 17 && hour < 24) return { status: 'evening', text: 'دوام مسائي', color: 'bg-blue-500' };
    return { status: 'off', text: 'خارج الدوام', color: 'bg-gray-500' };
  };

  const shiftStatus = getShiftStatus();

  return (
    <div className="space-y-6">
      {/* Real-Time Clock Card */}
      <Card className="bg-white/80 backdrop-blur border-[#009F87]/20">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-[#009F87]">
            <Clock className="h-6 w-6" />
            الساعة الرقمية - تسجيل الحضور والانصراف
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Analog Clock */}
          <AnalogClock />

          {/* Digital Time Display */}
          <div className="text-center space-y-2">
            <div className="text-4xl font-bold text-gray-800 font-mono">
              {currentTime.toLocaleTimeString('ar-SA', { 
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
            <div className="text-lg text-gray-600">
              {currentTime.toLocaleDateString('ar-SA', { 
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <Badge className={`${shiftStatus.color} text-white`}>
              {shiftStatus.text}
            </Badge>
          </div>

          {/* Current Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <MapPin className="h-4 w-4 text-gray-500" />
              <div className="text-sm">
                <div className="font-medium">الموقع</div>
                <div className="text-gray-600">{location}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Smartphone className="h-4 w-4 text-gray-500" />
              <div className="text-sm">
                <div className="font-medium">الجهاز</div>
                <div className="text-gray-600">متصفح الويب</div>
              </div>
            </div>

            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <Timer className="h-4 w-4 text-gray-500" />
              <div className="text-sm">
                <div className="font-medium">ساعات العمل</div>
                <div className="text-gray-600">{workingHours.toFixed(1)} ساعة</div>
              </div>
            </div>
          </div>

          {/* Working Hours Progress */}
          {isCheckedIn && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>تقدم ساعات العمل اليوم</span>
                <span>{workingHours.toFixed(1)} / 8.0 ساعات</span>
              </div>
              <Progress value={(workingHours / 8) * 100} className="h-2" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 justify-center">
            {!isCheckedIn ? (
              <Button
                onClick={handleCheckIn}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                size="lg"
              >
                <LogIn className="h-5 w-5 ml-2" />
                تسجيل الحضور
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleCheckOut}
                  className="bg-red-600 hover:bg-red-700 text-white px-6"
                  size="lg"
                >
                  <LogOut className="h-5 w-5 ml-2" />
                  تسجيل الانصراف
                </Button>

                <Button
                  onClick={handleBreakToggle}
                  variant={isOnBreak ? "destructive" : "outline"}
                  size="lg"
                  className="px-6"
                >
                  {isOnBreak ? (
                    <>
                      <Play className="h-5 w-5 ml-2" />
                      انتهاء الاستراحة
                    </>
                  ) : (
                    <>
                      <Coffee className="h-5 w-5 ml-2" />
                      بدء الاستراحة
                    </>
                  )}
                </Button>
              </>
            )}
          </div>

          {/* Status Indicators */}
          {isCheckedIn && (
            <div className="flex items-center justify-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-800 font-medium">متصل - في العمل</span>
              </div>
              
              {checkInTime && (
                <div className="text-sm text-green-700">
                  تسجيل الحضور: {checkInTime.toLocaleTimeString('ar-SA')}
                </div>
              )}

              {isOnBreak && (
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                  <Pause className="h-3 w-3 ml-1" />
                  في الاستراحة
                </Badge>
              )}
            </div>
          )}

          {/* Validation Messages */}
          <div className="space-y-2">
            {shiftStatus.status === 'off' && (
              <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <span className="text-sm text-yellow-800">
                  أنت خارج ساعات الدوام الرسمية. يرجى التأكد من صحة التوقيت.
                </span>
              </div>
            )}

            <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <span className="text-sm text-blue-800">
                سيتم حفظ جميع البيانات تلقائياً مع الطابع الزمني الدقيق.
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceRealTimeClock;