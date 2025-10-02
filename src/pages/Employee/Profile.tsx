
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Edit, Save, Phone, Mail, MapPin, Calendar, Briefcase } from 'lucide-react';

export const EmployeeProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "أحمد محمد السعد",
    email: "ahmed.saad@company.com",
    phone: "+966501234567",
    position: "مطور برمجيات أول",
    department: "تقنية المعلومات",
    joinDate: "2022-03-15",
    address: "الرياض، المملكة العربية السعودية",
    emergencyContact: "+966509876543",
    salary: "12,000 ريال"
  });

  return (
    <div className="min-h-screen p-6 bg-background text-foreground" dir="rtl">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-foreground">الملف الشخصي</h1>
          <p className="text-muted-foreground">عرض وتحديث البيانات الشخصية</p>
        </div>

        {/* Profile Card */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-black">{profile.name}</h2>
                <p className="text-gray-600">{profile.position}</p>
                <Badge className="bg-green-100 text-green-800">نشط</Badge>
              </div>
            </div>
            <Button 
              onClick={() => setIsEditing(!isEditing)}
              className="bg-green-500 hover:bg-green-600"
            >
              {isEditing ? <Save className="h-4 w-4 mr-2" /> : <Edit className="h-4 w-4 mr-2" />}
              {isEditing ? 'حفظ' : 'تعديل'}
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-black">الاسم الكامل</Label>
                <Input 
                  value={profile.name}
                  readOnly={!isEditing}
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label className="text-black">البريد الإلكتروني</Label>
                <div className="flex items-center mt-1">
                  <Mail className="h-4 w-4 text-green-500 mr-2" />
                  <Input 
                    value={profile.email}
                    readOnly={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label className="text-black">رقم الهاتف</Label>
                <div className="flex items-center mt-1">
                  <Phone className="h-4 w-4 text-green-500 mr-2" />
                  <Input 
                    value={profile.phone}
                    readOnly={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label className="text-black">العنوان</Label>
                <div className="flex items-center mt-1">
                  <MapPin className="h-4 w-4 text-green-500 mr-2" />
                  <Input 
                    value={profile.address}
                    readOnly={!isEditing}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-black">المنصب</Label>
                <div className="flex items-center mt-1">
                  <Briefcase className="h-4 w-4 text-green-500 mr-2" />
                  <Input 
                    value={profile.position}
                    readOnly={!isEditing}
                  />
                </div>
              </div>

              <div>
                <Label className="text-black">القسم</Label>
                <Input 
                  value={profile.department}
                  readOnly={!isEditing}
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-black">تاريخ الالتحاق</Label>
                <div className="flex items-center mt-1">
                  <Calendar className="h-4 w-4 text-green-500 mr-2" />
                  <Input 
                    value={profile.joinDate}
                    readOnly
                  />
                </div>
              </div>

              <div>
                <Label className="text-black">رقم الطوارئ</Label>
                <Input 
                  value={profile.emergencyContact}
                  readOnly={!isEditing}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">معلومات إضافية</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">سنوات الخبرة</span>
                <span className="font-medium text-black">5 سنوات</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المؤهل العلمي</span>
                <span className="font-medium text-black">بكالوريوس هندسة</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">اللغات</span>
                <span className="font-medium text-black">العربية، الإنجليزية</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-black mb-4">إحصائيات الأداء</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">تقييم الأداء</span>
                <span className="font-medium text-green-600">ممتاز (85%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">نسبة الحضور</span>
                <span className="font-medium text-green-600">95%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">المشاريع المكتملة</span>
                <span className="font-medium text-black">12 مشروع</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
