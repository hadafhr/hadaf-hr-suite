import React, { useState } from 'react';
import { MobileHeader } from '@/components/mobile/MobileHeader';
import { MobileNavigation } from '@/components/mobile/MobileNavigation';
import { MobileSidebar } from '@/components/mobile/MobileSidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTranslation } from 'react-i18next';
import { 
  Edit, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Settings,
  LogOut,
  Save,
  X
} from 'lucide-react';

export const MobileProfile: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { t } = useTranslation();

  const [profileData, setProfileData] = useState({
    name: 'أحمد محمد الأحمد',
    position: 'مدير الموارد البشرية',
    department: 'الموارد البشرية',
    email: 'ahmed.ahmed@boodhr.com',
    phone: '+966 50 123 4567',
    location: 'الرياض، المملكة العربية السعودية',
    joinDate: '2020-03-15',
    employeeId: 'EMP-001',
    directManager: 'فاطمة علي محمد',
    salary: 'غير محدد',
    education: 'بكالوريوس إدارة أعمال'
  });

  const achievements = [
    { title: 'موظف الشهر', date: 'ديسمبر 2023', type: 'excellence' },
    { title: 'إنجاز مشروع النظام الجديد', date: 'نوفمبر 2023', type: 'project' },
    { title: '5 سنوات خدمة', date: 'مارس 2023', type: 'service' }
  ];

  const quickStats = [
    { label: 'أيام الإجازة المتبقية', value: '15', icon: Calendar, color: 'text-blue-600' },
    { label: 'ساعات العمل هذا الشهر', value: '160', icon: Briefcase, color: 'text-green-600' },
    { label: 'الدورات المكتملة', value: '8', icon: GraduationCap, color: 'text-purple-600' },
    { label: 'التقييم الحالي', value: '4.8', icon: Award, color: 'text-orange-600' }
  ];

  const handleSave = () => {
    // Handle saving profile data
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset changes and exit edit mode
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <MobileSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="/placeholder-avatar.jpg" alt={profileData.name} />
                  <AvatarFallback className="text-2xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute bottom-0 right-0 h-8 w-8 rounded-full p-0"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="space-y-2">
                <h1 className="text-xl font-bold">{profileData.name}</h1>
                <p className="text-muted-foreground">{profileData.position}</p>
                <Badge variant="secondary">{profileData.department}</Badge>
              </div>

              <div className="flex gap-2">
                {!isEditing ? (
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 mr-2" />
                    تعديل الملف
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSave}>
                      <Save className="h-4 w-4 mr-2" />
                      حفظ
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      <X className="h-4 w-4 mr-2" />
                      إلغاء
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-lg font-bold">{stat.value}</p>
                    </div>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">المعلومات الشخصية</CardTitle>
            <CardDescription>بياناتك الأساسية في النظام</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">رقم الهاتف</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">البريد الإلكتروني</p>
                    <p className="text-sm text-muted-foreground">{profileData.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">رقم الهاتف</p>
                    <p className="text-sm text-muted-foreground">{profileData.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">الموقع</p>
                    <p className="text-sm text-muted-foreground">{profileData.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">تاريخ الانضمام</p>
                    <p className="text-sm text-muted-foreground">{profileData.joinDate}</p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Work Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">معلومات العمل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">رقم الموظف</p>
                <p className="text-sm text-muted-foreground">{profileData.employeeId}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">المدير المباشر</p>
                <p className="text-sm text-muted-foreground">{profileData.directManager}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">المؤهل العلمي</p>
                <p className="text-sm text-muted-foreground">{profileData.education}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الإنجازات والتقديرات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <Award className="h-5 w-5 text-yellow-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{achievement.title}</p>
                    <p className="text-xs text-muted-foreground">{achievement.date}</p>
                  </div>
                  <Badge variant="outline">
                    {achievement.type === 'excellence' ? 'تميز' : 
                     achievement.type === 'project' ? 'مشروع' : 'خدمة'}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">الإعدادات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Settings className="h-5 w-5 mr-2" />
              إعدادات الحساب
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
              <LogOut className="h-5 w-5 mr-2" />
              تسجيل الخروج
            </Button>
          </CardContent>
        </Card>
      </div>

      <MobileNavigation />
    </div>
  );
};