import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Fingerprint, 
  Wifi, 
  WifiOff, 
  Settings, 
  Plus, 
  MapPin, 
  Clock, 
  AlertCircle,
  Eye,
  RefreshCw,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AttendanceDevice {
  id: string;
  device_code: string;
  device_name: string;
  device_type: 'fingerprint' | 'face_recognition' | 'rfid' | 'mobile_gps';
  location: string;
  ip_address?: string;
  port?: number;
  latitude?: number;
  longitude?: number;
  is_active: boolean;
  last_sync_at?: string;
  status: 'online' | 'offline' | 'maintenance' | 'error';
  settings: any;
  created_at: string;
}

interface DeviceLog {
  id: string;
  device_id: string;
  employee_code: string;
  log_time: string;
  action_type: string;
  verification_method: string;
  is_successful: boolean;
  confidence_score?: number;
}

export const DeviceManagement: React.FC = () => {
  const [devices, setDevices] = useState<AttendanceDevice[]>([]);
  const [deviceLogs, setDeviceLogs] = useState<DeviceLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    device_code: '',
    device_name: '',
    device_type: 'fingerprint',
    location: '',
    ip_address: '',
    port: 80,
    latitude: '',
    longitude: ''
  });

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    if (selectedDevice) {
      fetchDeviceLogs(selectedDevice);
    }
  }, [selectedDevice]);

  const fetchDevices = async () => {
    try {
      const { data, error } = await supabase
        .from('attendance_devices')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDevices((data || []).map(device => ({
        ...device,
        device_type: device.device_type as 'fingerprint' | 'face_recognition' | 'rfid' | 'mobile_gps'
      })));
    } catch (error) {
      console.error('Error fetching devices:', error);
      toast.error('خطأ في تحميل بيانات الأجهزة');
    } finally {
      setLoading(false);
    }
  };

  const fetchDeviceLogs = async (deviceId: string) => {
    try {
      const { data, error } = await supabase
        .from('device_attendance_logs')
        .select('*')
        .eq('device_id', deviceId)
        .order('log_time', { ascending: false })
        .limit(50);

      if (error) throw error;
      setDeviceLogs(data || []);
    } catch (error) {
      console.error('Error fetching device logs:', error);
      toast.error('خطأ في تحميل سجلات الجهاز');
    }
  };

  const addDevice = async () => {
    try {
      const { data: companyData } = await supabase
        .from('boud_companies')
        .select('id')
        .limit(1)
        .single();

      if (!companyData) {
        toast.error('لم يتم العثور على الشركة');
        return;
      }

      const { error } = await supabase
        .from('attendance_devices')
        .insert({
          company_id: companyData.id,
          device_code: newDevice.device_code,
          device_name: newDevice.device_name,
          device_type: newDevice.device_type,
          location: newDevice.location,
          ip_address: newDevice.ip_address || null,
          port: newDevice.port || null,
          latitude: newDevice.latitude ? parseFloat(newDevice.latitude) : null,
          longitude: newDevice.longitude ? parseFloat(newDevice.longitude) : null,
          is_active: true,
          status: 'offline',
          settings: {}
        });

      if (error) throw error;

      toast.success('تم إضافة الجهاز بنجاح');
      setIsAddDialogOpen(false);
      setNewDevice({
        device_code: '',
        device_name: '',
        device_type: 'fingerprint',
        location: '',
        ip_address: '',
        port: 80,
        latitude: '',
        longitude: ''
      });
      fetchDevices();
    } catch (error: any) {
      console.error('Error adding device:', error);
      toast.error(error.message || 'خطأ في إضافة الجهاز');
    }
  };

  const toggleDeviceStatus = async (deviceId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('attendance_devices')
        .update({ is_active: !isActive })
        .eq('id', deviceId);

      if (error) throw error;

      toast.success(`تم ${!isActive ? 'تفعيل' : 'إيقاف'} الجهاز بنجاح`);
      fetchDevices();
    } catch (error: any) {
      console.error('Error toggling device status:', error);
      toast.error(error.message || 'خطأ في تحديث حالة الجهاز');
    }
  };

  const syncDevice = async (deviceId: string) => {
    try {
      // محاكاة عملية المزامنة
      const { error } = await supabase
        .from('attendance_devices')
        .update({ 
          last_sync_at: new Date().toISOString(),
          status: 'online'
        })
        .eq('id', deviceId);

      if (error) throw error;

      toast.success('تم تحديث الجهاز بنجاح');
      fetchDevices();
    } catch (error: any) {
      console.error('Error syncing device:', error);
      toast.error(error.message || 'خطأ في مزامنة الجهاز');
    }
  };

  const getDeviceTypeIcon = (type: string) => {
    switch (type) {
      case 'fingerprint':
        return <Fingerprint className="h-5 w-5" />;
      case 'face_recognition':
        return <Eye className="h-5 w-5" />;
      case 'rfid':
        return <Settings className="h-5 w-5" />;
      default:
        return <Settings className="h-5 w-5" />;
    }
  };

  const getDeviceTypeName = (type: string) => {
    const types = {
      fingerprint: 'بصمة الإصبع',
      face_recognition: 'التعرف على الوجه',
      rfid: 'بطاقة RFID',
      mobile_gps: 'GPS الهاتف'
    };
    return types[type as keyof typeof types] || type;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      online: 'bg-green-500',
      offline: 'bg-red-500',
      maintenance: 'bg-yellow-500',
      error: 'bg-red-600'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-500';
  };

  const getStatusText = (status: string) => {
    const statuses = {
      online: 'متصل',
      offline: 'غير متصل',
      maintenance: 'تحت الصيانة',
      error: 'خطأ'
    };
    return statuses[status as keyof typeof statuses] || status;
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <RefreshCw className="h-12 w-12 animate-spin mx-auto mb-4 text-primary" />
        <p className="text-lg text-muted-foreground">جاري تحميل بيانات الأجهزة...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">إدارة أجهزة الحضور</h2>
          <p className="text-muted-foreground">إدارة ومراقبة أجهزة البصمة والتعرف على الوجه</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary">
              <Plus className="h-4 w-4 mr-2" />
              إضافة جهاز جديد
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة جهاز حضور جديد</DialogTitle>
              <DialogDescription>
                أدخل تفاصيل الجهاز الجديد لإضافته إلى النظام
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="device_code">رمز الجهاز</Label>
                <Input
                  id="device_code"
                  value={newDevice.device_code}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, device_code: e.target.value }))}
                  placeholder="مثل: FP001"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="device_name">اسم الجهاز</Label>
                <Input
                  id="device_name"
                  value={newDevice.device_name}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, device_name: e.target.value }))}
                  placeholder="جهاز البصمة - المدخل الرئيسي"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="device_type">نوع الجهاز</Label>
                <Select value={newDevice.device_type} onValueChange={(value) => setNewDevice(prev => ({ ...prev, device_type: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fingerprint">بصمة الإصبع</SelectItem>
                    <SelectItem value="face_recognition">التعرف على الوجه</SelectItem>
                    <SelectItem value="rfid">بطاقة RFID</SelectItem>
                    <SelectItem value="mobile_gps">GPS الهاتف</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">الموقع</Label>
                <Input
                  id="location"
                  value={newDevice.location}
                  onChange={(e) => setNewDevice(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="المدخل الرئيسي - الطابق الأرضي"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ip_address">عنوان IP</Label>
                  <Input
                    id="ip_address"
                    value={newDevice.ip_address}
                    onChange={(e) => setNewDevice(prev => ({ ...prev, ip_address: e.target.value }))}
                    placeholder="192.168.1.100"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="port">المنفذ</Label>
                  <Input
                    id="port"
                    type="number"
                    value={newDevice.port}
                    onChange={(e) => setNewDevice(prev => ({ ...prev, port: parseInt(e.target.value) }))}
                    placeholder="80"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="latitude">خط العرض</Label>
                  <Input
                    id="latitude"
                    value={newDevice.latitude}
                    onChange={(e) => setNewDevice(prev => ({ ...prev, latitude: e.target.value }))}
                    placeholder="24.6877"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="longitude">خط الطول</Label>
                  <Input
                    id="longitude"
                    value={newDevice.longitude}
                    onChange={(e) => setNewDevice(prev => ({ ...prev, longitude: e.target.value }))}
                    placeholder="46.7219"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                إلغاء
              </Button>
              <Button onClick={addDevice}>
                إضافة الجهاز
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Devices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {devices.map((device) => (
          <Card key={device.id} className={`${device.is_active ? '' : 'opacity-60'}`}>
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getDeviceTypeIcon(device.device_type)}
                  <CardTitle className="text-lg">{device.device_name}</CardTitle>
                </div>
                <div className={`w-3 h-3 rounded-full ${getStatusColor(device.status)}`} />
              </div>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {device.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">النوع:</span>
                <span className="font-medium">{getDeviceTypeName(device.device_type)}</span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الحالة:</span>
                <Badge variant={device.status === 'online' ? 'default' : 'secondary'}>
                  {getStatusText(device.status)}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">الرمز:</span>
                <span className="font-medium font-mono">{device.device_code}</span>
              </div>
              
              {device.ip_address && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">IP:</span>
                  <span className="font-mono text-xs">{device.ip_address}:{device.port}</span>
                </div>
              )}
              
              {device.last_sync_at && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">آخر مزامنة:</span>
                  <span className="text-xs">
                    {new Date(device.last_sync_at).toLocaleString('ar-SA')}
                  </span>
                </div>
              )}
              
              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => syncDevice(device.id)}
                  className="flex-1"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  مزامنة
                </Button>
                
                <Button
                  variant={device.is_active ? "destructive" : "default"}
                  size="sm"
                  onClick={() => toggleDeviceStatus(device.id, device.is_active)}
                  className="flex-1"
                >
                  {device.is_active ? (
                    <>
                      <WifiOff className="h-3 w-3 mr-1" />
                      إيقاف
                    </>
                  ) : (
                    <>
                      <Wifi className="h-3 w-3 mr-1" />
                      تفعيل
                    </>
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedDevice(device.id)}
                >
                  <Eye className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {devices.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Fingerprint className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-lg text-muted-foreground mb-2">لا توجد أجهزة مسجلة</p>
            <p className="text-sm text-muted-foreground">ابدأ بإضافة جهاز حضور جديد للنظام</p>
          </CardContent>
        </Card>
      )}

      {/* Device Logs */}
      {selectedDevice && (
        <Card>
          <CardHeader>
            <CardTitle>سجلات الجهاز</CardTitle>
            <CardDescription>
              آخر 50 عملية من جهاز {devices.find(d => d.id === selectedDevice)?.device_name}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {deviceLogs.map((log) => (
                <div key={log.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${log.is_successful ? 'bg-green-500' : 'bg-red-500'}`} />
                    <div>
                      <p className="font-medium">{log.employee_code}</p>
                      <p className="text-xs text-muted-foreground">{log.verification_method}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {log.action_type === 'check_in' ? 'حضور' : 'انصراف'}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(log.log_time).toLocaleString('ar-SA')}
                    </p>
                    {log.confidence_score && (
                      <p className="text-xs text-muted-foreground">
                        دقة: {log.confidence_score}%
                      </p>
                    )}
                  </div>
                </div>
              ))}
              
              {deviceLogs.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>لا توجد سجلات للجهاز</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};