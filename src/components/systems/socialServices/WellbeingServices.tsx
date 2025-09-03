import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus,
  Home,
  Heart,
  Baby,
  Users,
  Calendar,
  MapPin,
  Phone,
  Clock,
  CheckCircle,
  Settings,
  Search,
  Filter,
  Edit,
  Trash2
} from 'lucide-react';

export const WellbeingServices = () => {
  const [activeTab, setActiveTab] = useState('family');
  const [showNewService, setShowNewService] = useState(false);

  const wellbeingTabs = [
    { id: 'family', name: 'الخدمات العائلية', icon: Home },
    { id: 'childcare', name: 'رعاية الأطفال', icon: Baby },
    { id: 'wellness', name: 'برامج الصحة', icon: Heart },
    { id: 'counseling', name: 'الاستشارات النفسية', icon: Users }
  ];

  const familyServices = [
    {
      id: 1,
      name: 'حضانة الشركة',
      category: 'childcare',
      description: 'حضانة متكاملة لأطفال الموظفين من عمر 6 شهور إلى 4 سنوات',
      capacity: 50,
      currentEnrollment: 42,
      ageRange: '6 شهور - 4 سنوات',
      location: 'الطابق الأرضي - مبنى الإدارة',
      contact: 'حنان أحمد - 050-123-4567',
      schedule: 'الأحد - الخميس: 7:00 ص - 6:00 م',
      fees: 'مجاني للموظفين',
      waitingList: 8,
      features: ['وجبات صحية', 'أنشطة تعليمية', 'رعاية طبية', 'نقل آمن'],
      status: 'active'
    },
    {
      id: 2,
      name: 'النادي الصيفي',
      category: 'childcare',
      description: 'برنامج صيفي ترفيهي وتعليمي لأطفال الموظفين',
      capacity: 80,
      currentEnrollment: 65,
      ageRange: '5 - 12 سنة',
      location: 'النادي الرياضي للشركة',
      contact: 'محمد سالم - 050-234-5678',
      schedule: 'يونيو - أغسطس: 8:00 ص - 2:00 م',
      fees: '200 ريال شهرياً',
      waitingList: 15,
      features: ['أنشطة رياضية', 'رحلات ترفيهية', 'ورش فنية', 'تعلم السباحة'],
      status: 'seasonal'
    }
  ];

  const wellnessPrograms = [
    {
      id: 1,
      name: 'برنامج اللياقة البدنية',
      description: 'جلسات رياضية منتظمة مع مدربين معتمدين',
      schedule: 'الإثنين والأربعاء والجمعة: 5:00 - 7:00 م',
      participants: 45,
      maxCapacity: 60,
      instructor: 'أحمد محمد - مدرب معتمد',
      location: 'صالة الألعاب الرياضية'
    },
    {
      id: 2,
      name: 'جلسات اليوغا والتأمل',
      description: 'جلسات استرخاء وتأمل لتحسين الصحة النفسية',
      schedule: 'الثلاثاء والخميس: 6:00 - 7:00 ص',
      participants: 25,
      maxCapacity: 30,
      instructor: 'سارة أحمد - معالجة يوغا',
      location: 'قاعة التأمل'
    }
  ];

  const counselingServices = [
    {
      id: 1,
      type: 'فردي',
      title: 'استشارة نفسية فردية',
      description: 'جلسات استشارة نفسية فردية مع أخصائيين معتمدين',
      available: true,
      bookings: 23,
      duration: '50 دقيقة',
      cost: 'مجاني للموظفين'
    },
    {
      id: 2,
      type: 'زوجي',
      title: 'استشارة أسرية وزوجية',
      description: 'جلسات لحل المشاكل الأسرية والزوجية',
      available: true,
      bookings: 15,
      duration: '60 دقيقة',
      cost: 'مجاني للموظفين'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">نشط</Badge>;
      case 'seasonal':
        return <Badge className="bg-blue-100 text-blue-800">موسمي</Badge>;
      case 'full':
        return <Badge className="bg-red-100 text-red-800">مكتمل</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const ServiceForm = ({ onClose }: { onClose: () => void }) => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="serviceName">اسم الخدمة</Label>
          <Input id="serviceName" placeholder="أدخل اسم الخدمة" />
        </div>
        <div>
          <Label htmlFor="category">الفئة</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="اختر الفئة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="family">خدمات عائلية</SelectItem>
              <SelectItem value="childcare">رعاية أطفال</SelectItem>
              <SelectItem value="wellness">صحة ولياقة</SelectItem>
              <SelectItem value="counseling">استشارات</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">الوصف</Label>
        <Textarea 
          id="description" 
          placeholder="وصف تفصيلي للخدمة"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="capacity">السعة القصوى</Label>
          <Input id="capacity" type="number" placeholder="0" />
        </div>
        <div>
          <Label htmlFor="location">المكان</Label>
          <Input id="location" placeholder="موقع الخدمة" />
        </div>
        <div>
          <Label htmlFor="contact">جهة الاتصال</Label>
          <Input id="contact" placeholder="المسؤول عن الخدمة" />
        </div>
      </div>

      <div className="flex justify-end space-x-2 rtl:space-x-reverse">
        <Button variant="outline" onClick={onClose}>إلغاء</Button>
        <Button onClick={onClose}>إضافة الخدمة</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">خدمات الرفاهية والأسرة</h2>
          <p className="text-muted-foreground mt-1">
            خدمات شاملة لدعم الموظفين وعائلاتهم
          </p>
        </div>
        <Dialog open={showNewService} onOpenChange={setShowNewService}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="h-4 w-4 mr-2" />
              خدمة جديدة
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>إضافة خدمة جديدة</DialogTitle>
            </DialogHeader>
            <ServiceForm onClose={() => setShowNewService(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {wellbeingTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="flex items-center space-x-2 rtl:space-x-reverse"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden md:inline">{tab.name}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Family Services Tab */}
        <TabsContent value="family" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {familyServices.map((service) => (
              <Card key={service.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <div className="flex items-center space-x-2 rtl:space-x-reverse mt-2">
                        {getStatusBadge(service.status)}
                        <Badge variant="outline">{service.ageRange}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-semibold">{service.currentEnrollment}/{service.capacity}</div>
                      <div className="text-xs text-muted-foreground">المسجلين</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-semibold">{service.waitingList}</div>
                      <div className="text-xs text-muted-foreground">قائمة الانتظار</div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{service.location}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{service.contact}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{service.schedule}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">المميزات:</h4>
                    <div className="flex flex-wrap gap-1">
                      {service.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" size="sm">
                    إدارة التسجيلات
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Wellness Programs Tab */}
        <TabsContent value="wellness" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wellnessPrograms.map((program) => (
              <Card key={program.id} className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">{program.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{program.description}</p>
                  
                  <div className="text-center p-4 bg-primary/5 rounded-lg">
                    <div className="text-2xl font-bold text-primary">{program.participants}/{program.maxCapacity}</div>
                    <div className="text-sm text-muted-foreground">مشترك</div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{program.schedule}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>{program.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{program.location}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="sm">
                    التسجيل في البرنامج
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Counseling Tab */}
        <TabsContent value="counseling" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {counselingServices.map((service) => (
              <Card key={service.id} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{service.title}</CardTitle>
                      <Badge variant="outline" className="mt-2">{service.type}</Badge>
                    </div>
                    <Badge className={service.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                      {service.available ? 'متاح' : 'غير متاح'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-semibold">{service.bookings}</div>
                      <div className="text-xs text-muted-foreground">حجز هذا الشهر</div>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <div className="text-lg font-semibold">{service.duration}</div>
                      <div className="text-xs text-muted-foreground">مدة الجلسة</div>
                    </div>
                  </div>

                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-800">{service.cost}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="sm" disabled={!service.available}>
                    حجز موعد
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};